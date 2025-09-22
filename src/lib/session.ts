
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { cookieName, IS_PRODUCTION } from './constants';
import { AUTH_SECRET } from './env';

export type SessionData = {
  user?: {
    id: string;
  };
};

export async function getSession() {
  if (!AUTH_SECRET || AUTH_SECRET.length < 32) {
    // Do not leak exact reason to clients; log server-side only.
    console.error('Invalid AUTH_SECRET: must be at least 32 characters.');
    throw new Error('Server misconfiguration');
  }
  const session = await getIronSession<SessionData>(await cookies(), {
    password: AUTH_SECRET,
    cookieName: cookieName,
    cookieOptions: {
      secure: IS_PRODUCTION,
      httpOnly: true
    }
  });

  return session;
}
