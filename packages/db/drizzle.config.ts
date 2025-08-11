import { defineConfig } from 'drizzle-kit';
import env from '@workspace/db/config/config';

export default defineConfig({
    schema: './src/schema/index.ts',
    out: './src/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL
    },
    verbose: true,
    strict: true
});
