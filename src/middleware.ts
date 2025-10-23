import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";
type Session = typeof auth.$Infer.Session;

const roleRoutes: Record<UserRole, string> = {
  ADMIN: "/admin",
  PATIENT: "/patient",
  DOCTOR: "/doctor",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/signup", "/forgetpassword"];
  // Check if it's a reset password route (including dynamic token routes)
  const isResetPasswordRoute =
    pathname === "/resetpassword" || pathname.startsWith("/resetpassword/");

  // Get session for all routes
  const { data: session, error } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );
  // If session fetch fails, treat as unauthenticated
  if (error && !publicRoutes.includes(pathname) && !isResetPasswordRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow reset password routes regardless of auth status
  if (isResetPasswordRoute) {
    return NextResponse.next();
  }

  // If user is logged in and trying to access public auth pages, redirect to their dashboard
  if (publicRoutes.includes(pathname) && session?.user) {
    const userRole = session.user.role as UserRole;
    const userDashboard = roleRoutes[userRole];
    return NextResponse.redirect(
      new URL(`${userDashboard}/dashboard`, request.url)
    );
  }

  // If trying to access public routes and not logged in, allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = session.user.role as UserRole;

  if (!userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role based access control
  for (const [role, basePath] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(basePath)) {
      if (userRole !== role) {
        const correctDashboard = roleRoutes[userRole];
        return NextResponse.redirect(
          new URL(`${correctDashboard}/dashboard`, request.url)
        );
      }
      return NextResponse.next();
    }
  }

  if (pathname === "/") {
    const userDashboard = roleRoutes[userRole];
    return NextResponse.redirect(
      new URL(`${userDashboard}/dashboard`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
