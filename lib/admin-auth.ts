import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "assem_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createAdminSession() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const value = String(expiresAt);
  return { value: `${value}.${sign(value, secret)}`, maxAge: SESSION_TTL_SECONDS };
}

export function hasAdminSession(request: NextRequest) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const raw = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!secret || !raw) return false;
  const [expiresAt, signature, extra] = raw.split(".");
  if (!expiresAt || !signature || extra || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  const expected = sign(expiresAt, secret);
  const suppliedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export function safePasswordMatch(supplied: unknown, expected: string) {
  if (typeof supplied !== "string" || supplied.length > 512) return false;
  const left = Buffer.from(supplied);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
