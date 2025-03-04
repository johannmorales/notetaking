// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes (no authentication required)
  const unprotectedRoutes = ["/login", "/signup"];

  // Skip the authentication check for assets (CSS, JS, images, etc.)
  if (
    pathname.startsWith("/_next") || // Next.js internal paths
    pathname.startsWith("/static") || // Static files served from the public folder
    pathname.startsWith("/favicon.ico") // Example for favicon
  ) {
    return NextResponse.next();
  }

  // Apply authentication check only to protected routes
  if (!unprotectedRoutes.includes(pathname)) {
    const token = request.cookies.get("token"); // Get token from cookies

    if (!token) {
      // Redirect to login page if token is not found
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // Continue to the requested route
}

export const config = {
  matcher: ["/((?!login|signup).*)"], // Apply middleware to all routes except login and signup
};
