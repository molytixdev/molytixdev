// packages/db/src/config/config.ts
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';
import path from 'path';

const stringBoolean = z.coerce
    .string()
    .transform((val) => {
        return val === 'true';
    })
    .default('false');

const EnvSchema = z.object({
    NODE_ENV: z.string().default('development'),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DATABASE_URL: z.string(),
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean
});

export type EnvSchema = z.infer<typeof EnvSchema>;

// Try to find and load .env from monorepo root
function loadEnvironment() {
    // Common patterns for finding monorepo root
    const possibleRoots = [
        process.cwd(), // If running from root
        path.resolve(process.cwd(), '../..'), // If running from packages/db
        path.resolve(__dirname, '../../../..'), // Relative to this file (when built)
        path.resolve(__dirname, '../../..') // Relative to this file (when in src)
    ];

    for (const rootPath of possibleRoots) {
        const envPath = path.join(rootPath, '.env');
        try {
            const result = config({ path: envPath });
            if (result.parsed && Object.keys(result.parsed).length > 0) {
                console.log(`🔧 Loaded environment from: ${envPath}`);
                expand(result);
                return;
            }
        } catch (error) {
            // Continue to next path
        }
    }

    // Fallback: try to load from any .env in working directory
    console.log('⚠️  Could not find .env in expected locations, trying default...');
    const fallback = config();
    expand(fallback);
}

// Load environment variables
loadEnvironment();

let env: EnvSchema;

try {
    env = EnvSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
} catch (error) {
    if (error instanceof ZodError) {
        let message = '❌ Missing required values in .env:\n';
        error.issues.forEach((issue) => {
            message += `   - ${issue.path[0]}: ${issue.message}\n`;
        });
        console.error(message);

        const e = new Error(message);
        e.stack = '';
        throw e;
    } else {
        console.error('❌ Environment validation error:', error);
        throw error;
    }
}

export default env;
