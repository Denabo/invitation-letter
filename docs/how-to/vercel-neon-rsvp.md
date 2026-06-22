# Подключение Neon/Vercel Postgres к анкете RSVP

> Важно: если строка подключения была отправлена в чат, считайте пароль скомпрометированным. В Neon/Vercel сначала сбросьте пароль или создайте новую базу/роль, затем используйте новую `DATABASE_URL`.

## Что уже ожидает проект

Анкета отправляет данные на `POST /api/rsvp`. Сервер Hono сохраняет ответы в PostgreSQL-таблицу `rsvp_submissions` через переменную окружения `DATABASE_URL`.

## 1. Локальная настройка

Создайте `.env` из шаблона:

```bash
cp .env.example .env
```

Вставьте в `.env` только backend-переменную:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
PORT=3000
VITE_API_URL=http://localhost:3000
```

Не добавляйте `DATABASE_URL` в `VITE_*`: все `VITE_*` переменные попадают в браузер.

## 2. Создать таблицу в Neon/Vercel Postgres

Вариант через терминал:

```bash
DATABASE_URL='postgresql://USER:PASSWORD@HOST/neondb?sslmode=require' bun run db:init
```

Вариант через SQL Editor в Neon/Vercel:

1. Откройте SQL Editor для вашей базы.
2. Скопируйте содержимое `src/server/db/schema.sql.example`.
3. Выполните SQL один раз.

## 3. Проверить локально

Запустите приложение:

```bash
bun run dev
```

Проверьте API:

```bash
curl http://localhost:3000/api/health
```

Отправьте тестовую анкету:

```bash
curl -X POST http://localhost:3000/api/rsvp \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Guest","attendance":"ATTENDING","message":"Smoke test"}'
```

## 4. Переменные в Vercel

В Vercel Project Settings → Environment Variables добавьте:

| Name | Где нужна | Значение |
| --- | --- | --- |
| `DATABASE_URL` | Production, Preview, Development | pooled Neon URL с `sslmode=require` |
| `VITE_API_URL` | Production, Preview, Development | URL сайта/API, например `https://your-project.vercel.app` |

Для обычной анкеты используйте pooled URL (`...-pooler...`). `DATABASE_URL_UNPOOLED` нужен только для операций, где нельзя использовать pgbouncer, например некоторые миграции с транзакционными особенностями.

## Если видите `Unexpected token 'T'`

Ошибка вида `Unexpected token 'T', "The page c"... is not valid JSON` означает, что браузер получил HTML/текстовую страницу Vercel вместо JSON API-ответа. Обычно это происходит, когда `/api/rsvp` не задеплоился как Hono endpoint или `VITE_API_URL` указывает не на тот домен.

Проверьте:

1. `https://your-project.vercel.app/api/health` должен возвращать JSON `{"success":true,...}`.
2. В Vercel должен быть задеплоен Hono entrypoint из `src/index.js`, который экспортирует серверное приложение.
3. Если API и сайт на одном домене, `VITE_API_URL` можно не задавать. Если API отдельно — укажите полный origin без пути, например `https://api.example.com`.

## 5. После деплоя

Проверьте:

```bash
curl https://your-project.vercel.app/api/health
```

И отправьте тестовую RSVP-заявку на production URL. Если получите ошибку `relation "rsvp_submissions" does not exist`, значит таблица ещё не создана в той базе, на которую указывает production `DATABASE_URL`.
