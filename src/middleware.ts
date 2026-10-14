import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'AuthToken';

const PROTECTED_PREFIXES = ['/dashboard'];


const GUEST_ONLY = [
  '/login',
  '/register',
  '/register/academy',
  '/register/student',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE)?.value);

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  const isGuestOnly = GUEST_ONLY.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isGuestOnly && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
};