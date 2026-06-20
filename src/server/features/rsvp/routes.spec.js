import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hono } from "hono";
import rsvpRoutes from "./routes.js";

vi.mock("../../lib/db-client.js", () => ({
  getDbClient: vi.fn(),
}));

import { getDbClient } from "../../lib/db-client.js";

function createMockPool(handler) {
  return {
    query: vi.fn(handler),
  };
}

function createRsvp(overrides = {}) {
  return {
    id: 1,
    guest_name: "Гость",
    attendance: "ATTENDING",
    with_partner: false,
    partner_name: null,
    with_kids: false,
    children: [],
    has_car: false,
    has_free_seats: false,
    free_seats_count: null,
    comment: null,
    message: "Анкета",
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

describe("rsvp routes", () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.route("/", rsvpRoutes);
  });

  it("GET /health should return ok", async () => {
    const res = await app.request("/health");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.status).toBe("ok");
  });

  it("POST /rsvp should create an RSVP submission", async () => {
    const mockPool = createMockPool(async (sql, params) => {
      expect(sql).toContain("INSERT INTO rsvp_submissions");
      expect(params[0]).toBe("Новый Гость");
      expect(params[1]).toBe("ATTENDING");
      return {
        rows: [createRsvp({ guest_name: params[0], attendance: params[1] })],
      };
    });
    getDbClient.mockResolvedValue(mockPool);

    const res = await app.request("/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Новый Гость",
        attendance: "ATTENDING",
        withPartner: "yes",
        partnerName: "Пара",
        withKids: "no",
        children: [],
        hasCar: "yes",
        hasFreeSeats: "yes",
        freeSeats: "2",
        message: "Приду",
      }),
    });
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.guest_name).toBe("Новый Гость");
  });

  it("POST /rsvp should validate required fields", async () => {
    const res = await app.request("/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" }),
    });

    expect(res.status).toBe(400);
  });

  it("POST /rsvp should return duplicate conflict", async () => {
    const duplicateError = new Error("duplicate key");
    duplicateError.code = "23505";
    const mockPool = createMockPool(async () => {
      throw duplicateError;
    });
    getDbClient.mockResolvedValue(mockPool);

    const res = await app.request("/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Гость", message: "Повтор" }),
    });
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.code).toBe("DUPLICATE_RSVP");
  });

  it("GET /rsvp should return paginated RSVP submissions", async () => {
    const mockPool = createMockPool(async (sql) => {
      if (sql.includes("COUNT")) return { rows: [{ count: "1" }] };
      return { rows: [createRsvp()] };
    });
    getDbClient.mockResolvedValue(mockPool);

    const res = await app.request("/rsvp?limit=10&offset=0");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.pagination.total).toBe(1);
  });

  it("GET /rsvp/stats should return RSVP stats", async () => {
    const mockPool = createMockPool(async () => ({
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
    }));
    getDbClient.mockResolvedValue(mockPool);

    const res = await app.request("/rsvp/stats");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.total).toBe("1");
  });
});
