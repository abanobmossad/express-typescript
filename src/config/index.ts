import 'dotenv/config';

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, AUTH_SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
