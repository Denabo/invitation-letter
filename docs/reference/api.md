# API Reference

The project now exposes a minimal API for one static wedding invitation. Invitation content lives in `src/config/config.js`; PostgreSQL stores only RSVP submissions.

## Health

### GET `/api/health`

Returns API readiness.

```json
{
  "success": true,
  "data": { "status": "ok" }
}
```

## RSVP

### POST `/api/rsvp`

Creates a new guest questionnaire/RSVP submission.

**Request Body:**

```json
{
  "name": "Guest Name",
  "attendance": "ATTENDING",
  "withPartner": "yes",
  "partnerName": "Partner Name",
  "withKids": "yes",
  "children": [{ "name": "Child", "age": "7" }],
  "hasCar": "yes",
  "hasFreeSeats": "yes",
  "freeSeats": "2",
  "message": "Generated questionnaire summary"
}
```

**Validation:**

| Field | Rules |
| --- | --- |
| `name` | Required, 1-100 characters |
| `attendance` | `ATTENDING`, `NOT_ATTENDING`, or `MAYBE` |
| `withPartner`, `withKids`, `hasCar`, `hasFreeSeats` | `yes` or `no` |
| `children` | Up to 10 child records |
| `comment`, `message` | Up to 500 characters |

### GET `/api/rsvp`

Returns paginated RSVP submissions. Keep this endpoint private or protect it before exposing an admin panel.

| Query | Default | Rules |
| --- | --- | --- |
| `limit` | `50` | Max `100` |
| `offset` | `0` | Must be `>= 0` |

### GET `/api/rsvp/stats`

Returns RSVP statistics.

```json
{
  "success": true,
  "data": {
    "attending": "45",
    "not_attending": "12",
    "maybe": "8",
    "with_partner": "20",
    "children_count": "9",
    "cars": "18",
    "free_seats": "11",
    "total": "65"
  }
}
```

## Error Responses

```json
{
  "success": false,
  "error": "Message",
  "code": "DUPLICATE_RSVP"
}
```

## HTTP Status Codes

| Code | Meaning |
| --- | --- |
| 200 | Success |
| 201 | Created |
| 400 | Validation Error |
| 409 | Duplicate RSVP |
| 500 | Server Error |
