import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken, safeNext } from "@/lib/access";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const next = safeNext(form.get("next")?.toString());
  const password = process.env.SITE_PASSWORD;

  if (password && form.get("password")?.toString().trim() !== password) {
    const url = new URL("/unlock", req.url);
    url.searchParams.set("next", next);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  if (password) {
    res.cookies.set(ACCESS_COOKIE, await accessToken(password), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}
