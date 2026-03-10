import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  isLocale,
  localeCookieName,
  resolveLocaleFromCountry,
  resolveLocaleFromHeader,
} from "@/lib/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && isLocale(maybeLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", maybeLocale);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set(localeCookieName, maybeLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const preferredLocale =
    (request.cookies.get(localeCookieName)?.value && isLocale(request.cookies.get(localeCookieName)!.value)
      ? request.cookies.get(localeCookieName)!.value
      : null) ||
    resolveLocaleFromCountry(request.headers.get("x-vercel-ip-country")) ||
    resolveLocaleFromHeader(request.headers.get("accept-language")) ||
    defaultLocale;

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(localeCookieName, preferredLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!admin|api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|icon-192.png|icon-512.png|favicon-16x16.png|favicon-32x32.png|.*\\..*).*)"],
};
