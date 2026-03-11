import Link from "next/link";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BlogCard } from "@/components/cards/blog-card";
import { ClassCard } from "@/components/cards/class-card";
import { ArrowRightIcon } from "@/components/icons";
import dynamic from "next/dynamic";
const GallerySection = dynamic(() => import("@/components/pages/gallery-section").then((mod) => mod.GallerySection), {
  ssr: true,
  loading: () => <div className="h-96 w-full bg-surface/40 animate-pulse" />,
});
import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { BlogPostMeta } from "@/lib/blog";

interface HomePageProps extends PageContext {
  posts: BlogPostMeta[];
}

export function HomePage({ locale, dictionary, paths, whatsappHref, posts }: HomePageProps) {
  const addressLine = `${siteConfig.address.street} · ${siteConfig.address.neighborhood} · ${siteConfig.address.city} · CEP ${siteConfig.address.postalCode}`;
  const featuredPost = posts[0];
  const secondaryPost = posts[1];

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-outline/40">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.16),transparent_64%)]" />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.96fr)] lg:items-start lg:gap-12">
            <div className="relative z-10 lg:pr-6">
              <SectionHeading
                as="h1"
                eyebrow={dictionary.home.hero.eyebrow}
                title={dictionary.home.hero.title}
                description={dictionary.home.hero.description}
                className="max-w-[42rem]"
              />

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClasses({ size: "lg", className: "w-full justify-center sm:w-auto" })}
                >
                  {dictionary.home.hero.primaryCta}
                </Link>
              </div>
            </div>

            <div className="relative z-10 grid gap-4">
              <ArtImage
                mediaKey="heroProcess"
                className="min-h-[23rem] lg:min-h-[39rem]"
                aspect="aspect-[4/4.7]"
                priority
                filter="grayscale(0.06) sepia(0.12) saturate(0.92) contrast(1.03)"
                locale={locale}
              />
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <SectionHeading
            eyebrow={dictionary.home.classes.eyebrow}
            title={dictionary.home.classes.title}
            description={dictionary.home.classes.intro}
            className="mb-8"
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {dictionary.home.classes.cards.map((track) => (
              <ClassCard
                key={track.key}
                track={track}
                actionHref={`${paths.inquiry}?interest=${track.key}#form`}
                actionLabel={dictionary.common.learnMore}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="border-y border-outline/40 bg-surface/42">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-14">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.home.pedagogy.eyebrow}
              title={dictionary.home.pedagogy.title}
              description={dictionary.home.pedagogy.paragraphs[0]}
            />
          </div>

          <div className="grid gap-5">
            <ArtImage
              mediaKey="processHands"
              aspect="aspect-[16/11]"
              filter="grayscale(0.22) sepia(0.18) saturate(0.8) contrast(1.05)"
              locale={locale}
            />

            <div className="rounded-[1.95rem] border border-outline/45 bg-white/84 p-6 shadow-soft sm:p-8">
              <SectionHeading eyebrow={dictionary.home.about.eyebrow} title={dictionary.home.about.title} />

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={paths.about} className={buttonClasses({ variant: "secondary" })}>
                  {dictionary.home.about.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection locale={locale} />

      <section className="border-y border-outline/40 bg-surface/35">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              eyebrow={dictionary.home.blog.eyebrow}
              title={dictionary.home.blog.title}
              description={dictionary.home.blog.description}
            />
            <Link href={paths.blog} className={buttonClasses({ variant: "ghost", className: "w-fit px-0 text-sm lg:justify-self-end" })}>
              <span>{dictionary.home.blog.cta}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {featuredPost ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)]">
              <BlogCard post={featuredPost} locale={locale} readLabel={dictionary.blog.readArticle} variant="featured" />
              {secondaryPost ? <BlogCard post={secondaryPost} locale={locale} readLabel={dictionary.blog.readArticle} variant="compact" /> : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-[2.25rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,240,233,0.72))] p-5 shadow-soft sm:p-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:p-10">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.home.location.eyebrow}
              title={dictionary.home.location.title}
              description={dictionary.home.location.description}
            />
            <p className="text-base leading-8 text-muted">{addressLine}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={siteConfig.mapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({
                  variant: "secondary",
                  className: "w-full justify-center sm:w-auto",
                })}
              >
                {dictionary.common.openMaps}
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:mt-0">
            <ArtImage
              mediaKey="brandTag"
              aspect="aspect-[16/11]"
              filter="sepia(0.16) saturate(0.88) contrast(1.03)"
              locale={locale}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
