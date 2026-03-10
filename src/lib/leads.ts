import { randomUUID } from "node:crypto";

import { dbQuery } from "@/lib/db";
import type { LeadInput } from "@/lib/forms";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "spam";
export type WebhookStatus = "not_configured" | "pending" | "delivered" | "failed";

export interface LeadRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  formType: LeadInput["formType"];
  locale: LeadInput["locale"];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  interest: LeadInput["interest"] | null;
  preferredLanguage: LeadInput["preferredLanguage"] | null;
  availability: string | null;
  foundUs: string | null;
  childAge: string | null;
  consent: boolean;
  pagePath: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  source: string;
  status: LeadStatus;
  webhookStatus: WebhookStatus;
  webhookLastError: string | null;
  webhookDeliveredAt: string | null;
}

export interface LeadNoteRecord {
  id: number;
  leadId: string;
  body: string;
  authorLabel: string;
  createdAt: string;
}

function mapLead(row: Record<string, unknown>): LeadRecord {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    formType: row.form_type as LeadInput["formType"],
    locale: row.locale as LeadInput["locale"],
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    message: String(row.message),
    interest: (row.interest as LeadInput["interest"] | null) ?? null,
    preferredLanguage: (row.preferred_language as LeadInput["preferredLanguage"] | null) ?? null,
    availability: (row.availability as string | null) ?? null,
    foundUs: (row.found_us as string | null) ?? null,
    childAge: (row.child_age as string | null) ?? null,
    consent: Boolean(row.consent),
    pagePath: (row.page_path as string | null) ?? null,
    referrer: (row.referrer as string | null) ?? null,
    utmSource: (row.utm_source as string | null) ?? null,
    utmMedium: (row.utm_medium as string | null) ?? null,
    utmCampaign: (row.utm_campaign as string | null) ?? null,
    utmTerm: (row.utm_term as string | null) ?? null,
    utmContent: (row.utm_content as string | null) ?? null,
    source: String(row.source),
    status: row.status as LeadStatus,
    webhookStatus: row.webhook_status as WebhookStatus,
    webhookLastError: (row.webhook_last_error as string | null) ?? null,
    webhookDeliveredAt: (row.webhook_delivered_at as string | null) ?? null,
  };
}

function mapLeadNote(row: Record<string, unknown>): LeadNoteRecord {
  return {
    id: Number(row.id),
    leadId: String(row.lead_id),
    body: String(row.body),
    authorLabel: String(row.author_label),
    createdAt: String(row.created_at),
  };
}

export async function createLead(input: LeadInput, source = "website") {
  const id = randomUUID();
  const result = await dbQuery(
    `
      INSERT INTO leads (
        id,
        form_type,
        locale,
        first_name,
        last_name,
        email,
        phone,
        message,
        interest,
        preferred_language,
        availability,
        found_us,
        child_age,
        consent,
        page_path,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        source,
        webhook_status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19,
        $20, $21, $22, $23
      )
      RETURNING *
    `,
    [
      id,
      input.formType,
      input.locale,
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      input.message,
      input.interest || null,
      input.preferredLanguage || null,
      input.availability || null,
      input.foundUs || null,
      input.childAge || null,
      input.consent,
      input.pagePath || null,
      input.referrer || null,
      input.utmSource || null,
      input.utmMedium || null,
      input.utmCampaign || null,
      input.utmTerm || null,
      input.utmContent || null,
      source,
      "not_configured",
    ],
  );

  return mapLead(result.rows[0]);
}

export async function markLeadWebhookStatus(input: {
  id: string;
  status: WebhookStatus;
  error?: string | null;
}) {
  const deliveredAt = input.status === "delivered" ? new Date().toISOString() : null;

  await dbQuery(
    `
      UPDATE leads
      SET updated_at = NOW(),
          webhook_status = $2,
          webhook_last_error = $3,
          webhook_delivered_at = $4
      WHERE id = $1
    `,
    [input.id, input.status, input.error || null, deliveredAt],
  );
}

export async function listLeads(options?: { status?: LeadStatus | "all"; search?: string }) {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (options?.status && options.status !== "all") {
    values.push(options.status);
    conditions.push(`status = $${values.length}`);
  }

  if (options?.search?.trim()) {
    values.push(`%${options.search.trim()}%`);
    conditions.push(`(
      first_name ILIKE $${values.length}
      OR last_name ILIKE $${values.length}
      OR email ILIKE $${values.length}
      OR phone ILIKE $${values.length}
      OR message ILIKE $${values.length}
    )`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await dbQuery(
    `
      SELECT *
      FROM leads
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT 250
    `,
    values,
  );

  return result.rows.map((row) => mapLead(row));
}

export async function getLeadById(id: string) {
  const leadResult = await dbQuery(`SELECT * FROM leads WHERE id = $1 LIMIT 1`, [id]);
  if (!leadResult.rows.length) {
    return null;
  }

  const notesResult = await dbQuery(
    `SELECT * FROM lead_notes WHERE lead_id = $1 ORDER BY created_at DESC`,
    [id],
  );

  return {
    lead: mapLead(leadResult.rows[0]),
    notes: notesResult.rows.map((row) => mapLeadNote(row)),
  };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const result = await dbQuery(
    `
      UPDATE leads
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id, status],
  );

  if (!result.rows.length) {
    return null;
  }

  return mapLead(result.rows[0]);
}

export async function addLeadNote(input: { leadId: string; body: string; authorLabel?: string }) {
  const result = await dbQuery(
    `
      INSERT INTO lead_notes (lead_id, body, author_label)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [input.leadId, input.body.trim(), input.authorLabel || "director"],
  );

  await dbQuery(`UPDATE leads SET updated_at = NOW() WHERE id = $1`, [input.leadId]);

  return mapLeadNote(result.rows[0]);
}

export async function getLeadStats() {
  const result = await dbQuery<{
    status: LeadStatus;
    count: string;
  }>(`
    SELECT status, COUNT(*)::text AS count
    FROM leads
    GROUP BY status
  `);

  const counts = {
    all: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
    spam: 0,
  } satisfies Record<LeadStatus | "all", number>;

  for (const row of result.rows) {
    counts[row.status] = Number(row.count);
    counts.all += Number(row.count);
  }

  return counts;
}
