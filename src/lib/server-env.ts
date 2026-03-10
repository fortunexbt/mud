import { timingSafeEqual } from "node:crypto";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function hasDatabaseUrl() {
  return Boolean(getDatabaseUrl());
}

export function getAdminPassword() {
  return getRequiredEnv("ADMIN_PASSWORD");
}

export function getAdminSessionSecret() {
  return getRequiredEnv("ADMIN_SESSION_SECRET");
}

export function hasAdminConfig() {
  return Boolean(process.env.ADMIN_PASSWORD?.trim() && process.env.ADMIN_SESSION_SECRET?.trim());
}

export function safeCompare(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}
