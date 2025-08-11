import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import env from '@workspace/db/config/config.js';

if (!env.DB_MIGRATING) {
    throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: 'drizzle' });
        console.log('Migration completed');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
};

main();
