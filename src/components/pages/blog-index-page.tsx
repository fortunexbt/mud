import { BlogCard } from "@/components/cards/blog-card";
import type { PageContext } from "@/components/pages/types";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogIndexPageProps extends PageContext {
  posts: BlogPostMeta[];
}

export function BlogIndexPage({ locale, dictionary, posts }: BlogIndexPageProps) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow={dictionary.blog.hero.eyebrow}
            title={dictionary.blog.hero.title}
            description={dictionary.blog.hero.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {featuredPost ? (
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.45rem]">{dictionary.blog.latestTitle}</h2>
              <div className="mt-8">
                <BlogCard post={featuredPost} locale={locale} readLabel={dictionary.blog.readArticle} variant="featured" />
              </div>
            </div>

            {remainingPosts.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {remainingPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} readLabel={dictionary.blog.readArticle} variant="compact" />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-base leading-8 text-muted">{dictionary.blog.empty}</p>
        )}
      </section>
    </main>
  );
}
