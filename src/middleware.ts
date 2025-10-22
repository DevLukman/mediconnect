import { auth } from "@/lib/auth";
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

  const publicRoutes = [
    "/login",
    "/signup",
    "/forgetpassword",
    "/resetpassword",
  ];

  const isResetPasswordWithToken = pathname.startsWith("/resetpassword/");
  let session: Session | undefined;

  try {
    const res = await fetch("/api/auth/get-session", {
      headers: { cookie: request.headers.get("cookie") || "" },
      signal: AbortSignal.timeout(1000),
      cache: "no-store",
    });
    if (res.ok) {
      const { data } = (await res.json()) as { data: Session };
      session = data;
    }
  } catch (error) {
    session = undefined;
    console.log(error);
  }

  //denies user access to to public route if they are logged in
  if (publicRoutes.includes(pathname) && session?.user) {
    const userRole = session.user.role as UserRole;
    const userDashboard = roleRoutes[userRole];
    return NextResponse.redirect(
      new URL(`${userDashboard}/dashboard`, request.url)
    );
  }

  //allow user to have access to the public routes if they don't have a session
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  //for user that want to reset password.
  if (isResetPasswordWithToken) {
    return NextResponse.next();
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = session.user.role as UserRole;

  if (!userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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

// If you later add segments (e.g., /resetpassword/[token]), exact matching will block access. Consider startsWith for these.

// -  const publicRoutes = ["/login", "/signup", "/forgetpassword", "/resetpassword"];
// +  const publicRoutes = ["/login", "/signup", "/forgetpassword", "/resetpassword"];
// +  const isPublic = publicRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
