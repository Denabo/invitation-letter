import { describe, it, expect, vi } from "vitest";
import app from "../src/server/index.js";

vi.mock("../src/server/lib/db-client.js", () => {
  const mockRsvp = {
    id: 1,
    guest_name: "Guest One",
    attendance: "ATTENDING",
    with_partner: true,
    partner_name: "Partner",
    with_kids: false,
    children: [],
    has_car: true,
    has_free_seats: true,
    free_seats_count: 2,
    comment: null,
    message: "Happy wedding!",
    created_at: new Date().toISOString(),
  };

  const mockPool = {
    query: vi.fn(async (sql, params = []) => {
      if (sql.includes("INSERT INTO rsvp_submissions")) {
        return {
          rows: [
            {
              ...mockRsvp,
              id: 2,
              guest_name: params[0],
              attendance: params[1],
            },
          ],
        };
      }

      if (sql.includes("COUNT(*)") && !sql.includes("FILTER")) {
        return { rows: [{ count: "1" }] };
      }

      if (sql.includes("FILTER")) {
        return {
          rows: [
            {
              attending: "1",
              not_attending: "0",
              maybe: "0",
              with_partner: "1",
              children_count: "0",
              cars: "1",
              free_seats: "2",
              total: "1",
            },
          ],
        };
      }

      if (sql.includes("FROM rsvp_submissions")) {
        return { rows: [mockRsvp] };
      }

      return { rows: [] };
    }),
  };

  return {
    getDbClient: vi.fn().mockResolvedValue(mockPool),
  };
});

describe("E2E: RSVP API", () => {
  it("GET /api/health should return ok", async () => {
    const res = await app.request("/api/health");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.status).toBe("ok");
  });

  it("POST /api/rsvp should create an RSVP submission", async () => {
    const res = await app.request("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Guest",
        attendance: "ATTENDING",
        withPartner: "yes",
        partnerName: "Partner",
        hasCar: "yes",
        hasFreeSeats: "yes",
        freeSeats: "2",
        message: "Happy wedding!",
      }),
    });
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.guest_name).toBe("New Guest");
  });

  it("POST /api/rsvp should validate input", async () => {
    const res = await app.request("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" }),
    });

    expect(res.status).toBe(400);
  });

  it("GET /api/rsvp should return paginated submissions", async () => {
    const res = await app.request("/api/rsvp");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.pagination.total).toBe(1);
  });

  it("GET /api/rsvp/stats should return attendance statistics", async () => {
    const res = await app.request("/api/rsvp/stats");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveProperty("attending");
    expect(json.data).toHaveProperty("total");
  });
});
