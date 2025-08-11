import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@workspace/db/schema';
import env from '@workspace/db/config';
import { neon } from '@neondatabase/serverless';

export const client = neon(env.DATABASE_URL);

const db = drizzle(env.DATABASE_URL, {
    // client: client,
    schema,
    logger: true
});

export type db = typeof db;

export type client = typeof client;

export default db;
