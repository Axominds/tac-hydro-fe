import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token');

  // Logic for /admin path
  if (pathname === '/admin') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Protection for other /admin subroutes (like /admin/dashboard)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect from login if already authenticated
  if (pathname === '/admin/login' && accessToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
