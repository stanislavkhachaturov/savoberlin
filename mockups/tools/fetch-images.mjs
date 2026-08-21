/** Скачивает отобранные фотографии Unsplash в design/assets/img в двух размерах (webp). */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "assets", "img");

/** имя -> [unsplash id, соотношение сторон] */
const SOURCES = {
  "berlin-dawn": ["1743348717569-ccd2c1d09d6e", 16 / 9],
  "berlin-gate": ["1587330979470-3595ac045ab0", 16 / 9],
  "berlin-roofs": ["1707049709216-8d474af00f12", 16 / 9],

  "entruempelung-truck": ["1698917414969-feade59e3343", 3 / 2],
  "clutter-attic": ["1729184001258-fef247a01894", 3 / 2],
  "clutter-room": ["1725278484721-b20373781f43", 3 / 2],
  "container": ["1704756082548-af7c773aa0ef", 3 / 2],

  "room-empty": ["1722650272764-08d92d193a9c", 3 / 2],
  "room-white": ["1753911372198-50b1b254ad4d", 3 / 2],

  "entkernung": ["1634586648651-f1fb9ec10d90", 3 / 2],
  "demolition-wall": ["1517581177682-a085bb7ffb15", 3 / 2],

  "van-street": ["1663181191222-a20536e7419c", 3 / 2],
  "van-open": ["1742858492775-8f58f645aa12", 3 / 2],
  "driver": ["1762095996527-126e49ef9d72", 3 / 2],
  "loading-dolly": ["1769477145932-edd5a9d7567c", 3 / 2],
  "boxes-team": ["1595054225874-7d2315262e73", 3 / 2],
  "montage": ["1772338537689-056082f100a9", 3 / 2],
  "cleaning": ["1585421514284-efb74c2b69ba", 3 / 2],
  "basement": ["1782353921981-bb73a53a7482", 3 / 2],
};

await fs.mkdir(OUT, { recursive: true });

for (const [name, [id, ratio]] of Object.entries(SOURCES)) {
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`, {
    headers: { "user-agent": "curl/8.7.1" },
  });
  if (!res.ok) {
    console.log(`✗ ${name} (${id}): HTTP ${res.status}`);
    continue;
  }
  const raw = Buffer.from(await res.arrayBuffer());

  for (const width of [1920, 960]) {
    const suffix = width === 1920 ? "" : "@sm";
    await sharp(raw)
      .resize(width, Math.round(width / ratio), { fit: "cover", position: "attention" })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}${suffix}.webp`));
  }
  console.log(`✓ ${name}`);
}
