/**
 * Крошечный статический сервер для собранной папки out/ — нужен, чтобы
 * проверки и скриншоты работали без внешних зависимостей.
 *
 * Запуск вручную: pnpm preview (после pnpm build)
 */
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "out");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function read(target) {
  try {
    const stat = await fs.stat(target);
    if (stat.isDirectory()) return read(path.join(target, "index.html"));
    return { body: await fs.readFile(target), ext: path.extname(target) };
  } catch {
    return null;
  }
}

export async function startServer(port = 4400) {
  if (!(await read(ROOT))) {
    throw new Error(`Нет собранной статики в ${ROOT} — сначала выполните pnpm build`);
  }

  const server = http.createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    // не пускаем за пределы out/
    const target = path.join(ROOT, path.normalize(url).replace(/^(\.\.[/\\])+/, ""));

    const file = (await read(target)) ?? (await read(path.join(ROOT, "404.html")));
    if (!file) {
      res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
      return;
    }

    res.writeHead(200, {
      "content-type": TYPES[file.ext] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(file.body);
  });

  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

if (import.meta.filename === process.argv[1]) {
  const { url } = await startServer(Number(process.env.PORT) || 4400);
  console.log(`Статика out/ доступна на ${url}`);
}
