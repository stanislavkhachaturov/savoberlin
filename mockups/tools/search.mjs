/** Поиск фотографий на Unsplash по списку запросов. Печатает id, чтобы отобрать вручную. */
const queries = process.argv.slice(2);

for (const q of queries) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=14&orientation=landscape`;
  const res = await fetch(url, { headers: { "user-agent": "curl/8.7.1", accept: "*/*" } });
  if (!res.ok) {
    console.log(`\n## ${q}: HTTP ${res.status}`);
    continue;
  }
  const data = await res.json();
  console.log(`\n## ${q}`);
  for (const p of data.results ?? []) {
    if (p.premium || p.plus) continue;
    const id = p.urls.raw.match(/photo-([^?]+)/)?.[1] ?? p.id;
    console.log(`${id} | ${(p.alt_description ?? p.description ?? "").slice(0, 72)}`);
  }
}
