import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSession, safePasswordMatch } from "@/lib/admin-auth";


export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!expected || !secret) {
    return NextResponse.json({ error: "Admin access is not configured yet. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the deployment environment." }, { status: 503 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const password = body && typeof body === "object" && "password" in body ? body.password : undefined;
  if (!safePasswordMatch(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const session = createAdminSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
