import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "@/utils/jwt.util";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";
import { ROUTES } from "@/constants/routes";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_CONSTANTS.TOKEN_COOKIE_NAME)?.value;

  if (pathname === ROUTES.LOGIN) {
    if (token) {
      try {
        jwtUtils.verify(token);
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  try {
    jwtUtils.verify(token);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    response.cookies.delete(AUTH_CONSTANTS.TOKEN_COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
