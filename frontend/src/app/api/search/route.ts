import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL! || "http://localhost:5000";

export async function GET(request: NextRequest) {
  const query =
    request.nextUrl.searchParams.get('q') ?? '';

  const response = await fetch(
    `${API_URL}/api/v1/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-App-Key': process.env.API_SECRET!,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}