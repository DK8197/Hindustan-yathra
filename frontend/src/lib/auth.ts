import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import type { JwtPayload } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';
const JWT_EXPIRES_IN = '30d';
export const AUTH_COOKIE = 'hy_session';

export function signSession(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifySession(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/** Cookie options used when setting the session cookie after OTP verification. */
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

/** Route guard for admin-only API routes. Returns a NextResponse to short-circuit, or null if authorized. */
export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const session = token ? verifySession(token) : null;

  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/**
 * OTP generation/verification is stubbed here for the scaffold.
 * In production, swap sendOtp() for an SMS provider (MSG91 / Twilio / etc.)
 * and store OTP hashes (with expiry) in Redis or the DB — never in a JWT
 * and never in plaintext.
 */
export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
