import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

import { dbQuery } from "@/lib/db";
import { hasDatabaseUrl } from "@/lib/server-env";

export type AdminRole = "director" | "editor";

export interface AdminUserRecord {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

interface AdminUserRow extends Record<string, unknown> {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

function mapAdminUser(row: AdminUserRow): AdminUserRecord {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    role: row.role,
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    lastLoginAt: row.last_login_at ? String(row.last_login_at) : null,
  };
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const derivedKey = scryptSync(password, salt, 64);
  const storedKey = Buffer.from(hash, "hex");

  if (derivedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, storedKey);
}

export async function listAdminUsers() {
  if (!hasDatabaseUrl()) {
    return [] as AdminUserRecord[];
  }

  const result = await dbQuery<AdminUserRow>(`
    SELECT *
    FROM admin_users
    ORDER BY created_at ASC
  `);

  return result.rows.map((row) => mapAdminUser(row));
}

export async function getAdminUserById(id: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const result = await dbQuery<AdminUserRow>(`SELECT * FROM admin_users WHERE id = $1 LIMIT 1`, [id]);
  if (!result.rows.length) {
    return null;
  }

  return mapAdminUser(result.rows[0]);
}

export async function countAdminUsers() {
  if (!hasDatabaseUrl()) {
    return 0;
  }

  const result = await dbQuery<{ count: string }>(`SELECT COUNT(*)::text AS count FROM admin_users`);
  return Number(result.rows[0]?.count || 0);
}

export async function authenticateAdminUser(email: string, password: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const result = await dbQuery<AdminUserRow>(`SELECT * FROM admin_users WHERE email = $1 LIMIT 1`, [normalizedEmail]);
  if (!result.rows.length) {
    return null;
  }

  const row = result.rows[0];
  if (!row.is_active || !verifyPassword(password, String(row.password_hash))) {
    return null;
  }

  await dbQuery(`UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`, [row.id]);

  return mapAdminUser(row);
}

export async function createAdminUser(input: {
  fullName: string;
  email: string;
  password: string;
  role?: AdminRole;
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordHash = hashPassword(input.password.trim());

  const result = await dbQuery<AdminUserRow>(
    `
      INSERT INTO admin_users (id, full_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [randomUUID(), input.fullName.trim(), normalizedEmail, passwordHash, input.role || "director"],
  );

  return mapAdminUser(result.rows[0]);
}

export async function updateAdminUserPassword(id: string, password: string) {
  const result = await dbQuery<AdminUserRow>(
    `
      UPDATE admin_users
      SET password_hash = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id, hashPassword(password.trim())],
  );

  if (!result.rows.length) {
    return null;
  }

  return mapAdminUser(result.rows[0]);
}

export async function setAdminUserActive(id: string, isActive: boolean) {
  const result = await dbQuery<AdminUserRow>(
    `
      UPDATE admin_users
      SET is_active = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id, isActive],
  );

  if (!result.rows.length) {
    return null;
  }

  return mapAdminUser(result.rows[0]);
}
