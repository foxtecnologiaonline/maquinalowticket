import { Pool } from 'pg';

let pool: Pool;

export function initializeDatabase() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
}

export function getDatabase() {
  if (!pool) {
    initializeDatabase();
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const db = getDatabase();
  try {
    const result = await db.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function queryOne(text: string, params?: any[]) {
  const results = await query(text, params);
  return results[0] || null;
}
