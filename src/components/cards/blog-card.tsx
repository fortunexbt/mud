import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n-config";
import { getLocalizedPath } from "@/lib/routes";
import { ArtImage } from "@/components/ui/art-image";

interface BlogCardProps {
  post: BlogPostMeta;
  locale: Locale;
  readLabel: string;
}

export function BlogCard({ post, locale, readLabel }: BlogCardProps) {
  return (
    <article className="grid gap-4 overflow-hidden rounded-[1.6rem] border border-outline/50 bg-white/84 p-4 shadow-soft sm:rounded-[2rem] sm:gap-5 sm:p-5 lg:grid-cols-[1.05fr_1.1fr]">
      <ArtImage mediaKey={post.cover} aspect="aspect-[5/4] sm:aspect-[16/11]" className="min-h-[14rem]" filter="sepia(0.12) saturate(0.9) contrast(1.04)" />
      <div className="flex flex-col justify-between gap-5 p-1 sm:p-3">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted/90 sm:text-xs">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-outline" />
            <span>{new Date(post.publishedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <span className="h-1 w-1 rounded-full bg-outline" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="font-display text-[1.85rem] leading-tight text-ink sm:text-[2.4rem]">{post.title}</h3>
          <p className="text-base leading-7 text-muted">{post.excerpt}</p>
        </div>
        <Link
          href={getLocalizedPath(locale, "blog", { slug: post.slug })}
          className="inline-flex w-fit rounded-full border border-outline/60 px-4 py-2 text-sm font-semibold text-ink transition hover:border-terracotta/40 hover:bg-sand/72"
        >
          {readLabel}
        </Link>
      </div>
    </article>
  );
}
