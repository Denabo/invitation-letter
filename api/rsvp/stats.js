import pg from "pg";

const { Pool } = pg;
let pool;

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
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

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    const result = await getPool().query(
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

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
