# RSVP API Reference

The production API is a PHP endpoint intended for shared hosting.

## POST `/api/rsvp.php`

Creates one RSVP submission in MySQL.

### Request body

```json
{
  "name": "Гость",
  "attendance": "ATTENDING",
  "withPartner": "yes",
  "partnerName": "Пара",
  "withKids": "no",
  "children": [],
  "hasCar": "yes",
  "hasFreeSeats": "yes",
  "freeSeats": "2",
  "comment": "Комментарий",
  "message": "Сообщение"
}
```

### Success response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "guest_name": "Гость",
    "attendance": "ATTENDING"
  }
}
```

### Error response

```json
{
  "success": false,
  "error": "Name is required",
  "code": "VALIDATION_ERROR"
}
```

Common codes: `VALIDATION_ERROR`, `DUPLICATE_RSVP`, `DATABASE_ERROR`, `INTERNAL_SERVER_ERROR`.
