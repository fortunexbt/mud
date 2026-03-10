import Link from "next/link";

import { BlogCard } from "@/components/cards/blog-card";
import { ClassCard } from "@/components/cards/class-card";
import { ArrowRightIcon } from "@/components/icons";
import { GallerySection } from "@/components/pages/gallery-section";
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
  const foundationCopy = {
    pt: {
      badge: "ABC da cerâmica",
      title: "8 aulas iniciais para criar base real.",
      description: "Placa, cobrinha, pinch, kurinuki e repertório material com tempo para construir autonomia.",
    },
    es: {
      badge: "ABC de la cerámica",
      title: "8 clases iniciales para construir una base real.",
      description: "Plancha, churro, pinch, kurinuki y repertorio material para avanzar con más autonomía.",
    },
    en: {
      badge: "The ceramics ABC",
      title: "8 opening classes to build a real foundation.",
      description: "Slab, coil, pinch, kurinuki, and material understanding that grows into real autonomy.",
    },
  }[locale];

  const addressLine = `${siteConfig.address.street} · ${siteConfig.address.neighborhood} · ${siteConfig.address.city} · CEP ${siteConfig.address.postalCode}`;
  const heroLocationLine = `${siteConfig.address.street} · ${siteConfig.address.neighborhood} · ${siteConfig.address.city}`;
  const editorialPoints = dictionary.about.whyPoints.slice(0, 3);
  const featuredPost = posts[0];
  const secondaryPost = posts[1];

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-outline/40">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.16),transparent_64%)]" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
                <Link
                  href={paths.classes}
                  className={buttonClasses({
                    variant: "secondary",
                    size: "lg",
                    className: "w-full justify-center sm:w-auto",
                  })}
                >
                  {dictionary.home.hero.secondaryCta}
                </Link>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted/90">{dictionary.home.hero.note}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {dictionary.home.hero.trustPoints.map((point) => (
                  <div key={point} className="rounded-[1.4rem] border border-outline/45 bg-white/74 px-4 py-3 text-sm font-medium text-ink shadow-soft">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4">
              <ArtImage
                mediaKey="heroProcess"
                className="min-h-[23rem] lg:min-h-[39rem]"
                aspect="aspect-[4/4.7]"
                priority
                filter="grayscale(0.06) sepia(0.12) saturate(0.92) contrast(1.03)"
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-outline/45 bg-background/96 p-5 shadow-soft sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
                    {foundationCopy.badge}
                  </p>
                  <p className="mt-3 font-display text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
                    {foundationCopy.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{foundationCopy.description}</p>
                </div>

                <div className="rounded-[1.75rem] border border-outline/45 bg-white/88 p-5 shadow-soft sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
                    {dictionary.home.location.eyebrow}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{heroLocationLine}</p>
                  <Link href={paths.contact} className={buttonClasses({ variant: "secondary", className: "mt-5" })}>
                    {dictionary.home.location.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:items-end">
          <SectionHeading
            eyebrow={dictionary.home.classes.eyebrow}
            title={dictionary.home.classes.title}
            description={dictionary.home.classes.intro}
          />

          <div className="rounded-[1.8rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(245,240,233,0.74))] p-5 shadow-soft sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
              {dictionary.home.experiences.eyebrow}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{dictionary.home.experiences.description}</p>
            <Link href={paths.inquiry} className={buttonClasses({ variant: "secondary", className: "mt-5 w-full justify-center" })}>
              {dictionary.common.secondaryInquiry}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
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

      <section className="border-y border-outline/40 bg-surface/42">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.home.pedagogy.eyebrow}
              title={dictionary.home.pedagogy.title}
              description={dictionary.home.pedagogy.paragraphs[0]}
            />

            <div className="space-y-4 text-base leading-8 text-muted">
              {dictionary.home.pedagogy.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {dictionary.home.pedagogy.methods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-outline/40 bg-white/82 px-4 py-2 text-sm font-medium text-ink shadow-soft"
                >
                  {method}
                </span>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-6">
              <p className="font-display text-[1.8rem] leading-tight text-ink sm:text-[2.1rem]">
                {dictionary.home.pedagogy.note}
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <ArtImage
              mediaKey="processHands"
              aspect="aspect-[16/11]"
              filter="grayscale(0.22) sepia(0.18) saturate(0.8) contrast(1.05)"
            />

            <div className="rounded-[1.95rem] border border-outline/45 bg-white/84 p-6 shadow-soft sm:p-8">
              <SectionHeading eyebrow={dictionary.home.about.eyebrow} title={dictionary.home.about.title} />

              <div className="mt-5 space-y-4 text-base leading-8 text-muted">
                {dictionary.home.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {editorialPoints.map((point) => (
                  <div key={point} className="rounded-[1.35rem] bg-surface/78 px-4 py-4 text-sm leading-6 text-muted">
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={paths.about} className={buttonClasses({ variant: "secondary" })}>
                  {dictionary.home.about.cta}
                </Link>
                <Link href={paths.team} className={buttonClasses({ variant: "ghost" })}>
                  {dictionary.home.team.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection locale={locale} />

      <section className="border-y border-outline/40 bg-surface/35">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
              <BlogCard post={featuredPost} locale={locale} readLabel={dictionary.blog.readArticle} variant="featured" />
              {secondaryPost ? <BlogCard post={secondaryPost} locale={locale} readLabel={dictionary.blog.readArticle} variant="compact" /> : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2.25rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,240,233,0.72))] p-5 shadow-soft sm:p-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:p-10">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.home.location.eyebrow}
              title={dictionary.home.location.title}
              description={dictionary.home.location.description}
            />
            <p className="text-base leading-8 text-muted">{addressLine}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={paths.contact} className={buttonClasses({ className: "w-full justify-center sm:w-auto" })}>
                {dictionary.home.location.cta}
              </Link>
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
            />

            <div className="rounded-[1.8rem] border border-outline/35 bg-white/72 p-5 shadow-soft sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
                {dictionary.home.experiences.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
                {dictionary.home.experiences.title}
              </h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {dictionary.home.experiences.items.map((item) => (
                  <li key={item} className="rounded-[1.25rem] bg-surface/76 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={paths.inquiry} className={buttonClasses({ variant: "ghost", className: "mt-5 px-0 text-sm" })}>
                <span>{dictionary.home.experiences.cta}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
