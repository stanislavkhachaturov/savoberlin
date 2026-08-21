/**
 * Снимает скриншоты прототипов: десктоп (в т.ч. целиком) и мобильный.
 * node tools/shots.mjs variante-a [--full]
 */
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

const page_name = process.argv[2] ?? "variante-a";
const full = process.argv.includes("--full");
const OUT = path.resolve(import.meta.dirname, "..", "shots");
await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ["--force-color-profile=srgb"] });

async function shot(name, { width, height, deviceScaleFactor = 1, fullPage = false, scrollTo = 0 }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor, isMobile: width < 500, hasTouch: width < 500 });
  await page.goto(`http://127.0.0.1:4321/${page_name}.html`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);

  if (fullPage) {
    // на статичном снимке анимации появления доигрывать нечему — показываем конечное состояние
    await page.evaluate(async () => {
      document.querySelectorAll("img[loading=lazy]").forEach((i) => i.setAttribute("loading", "eager"));
      document.querySelectorAll(".reveal").forEach((e) => {
        e.style.transitionDelay = "0s";
        e.classList.add("in");
      });
      document.querySelectorAll(".count").forEach((e) => {
        e.textContent = Number(e.dataset.to).toLocaleString("de-DE");
      });
      await Promise.all(
        [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => (i.onload = i.onerror = r))),
      );
    });
  } else if (scrollTo) {
    await page.evaluate((y) => scrollTo(0, y), scrollTo);
  }
  await new Promise((r) => setTimeout(r, 1100));

  const file = path.join(OUT, `${page_name}-${name}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 88, fullPage, captureBeyondViewport: fullPage });
  await page.close();
  console.log(`✓ ${path.basename(file)}`);
}

await shot("desktop", { width: 1440, height: 900 });
await shot("mobile", { width: 390, height: 844, deviceScaleFactor: 2 });
if (full) {
  await shot("desktop-full", { width: 1440, height: 900, fullPage: true });
  await shot("mobile-full", { width: 390, height: 844, fullPage: true });
}

await browser.close();
