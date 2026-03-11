import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_SESSION_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export function getDatabaseUrl() {
  return env.DATABASE_URL?.trim() || "";
}

export function hasDatabaseUrl() {
  return Boolean(getDatabaseUrl());
}

export function getAdminPassword() {
  return env.ADMIN_PASSWORD;
}

export function getAdminSessionSecret() {
  return env.ADMIN_SESSION_SECRET;
}

export function hasAdminConfig() {
  return Boolean(env.ADMIN_SESSION_SECRET?.trim() && (env.ADMIN_PASSWORD?.trim() || env.DATABASE_URL?.trim()));
}

export function safeCompare(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}
