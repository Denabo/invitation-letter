# Deployment Guide

This project is now designed as a simple single-invitation deployment:

1. Static React/Vite frontend.
2. Small Hono/Bun backend for `/api/rsvp`.
3. One PostgreSQL table for RSVP submissions.

## Environment Variables

Frontend build:

```env
VITE_API_URL=https://api.your-domain.ru
```

Backend runtime:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
PORT=3000
```

## Database

For Neon/Vercel Postgres step-by-step setup, see [RSVP database setup](vercel-neon-rsvp.md).

Run the schema once against PostgreSQL:

```bash
psql "$DATABASE_URL" -f src/server/db/schema.sql.example
```

The schema creates only `rsvp_submissions`. If an older table already exists and the API reports a missing column, run `src/server/db/migrations/001-align-rsvp-submissions.sql` instead of recreating the table.

## Frontend

Build the static site:

```bash
bun run build
```

Deploy the generated `dist/` directory to static hosting, object storage with website hosting, CDN, or an nginx server.

## Backend

Start the API server:

```bash
bun run server
```

Check readiness:

```bash
curl https://api.your-domain.ru/api/health
```

Submit a smoke-test RSVP:

```bash
curl -X POST https://api.your-domain.ru/api/rsvp \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Guest","attendance":"ATTENDING","message":"Smoke test"}'
```

## VK Cloud Shape

A straightforward VK Cloud deployment can use:

- VK Cloud PostgreSQL for the database.
- A small VM or container for the Hono/Bun backend.
- Static hosting/object storage/CDN or nginx for the `dist/` frontend.

Keep `DATABASE_URL` only on the backend. Never expose database credentials through `VITE_*` variables.
