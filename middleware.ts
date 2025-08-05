import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentSession = request.cookies.get("session")?.value;

  if (currentSession) {
    const parsedSession = JSON.parse(currentSession);

    // Redirect authenticated users away from auth pages
    if (parsedSession && request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect unauthenticated users away from protected pages
  const protectedRoutes = [
    "/dashboard", "/create", "/change-password", "/settings",
    "/dashboard/myprojects", "/dashboard/funds", "/dashboard/transactions",
    "/borrower", "/withdraw", "/money-transfer"
  ];

  if (!currentSession && protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))) {
    const redirectTo = `/auth/login?redirect=${request.nextUrl.pathname}`; // Append redirect parameter
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

// Middleware matcher to apply to protected routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/create",
    "/dashboard",
    "/settings",
    "/change-password",
     "/dashboard/myprojects", 
     "/dashboard/funds", 
     "/dashboard/transactions",
     "/withdraw", 
     "/money-transfer",
     "/repayment/",

  ],
};
