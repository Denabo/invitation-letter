# Sakeenah

Static React/Vite wedding invitation with a single PHP/MySQL RSVP endpoint for shared hosting such as per.ru.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | React 18 + Vite 6 + Tailwind CSS |
| RSVP backend | PHP PDO endpoint in `api/rsvp.php` |
| Database | MySQL table from `api/schema.mysql.sql` |

## Development

```bash
bun install
bun run dev:client
```

## Build

```bash
bun run build
```

Upload `dist/` to the public web directory. Upload `api/rsvp.php` to `/api/rsvp.php` on the same hosting account.

## PHP/MySQL setup

1. Create a MySQL database in your hosting panel.
2. Run `api/schema.mysql.sql` in that database.
3. Put credentials into the constants at the top of `api/rsvp.php`.
4. If the endpoint is not `/api/rsvp.php`, set `VITE_RSVP_API_URL` before building.

Detailed Russian instructions: [per.ru PHP/MySQL deployment](docs/how-to/per-ru-php-mysql.md).
