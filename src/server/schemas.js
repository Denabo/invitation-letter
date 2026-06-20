/**
 * Zod validation schemas for API endpoints.
 */

import { z } from "zod";

const yesNoSchema = z.enum(["yes", "no"]);

export const childSchema = z.object({
  name: z
    .string()
    .max(100, "Child name must be less than 100 characters")
    .trim()
    .optional()
    .default(""),
  age: z
    .string()
    .max(20, "Child age must be less than 20 characters")
    .trim()
    .optional()
    .default(""),
});

/**
 * RSVP submission schema for the single invitation site.
 */
export const createRsvpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters")
      .trim(),
    attendance: z
      .enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"], {
        errorMap: () => ({
          message: "Attendance must be ATTENDING, NOT_ATTENDING, or MAYBE",
        }),
      })
      .default("MAYBE"),
    withPartner: yesNoSchema.default("no"),
    partnerName: z
      .string()
      .max(100, "Partner name must be less than 100 characters")
      .trim()
      .optional()
      .default(""),
    withKids: yesNoSchema.default("no"),
    children: z
      .array(childSchema)
      .max(10, "No more than 10 children can be submitted")
      .optional()
      .default([]),
    hasCar: yesNoSchema.default("no"),
    hasFreeSeats: yesNoSchema.default("no"),
    freeSeats: z
      .union([z.string(), z.number()])
      .optional()
      .default("")
      .transform((value) => String(value).trim())
      .pipe(z.string().max(2, "Free seats must be less than 100")),
    comment: z
      .string()
      .max(500, "Comment must be less than 500 characters")
      .trim()
      .optional()
      .default(""),
    message: z
      .string()
      .max(500, "Message must be less than 500 characters")
      .trim()
      .optional()
      .default(""),
  })
  .transform((data) => ({
    ...data,
    children: data.withKids === "yes" ? data.children : [],
    partnerName: data.withPartner === "yes" ? data.partnerName : "",
    hasFreeSeats: data.hasCar === "yes" ? data.hasFreeSeats : "no",
    freeSeats:
      data.hasCar === "yes" && data.hasFreeSeats === "yes"
        ? data.freeSeats
        : "",
  }));

export const rsvpQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .default("50")
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int("Limit must be an integer")
        .positive("Limit must be positive")
        .max(100, "Limit cannot exceed 100"),
    ),
  offset: z
    .string()
    .optional()
    .default("0")
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int("Offset must be an integer")
        .min(0, "Offset cannot be negative"),
    ),
});

/**
 * @typedef {import('zod').infer<typeof createRsvpSchema>} CreateRsvp
 * @typedef {import('zod').infer<typeof rsvpQuerySchema>} RsvpQuery
 */
