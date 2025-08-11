import { config } from 'dotenv';
import path from 'path';

// Load db package .env first
config({ path: path.resolve(__dirname, '../../packages/db/.env') });

// Then load api .env (will override any duplicate keys)
config({ path: path.resolve(__dirname, '.env') });

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

// SERVER

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAE;
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
};

