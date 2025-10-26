import { withAuth } from "next-auth/middleware";
import { pages } from "next/dist/build/templates/app-page";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/api/auth") ||pathname === "/login" || pathname === "/signup") {
            return true;
        }

        return !!token;
      },
    },
    pages: {
        signIn: "/login",       // Redirect to this page if unauthorized
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};