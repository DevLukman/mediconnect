import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";
type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/login",
    "/signup",
    "/forgetpassword",
    "/resetpassword",
  ];

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  //denies user access to to public route if they are logged in
  if (publicRoutes.includes(pathname) && session?.user) {
    const userRole = session.user.role as UserRole;
    const roleRoutes: Record<UserRole, string> = {
      ADMIN: "/admin",
      PATIENT: "/patient",
      DOCTOR: "/doctor",
    };
    const userDashboard = roleRoutes[userRole];
    return NextResponse.redirect(
      new URL(`${userDashboard}/dashboard`, request.url)
    );
  }

  //allow user to have access to the public routes if they don't have a session
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = session.user.role as UserRole;

  if (!userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roleRoutes: Record<UserRole, string> = {
    ADMIN: "/admin",
    PATIENT: "/patient",
    DOCTOR: "/doctor",
  };

  //Role base access
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
