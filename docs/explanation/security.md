# Security Notes

- Keep MySQL credentials only in `api/rsvp.php` on the server.
- Never place database passwords in `VITE_*` variables because those values are bundled into browser JavaScript.
- `api/rsvp.php` validates JSON size and field lengths before inserting data.
- Database writes use PDO prepared statements.
- External errors are sanitized; detailed database errors are written only to PHP error logs.
- The endpoint allows only `POST` and `OPTIONS` requests.
