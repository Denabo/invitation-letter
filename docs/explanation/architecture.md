# Architecture

```text
Browser / React static build
        |
        | POST /api/rsvp.php
        v
PHP PDO endpoint
        |
        v
MySQL rsvp_submissions
```

Invitation content is static frontend configuration. RSVP persistence is handled by `api/rsvp.php`, which validates JSON, uses prepared PDO statements, and writes to the `rsvp_submissions` MySQL table.
