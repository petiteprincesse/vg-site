# Выкладка сайта «Венчурные игры» (vg-dc.ru)

Next.js 15, одно приложение: сайт и API приёма заявок (`POST /api/lead`), которое пересылает заявки в Telegram. Базы данных нет.

## Что нужно на сервере

- Linux VPS с доступом по SSH.
- Node.js 20 LTS или 22 (минимум 18.18). Проверка: `node -v`.
- nginx как reverse proxy и сертификат (certbot / Let's Encrypt).
- Исходящий доступ к `api.telegram.org`. Проверка: `curl -I https://api.telegram.org`.
- Домен `vg-dc.ru` (и `www.vg-dc.ru`) направлен A-записью на сервер.

## Переменные окружения

Значения передаются отдельно, в архиве их нет. Положите их в файл `.env.local` в корне проекта **до сборки**:

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
YANDEX_VERIFICATION=        # необязательно
GOOGLE_SITE_VERIFICATION=   # необязательно
```

- `TELEGRAM_*` читаются сервером при работе. Без них форма отвечает 503, а сайт работает.
- `*_VERIFICATION` попадают в `<head>` при сборке. Если их добавить позже, пересоберите проект.

## Установка

```bash
mkdir -p /var/www/vg-site && cd /var/www/vg-site
unzip ~/vg-site.zip        # содержимое архива — в корень этой папки
nano .env.local            # переменные из раздела выше
npm ci
npm run build
```

## Запуск

Сайт запускается **одним** процессом: ограничение частоты заявок хранится в памяти, поэтому cluster-режим и несколько инстансов не используйте. Пример с pm2:

```bash
sudo npm i -g pm2
PORT=3000 pm2 start npm --name vg-site -- start
pm2 save
pm2 startup                # выполнить команду, которую он выведет
```

Приложение слушает `127.0.0.1:3000` (порт меняется через `PORT`). Проверка: `curl -I http://127.0.0.1:3000` возвращает `200`.

Если исходящий трафик идёт через прокси, запускайте с `NODE_USE_ENV_PROXY=1` и заданным `HTTPS_PROXY`, иначе заявки не дойдут до Telegram.

## nginx

```nginx
server {
    listen 80;
    server_name vg-dc.ru www.vg-dc.ru;
    return 301 https://vg-dc.ru$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.vg-dc.ru;
    # ssl_certificate ... (certbot)
    return 301 https://vg-dc.ru$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vg-dc.ru;
    # ssl_certificate ... (certbot)

    client_max_body_size 1m;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Сертификат: `sudo certbot --nginx -d vg-dc.ru -d www.vg-dc.ru`.

Заголовки `Host` и `X-Real-IP` обязательны:

- **`Host`.** API отклоняет заявки, у которых `Origin` не совпадает с хостом. Без этого заголовка форма получит 403.
- **`X-Real-IP`.** По нему работает ограничение: не больше 5 заявок с одного IP за 10 минут. Без заголовка все посетители считаются одним IP.

## Если домен другой

Канонический адрес, sitemap и Open Graph строятся от `url` в `src/content/site.ts`, сейчас там `https://vg-dc.ru`. Для другого домена поменяйте значение и пересоберите проект.

## Проверка после выкладки

1. `https://vg-dc.ru` открывается, `http://` и `www.` редиректят на него.
2. Открываются `/privacy`, `/sitemap.xml`, `/robots.txt`.
3. Отправьте тестовую заявку через форму внизу страницы. Она должна прийти в Telegram-чат для заявок.
4. Если заявка не пришла, смотрите `pm2 logs vg-site`. Сообщения с префиксом `[lead]` описывают причину: не заданы переменные, Telegram недоступен, бот не состоит в чате.

## Обновление

```bash
cd /var/www/vg-site
# заменить файлы проекта новыми, .env.local не трогать
npm ci
npm run build
pm2 restart vg-site
```

Подробнее о проекте (структура, SEO, форма заявки) — в `README.md`.
