import type { FaqItem } from "@/content/site/types";
import { getDictionary } from "@/content/site";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface ManagedFaq {
  id: string | null;
  locale: Locale;
  faqKey: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedFaq {
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    faqKey: String(row.faq_key),
    question: String(row.question),
    answer: String(row.answer),
    sortOrder: Number(row.sort_order),
    isActive: Boolean(row.is_active),
    isDefault: false,
  };
}

function getDefaultFaqs(locale: Locale) {
  const dict = getDictionary(locale);
  return dict.classes.faqs.map((faq, idx) => ({
    id: null,
    locale,
    faqKey: `default-${idx}`,
    question: faq.question,
    answer: faq.answer,
    sortOrder: idx,
    isActive: true,
    isDefault: true,
  }));
}

async function seedDefaultFaqs(locale: Locale) {
  const defaults = getDefaultFaqs(locale);

  await Promise.all(
    defaults.map((faq) =>
      dbQuery(
        `
          INSERT INTO cms_faqs (
            locale,
            faq_key,
            question,
            answer,
            sort_order,
            is_active
          ) VALUES ($1, $2, $3, $4, $5, TRUE)
          ON CONFLICT (locale, faq_key) DO NOTHING
        `,
        [
          locale,
          faq.faqKey,
          faq.question,
          faq.answer,
          faq.sortOrder,
        ],
      ),
    ),
  );
}

export async function getManagedFaqs(locale: Locale): Promise<FaqItem[]> {
  const defaults = getDefaultFaqs(locale);

  if (!hasDatabaseUrl()) {
    return defaults.map((f) => ({ question: f.question, answer: f.answer }));
  }

  try {
    await seedDefaultFaqs(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_faqs
        WHERE locale = $1 AND is_active = TRUE
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    if (!result.rows.length) {
      return defaults.map((f) => ({ question: f.question, answer: f.answer }));
    }

    return result.rows.map((row) => {
      const record = mapRow(row);
      return {
        question: record.question,
        answer: record.answer,
      } satisfies FaqItem;
    });
  } catch {
    return defaults.map((f) => ({ question: f.question, answer: f.answer }));
  }
}

export async function getFaqEditorRows(locale: Locale) {
  const defaults = getDefaultFaqs(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultFaqs(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_faqs
        WHERE locale = $1
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.faqKey, row]));

    return defaults.map((defaultFaq) => {
      const match = rowMap.get(defaultFaq.faqKey);
      if (match) {
        return match;
      }
      return defaultFaq;
    });
  } catch {
    return defaults;
  }
}

export async function saveManagedFaq(input: {
  locale: Locale;
  faqKey: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_faqs (
        locale,
        faq_key,
        question,
        answer,
        sort_order,
        is_active,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (locale, faq_key) DO UPDATE SET
        question = EXCLUDED.question,
        answer = EXCLUDED.answer,
        sort_order = EXCLUDED.sort_order,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `,
    [
      input.locale,
      input.faqKey,
      input.question.trim(),
      input.answer.trim(),
      input.sortOrder,
      input.isActive,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedFaq(locale: Locale, faqKey: string) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_faqs WHERE locale = $1 AND faq_key = $2`,
    [locale, faqKey],
  );
}