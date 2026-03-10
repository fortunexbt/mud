import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

import type { Locale } from "@/lib/i18n-config";
import type { MediaKey } from "@/lib/media";

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

  return entries
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => path.join(directory, entry));
}

async function parsePost(filePath: string) {
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const filename = path.basename(filePath, ".md");
  const frontmatter = data as Frontmatter;

  const processed = await remark().use(gfm).use(html).process(content);

  return {
    slug: filename,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    publishedAt: frontmatter.publishedAt,
    category: frontmatter.category,
    translationKey: frontmatter.translationKey,
    cover: frontmatter.cover,
    readTime: readingTime(content).text,
    contentHtml: processed.toString(),
  } satisfies BlogPost;
}

export const getPosts = cache(async (locale: Locale) => {
  const filePaths = await getPostFilePaths(locale);
  const posts = await Promise.all(filePaths.map((filePath) => parsePost(filePath)));

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
