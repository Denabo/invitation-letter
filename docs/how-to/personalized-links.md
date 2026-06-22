# Personalized Links

Personalized links pre-fill the guest name in the RSVP form. The single-invitation site does not use a wedding UID anymore.

## Format

```text
https://yourdomain.ru/?guest=<base64-encoded-name>
```

When the site opens, `src/main.jsx` decodes `guest`, stores the guest name in localStorage, and cleans the URL.

## Generate Links

Edit the guest list in `generate-links-example.js`, then run:

```bash
bun run generate-links
```

Example output:

```text
https://yourdomain.ru/?guest=0JjQstCw0L0=
```

Guests can still edit their name in the questionnaire before submitting.
