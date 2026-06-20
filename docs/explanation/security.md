# Security Notes

- Keep `DATABASE_URL` only on the backend.
- Only expose `VITE_API_URL` to the browser.
- Validate all RSVP submissions on the server with Zod.
- Restrict CORS to your production frontend domain before public launch.
- Protect `GET /api/rsvp` and `GET /api/rsvp/stats` if you build an admin view.
- Do not log secrets or full database connection strings.
