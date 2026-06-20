/**
 * Sakeenah API Server
 * Minimal REST API for a single wedding invitation RSVP form.
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { rsvpRoutes } from "./features/rsvp/index.js";

const app = new Hono();
const api = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["*"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  }),
);

api.route("/", rsvpRoutes);
app.route("/api", api);

export default app;
