import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('admin_token');
  cookieStore.delete(
    'admin_refresh_token'
  );
  cookieStore.delete('admin_user');

  return NextResponse.json({
    success: true,
  });
}