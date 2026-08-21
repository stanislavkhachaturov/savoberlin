/** Собирает превью-сетку из кандидатов Unsplash, чтобы глазами отобрать кадры. */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const IDS = process.argv.slice(3);
const OUT = process.argv[2];

const COLS = 4;
const CW = 420;
const CH = 280;
const LABEL = 26;

const tiles = await Promise.all(
  IDS.map(async (id, i) => {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=900&q=70&fm=jpg`, {
      headers: { "user-agent": "curl/8.7.1" },
    });
    const img = res.ok
      ? await sharp(Buffer.from(await res.arrayBuffer())).resize(CW, CH, { fit: "cover" }).toBuffer()
      : await sharp({ create: { width: CW, height: CH, channels: 3, background: "#400" } }).png().toBuffer();
    if (!res.ok) console.log(`  ✗ ${i} ${id}: HTTP ${res.status}`);
    const label = Buffer.from(
      `<svg width="${CW}" height="${LABEL}"><rect width="${CW}" height="${LABEL}" fill="#111"/>` +
        `<text x="8" y="18" font-family="monospace" font-size="14" fill="#0f0">${i}</text>` +
        `<text x="34" y="18" font-family="monospace" font-size="13" fill="#fff">${id}</text></svg>`,
    );
    return sharp({
      create: { width: CW, height: CH + LABEL, channels: 3, background: "#000" },
    })
      .composite([
        { input: img, top: 0, left: 0 },
        { input: label, top: CH, left: 0 },
      ])
      .png()
      .toBuffer();
  }),
);

const rows = Math.ceil(tiles.length / COLS);
const sheet = sharp({
  create: { width: COLS * CW, height: rows * (CH + LABEL), channels: 3, background: "#000" },
}).composite(
  tiles.map((input, i) => ({
    input,
    top: Math.floor(i / COLS) * (CH + LABEL),
    left: (i % COLS) * CW,
  })),
);

await fs.mkdir(path.dirname(OUT), { recursive: true });
await sheet.jpeg({ quality: 78 }).toFile(OUT);
console.log(`✓ ${OUT} — ${tiles.length} кадров`);
