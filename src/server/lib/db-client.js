/**
 * Database connection helper
 * Supports both Cloudflare Workers (Hyperdrive) and Node.js/Bun environments
 */

/**
 * Get database client based on environment
 * @param {import('hono').Context} c - Hono context
 * @returns {Promise<import('pg').Pool>} Database pool
 */
/**
 * Database connection helper
 * Supports both Cloudflare Workers (Hyperdrive) and Node.js/Bun environments
 */
import pg from "pg";
const { Pool } = pg;

export async function getDbClient(c) {
  // Пытаемся получить строку из разных источников
  const dbUrl = process.env.DATABASE_URL || c?.env?.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is missing in .env file");
  }

  try {
    const pool = new Pool({
      connectionString: dbUrl,
      // Настройки для стабильности на Sweb:
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000, // даем 10 секунд на подключение
      idleTimeoutMillis: 30000,
    });

    return pool;
  } catch (error) {
    console.error("Database Pool Error:", error);
    throw error;
  }
}
