import { createHmac } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminUserById, type AdminRole } from "@/lib/admin-users";
import { getAdminPassword, getAdminSessionSecret, safeCompare } from "@/lib/server-env";

const ADMIN_COOKIE = "mud_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type AdminSessionPayload =
  | {
      exp: number;
      mode: "legacy";
    }
  | {
      exp: number;
      mode: "user";
      userId: string;
      email: string;
    };

export type AdminActor =
  | {
      mode: "legacy";
      label: string;
      role: "legacy";
    }
  | {
      mode: "user";
      id: string;
      email: string;
      fullName: string;
      role: AdminRole;
    };

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

export async function createAdminSession(input?: { userId: string; email: string } | null) {
  const cookieStore = await cookies();
  const payload = input
    ? encodePayload({
        exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
        mode: "user",
        userId: input.userId,
        email: input.email,
      })
    : encodePayload({
        exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
        mode: "legacy",
      });

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

export async function getAdminSession() {
  const cookieStore = await cookies();
  return decodePayload(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function getAdminActor() {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }

  if (session.mode === "legacy") {
    return {
      mode: "legacy",
      label: "Acesso legado compartilhado",
      role: "legacy",
    } satisfies AdminActor;
  }

  const user = await getAdminUserById(session.userId);
  if (!user || !user.isActive) {
    await clearAdminSession();
    return null;
  }

  return {
    mode: "user",
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  } satisfies AdminActor;
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminActor());
}

export async function requireAdmin() {
  const actor = await getAdminActor();
  if (!actor) {
    redirect("/admin/login");
  }

  return actor;
}

export function isValidAdminPassword(input: string) {
  return safeCompare(input, getAdminPassword());
}
