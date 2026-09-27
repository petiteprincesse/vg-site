# Венчурные игры

Лендинг проекта «Венчурные игры» — [vg-dc.ru](https://vg-dc.ru).

Next.js 15 (App Router), React 19, TypeScript, CSS Modules. Анимации — `motion`, плавный скролл — `lenis`, валидация формы — `zod`.

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить переменные
npm run dev                  # http://localhost:3000
```

| Команда             | Что делает              |
| ------------------- | ----------------------- |
| `npm run dev`       | dev-сервер              |
| `npm run build`     | production-сборка       |
| `npm start`         | запуск собранного сайта |
| `npm run lint`      | ESLint                  |
| `npm run typecheck` | проверка типов          |

## Переменные окружения

| Переменная                 | Обязательна | Описание                                       |
| -------------------------- | ----------- | ---------------------------------------------- |
| `TELEGRAM_BOT_TOKEN`       | да          | токен бота, который отправляет заявки          |
| `TELEGRAM_CHAT_ID`         | да          | id чата для заявок, бот должен состоять в чате |
| `YANDEX_VERIFICATION`      | нет         | код подтверждения из Яндекс Вебмастера         |
| `GOOGLE_SITE_VERIFICATION` | нет         | код подтверждения из Google Search Console     |

Telegram-переменные используются только на сервере, без них форма отвечает ошибкой 503. Коды верификации попадают в `<head>` при сборке — задайте их до `npm run build`.

## Структура

```
src/
├── app/          страницы, /api/lead, sitemap, robots
├── components/
│   ├── layout/   шапка, подвал, секции
│   ├── sections/ блоки лендинга
│   ├── motion/   анимации появления, печать текста, reveal фото
│   └── ui/       кнопки, поля, аккордеон, иконки
├── content/      тексты, игры, команда, партнёры, новости
├── hooks/
├── lib/          валидация заявки, отправка в Telegram, rate limit
└── styles/       токены, сетка, глобальные стили
```

Контент меняется в `src/content/*`, компоненты трогать не нужно. Фото лежат в `public/img`.

## Форма заявки

Заявка уходит на `POST /api/lead`, оттуда — сообщением в Telegram-чат. Чат общий с сайтом портфолио, заявки этого сайта помечены `#venture_games` и хэштегом роли.

Обязательные поля — имя, контакт в Telegram и «Что вы ищете сейчас», остальные по желанию. Сервер повторно проверяет данные той же схемой, что и форма. Защита от спама: скрытое поле, минимальное время заполнения, проверка Origin, не больше 5 заявок с одного IP за 10 минут.

## SEO

- `robots.txt` — закрыт `/api/`, для Яндекса `Clean-param` по UTM-меткам, ссылка на sitemap.
- `sitemap.xml` — главная страница с картинками игр и команды.
- Метаданные: title, description, canonical, Open Graph и Twitter с картинкой 1200×630 (`src/app/opengraph-image.jpg`).
- Разметка schema.org: Organization, WebSite, FAQPage.
- Иконки (знак Daily Challenge): `favicon.ico`, PNG, apple-touch-icon, манифест с иконками 192/512.
- `/privacy` закрыта от индексации.

После выкладки:

1. Добавить сайт в [Яндекс Вебмастер](https://webmaster.yandex.ru) и [Google Search Console](https://search.google.com/search-console), подтвердить через переменные выше.
2. Отправить `https://vg-dc.ru/sitemap.xml` в оба сервиса.
3. В Вебмастере указать регион сайта и проверить «Переобход страниц».

## Деплой

Сайт запускается одним процессом `next start` за nginx. Лимит заявок хранится в памяти процесса, поэтому процесс должен быть один.

nginx должен передавать адрес клиента и хост:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Редиректы и HTTPS настраиваются в nginx: `http://` и `www.` — 301 на `https://vg-dc.ru`, плюс заголовок `Strict-Transport-Security`.

```nginx
server {
    listen 80;
    server_name vg-dc.ru www.vg-dc.ru;
    return 301 https://vg-dc.ru$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.vg-dc.ru;
    return 301 https://vg-dc.ru$request_uri;
}
```

В основном `server` для `vg-dc.ru`: `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`

Если сервер выходит в интернет через прокси, запускайте с `NODE_USE_ENV_PROXY=1` и заданным `HTTPS_PROXY`, иначе запросы к api.telegram.org не пройдут. Проверить доступ: `curl -I https://api.telegram.org`.
