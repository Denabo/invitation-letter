# Sakeenah: Static Wedding Invitation + RSVP API

Sakeenah is now simplified for a single wedding invitation: a static React/Vite frontend plus a small Hono/Bun API that stores guest RSVP questionnaires in PostgreSQL.

## Core Features

- Static invitation content in `src/config/config.js`
- Personalized guest links with base64-encoded guest names
- Russian RSVP questionnaire with attendance, partner, children, and transport fields
- Minimal `/api/rsvp` endpoint for form submissions
- One PostgreSQL table: `rsvp_submissions`

## Technical Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Runtime | Bun | Package management and server execution |
| Frontend | React 18 + Vite | Static invitation UI |
| Backend | Hono | Lightweight RSVP API |
| Database | PostgreSQL | RSVP storage |
| Styling | Tailwind CSS | Responsive styling |

## Quick Start

```bash
bun install
cp .env.example .env
# Edit .env with DATABASE_URL and VITE_API_URL
bun run dev
```

Create the database table:

```bash
psql "$DATABASE_URL" -f src/server/db/schema.sql.example
```

## Scripts

```bash
bun run dev              # Run client + server concurrently
bun run dev:client       # Frontend only
bun run dev:server       # Backend only
bun run build            # Build frontend to dist/
bun run server           # Run backend server
bun run generate-links   # Generate personalized guest links
bun run lint             # ESLint validation
bun run test             # Vitest tests
```

## API

See [API Reference](docs/reference/api.md).

## Deployment

See [Deployment Guide](docs/how-to/deployment.md).

## Troubleshooting

If RSVP submission fails with PostgreSQL authentication, connection, or missing-column errors, see [RSVP Database Troubleshooting](docs/how-to/troubleshooting-rsvp-database.md).
