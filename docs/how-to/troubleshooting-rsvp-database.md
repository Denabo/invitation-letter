# Troubleshooting RSVP Database Errors

## `password authentication failed`

This error happens before any SQL is executed. PostgreSQL rejected the credentials in the backend `DATABASE_URL`.

Check the backend `.env` file, restart `bun run server`, and verify that these pieces exactly match the hosting panel:

```env
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

For Sweb/phpPgAdmin, the database name and username are often the same account name shown in the left tree. If the password was changed in hosting, update `.env` too.

Do not put `DATABASE_URL` in a frontend `VITE_*` variable. `VITE_API_URL` is only the browser-to-API URL, for example `http://localhost:3000`.

## `Connection terminated unexpectedly`

This usually means the TCP/TLS connection to PostgreSQL was closed by the host or an incompatible SSL mode was used.

Try using an SSL-enabled connection string for hosted PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

Then restart the Bun server so the backend reads the new environment.

## `column "comment" of relation "rsvp_submissions" does not exist`

This means the API code is newer than the table currently in PostgreSQL. The current RSVP endpoint inserts `comment`, `message`, transport, partner, children, and raw payload fields, so the table must include those columns.

For a new empty database, run the full schema:

```bash
psql "$DATABASE_URL" -f src/server/db/schema.sql.example
```

For an existing `rsvp_submissions` table, run the idempotent alignment migration:

```bash
psql "$DATABASE_URL" -f src/server/db/migrations/001-align-rsvp-submissions.sql
```

If you use phpPgAdmin instead of `psql`, open SQL, paste the migration file contents, and execute it against the same database used by `DATABASE_URL`.
