# Deployment

The app is deployed as static files plus one PHP/MySQL endpoint.

## Build frontend

```bash
bun run build
```

Upload the contents of `dist/` to the public directory of your hosting account.

## Upload backend

Upload `api/rsvp.php` so it is available at `/api/rsvp.php` next to the built site.

## Create database

Create a MySQL database in the hosting panel and run:

```text
api/schema.mysql.sql
```

Then put the MySQL host, database name, user, and password into the constants at the top of `api/rsvp.php`.

## Custom API URL

If the endpoint is not hosted at `/api/rsvp.php`, set this before building:

```env
VITE_RSVP_API_URL=https://your-domain.example/api/rsvp.php
```

Never put database credentials in `VITE_*` variables because they are bundled into browser JavaScript.
