import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = ['tr', 'en', 'de'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = 'tr'; // default locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths and static assets
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|assets|images|videos|fonts).*)',
  ],
};
