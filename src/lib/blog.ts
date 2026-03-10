import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

import { dbQuery } from "@/lib/db";
import type { Locale } from "@/lib/i18n-config";
import type { MediaKey } from "@/lib/media";
import { hasDatabaseUrl } from "@/lib/server-env";

const blogRoot = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  translationKey: string;
  cover: MediaKey;
  readTime: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export type ManagedBlogPostStatus = "draft" | "published";

export interface AdminBlogPostRecord {
  id: string;
  locale: Locale;
  slug: string;
  translationKey: string;
  title: string;
  excerpt: string;
  contentMarkdown: string;
  publishedAt: string;
  category: string;
  cover: MediaKey;
  status: ManagedBlogPostStatus;
  authorLabel: string;
  createdAt: string;
  updatedAt: string;
}

interface Frontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  translationKey: string;
  cover: MediaKey;
}

async function getLocaleDirectory(locale: Locale) {
  return path.join(blogRoot, locale);
}

async function getPostFilePaths(locale: Locale) {
  const directory = await getLocaleDirectory(locale);
  const entries = await fs.readdir(directory);

  return entries.filter((entry) => entry.endsWith(".md")).map((entry) => path.join(directory, entry));
}

async function markdownToHtml(markdown: string) {
  const processed = await remark().use(gfm).use(html).process(markdown);
  return processed.toString();
}

async function parseFilePost(filePath: string) {
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const filename = path.basename(filePath, ".md");
  const frontmatter = data as Frontmatter;

  return {
    slug: filename,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    publishedAt: frontmatter.publishedAt,
    category: frontmatter.category,
    translationKey: frontmatter.translationKey,
    cover: frontmatter.cover,
    readTime: readingTime(content).text,
    contentHtml: await markdownToHtml(content),
  } satisfies BlogPost;
}

function mapManagedRow(row: Record<string, unknown>): AdminBlogPostRecord {
  return {
    id: String(row.id),
    locale: row.locale as Locale,
    slug: String(row.slug),
    translationKey: String(row.translation_key),
    title: String(row.title),
    excerpt: String(row.excerpt),
    contentMarkdown: String(row.content_markdown),
    publishedAt: String(row.published_at),
    category: String(row.category),
    cover: row.cover as MediaKey,
    status: row.status as ManagedBlogPostStatus,
    authorLabel: String(row.author_label),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

async function getManagedPublishedPosts(locale: Locale) {
  if (!hasDatabaseUrl()) {
    return [] as BlogPost[];
  }

  try {
    const result = await dbQuery(
      `
        SELECT *
        FROM cms_blog_posts
        WHERE locale = $1 AND status = 'published'
        ORDER BY published_at DESC, created_at DESC
      `,
      [locale],
    );

    return Promise.all(
      result.rows.map(async (row) => {
        const record = mapManagedRow(row);
        return {
          slug: record.slug,
          title: record.title,
          excerpt: record.excerpt,
          publishedAt: record.publishedAt,
          category: record.category,
          translationKey: record.translationKey,
          cover: record.cover,
          readTime: readingTime(record.contentMarkdown).text,
          contentHtml: await markdownToHtml(record.contentMarkdown),
        } satisfies BlogPost;
      }),
    );
  } catch {
    return [] as BlogPost[];
  }
}

async function getStaticPosts(locale: Locale) {
  const filePaths = await getPostFilePaths(locale);
  return Promise.all(filePaths.map((filePath) => parseFilePost(filePath)));
}

export const getPosts = cache(async (locale: Locale) => {
  const [staticPosts, managedPosts] = await Promise.all([
    getStaticPosts(locale),
    getManagedPublishedPosts(locale),
  ]);

  const merged = new Map<string, BlogPost>();

  for (const post of staticPosts) {
    merged.set(post.slug, post);
  }

  for (const post of managedPosts) {
    merged.set(post.slug, post);
  }

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
});

export const getPostBySlug = cache(async (locale: Locale, slug: string) => {
  const posts = await getPosts(locale);
  return posts.find((post) => post.slug === slug) || null;
});

export const getPostTranslations = cache(async (translationKey: string) => {
  const locales: Locale[] = ["pt", "es", "en"];
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getPosts(locale);
      const post = posts.find((item) => item.translationKey === translationKey);
      return post ? { locale, slug: post.slug } : null;
    }),
  );

  return entries.filter(Boolean) as Array<{ locale: Locale; slug: string }>;
});

export async function listAdminBlogPosts(options?: {
  locale?: Locale | "all";
  status?: ManagedBlogPostStatus | "all";
}) {
  if (!hasDatabaseUrl()) {
    return [] as AdminBlogPostRecord[];
  }

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (options?.locale && options.locale !== "all") {
    params.push(options.locale);
    conditions.push(`locale = $${params.length}`);
  }

  if (options?.status && options.status !== "all") {
    params.push(options.status);
    conditions.push(`status = $${params.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await dbQuery(
    `
      SELECT *
      FROM cms_blog_posts
      ${whereClause}
      ORDER BY updated_at DESC, created_at DESC
    `,
    params,
  );

  return result.rows.map((row) => mapManagedRow(row));
}

export async function getAdminBlogPostById(id: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const result = await dbQuery(`SELECT * FROM cms_blog_posts WHERE id = $1 LIMIT 1`, [id]);
  if (!result.rows.length) {
    return null;
  }

  return mapManagedRow(result.rows[0]);
}

export async function saveAdminBlogPost(input: {
  id?: string;
  locale: Locale;
  slug: string;
  translationKey: string;
  title: string;
  excerpt: string;
  contentMarkdown: string;
  publishedAt: string;
  category: string;
  cover: MediaKey;
  status: ManagedBlogPostStatus;
  authorLabel?: string;
}) {
  const id = input.id || randomUUID();

  const result = await dbQuery(
    `
      INSERT INTO cms_blog_posts (
        id,
        locale,
        slug,
        translation_key,
        title,
        excerpt,
        content_markdown,
        published_at,
        category,
        cover,
        status,
        author_label,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        locale = EXCLUDED.locale,
        slug = EXCLUDED.slug,
        translation_key = EXCLUDED.translation_key,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content_markdown = EXCLUDED.content_markdown,
        published_at = EXCLUDED.published_at,
        category = EXCLUDED.category,
        cover = EXCLUDED.cover,
        status = EXCLUDED.status,
        author_label = EXCLUDED.author_label,
        updated_at = NOW()
      RETURNING *
    `,
    [
      id,
      input.locale,
      input.slug.trim(),
      input.translationKey.trim(),
      input.title.trim(),
      input.excerpt.trim(),
      input.contentMarkdown.trim(),
      input.publishedAt,
      input.category.trim(),
      input.cover,
      input.status,
      (input.authorLabel || "MUD").trim(),
    ],
  );

  return mapManagedRow(result.rows[0]);
}

export async function deleteAdminBlogPost(id: string) {
  if (!hasDatabaseUrl()) {
    return;
  }

  await dbQuery(`DELETE FROM cms_blog_posts WHERE id = $1`, [id]);
}
