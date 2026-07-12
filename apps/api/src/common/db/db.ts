import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, type PoolClient } from 'pg';
import { env } from '../config/env.js';
import * as schema from './schema/index.js';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

/** Default db client — operates on the public schema. */
export const db = drizzle(pool, { schema, logger: env.NODE_ENV === 'development' });

export type Database = typeof db;

export async function withTenant<T>(
  orgId: string,
  fn: (tenantDb: Database) => Promise<T>,
): Promise<T> {
  const client: PoolClient = await pool.connect();
  try {
    const schemaName = `org_${orgId.replace(/-/g, '')}`;
    await client.query(`SET search_path TO "${schemaName}", public`);
    const tenantDb = drizzle(client as unknown as Pool, {
      schema,
      logger: env.NODE_ENV === 'development',
    }) as Database;
    return await fn(tenantDb);
  } finally {
    client.release();
  }
}
