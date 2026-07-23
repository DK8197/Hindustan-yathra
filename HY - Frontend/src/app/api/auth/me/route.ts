import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, verifySession } from '@/lib/auth';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://127.0.0.1:5000';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const session = verifySession(token);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const backendRes = await fetch(`${BACKEND_API_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await backendRes.json().catch(() => ({}));
    if (!backendRes.ok) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user: data.user ?? null });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
