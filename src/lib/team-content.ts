import type { FeaturedProfile, TeamMember } from "@/content/site/types";
import { getDictionary } from "@/content/site";
import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface ManagedTeamMember {
  id: string | null;
  locale: Locale;
  memberKey: string;
  name: string;
  role: string;
  bio: string[];
  imageKey: string;
  sortOrder: number;
  isFeatured: boolean;
  tagline?: string;
  highlights?: string[];
  isActive: boolean;
  isDefault: boolean;
}

function mapRow(row: Record<string, unknown>): ManagedTeamMember {
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    memberKey: String(row.member_key),
    name: String(row.name),
    role: String(row.role),
    bio: JSON.parse(String(row.bio)) as string[],
    imageKey: String(row.image_key),
    sortOrder: Number(row.sort_order),
    isFeatured: Boolean(row.is_featured),
    tagline: row.tagline ? String(row.tagline) : undefined,
    highlights: row.highlights ? JSON.parse(String(row.highlights)) as string[] : undefined,
    isActive: Boolean(row.is_active),
    isDefault: false,
  };
}

function getDefaultMembers(locale: Locale) {
  const dict = getDictionary(locale);
  const members: ManagedTeamMember[] = [];

  members.push({
    id: null,
    locale,
    memberKey: "founder",
    name: dict.team.founderRole.split(" – ")[0] || "Vik Inaudi",
    role: dict.team.founderRole,
    bio: dict.team.founderBio,
    imageKey: "founderPortrait",
    sortOrder: 0,
    isFeatured: false,
    isActive: true,
    isDefault: true,
  });

  if (dict.team.featuredMember) {
    members.push({
      id: null,
      locale,
      memberKey: "featured",
      name: dict.team.featuredMember.name,
      role: dict.team.featuredMember.role,
      bio: dict.team.featuredMember.bio,
      imageKey: dict.team.featuredMember.imageKey,
      sortOrder: 1,
      isFeatured: true,
      tagline: dict.team.featuredMember.tagline,
      highlights: dict.team.featuredMember.highlights,
      isActive: true,
      isDefault: true,
    });
  }

  dict.team.members.forEach((m, idx) => {
    members.push({
      id: null,
      locale,
      memberKey: m.name.toLowerCase().replace(/\s+/g, "-"),
      name: m.name,
      role: m.role,
      bio: m.bio,
      imageKey: m.imageKey,
      sortOrder: idx + 2,
      isFeatured: false,
      isActive: true,
      isDefault: true,
    });
  });

  return members;
}

async function seedDefaultMembers(locale: Locale) {
  const defaults = getDefaultMembers(locale);

  await Promise.all(
    defaults.map((member) =>
      dbQuery(
        `
          INSERT INTO cms_team_members (
            id,
            locale,
            member_key,
            name,
            role,
            bio,
            image_key,
            sort_order,
            is_featured,
            tagline,
            highlights,
            is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, TRUE)
          ON CONFLICT (locale, member_key) DO NOTHING
        `,
        [
          `${locale}-${member.memberKey}`,
          locale,
          member.memberKey,
          member.name,
          member.role,
          JSON.stringify(member.bio),
          member.imageKey,
          member.sortOrder,
          member.isFeatured,
          member.tagline || null,
          member.highlights ? JSON.stringify(member.highlights) : null,
        ],
      ),
    ),
  );
}

export async function getManagedTeamMembers(locale: Locale): Promise<TeamMember[]> {
  const defaults = getDefaultMembers(locale).filter((m) => !m.isFeatured);

  if (!hasDatabaseUrl()) {
    return defaults.map((m) => ({
      name: m.name,
      role: m.role,
      bio: m.bio,
      imageKey: m.imageKey as TeamMember["imageKey"],
    }));
  }

  try {
    await seedDefaultMembers(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_team_members
        WHERE locale = $1 AND is_active = TRUE AND is_featured = FALSE
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    if (!result.rows.length) {
      return defaults.map((m) => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        imageKey: m.imageKey as TeamMember["imageKey"],
      }));
    }

    return result.rows.map((row) => {
      const record = mapRow(row);
      return {
        name: record.name,
        role: record.role,
        bio: record.bio,
        imageKey: record.imageKey as TeamMember["imageKey"],
      } satisfies TeamMember;
    });
  } catch {
    return defaults.map((m) => ({
      name: m.name,
      role: m.role,
      bio: m.bio,
      imageKey: m.imageKey as TeamMember["imageKey"],
    }));
  }
}

export async function getManagedFeaturedProfile(locale: Locale): Promise<FeaturedProfile | undefined> {
  if (!hasDatabaseUrl()) {
    const dict = getDictionary(locale);
    return dict.team.featuredMember;
  }

  try {
    await seedDefaultMembers(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_team_members
        WHERE locale = $1 AND is_active = TRUE AND is_featured = TRUE
        ORDER BY sort_order ASC
        LIMIT 1
      `,
      [locale],
    );

    if (!result.rows.length) {
      const dict = getDictionary(locale);
      return dict.team.featuredMember;
    }

    const record = mapRow(result.rows[0]);
    return {
      name: record.name,
      role: record.role,
      tagline: record.tagline || "",
      bio: record.bio,
      highlights: record.highlights || [],
      imageKey: record.imageKey as FeaturedProfile["imageKey"],
    };
  } catch {
    const dict = getDictionary(locale);
    return dict.team.featuredMember;
  }
}

export async function getTeamMemberEditorRows(locale: Locale) {
  const defaults = getDefaultMembers(locale);

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultMembers(locale);

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_team_members
        WHERE locale = $1
        ORDER BY sort_order ASC, created_at ASC
      `,
      [locale],
    );

    const rows = result.rows.map((row) => mapRow(row));
    const rowMap = new Map(rows.map((row) => [row.memberKey, row]));

    return defaults.map((defaultMember) => {
      const match = rowMap.get(defaultMember.memberKey);
      if (match) {
        return match;
      }
      return defaultMember;
    });
  } catch {
    return defaults;
  }
}

export async function saveManagedTeamMember(input: {
  locale: Locale;
  memberKey: string;
  name: string;
  role: string;
  bio: string[];
  imageKey: string;
  sortOrder: number;
  isFeatured: boolean;
  tagline?: string;
  highlights?: string[];
  isActive: boolean;
}) {
  const result = await dbQuery(
    `
      INSERT INTO cms_team_members (
        id,
        locale,
        member_key,
        name,
        role,
        bio,
        image_key,
        sort_order,
        is_featured,
        tagline,
        highlights,
        is_active,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
      ON CONFLICT (locale, member_key) DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        bio = EXCLUDED.bio,
        image_key = EXCLUDED.image_key,
        sort_order = EXCLUDED.sort_order,
        is_featured = EXCLUDED.is_featured,
        tagline = EXCLUDED.tagline,
        highlights = EXCLUDED.highlights,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `,
    [
      `${input.locale}-${input.memberKey}`,
      input.locale,
      input.memberKey,
      input.name.trim(),
      input.role.trim(),
      JSON.stringify(input.bio),
      input.imageKey,
      input.sortOrder,
      input.isFeatured,
      input.tagline?.trim() || null,
      input.highlights ? JSON.stringify(input.highlights) : null,
      input.isActive,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function resetManagedTeamMember(locale: Locale, memberKey: string) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(
    `DELETE FROM cms_team_members WHERE locale = $1 AND member_key = $2`,
    [locale, memberKey],
  );
}