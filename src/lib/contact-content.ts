import { getDictionary } from "@/content/site";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface ManagedContactText {
  id: string | null;
  locale: Locale;
  sectionKey: "details" | "map" | "form";
  title: string;
  body: string;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedContactText {
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    sectionKey: row.section_key as "details" | "map" | "form",
    title: String(row.title),
    body: String(row.body),
    isDefault: false,
  };
}

function getDefaultContactTexts(locale: Locale): ManagedContactText[] {
  const dict = getDictionary(locale);
  
  return [
    {
      id: null,
      locale,
      sectionKey: "details",
      title: dict.contact.detailsTitle,
      body: dict.contact.detailsBody,
      isDefault: true,
    },
    {
      id: null,
      locale,
      sectionKey: "map",
      title: dict.contact.mapTitle,
      body: dict.contact.mapBody,
      isDefault: true,
    },
    {
      id: null,
      locale,
      sectionKey: "form",
      title: dict.contact.formTitle,
      body: dict.contact.formIntro,
      isDefault: true,
    },
  ];
}

async function seedDefaultContactTexts(locale: Locale) {
  const defaults = getDefaultContactTexts(locale);

  await Promise.all(
    defaults.map((text) =>
      dbQuery(
        `
          INSERT INTO cms_contact_texts (
            locale,
            section_key,
            title,
            body
          ) VALUES ($1, $2, $3, $4)
          ON CONFLICT (locale, section_key) DO NOTHING
        `,
        [locale, text.sectionKey, text.title, text.body],
      ),
    ),
  );
}

export async function getManagedContactTexts(locale: Locale): Promise<Record<"details" | "map" | "form", { title: string; body: string }>> {
  const defaults = getDefaultContactTexts(locale);
  const resultObj = {
    details: { title: defaults[0].title, body: defaults[0].body },
    map: { title: defaults[1].title, body: defaults[1].body },
    form: { title: defaults[2].title, body: defaults[2].body },
  };

  if (!hasDatabaseUrl()) {
    return resultObj;
  }

  try {
    await seedDefaultContactTexts(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_contact_texts
        WHERE locale = $1
      `,
      [locale],
    );

    result.rows.forEach((row) => {
      const record = mapRow(row);
      resultObj[record.sectionKey] = {
        title: record.title,
        body: record.body,
      };
    });

    return resultObj;
  } catch {
    return resultObj;
  }
}

export async function getContactTextEditorRows(locale: Locale) {
  const defaults = getDefaultContactTexts(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultContactTexts(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_contact_texts
        WHERE locale = $1
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.sectionKey, row]));

    return defaults.map((defaultText) => {
      const match = rowMap.get(defaultText.sectionKey);
      if (match) {
        return match;
      }
      return defaultText;
    });
  } catch {
    return defaults;
  }
}

export async function saveManagedContactText(input: {
  locale: Locale;
  sectionKey: "details" | "map" | "form";
  title: string;
  body: string;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_contact_texts (
        locale,
        section_key,
        title,
        body,
        updated_at
      ) VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (locale, section_key) DO UPDATE SET
        title = EXCLUDED.title,
        body = EXCLUDED.body,
        updated_at = NOW()
      RETURNING *
    `,
    [
      input.locale,
      input.sectionKey,
      input.title.trim(),
      input.body.trim(),
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedContactText(locale: Locale, sectionKey: "details" | "map" | "form") {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_contact_texts WHERE locale = $1 AND section_key = $2`,
    [locale, sectionKey],
  );
}
