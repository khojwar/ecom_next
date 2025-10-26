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
        const userRole = token?.role;

        if (pathname.startsWith("/api/auth") ||pathname === "/login" || pathname === "/signup") {
            return true;
        }

        if (pathname.startsWith("/admin") && userRole === "admin") {
            return true;
        }

        // /customer route accessible to both 'customer' and 'admin' roles
        if (pathname.startsWith("/customer") && (userRole === "customer" || userRole === "admin")) {
            return true;
        }

        if (pathname.startsWith("/staff") && (userRole === "staff" || userRole === "admin")) {
            return true;
        }

        // supplier route accessible to both 'supplier' and 'admin' roles
        if (pathname.startsWith("/supplier") && (userRole === "supplier" || userRole === "admin")) {
            return true;
        }

        return !!token;  // Default: allow if authenticated
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