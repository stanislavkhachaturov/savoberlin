/**
 * Генерирует иконки приложения и OG-картинку из public/favicon.svg
 * и фонового фото public/images/hero.webp.
 *
 * Запуск: pnpm brand (после pnpm assets)
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const BG = "#08090a";

const logoSvg = await fs.readFile(path.join(PUBLIC, "favicon.svg"));

for (const size of [192, 512]) {
  await sharp(logoSvg, { density: 600 })
    .resize(size, size, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .png()
    .toFile(path.join(PUBLIC, `icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}

// Apple добавляет собственное скругление — оставляем поля вокруг знака
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0e1012" } })
  .composite([
    {
      input: await sharp(logoSvg, { density: 600 })
        .resize(140, 140, { fit: "contain" })
        .png()
        .toBuffer(),
      gravity: "center",
    },
  ])
  .png()
  .toFile(path.join(PUBLIC, "apple-icon.png"));
console.log("✓ apple-icon.png");

// --- OG-картинка -------------------------------------------------------------
const W = 1200;
const H = 630;

const background = await sharp(path.join(PUBLIC, "images", "hero.webp"))
  .resize(W, H, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.5, saturation: 0.8 })
  .toBuffer();

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#08090A" stop-opacity="0.96"/>
      <stop offset="0.58" stop-color="#08090A" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#08090A" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F0E27A"/>
      <stop offset="1" stop-color="#A89412"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="url(#accent)"/>
  <g transform="translate(80 300)">
    <text x="0" y="0" font-family="Helvetica, Arial, sans-serif" font-size="80" font-weight="bold" fill="#F2F3F4" letter-spacing="8">SAVO</text>
    <text x="0" y="62" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#DDC82A">Entrümpelung · Umzug · Rückbau</text>
    <text x="0" y="118" font-family="Helvetica, Arial, sans-serif" font-size="29" fill="#A9AEB3">Ihr starker Partner in Berlin &amp; Brandenburg</text>
    <text x="0" y="192" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="bold" fill="#F2F3F4">Faire Preise · Kostenlose Besichtigung</text>
  </g>
</svg>`);

await sharp(background)
  .composite([
    { input: overlay, top: 0, left: 0 },
    {
      input: await sharp(logoSvg, { density: 600 })
        .resize(170, 133, { fit: "contain" })
        .png()
        .toBuffer(),
      top: 78,
      left: 80,
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(PUBLIC, "og.jpg"));
console.log("✓ og.jpg");
