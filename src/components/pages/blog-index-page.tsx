import { BlogCard } from "@/components/cards/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostMeta } from "@/lib/blog";
import type { PageContext } from "@/components/pages/types";

interface BlogIndexPageProps extends PageContext {
  posts: BlogPostMeta[];
}

export function BlogIndexPage({ locale, dictionary, posts }: BlogIndexPageProps) {
  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            eyebrow={dictionary.blog.hero.eyebrow}
            title={dictionary.blog.hero.title}
            description={dictionary.blog.hero.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-ink">{dictionary.blog.latestTitle}</h2>
        <div className="mt-8 grid gap-5">
          {posts.length ? (
            posts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} readLabel={dictionary.blog.readArticle} />
            ))
          ) : (
            <p className="text-base leading-8 text-muted">{dictionary.blog.empty}</p>
          )}
        </div>
      </section>
    </main>
  );
}
