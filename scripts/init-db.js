import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required. Set it in your shell or .env file.");
  process.exit(1);
}

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const schemaPath = path.join(rootDir, "src/server/db/schema.sql.example");
const schemaSql = await readFile(schemaPath, "utf8");
const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

try {
  await client.connect();
  await client.query(schemaSql);
  console.log("Database schema created successfully.");
} catch (error) {
  console.error("Failed to initialize database schema.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
