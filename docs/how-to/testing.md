# Testing Guide

The simplified API is covered with Vitest unit and E2E-style tests.

## Commands

```bash
bun run test
bun run test:unit
bun run test:e2e
bun run lint
bun run build
```

## Server Route Tests

RSVP route tests live beside the route implementation:

```text
src/server/features/rsvp/routes.js
src/server/features/rsvp/routes.spec.js
```

They mock the database client and verify:

- `GET /health`
- `POST /rsvp`
- validation failures
- duplicate RSVP handling
- paginated reads
- stats reads

## E2E API Tests

`e2e/api.e2e.spec.js` imports the Hono app and exercises public `/api/*` routes with a mocked database.
