/**
 * Проверяет, что интерактивные блоки собранного сайта действительно работают:
 * калькулятор, ползунок площади, слайдер vorher/nachher, FAQ, мобильное меню,
 * отправка формы в WhatsApp.
 *
 * Запуск: pnpm build && pnpm check
 */
import puppeteer from "puppeteer";
import { startServer } from "./serve.mjs";

const server = await startServer(4401);
const BASE = `${server.url}/`;
const browser = await puppeteer.launch({ headless: true });
const results = [];

const check = (name, ok, detail = "") =>
  results.push({ name, ok, detail: typeof detail === "string" ? detail : JSON.stringify(detail) });

// ---------- десктоп ----------
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(BASE, { waitUntil: "networkidle0" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

const price = () => page.$eval(".calc-price", (el) => el.textContent.trim().split("\n")[0]);
const rows = () => page.$$eval(".calc-rows b", (els) => els.map((e) => e.textContent));

const initialPrice = await price();
const initialRows = await rows();

// смена услуги должна менять сумму
await page.click('.opts[aria-labelledby="calc-service"] button:nth-child(3)');
await new Promise((r) => setTimeout(r, 700));
const rueckbauPrice = await price();
check("калькулятор: смена услуги меняет сумму", rueckbauPrice !== initialPrice, `${initialPrice} → ${rueckbauPrice}`);

// «Randvoll» должен поднимать объём и бригаду
await page.click('.opts[aria-labelledby="calc-load"] button:nth-child(3)');
await new Promise((r) => setTimeout(r, 700));
const fullRows = await rows();
check("калькулятор: füllgrad меняет объём/бригаду", JSON.stringify(fullRows) !== JSON.stringify(initialRows), `${initialRows} → ${fullRows}`);

// ползунок площади: React — контролируемый инпут, поэтому дёргаем нативный сеттер
const priceBeforeArea = await price();
await page.$eval("#calc-area", (el) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  setter.call(el, "220");
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 700));
const bigPrice = await price();
const areaLabel = await page.$eval(".cgroup label b", (el) => el.textContent);
check(
  "калькулятор: ползунок площади",
  areaLabel === "220 m²" && bigPrice !== priceBeforeArea,
  `${areaLabel}, ${bigPrice.split("inkl")[0].trim()}`,
);

const fillWidth = await page.$eval("#calc-area", (el) => el.style.getPropertyValue("--fill"));
check("калькулятор: заливка ползунка", parseFloat(fillWidth) > 71 && parseFloat(fillWidth) < 73, fillWidth);

// слайдер vorher/nachher — тянем мышью
await page.$eval(".ba", (el) => el.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 400));
const box = await page.$eval(".ba", (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
await page.mouse.move(box.x + box.w * 0.5, box.y + box.h * 0.5);
await page.mouse.down();
await page.mouse.move(box.x + box.w * 0.22, box.y + box.h * 0.5, { steps: 8 });
await page.mouse.up();
await new Promise((r) => setTimeout(r, 300)); // ждём, пока React дорисует последний кадр
const pos = await page.$eval(".ba-handle", (el) => Number(el.getAttribute("aria-valuenow")));
check("vorher/nachher: перетаскивание", pos > 18 && pos < 26, `aria-valuenow=${pos}`);

// стрелки клавиатуры: шаг 4 %, значит два нажатия дают +8 с точностью до округления
await page.focus(".ba-handle");
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
await new Promise((r) => setTimeout(r, 300));
const pos2 = await page.$eval(".ba-handle", (el) => Number(el.getAttribute("aria-valuenow")));
check("vorher/nachher: стрелки клавиатуры", Math.abs(pos2 - pos - 8) <= 1, `${pos} → ${pos2}`);

// FAQ: name="faq" делает аккордеон эксклюзивным — второй пункт закрывает первый
await page.$$eval(".faq summary", (els) => els[0].click());
await new Promise((r) => setTimeout(r, 300));
const firstOpen = await page.$$eval(".faq details", (els) => els.map((e) => e.open));
await page.$$eval(".faq summary", (els) => els[1].click());
await new Promise((r) => setTimeout(r, 300));
const secondOpen = await page.$$eval(".faq details", (els) => els.map((e) => e.open));
check(
  "FAQ: аккордеон открывается и закрывает предыдущий",
  firstOpen[0] && !secondOpen[0] && secondOpen[1],
  `${firstOpen.filter(Boolean).length} → ${secondOpen.filter(Boolean).length} открыто`,
);

// форма → WhatsApp
await page.type("#f-name", "Anna Müller");
await page.type("#f-phone", "+49 170 1234567");
await page.type("#f-message", "3-Zimmer-Wohnung, Dachgeschoss");
const opened = new Promise((resolve) => browser.once("targetcreated", (t) => resolve(t.url())));
await page.click('.form button[type="submit"]');
const waUrl = await Promise.race([opened, new Promise((r) => setTimeout(() => r(""), 5000))]);
// wa.me переписывает пробелы в «+», поэтому нормализуем перед сравнением
const decoded = decodeURIComponent(waUrl).replace(/\+/g, " ");
check(
  "форма: открывает WhatsApp с текстом заявки",
  /whatsapp\.com|wa\.me/.test(waUrl) &&
    decoded.includes("Anna Müller") &&
    decoded.includes("3-Zimmer-Wohnung"),
  waUrl.slice(0, 70),
);

check("консоль без ошибок (десктоп)", errors.length === 0, errors.slice(0, 3).join(" | "));
await page.close();

// ---------- мобильное меню ----------
const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await mob.goto(BASE, { waitUntil: "networkidle0" });
await mob.click(".burger");
await new Promise((r) => setTimeout(r, 600));

// открытое меню не должно расширять страницу — из-за этого появлялся горизонтальный скролл
const menuFits = await mob.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const widest = [...document.querySelectorAll(".mobmenu, .mobmenu *")]
    .map((el) => Math.round(el.getBoundingClientRect().right))
    .sort((a, b) => b - a)[0];
  return { vw, widest, scrollable: document.documentElement.scrollWidth > vw };
});
check(
  "моб. меню: помещается по ширине",
  !menuFits.scrollable && menuFits.widest <= menuFits.vw,
  `правый край ${menuFits.widest}px при ширине ${menuFits.vw}px`,
);
const menuVisible = await mob.$eval("#mobmenu", (el) => getComputedStyle(el).visibility);
check("моб. меню: открывается", menuVisible === "visible", menuVisible);
await mob.$$eval("#mobmenu a", (els) => els[0].click());
await new Promise((r) => setTimeout(r, 600));
const menuHidden = await mob.$eval("#mobmenu", (el) => getComputedStyle(el).visibility);
const bodyLocked = await mob.$eval("body", (el) => el.style.overflow);
check("моб. меню: закрывается по клику", menuHidden === "hidden" && bodyLocked === "", `${menuHidden}, overflow="${bodyLocked}"`);
await mob.close();

// ---------- служебные страницы ----------
const extra = await browser.newPage();
await extra.setViewport({ width: 1440, height: 900 });

for (const [label, url, needle] of [
  ["Impressum", "impressum/", "Angaben gemäß § 5"],
  ["Datenschutz", "datenschutz/", "Verantwortlicher"],
]) {
  const res = await extra.goto(BASE + url, { waitUntil: "domcontentloaded" });
  const hasText = await extra.evaluate((n) => document.body.innerText.includes(n), needle);
  check(`${label}: страница отдаётся`, res.status() === 200 && hasText, `HTTP ${res.status()}`);
}

await extra.goto(`${BASE}diese-seite-gibt-es-nicht/`, { waitUntil: "domcontentloaded" });
const notFound = await extra.evaluate(() => document.querySelector(".notfound-code")?.textContent);
check("404: своя страница вместо стандартной", notFound === "404", `найдено: ${notFound}`);

// skip-ссылка должна появляться при табуляции с клавиатуры
await extra.goto(BASE, { waitUntil: "domcontentloaded" });
await extra.keyboard.press("Tab");
await new Promise((r) => setTimeout(r, 500)); // ссылка выезжает по transition
const skip = await extra.evaluate(() => {
  const el = document.activeElement;
  return { text: el?.textContent, top: Math.round(el.getBoundingClientRect().top) };
});
check(
  "доступность: skip-ссылка по первому Tab",
  skip.text === "Zum Inhalt springen" && skip.top >= 0,
  `top=${skip.top}px`,
);
await extra.close();

await browser.close();
await server.close();

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "✓" : "✗"} ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
}
console.log(`\n${results.length - failed}/${results.length} проверок пройдено`);
process.exit(failed ? 1 : 0);
