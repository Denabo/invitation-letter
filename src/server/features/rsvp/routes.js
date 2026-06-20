/**
 * RSVP Feature - API Routes
 * Single-invitation guest questionnaire persistence.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createRsvpSchema, rsvpQuerySchema } from "../../schemas.js";
import { getDbClient } from "../../lib/db-client.js";

const rsvpRoutes = new Hono();

rsvpRoutes.get("/health", (c) =>
  c.json({ success: true, data: { status: "ok" } }),
);

rsvpRoutes.post("/rsvp", zValidator("json", createRsvpSchema), async (c) => {
  const rsvp = c.req.valid("json");

  try {
    const pool = await getDbClient(c);
    const result = await pool.query(
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

    return c.json({ success: true, data: result.rows[0] }, 201);
  } catch (error) {
    console.error("Error creating RSVP submission:", error);

    if (error.code === "23505") {
      return c.json(
        {
          success: false,
          error:
            "Вы уже отправили анкету. Один гость может отправить анкету только один раз.",
          code: "DUPLICATE_RSVP",
        },
        409,
      );
    }

    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

rsvpRoutes.get("/rsvp", zValidator("query", rsvpQuerySchema), async (c) => {
  const { limit, offset } = c.req.valid("query");

  try {
    const pool = await getDbClient(c);
    const result = await pool.query(
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
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM rsvp_submissions",
    );

    return c.json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count, 10),
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Error fetching RSVP submissions:", error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

rsvpRoutes.get("/rsvp/stats", async (c) => {
  try {
    const pool = await getDbClient(c);
    const result = await pool.query(
      `SELECT
          COUNT(*) FILTER (WHERE attendance = 'ATTENDING') as attending,
          COUNT(*) FILTER (WHERE attendance = 'NOT_ATTENDING') as not_attending,
          COUNT(*) FILTER (WHERE attendance = 'MAYBE') as maybe,
          COUNT(*) FILTER (WHERE with_partner = true) as with_partner,
          COALESCE(SUM(jsonb_array_length(children)), 0) as children_count,
          COUNT(*) FILTER (WHERE has_car = true) as cars,
          COALESCE(SUM(free_seats_count), 0) as free_seats,
          COUNT(*) as total
       FROM rsvp_submissions`,
    );

    return c.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

export default rsvpRoutes;
