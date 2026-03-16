import { getDictionary } from "@/content/site";
import type { SiteDictionary } from "@/content/site/types";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";
import { safeJsonParse } from "@/lib/json-utils";

export type HomeSectionKey = keyof Omit<SiteDictionary["home"], "classes">;

export interface ManagedHomeSection {
  id: string | null;
  locale: Locale;
  sectionKey: HomeSectionKey;
  contentJson: Record<string, unknown>;
  isActive: boolean;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedHomeSection {
  const content = safeJsonParse(row.content_json as string | null | undefined, {});
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    sectionKey: row.section_key as HomeSectionKey,
    contentJson: typeof content === 'object' && content !== null ? content as Record<string, unknown> : {},
    isActive: Boolean(row.is_active),
    isDefault: false,
  };
}

function getDefaultHomeSections(locale: Locale): ManagedHomeSection[] {
  const dict = getDictionary(locale);
  const homeSections = { ...dict.home };
  delete (homeSections as Record<string, unknown>).classes;

  return Object.entries(homeSections).map(([key, value]) => ({
    id: null,
    locale,
    sectionKey: key as HomeSectionKey,
    contentJson: value as unknown as Record<string, unknown>,
    isActive: true,
    isDefault: true,
  }));
}

async function seedDefaultHomeSections(locale: Locale) {
  const defaults = getDefaultHomeSections(locale);

  await Promise.all(
    defaults.map((section) =>
      dbQuery(
        `
          INSERT INTO cms_home_sections (
            locale,
            section_key,
            content_json,
            is_active
          ) VALUES ($1, $2, $3, $4)
          ON CONFLICT (locale, section_key) DO NOTHING
        `,
        [locale, section.sectionKey, JSON.stringify(section.contentJson), section.isActive],
      ),
    ),
  );
}

export async function getManagedHomeSections(locale: Locale): Promise<Record<string, Record<string, unknown>>> {
  const defaults = getDefaultHomeSections(locale);
  const resultObj: Record<string, Record<string, unknown>> = {};
  
  defaults.forEach(d => {
    resultObj[d.sectionKey] = d.contentJson;
  });

  if (!hasDatabaseUrl()) {
    return resultObj;
  }

  try {
    await seedDefaultHomeSections(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_home_sections
        WHERE locale = $1
      `,
      [locale],
    );

    result.rows.forEach((row) => {
      const record = mapRow(row);
      resultObj[record.sectionKey] = record.contentJson;
    });

    return resultObj;
  } catch {
    return resultObj;
  }
}

export async function getHomeSectionEditorRows(locale: Locale) {
  const defaults = getDefaultHomeSections(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultHomeSections(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_home_sections
        WHERE locale = $1
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.sectionKey, row]));

    return defaults.map((defaultSection) => {
      const match = rowMap.get(defaultSection.sectionKey);
      if (match) {
        return match;
      }
      return defaultSection;
    });
  } catch {
    return defaults;
  }
}

export async function saveManagedHomeSection(input: {
  locale: Locale;
  sectionKey: HomeSectionKey;
  contentJson: Record<string, unknown>;
  isActive: boolean;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_home_sections (
        locale,
        section_key,
        content_json,
        is_active,
        updated_at
      ) VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (locale, section_key) DO UPDATE SET
        content_json = EXCLUDED.content_json,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `,
    [
      input.locale,
      input.sectionKey,
      JSON.stringify(input.contentJson),
      input.isActive,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedHomeSection(locale: Locale, sectionKey: HomeSectionKey) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_home_sections WHERE locale = $1 AND section_key = $2`,
    [locale, sectionKey],
  );
}
