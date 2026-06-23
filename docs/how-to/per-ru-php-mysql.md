# Размещение на per.ru: React build + PHP/MySQL RSVP

Проект теперь не требует Bun/Hono backend на хостинге. Фронтенд собирается статикой, а RSVP-форма отправляет JSON в один PHP-файл.

## Что залить на хостинг

1. Выполните локально:

   ```bash
   bun run build
   ```

2. Загрузите содержимое папки `dist/` в публичную папку сайта на per.ru.
3. Загрузите папку `api/` рядом с файлами сайта так, чтобы файл был доступен по адресу:

   ```text
   https://ваш-домен/api/rsvp.php
   ```

## Что создать в MySQL

В панели хостинга создайте MySQL-базу и выполните SQL из файла:

```text
api/schema.mysql.sql
```

Таблица называется `rsvp_submissions` и хранит имя гостя, статус присутствия, данные о паре/детях/машине, комментарий и исходный JSON.

## Где вставить пароль, базу и пользователя

Откройте `api/rsvp.php` и замените значения в начале файла:

```php
const DB_HOST = 'localhost';
const DB_NAME = 'YOUR_DATABASE_NAME';
const DB_USER = 'YOUR_DATABASE_USER';
const DB_PASS = 'YOUR_DATABASE_PASSWORD';
```

Обычно на shared hosting `DB_HOST` остаётся `localhost`, но точное значение нужно взять в панели per.ru.

## Если API лежит по другому адресу

По умолчанию сайт отправляет форму на `/api/rsvp.php`. Если PHP-файл будет на другом домене или пути, создайте перед сборкой `.env`:

```env
VITE_RSVP_API_URL=https://ваш-домен/api/rsvp.php
```

После изменения `.env` нужно снова выполнить `bun run build` и заново загрузить `dist/`.

## Проверка после загрузки

```bash
curl -X POST https://ваш-домен/api/rsvp.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тестовый Гость","attendance":"ATTENDING","message":"Проверка"}'
```

Ожидаемый ответ:

```json
{"success":true,"data":{"id":1,"guest_name":"Тестовый Гость","attendance":"ATTENDING"}}
```
