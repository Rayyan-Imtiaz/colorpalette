import { NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value


  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
