import pg from "pg";
import { createRsvpSchema, rsvpQuerySchema } from "../src/server/schemas.js";

const { Pool } = pg;
let pool;

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      max: 3,
    });
  }

  return pool;
}

function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  return req.body;
}

function handleError(res, error, context) {
  console.error(context, error);

  if (error.code === "23505") {
    res.status(409).json({
      success: false,
      error:
        "Вы уже отправили анкету. Один гость может отправить анкету только один раз.",
      code: "DUPLICATE_RSVP",
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
}

async function createRsvp(req, res) {
  const parsed = createRsvpSchema.safeParse(getBody(req));

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
    return;
  }

  const rsvp = parsed.data;

  try {
    const result = await getPool().query(
      `INSERT INTO rsvp_submissions (
          guest_name,
          attendance,
          with_partner,
          partner_name,
          with_kids,
          children,
          has_car,
          has_free_seats,
          free_seats_count,
          comment,
          message,
          raw_payload
       ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10, $11, $12::jsonb)
       RETURNING
          id,
          guest_name,
          attendance,
          with_partner,
          partner_name,
          with_kids,
          children,
          has_car,
          has_free_seats,
          free_seats_count,
          comment,
          message,
          created_at`,
      [
        rsvp.name,
        rsvp.attendance,
        rsvp.withPartner === "yes",
        rsvp.partnerName || null,
        rsvp.withKids === "yes",
        JSON.stringify(rsvp.children),
        rsvp.hasCar === "yes",
        rsvp.hasFreeSeats === "yes",
        rsvp.freeSeats ? Number.parseInt(rsvp.freeSeats, 10) : null,
        rsvp.comment || null,
        rsvp.message || null,
        JSON.stringify(rsvp),
      ],
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    handleError(res, error, "Error creating RSVP submission:");
  }
}

async function listRsvp(req, res) {
  const parsed = rsvpQuerySchema.safeParse(req.query || {});

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
    return;
  }

  const { limit, offset } = parsed.data;

  try {
    const result = await getPool().query(
      `SELECT
          id,
          guest_name,
          attendance,
          with_partner,
          partner_name,
          with_kids,
          children,
          has_car,
          has_free_seats,
          free_seats_count,
          comment,
          message,
          created_at
       FROM rsvp_submissions
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );
    const countResult = await getPool().query(
      "SELECT COUNT(*) FROM rsvp_submissions",
    );

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count, 10),
        limit,
        offset,
      },
    });
  } catch (error) {
    handleError(res, error, "Error fetching RSVP submissions:");
  }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "POST") {
    await createRsvp(req, res);
    return;
  }

  if (req.method === "GET") {
    await listRsvp(req, res);
    return;
  }

  res.status(405).json({ success: false, error: "Method not allowed" });
}
