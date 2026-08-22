/**
 * Скачивает фотографии с Unsplash, кропает под нужные пропорции, конвертирует
 * в WebP и генерирует src/lib/images.generated.ts с размерами и blur-заглушками.
 *
 * Запуск: pnpm assets
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "lib", "images.generated.ts");

/**
 * name -> { id, width, ratio, position } для Unsplash
 * или { local: true } — взять уже лежащий public/images/{name}.webp
 * (vorher/nachher — фото заказчика, портрет ~3:4).
 */
const SOURCES = {
  hero: { id: "1743348717569-ccd2c1d09d6e", width: 2200, ratio: 16 / 9 },
  roofs: { id: "1707049709216-8d474af00f12", width: 2000, ratio: 16 / 7 },

  "service-entruempelung": { id: "1698917414969-feade59e3343", width: 1400, ratio: 4 / 3 },
  "service-umzug": { id: "1663181191222-a20536e7419c", width: 1400, ratio: 4 / 3 },
  "service-rueckbau": { id: "1634586648651-f1fb9ec10d90", width: 1400, ratio: 4 / 3 },

  vorher: { local: true },
  nachher: { local: true },
  vorher2: { local: true },
  nachher2: { local: true },
};

async function download(id) {
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`, {
    headers: { "user-agent": "curl/8.7.1" },
  });
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

await fs.mkdir(OUT_DIR, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};

for (const [name, source] of Object.entries(SOURCES)) {
  const outFile = path.join(OUT_DIR, `${name}.webp`);

  if (source.local) {
    const meta = await sharp(outFile).metadata();
    const width = meta.width;
    const height = meta.height;
    const ratio = width / height;
    const blur = await sharp(outFile)
      .resize(24, Math.max(1, Math.round(24 / ratio)), { fit: "inside" })
      .blur(1.2)
      .webp({ quality: 40 })
      .toBuffer();

    manifest[name] = {
      src: `/images/${name}.webp`,
      width,
      height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
    console.log(`✓ ${name} ${width}×${height} (local)`);
    continue;
  }

  const { id, width, ratio, position = "attention" } = source;
  const raw = await download(id);
  const height = Math.round(width / ratio);

  await sharp(raw)
    .resize(width, height, { fit: "cover", position })
    .webp({ quality: 80 })
    .toFile(outFile);

  const blur = await sharp(raw)
    .resize(24, Math.max(1, Math.round(24 / ratio)), { fit: "cover", position })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();

  manifest[name] = {
    src: `/images/${name}.webp`,
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };

  console.log(`✓ ${name} ${width}×${height}`);
}

const body = `// Сгенерировано автоматически: pnpm assets. Не редактировать вручную.
// vorher/nachher — локальные фото заказчика; остальное — Unsplash.

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const images = ${JSON.stringify(manifest, null, 2)} satisfies Record<string, SiteImage>;

export type ImageName = keyof typeof images;
`;

await fs.writeFile(MANIFEST, body, "utf8");
console.log(`\nМанифест: ${path.relative(ROOT, MANIFEST)}`);
