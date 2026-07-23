import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AUTH_COOKIE, sessionCookieOptions } from '@/lib/auth';

const bodySchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  password: z.string().min(1, 'Password is required'),
});

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://127.0.0.1:5000';

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }

  const { mobile, password } = parsed.data;

  try {
    const backendRes = await fetch(`${BACKEND_API_URL}/api/v1/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: mobile, password }),
    });

    const data = await backendRes.json().catch(() => ({}));
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error ?? 'Login failed' }, { status: backendRes.status });
    }

    const res = NextResponse.json({ ok: true, user: data.user });
    if (data.access_token) {
      res.cookies.set(AUTH_COOKIE, data.access_token, {
        ...sessionCookieOptions,
        maxAge: 60 * 30,
      });
    }
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to reach backend auth service' },
      { status: 502 },
    );
  }
}
