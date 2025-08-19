import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentSession = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Parse session data safely
  let parsedSession = null;
  if (currentSession) {
    try {
      parsedSession = JSON.parse(currentSession);
    } catch (error) {
      console.error("Failed to parse session:", error);
      // Clear invalid session
      const response = NextResponse.next();
      response.cookies.delete("session");
      return response;
    }
  }

  // Redirect authenticated users away from auth pages
  if (parsedSession && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/create", 
    "/change-password", 
    "/settings",
    "/borrower", 
    "/withdraw", 
    "/money-transfer"
  ];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users from protected pages
  if (!parsedSession && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// More specific matcher configuration
export const config = {
  matcher: [
    // Include all pages except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
