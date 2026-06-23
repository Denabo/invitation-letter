# Getting Started

## Requirements

- Bun for frontend development
- PHP 8+ and MySQL on production hosting for RSVP submissions

## Install and run frontend

```bash
bun install
bun run dev:client
```

## Configure RSVP endpoint

By default, the built site posts to `/api/rsvp.php`. For another endpoint, create `.env`:

```env
VITE_RSVP_API_URL=https://your-domain.example/api/rsvp.php
```

## Build

```bash
bun run build
```

For shared hosting setup, see [per.ru PHP/MySQL deployment](../how-to/per-ru-php-mysql.md).
