import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ArtImage } from "@/components/ui/art-image";
import type { BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n-config";
import { getLocalizedPath } from "@/lib/routes";

interface BlogCardProps {
  post: BlogPostMeta;
  locale: Locale;
  readLabel: string;
  variant?: "featured" | "compact";
}

export function BlogCard({ post, locale, readLabel, variant = "featured" }: BlogCardProps) {
  const href = getLocalizedPath(locale, "blog", { slug: post.slug });
  const meta = (
    <div className="flex flex-wrap items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted/90 sm:text-xs">
      <span>{post.category}</span>
      <span className="h-1 w-1 rounded-full bg-outline" />
      <span>
        {new Date(post.publishedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
      <span className="h-1 w-1 rounded-full bg-outline" />
      <span>{post.readTime}</span>
    </div>
  );

  if (variant === "compact") {
    return (
      <article className="overflow-hidden rounded-[1.65rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(245,240,233,0.7))] p-4 shadow-soft sm:p-5">
        <ArtImage
          mediaKey={post.cover}
          aspect="aspect-[16/10]"
          className="min-h-[13rem]"
          filter="sepia(0.1) saturate(0.92) contrast(1.03)"
        />
        <div className="mt-4 space-y-3">
          {meta}
          <h3 className="font-display text-[1.45rem] leading-tight text-ink sm:text-[1.7rem]">{post.title}</h3>
          <p className="text-sm leading-7 text-muted">{post.excerpt}</p>
          <Link href={href} className="inline-flex w-fit items-center gap-2 pt-1 text-sm font-semibold text-terracotta transition hover:gap-3">
            <span>{readLabel}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-4 overflow-hidden rounded-[1.85rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,240,233,0.72))] p-4 shadow-soft lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <ArtImage
        mediaKey={post.cover}
        aspect="aspect-[16/11]"
        className="min-h-[14rem]"
        filter="sepia(0.12) saturate(0.9) contrast(1.04)"
      />
      <div className="flex flex-col gap-4 p-1 sm:p-2">
        {meta}
        <h3 className="max-w-[18ch] font-display text-[1.9rem] leading-tight text-ink sm:text-[2.2rem]">{post.title}</h3>
        <p className="max-w-[34rem] text-base leading-8 text-muted">{post.excerpt}</p>
        <Link href={href} className="inline-flex w-fit items-center gap-2 pt-1 text-sm font-semibold text-terracotta transition hover:gap-3">
          <span>{readLabel}</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
