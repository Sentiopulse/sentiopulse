import 'server-only';

const rawEnv = process.env.APP_ENV ?? process.env.NODE_ENV ?? 'development';
const APP_ENV: 'development' | 'production' = rawEnv === 'production' ? 'production' : 'development';

const AUTH_SECRET = process.env.AUTH_SECRET as string;

if (!AUTH_SECRET || AUTH_SECRET.length < 32) {
  throw new Error('AUTH_SECRET must be set and at least 32 characters long');
}

export { APP_ENV, AUTH_SECRET };
