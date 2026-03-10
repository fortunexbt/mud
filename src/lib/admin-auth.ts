import { createHmac } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminPassword, getAdminSessionSecret, safeCompare } from "@/lib/server-env";

const ADMIN_COOKIE = "mud_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

interface AdminSessionPayload {
  exp: number;
}

function signPayload(value: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(value).digest("base64url");
}

function encodePayload(payload: AdminSessionPayload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signPayload(encoded)}`;
}

function decodePayload(raw: string | undefined) {
  if (!raw) return null;

  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return null;

  const expected = signPayload(encoded);
  if (!safeCompare(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const payload = encodePayload({ exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS });

  cookieStore.set(ADMIN_COOKIE, payload, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = decodePayload(cookieStore.get(ADMIN_COOKIE)?.value);
  return Boolean(session);
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

export function isValidAdminPassword(input: string) {
  return safeCompare(input, getAdminPassword());
}
