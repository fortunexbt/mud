import { getDictionary } from "@/content/site";
import type { ExhibitionEdition } from "@/content/site/types";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";
import type { MediaKey } from "@/lib/media";
import { safeJsonParse } from "@/lib/json-utils";

export interface ManagedExhibition {
  id: string | null;
  locale: Locale;
  exhibitionKey: string;
  year: string;
  editionLabel: string;
  title: string;
  date: string;
  location: string[];
  description: string;
  posterKey: string;
  sortOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedExhibition {
  const location = safeJsonParse(row.location_json as string | null | undefined, []);
  
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    exhibitionKey: String(row.exhibition_key),
    year: String(row.year),
    editionLabel: String(row.edition_label),
    title: String(row.title),
    date: String(row.date),
    location: Array.isArray(location) ? location as string[] : [],
    description: String(row.description),
    posterKey: String(row.poster_key),
    sortOrder: Number(row.sort_order),
    isActive: Boolean(row.is_active),
    isDefault: false,
  };
}

function getDefaultExhibitions(locale: Locale): ManagedExhibition[] {
  const dict = getDictionary(locale);
  if (!dict.about.exhibitions) return [];
  
  return dict.about.exhibitions.items.map((exhibition, idx) => ({
    id: null,
    locale,
    exhibitionKey: `default-${exhibition.year}-${idx}`,
    year: exhibition.year,
    editionLabel: exhibition.editionLabel,
    title: exhibition.title,
    date: exhibition.date,
    location: exhibition.location,
    description: exhibition.description,
    posterKey: exhibition.posterKey,
    sortOrder: idx,
    isActive: true,
    isDefault: true,
  }));
}

async function seedDefaultExhibitions(locale: Locale) {
  const defaults = getDefaultExhibitions(locale);
  if (!defaults.length) return;

  await Promise.all(
    defaults.map((exhibition) =>
      dbQuery(
        `
          INSERT INTO cms_exhibitions (
            locale,
            exhibition_key,
            year,
            edition_label,
            title,
            date,
            location_json,
            description,
            poster_key,
            sort_order,
            is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE)
          ON CONFLICT (locale, exhibition_key) DO NOTHING
        `,
        [
          locale,
          exhibition.exhibitionKey,
          exhibition.year,
          exhibition.editionLabel,
          exhibition.title,
          exhibition.date,
          JSON.stringify(exhibition.location),
          exhibition.description,
          exhibition.posterKey,
          exhibition.sortOrder,
        ],
      ),
    ),
  );
}

export async function getManagedExhibitions(locale: Locale): Promise<ExhibitionEdition[]> {
  const defaults = getDefaultExhibitions(locale);

  if (!hasDatabaseUrl()) {
    return defaults.map((e) => ({
      year: e.year,
      editionLabel: e.editionLabel,
      title: e.title,
      date: e.date,
      location: e.location,
      description: e.description,
      posterKey: e.posterKey as MediaKey,
    }));
  }

  try {
    await seedDefaultExhibitions(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_exhibitions
        WHERE locale = $1 AND is_active = TRUE
        ORDER BY sort_order ASC, year DESC
      `,
      [locale],
    );

    if (!result.rows.length) {
      return defaults.map((e) => ({
        year: e.year,
        editionLabel: e.editionLabel,
        title: e.title,
        date: e.date,
        location: e.location,
        description: e.description,
        posterKey: e.posterKey as MediaKey,
      }));
    }

    return result.rows.map((row) => {
      const record = mapRow(row);
      return {
        year: record.year,
        editionLabel: record.editionLabel,
        title: record.title,
        date: record.date,
        location: record.location,
        description: record.description,
        posterKey: record.posterKey as MediaKey,
      } satisfies ExhibitionEdition;
    });
  } catch {
    return defaults.map((e) => ({
      year: e.year,
      editionLabel: e.editionLabel,
      title: e.title,
      date: e.date,
      location: e.location,
      description: e.description,
      posterKey: e.posterKey as MediaKey,
    }));
  }
}

export async function getExhibitionEditorRows(locale: Locale) {
  const defaults = getDefaultExhibitions(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultExhibitions(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_exhibitions
        WHERE locale = $1
        ORDER BY sort_order ASC, year DESC
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.exhibitionKey, row]));

    return defaults.map((defaultExhibition) => {
      const match = rowMap.get(defaultExhibition.exhibitionKey);
      if (match) {
        return match;
      }
      return defaultExhibition;
    });
  } catch {
    return defaults;
  }
}

export async function saveManagedExhibition(input: {
  locale: Locale;
  exhibitionKey: string;
  year: string;
  editionLabel: string;
  title: string;
  date: string;
  location: string[];
  description: string;
  posterKey: string;
  sortOrder: number;
  isActive: boolean;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_exhibitions (
        locale,
        exhibition_key,
        year,
        edition_label,
        title,
        date,
        location_json,
        description,
        poster_key,
        sort_order,
        is_active,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      ON CONFLICT (locale, exhibition_key) DO UPDATE SET
        year = EXCLUDED.year,
        edition_label = EXCLUDED.edition_label,
        title = EXCLUDED.title,
        date = EXCLUDED.date,
        location_json = EXCLUDED.location_json,
        description = EXCLUDED.description,
        poster_key = EXCLUDED.poster_key,
        sort_order = EXCLUDED.sort_order,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `,
    [
      input.locale,
      input.exhibitionKey,
      input.year.trim(),
      input.editionLabel.trim(),
      input.title.trim(),
      input.date.trim(),
      JSON.stringify(input.location),
      input.description.trim(),
      input.posterKey,
      input.sortOrder,
      input.isActive,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedExhibition(locale: Locale, exhibitionKey: string) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_exhibitions WHERE locale = $1 AND exhibition_key = $2`,
    [locale, exhibitionKey],
  );
}
