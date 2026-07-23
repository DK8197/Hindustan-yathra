import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {
      accessToken,
      refreshToken,
      user,
    } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access token is required',
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set('admin_token', accessToken, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    if (refreshToken) {
      cookieStore.set(
        'admin_refresh_token',
        refreshToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }
      );
    }

    if (user) {
      cookieStore.set(
        'admin_user',
        JSON.stringify({
          id: user.id,
          phone: user.phone,
          role: user.role,
        }),
        {
          httpOnly: false,
          secure:
            process.env.NODE_ENV ===
            'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      'Session creation error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create session',
      },
      { status: 500 }
    );
  }
}