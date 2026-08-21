/** Прогоняет прототипы на трёх ширинах: ошибки консоли, битые запросы, горизонтальный скролл. */
import puppeteer from "puppeteer";

const pages = ["index", "variante-a", "variante-b", "variante-c"];
const widths = [1440, 1024, 390];
const browser = await puppeteer.launch({ headless: true });

for (const name of pages) {
  for (const width of widths) {
    const page = await browser.newPage();
    const problems = [];
    page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
    page.on("pageerror", (e) => problems.push(`js: ${e.message}`));
    page.on("requestfailed", (r) => problems.push(`net: ${r.url().slice(-60)}`));
    page.on("response", (r) => r.status() >= 400 && problems.push(`http ${r.status()}: ${r.url().slice(-60)}`));

    await page.setViewport({ width, height: 900 });
    await page.goto(`http://127.0.0.1:4321/${name}.html`, { waitUntil: "networkidle0" });
    const overflow = await page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth > d.clientWidth ? `${d.scrollWidth} > ${d.clientWidth}` : null;
    });
    if (overflow) problems.push(`горизонтальный скролл: ${overflow}`);

    console.log(`${problems.length ? "✗" : "✓"} ${name} @${width}${problems.length ? "\n   " + problems.join("\n   ") : ""}`);
    await page.close();
  }
}

await browser.close();
