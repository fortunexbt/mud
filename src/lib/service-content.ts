import type { ClassTrack } from "@/content/site/types";
import { getDictionary } from "@/content/site";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface ManagedServiceTrack {
  id: number | null;
  locale: Locale;
  serviceKey: ClassTrack["key"];
  title: string;
  summary: string;
  details: string;
  badge: string;
  cta: string;
  sortOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedServiceTrack {
  return {
    id: Number(row.id),
    locale: row.locale as Locale,
    serviceKey: row.service_key as ClassTrack["key"],
    title: String(row.title),
    summary: String(row.summary),
    details: String(row.details),
    badge: String(row.badge),
    cta: String(row.cta),
    sortOrder: Number(row.sort_order),
    isActive: Boolean(row.is_active),
    isDefault: false,
  };
}

function getDefaultTracks(locale: Locale) {
  return getDictionary(locale).classes.tracks;
}

async function seedDefaultTracks(locale: Locale) {
  const defaults = getDefaultTracks(locale);

  await Promise.all(
    defaults.map((track, index) =>
      dbQuery(
        `
          INSERT INTO cms_service_tracks (
            locale,
            service_key,
            title,
            summary,
            details,
            badge,
            cta,
            sort_order,
            is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE)
          ON CONFLICT (locale, service_key) DO NOTHING
        `,
        [locale, track.key, track.title, track.summary, track.details, track.badge, track.cta, index],
      ),
    ),
  );
}

export async function getManagedServiceTracks(locale: Locale): Promise<ClassTrack[]> {
  const defaults = getDefaultTracks(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultTracks(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_service_tracks
        WHERE locale = $1 AND is_active = TRUE
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    if (!result.rows.length) {
      return defaults;
    }

    return result.rows.map((row) => {
      const record = mapRow(row);
      return {
        key: record.serviceKey,
        title: record.title,
        summary: record.summary,
        details: record.details,
        badge: record.badge,
        cta: record.cta,
      } satisfies ClassTrack;
    });
  } catch {
    return defaults;
  }
}

export async function getServiceTrackEditorRows(locale: Locale) {
  const defaults = getDefaultTracks(locale);

  if (!hasDatabaseUrl()) {
    return defaults.map((track, index) => ({
      id: null,
      locale,
      serviceKey: track.key,
      title: track.title,
      summary: track.summary,
      details: track.details,
      badge: track.badge,
      cta: track.cta,
      sortOrder: index,
      isActive: true,
      isDefault: true,
    } satisfies ManagedServiceTrack));
  }

  try {
    await seedDefaultTracks(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_service_tracks
        WHERE locale = $1
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.serviceKey, row]));

    return defaults.map((track, index) => {
      const match = rowMap.get(track.key);
      if (match) {
        return match;
      }

      return {
        id: null,
        locale,
        serviceKey: track.key,
        title: track.title,
        summary: track.summary,
        details: track.details,
        badge: track.badge,
        cta: track.cta,
        sortOrder: index,
        isActive: true,
        isDefault: true,
      } satisfies ManagedServiceTrack;
    });
  } catch {
    return defaults.map((track, index) => ({
      id: null,
      locale,
      serviceKey: track.key,
      title: track.title,
      summary: track.summary,
      details: track.details,
      badge: track.badge,
      cta: track.cta,
      sortOrder: index,
      isActive: true,
      isDefault: true,
    } satisfies ManagedServiceTrack));
  }
}

export async function saveManagedServiceTrack(input: {
  locale: Locale;
  serviceKey: ClassTrack["key"];
  title: string;
  summary: string;
  details: string;
  badge: string;
  cta: string;
  sortOrder: number;
  isActive: boolean;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_service_tracks (
        locale,
        service_key,
        title,
        summary,
        details,
        badge,
        cta,
        sort_order,
        is_active,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      ON CONFLICT (locale, service_key) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        details = EXCLUDED.details,
        badge = EXCLUDED.badge,
        cta = EXCLUDED.cta,
        sort_order = EXCLUDED.sort_order,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `,
    [
      input.locale,
      input.serviceKey,
      input.title.trim(),
      input.summary.trim(),
      input.details.trim(),
      input.badge.trim(),
      input.cta.trim(),
      input.sortOrder,
      input.isActive,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedServiceTrack(locale: Locale, serviceKey: ClassTrack["key"]) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_service_tracks WHERE locale = $1 AND service_key = $2`,
    [locale, serviceKey],
  );
}
