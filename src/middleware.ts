import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken } from "@/lib/access";

export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  const open = pathname === "/unlock" || pathname === "/api/unlock";
  const unlocked = req.cookies.get(ACCESS_COOKIE)?.value === (await accessToken(password));

  if (unlocked || open) {
    const res = NextResponse.next();
    // Keep the private site out of search engines.
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
