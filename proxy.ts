import { NextRequest, NextResponse } from "next/server";

import { decrypt, SESSION_COOKIE } from "@/lib/auth/session-token";

const publicRoutes = new Set(["/login"]);

function isPublicRoute(pathname: string) {
  return publicRoutes.has(pathname);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = Boolean(session?.userId);

  if (!isPublicRoute(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
