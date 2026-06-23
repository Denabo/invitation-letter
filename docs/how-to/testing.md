# Testing

The current project has frontend/unit test tooling through Vitest. The PHP endpoint can be syntax-checked locally when PHP is installed.

## JavaScript checks

```bash
bun run lint
bun run test
bun run build
```

## PHP checks

```bash
php -l api/rsvp.php
```

## Manual API smoke test

After uploading files and creating the MySQL table:

```bash
curl -X POST https://ваш-домен/api/rsvp.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тестовый Гость","attendance":"ATTENDING","message":"Проверка"}'
```
