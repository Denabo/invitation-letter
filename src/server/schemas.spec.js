import { describe, it, expect } from "vitest";
import { createRsvpSchema, rsvpQuerySchema } from "./schemas.js";

describe("schemas", () => {
  describe("createRsvpSchema", () => {
    it("should validate a complete RSVP submission", () => {
      const result = createRsvpSchema.safeParse({
        name: "Гость",
        attendance: "ATTENDING",
        withPartner: "yes",
        partnerName: "Пара",
        withKids: "yes",
        children: [{ name: "Ребёнок", age: "7" }],
        hasCar: "yes",
        hasFreeSeats: "yes",
        freeSeats: "2",
        message: "Буду",
      });

      expect(result.success).toBe(true);
      expect(result.data.name).toBe("Гость");
      expect(result.data.children).toHaveLength(1);
    });

    it("should require a guest name", () => {
      const result = createRsvpSchema.safeParse({ name: "" });
      expect(result.success).toBe(false);
    });

    it("should default optional fields", () => {
      const result = createRsvpSchema.safeParse({ name: "Гость" });

      expect(result.success).toBe(true);
      expect(result.data.attendance).toBe("MAYBE");
      expect(result.data.withPartner).toBe("no");
      expect(result.data.children).toEqual([]);
    });

    it("should reject invalid attendance", () => {
      const result = createRsvpSchema.safeParse({
        name: "Гость",
        attendance: "YES",
      });

      expect(result.success).toBe(false);
    });

    it("should clear dependent values when toggles are off", () => {
      const result = createRsvpSchema.safeParse({
        name: "Гость",
        withPartner: "no",
        partnerName: "Не должен сохраниться",
        withKids: "no",
        children: [{ name: "Ребёнок", age: "7" }],
        hasCar: "no",
        hasFreeSeats: "yes",
        freeSeats: "2",
      });

      expect(result.success).toBe(true);
      expect(result.data.partnerName).toBe("");
      expect(result.data.children).toEqual([]);
      expect(result.data.hasFreeSeats).toBe("no");
      expect(result.data.freeSeats).toBe("");
    });
  });

  describe("rsvpQuerySchema", () => {
    it("should default pagination", () => {
      const result = rsvpQuerySchema.safeParse({});

      expect(result.success).toBe(true);
      expect(result.data.limit).toBe(50);
      expect(result.data.offset).toBe(0);
    });

    it("should parse valid pagination", () => {
      const result = rsvpQuerySchema.safeParse({ limit: "10", offset: "20" });

      expect(result.success).toBe(true);
      expect(result.data.limit).toBe(10);
      expect(result.data.offset).toBe(20);
    });

    it("should reject too large limits", () => {
      const result = rsvpQuerySchema.safeParse({ limit: "101" });
      expect(result.success).toBe(false);
    });
  });
});
