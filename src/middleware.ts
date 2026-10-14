import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'AuthToken';

const PROTECTED_PREFIXES = ['/dashboard'];

const GUEST_ONLY = [
  '/login',
  '/register',
  '/register/academy',
  '/register/student',
];

// Decode the JWT payload without verifying — we're only reading `exp`
// to catch obviously-expired cookies. Real signature verification happens
// on every API call against the backend.
function isExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')),
    );
    if (!payload.exp) return false;
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(AUTH_COOKIE)?.value;
  const hasValidSession = Boolean(cookie) && !isExpired(cookie!);

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected && !hasValidSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    const res = NextResponse.redirect(url);
    if (cookie) res.cookies.delete(AUTH_COOKIE);
    return res;
  }

  const isGuestOnly = GUEST_ONLY.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (isGuestOnly && hasValidSession) {
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