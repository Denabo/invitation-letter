# Architecture

Sakeenah is now a single-invitation app with a minimal client-server boundary.

## Runtime Shape

```text
Static React/Vite frontend
        |
        | POST /api/rsvp
        v
Hono/Bun backend
        |
        v
PostgreSQL rsvp_submissions
```

## Frontend

The invitation content is static and lives in `src/config/config.js`. The app can be built once with `bun run build` and deployed as static files.

## Backend

The backend only handles RSVP persistence and health checks:

- `GET /api/health`
- `POST /api/rsvp`
- `GET /api/rsvp`
- `GET /api/rsvp/stats`

Protect the read endpoints before exposing them in a public admin UI.

## Database

PostgreSQL stores one table: `rsvp_submissions`.
