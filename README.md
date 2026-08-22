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

## Что нужно от заказчика перед публикацией

- [x] **Телефон и WhatsApp** — `+49 151 51828063`, прописан в `src/lib/site.ts`.
- [x] **E-mail** — `info@savoberlin.de` в `src/lib/site.ts`.
- [x] **Домен** — `https://savoberlin.de` в `site.url` (Open Graph, sitemap, JSON-LD).
- [ ] **Цифры** — оценка 4,9/5 в герое всё ещё заглушка: без проверки публиковать нельзя (UWG). Завышенные «годы/заказы» убраны; вместо них 24/7, ответ за 60 мин и бесплатный осмотр.
- [x] **Режим связи** — 24/7, звонить можно в любое время включая ночь.
- [x] **Impressum** — Igor Voytok SAVO, Raoul-Wallenberg-Straße 68, 12679 Berlin, Igor Voytok. Осталось: USt-IdNr., если есть.
- [ ] **Datenschutz** — текст написан под текущую реализацию (без cookies и трекинга), но его должен проверить юрист заказчика.
- [ ] **Фотографии работ** — минимум 2–3 пары «до/после» и несколько кадров бригады.
- [ ] **Ставки калькулятора** — €/м² по услугам и коэффициенты по типу объекта в `src/lib/site.ts` (`calculator`). Сейчас это разумные рыночные ориентиры, но их должен подтвердить заказчик.

## SEO и индексация в Google

На сайте уже настроено:

- `robots.txt` → разрешает индексацию, указывает sitemap
- `sitemap.xml` → главная страница `https://savoberlin.de/`
- meta title / description / Open Graph / Twitter Card
- JSON-LD: **LocalBusiness** (адрес, телефон, 24/7, услуги, города), **WebSite**, **FAQPage**
- canonical URL на главной

Правки SEO-текстов — в `src/lib/seo.ts` (title, description, keywords).

### 1. Google Search Console (обязательно)

1. Открыть [Google Search Console](https://search.google.com/search-console)
2. Добавить ресурс **Домен** `savoberlin.de` (лучше) или **URL-префикс** `https://savoberlin.de`
3. Подтвердить владение:
   - **DNS TXT** у регистратора домена (для «Домен»), или
   - **HTML-тег**: скопировать код → создать `.env.local`:
     ```bash
     NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ваш_код_из_gsc
     ```
     → `pnpm build` и задеплоить заново
4. **Sitemaps** → добавить `https://savoberlin.de/sitemap.xml`
5. **Проверка URL** → вставить `https://savoberlin.de/` → «Запросить индексирование»

Проверка после деплоя: открыть `https://savoberlin.de/robots.txt` и `https://savoberlin.de/sitemap.xml`.

### 2. Google Business Profile (сильнее всего для «Entrümpelung Berlin»)

Карточка в Google Maps / локальная выдача часто важнее, чем только сайт:

1. [business.google.com](https://business.google.com) → создать профиль **Igor Voytok SAVO**
2. Адрес, телефон, часы **24/7**, категории: Entrümpelung, Umzugsunternehmen, Haushaltsauflösung
3. Сайт: `https://savoberlin.de`
4. Фото работ (до/после), реальные отзывы клиентов

### 3. Что реально влияет на топ выдачи (кроме кода)

| Фактор | Действие |
| --- | --- |
| Отзывы Google | просить клиентов после заказа |
| Локальные запросы | «Entrümpelung Berlin Marzahn», «Haushaltsauflösung Potsdam» — покрыты текстом на сайте |
| Конкуренция | по «Entrümpelung Berlin» топ занят агрегаторами; realistic — район + long-tail |
| Ссылки | каталоги (Gelbe Seiten, Das Örtliche), локальные форумы |
| Контент | позже — отдельные landing-страницы по услугам/районам (сейчас одностраничник) |

**Честно:** техническое SEO на сайте — необходимый минимум. Топ-3 по конкурентным запросам без отзывов, карточки Google и времени — маловероятен. Для старта цель: индексация за 1–2 недели, первые показы по бренду «SAVO Berlin» и длинным запросам.

## Как работает форма

Бэкенда нет, поэтому заявка собирается в текст и открывается в WhatsApp с уже заполненным сообщением; рядом стоит ссылка на e-mail для тех, у кого WhatsApp не установлен. Никакие данные на сервер не отправляются и не сохраняются — это же описано в `Datenschutz`. Если понадобится обычная отправка на почту, проще всего подключить внешний сервис форм (Formspree, Web3Forms) или добавить одну serverless-функцию.

## Макеты

В `mockups/` лежат три прототипа дизайна, которые показывались заказчику: выбранный вариант A «Midnight Gold», вариант B «Bento & Preisrechner» (из него взят калькулятор) и вариант C «Industrial». Это самостоятельные HTML-файлы, боевой сайт от них не зависит — они сохранены как история решений и как источник идей для будущих доработок. Там же инструменты подбора фотографий (поиск по Unsplash, контактные листы) и скриншоты вариантов.

```bash
cd mockups && python3 -m http.server 4321   # http://localhost:4321
```
