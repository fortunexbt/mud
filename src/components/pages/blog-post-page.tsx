import Link from "next/link";

import { BlogCard } from "@/components/cards/blog-card";
import { ArtImage } from "@/components/ui/art-image";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";
import type { PageContext } from "@/components/pages/types";
import { getLocalizedPath } from "@/lib/routes";

interface BlogPostPageProps extends PageContext {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

export function BlogPostPage({ locale, dictionary, post, relatedPosts }: BlogPostPageProps) {
  return (
    <main id="main">
      <article>
        <section className="border-b border-outline/40">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <Link href={getLocalizedPath(locale, "blog")} className="text-sm font-semibold text-terracotta">
              {dictionary.blog.backToBlog}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-outline" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              <span className="h-1 w-1 rounded-full bg-outline" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-[2.6rem] leading-[1.02] text-ink sm:text-[3.6rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{post.excerpt}</p>
            <div className="mt-10">
              <ArtImage mediaKey={post.cover} aspect="aspect-[16/9]" className="max-h-[34rem]" filter="sepia(0.12) saturate(0.92) contrast(1.04)" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </section>
      </article>

      {relatedPosts.length ? (
        <section className="border-t border-outline/40 bg-surface/45">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-ink">{dictionary.blog.latestTitle}</h2>
            <div className="mt-8 grid gap-5">
              {relatedPosts.map((item) => (
                <BlogCard key={item.slug} post={item} locale={locale} readLabel={dictionary.blog.readArticle} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
