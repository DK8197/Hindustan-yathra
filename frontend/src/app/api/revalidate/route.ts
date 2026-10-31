
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('X-Revalidate-Secret');

    if (
      !process.env.REVALIDATE_SECRET ||
      secret !== process.env.REVALIDATE_SECRET
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    revalidateTag('tours');

    return NextResponse.json({
      success: true,
      revalidated: true,
      tag: 'tours',
    });
  } catch (error) {
    console.error('Revalidation error:', error);

    return NextResponse.json(
      { success: false, error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
