# SAVO — сайт-визитка (Берлин / Бранденбург)

Одностраничник для компании SAVO: Entrümpelung, Haushaltsauflösung, Umzug, Transport, Rückbau и Endreinigung. Дизайн — согласованный с заказчиком вариант A «Midnight Gold» плюс интерактивный калькулятор стоимости из варианта B.

Стек: **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion**. Сборка статическая (`output: "export"`), поэтому сайт кладётся на любой хостинг или CDN без Node на сервере.

## Запуск

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # статика в out/
pnpm typecheck
pnpm lint
```

Работа с собранной статикой:

```bash
pnpm preview    # отдаёт out/ на http://127.0.0.1:4400
pnpm check      # 16 проверок интерактива в реальном Chrome
pnpm shots      # скриншоты на 1440 / 1024 / 390 px в screenshots/
pnpm shots --full   # плюс страницы целиком, Impressum, Datenschutz и 404
```

`pnpm check` и `pnpm shots` сами поднимают статический сервер, отдельно запускать `preview` не нужно. Скриншоты заодно ловят ошибки консоли, упавшие запросы и горизонтальный скролл.

## Структура

| Путь | Что внутри |
| --- | --- |
| `src/lib/site.ts` | **весь текст сайта и контакты** — правки контента делаются только здесь |
| `src/lib/seo.ts` | title, description, keywords, JSON-LD (LocalBusiness, WebSite, FAQ) |
| `src/lib/images.generated.ts` | манифест картинок с размерами и blur-заглушками, генерируется скриптом |
| `src/app/page.tsx` | сборка главной из секций + FAQ-разметка для поиска |
| `src/app/layout.tsx` | шрифты, метатеги, Open Graph, JSON-LD организации |
| `src/app/impressum`, `src/app/datenschutz` | обязательные для Германии страницы |
| `src/components/` | секции страницы, по одному файлу на секцию |
| `src/app/globals.css` | вся дизайн-система: токены, компонентные классы, адаптив |
| `scripts/prepare-assets.mjs` | скачивание и обработка фотографий (`pnpm assets`) |
| `scripts/generate-brand.mjs` | иконки и OG-картинка (`pnpm brand`) |
| `scripts/check.mjs`, `scripts/shots.mjs`, `scripts/serve.mjs` | проверки и скриншоты собранной статики |
| `mockups/` | прототипы трёх вариантов дизайна, показанные заказчику, и инструменты подбора фотографий |

## Картинки

Список фотографий задан в `scripts/prepare-assets.mjs`. После правки:

```bash
pnpm assets   # перекачает и пересоберёт public/images + манифест
pnpm brand    # обновит иконки и og.jpg
```

Сейчас используются лицензионно-свободные фото с Unsplash, кроме пары **vorher / nachher** (и vorher2 / nachher2) — это фото заказчика. **Сервисные кадры и hero стоит заменить на реальные фотографии работ.** Пара vorher/nachher кропается в портрете 3:4; обе пары показываются рядом в сетке.

## SEO и индексация в Google

На сайте уже настроено:

- `robots.txt` → разрешает индексацию, указывает sitemap
- `sitemap.xml` → главная страница `https://savoberlin.de/`
- meta title / description / Open Graph / Twitter Card
- JSON-LD: **LocalBusiness** (адрес, телефон, 24/7, услуги, города), **WebSite**, **FAQPage**
- canonical URL на главной

Правки SEO-текстов — в `src/lib/seo.ts` (title, description, keywords).

## Как работает форма

Бэкенда нет, поэтому заявка собирается в текст и открывается в WhatsApp с уже заполненным сообщением; рядом стоит ссылка на e-mail для тех, у кого WhatsApp не установлен. Никакие данные на сервер не отправляются и не сохраняются — это же описано в `Datenschutz`. Если понадобится обычная отправка на почту, проще всего подключить внешний сервис форм (Formspree, Web3Forms) или добавить одну serverless-функцию.

## Макеты

В `mockups/` лежат три прототипа дизайна, которые показывались заказчику: выбранный вариант A «Midnight Gold», вариант B «Bento & Preisrechner» (из него взят калькулятор) и вариант C «Industrial». Это самостоятельные HTML-файлы, боевой сайт от них не зависит — они сохранены как история решений и как источник идей для будущих доработок. Там же инструменты подбора фотографий (поиск по Unsplash, контактные листы) и скриншоты вариантов.

```bash
cd mockups && python3 -m http.server 4321   # http://localhost:4321
```
