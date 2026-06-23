# Project Structure

```text
api/
├── rsvp.php              # PHP/PDO endpoint for POST /api/rsvp.php
└── schema.mysql.sql      # MySQL table for RSVP submissions
src/
├── features/             # React feature modules
├── lib/api.js            # Frontend RSVP API client
├── config/config.js      # Static invitation content
├── app.jsx
└── main.jsx
dist/                     # Created by bun run build; upload to hosting
```

Runtime flow:

```text
Static React page -> POST /api/rsvp.php -> MySQL rsvp_submissions
```
