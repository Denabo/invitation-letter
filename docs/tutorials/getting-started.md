# Getting Started

## Prerequisites

- Bun
- PostgreSQL

## Install

```bash
bun install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/wedding?sslmode=require
PORT=3000
```

## Database

```bash
psql "$DATABASE_URL" -f src/server/db/schema.sql.example
```

## Run Locally

```bash
bun run dev
```

Open:

- Frontend: `http://localhost:5173`
- API health: `http://localhost:3000/api/health`

## Edit Invitation Content

Change wedding text, schedule, venue, and media in `src/config/config.js`.
