# Project Structure

The project is intentionally simplified for one static wedding invitation.

```text
src/
├── config/config.js                  # Static invitation content
├── features/                         # Frontend feature sections
│   ├── invitation/                   # Hero, landing page, main content
│   ├── events/                       # Countdown and schedule
│   ├── gifts/                        # Dress code and wishes details
│   ├── location/                     # Venue/map section
│   └── wishes/                       # RSVP questionnaire UI
├── components/                       # Shared UI/layout components
├── lib/api.js                        # Frontend RSVP API client
├── lib/invitation-storage.js         # Guest-name localStorage helper
├── server/
│   ├── features/rsvp/routes.js       # /api/health, /api/rsvp, /api/rsvp/stats
│   ├── db/schema.sql.example         # One-table PostgreSQL schema
│   ├── lib/db-client.js              # DATABASE_URL/Pool helper
│   ├── schemas.js                    # Zod request validation
│   ├── index.js                      # Hono app
│   └── server.js                     # Bun/Node server entry
├── app.jsx
└── main.jsx
```

## Data Flow

```text
Static React page -> POST /api/rsvp -> PostgreSQL rsvp_submissions
```

Invitation text, schedule, map links, dress code, and gift notes are edited in `src/config/config.js`.
