/**
 * Скриншоты собранного сайта на 1440 / 1024 / 390 px.
 * Заодно ловит ошибки консоли, упавшие запросы и горизонтальный скролл.
 *
 * Запуск: pnpm build && pnpm shots [--full]
 */
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";
import { startServer } from "./serve.mjs";

const OUT = path.resolve(import.meta.dirname, "..", "screenshots");
const full = process.argv.includes("--full");
await fs.mkdir(OUT, { recursive: true });

const server = await startServer(4400);
const BASE = server.url;

const browser = await puppeteer.launch({ headless: true, args: ["--force-color-profile=srgb"] });

/** Прокручивает страницу до низа, чтобы доиграли whileInView-анимации и счётчики. */
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 900));
    scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
}

async function open(width, height, deviceScaleFactor = 1, url = "/") {
  const page = await browser.newPage();
  const mobile = width < 500;
  await page.setViewport({ width, height, deviceScaleFactor, isMobile: mobile, hasTouch: mobile });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("requestfailed", (r) => errors.push(`${r.failure()?.errorText} ${r.url()}`));
  await page.goto(BASE + url, { waitUntil: "networkidle0" });
  // smooth-scroll мешает точному позиционированию снимков
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await page.evaluate(() => document.fonts.ready);
  return { page, errors };
}

async function shot(
  name,
  { width, height, deviceScaleFactor = 1, at, fullPage = false, url, openMenu = false },
) {
  const { page, errors } = await open(width, height, deviceScaleFactor, url);
  await warmUp(page);

  if (openMenu) {
    await page.click(".burger");
    await new Promise((r) => setTimeout(r, 700));
  }

  if (at) {
    await page.evaluate((selector) => {
      document.querySelector(selector)?.scrollIntoView({ block: "start", behavior: "instant" });
      scrollBy(0, -100);
    }, at);
    await new Promise((r) => setTimeout(r, 900));
  }

  // clientWidth, а не innerWidth: последний включает полосу прокрутки и даёт ложные срабатывания
  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return document.documentElement.scrollWidth - vw > 1;
  });

  await page.screenshot({
    path: path.join(OUT, `${name}.jpg`),
    type: "jpeg",
    quality: 88,
    fullPage,
    captureBeyondViewport: fullPage,
  });
  await page.close();

  const flags = [overflow && "H-SCROLL", errors.length && `${errors.length} ERR`].filter(Boolean);
  console.log(`✓ ${name}.jpg${flags.length ? `  ⚠ ${flags.join(", ")}` : ""}`);
  if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`    ${e}`));
}

const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844, deviceScaleFactor: 2 };

await shot("desktop-hero", desktop);
await shot("desktop-services", { ...desktop, at: "#leistungen" });
await shot("desktop-calc", { ...desktop, at: "#rechner" });
await shot("desktop-why", { ...desktop, at: "#warum" });
await shot("desktop-ba", { ...desktop, at: ".ba" });
await shot("desktop-ablauf", { ...desktop, at: "#ablauf" });
await shot("desktop-zahlen", { ...desktop, at: ".numbers" });
await shot("desktop-faq", { ...desktop, at: "#faq" });
await shot("desktop-kontakt", { ...desktop, at: "#kontakt" });
await shot("tablet-hero", { width: 1024, height: 900 });
await shot("mobile-hero", mobile);
await shot("mobile-menu", { ...mobile, openMenu: true });
await shot("mobile-calc", { ...mobile, at: "#rechner" });
await shot("mobile-services", { ...mobile, at: "#leistungen" });
await shot("mobile-ba", { ...mobile, at: ".ba" });
await shot("mobile-kontakt", { ...mobile, at: "#kontakt" });

if (full) {
  await shot("desktop-full", { ...desktop, fullPage: true });
  await shot("mobile-full", { ...mobile, deviceScaleFactor: 1, fullPage: true });
  await shot("impressum", { ...desktop, url: "/impressum/" });
  await shot("datenschutz", { ...desktop, url: "/datenschutz/" });
  await shot("not-found", { ...desktop, url: "/es-gibt-diese-seite-nicht/" });
}

await browser.close();
await server.close();
console.log(`\nСнимки: screenshots/`);
