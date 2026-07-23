import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==========================
  // Admin Authentication
  // ==========================
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token =
      request.cookies.get('access_token_cookie')?.value ||
      request.cookies.get('admin_token')?.value;
      console.log(token)

    if (!token) {
      return NextResponse.redirect(
        new URL('/admin/login', request.url)
      );
    }

    return NextResponse.next();
  }

  // ==========================
  // Public Website (Localized)
  // ==========================
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};