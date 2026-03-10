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
      description: "Placa, cobrinha, pinch, kurinuki, pesquisa material e autonomia passo a passo.",
    },
    es: {
      badge: "ABC de la cerámica",
      title: "8 clases iniciales para construir una base real.",
      description: "Plancha, churro, pinch, kurinuki, investigación material y autonomía paso a paso.",
    },
    en: {
      badge: "The ceramics ABC",
      title: "8 opening classes to build a real foundation.",
      description: "Slab, coil, pinch, kurinuki, material research, and growing autonomy step by step.",
    },
  }[locale];

  const addressLine = `${siteConfig.address.street} · ${siteConfig.address.neighborhood} · ${siteConfig.address.city} · CEP ${siteConfig.address.postalCode}`;

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-outline/40">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-80" />
        <div className="pointer-events-none absolute left-[-7rem] top-0 h-64 w-64 rounded-full bg-clay/16 blur-3xl" />
        <div className="pointer-events-none absolute right-[-5rem] top-16 h-72 w-72 rounded-full bg-sage/14 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="inline-flex w-fit items-center rounded-full border border-outline/50 bg-white/76 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta/90 shadow-soft sm:text-xs">
              {dictionary.home.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.45rem] leading-[0.95] text-ink sm:text-[4.2rem] lg:text-[5.1rem]">
              {dictionary.home.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-8">
              {dictionary.home.hero.description}
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ size: "lg", className: "w-full justify-center sm:w-auto" })}>
                {dictionary.home.hero.primaryCta}
              </Link>
              <Link href={paths.classes} className={buttonClasses({ variant: "secondary", size: "lg", className: "w-full justify-center sm:w-auto" })}>
                {dictionary.home.hero.secondaryCta}
              </Link>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted/90">{dictionary.home.hero.note}</p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
              {dictionary.home.hero.trustPoints.map((point) => (
                <div key={point} className="rounded-[1.35rem] border border-outline/50 bg-white/74 px-4 py-3 text-sm font-medium text-ink shadow-soft">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <ArtImage
              mediaKey="heroProcess"
              className="min-h-[22rem] lg:min-h-[40rem]"
              aspect="aspect-[4/4.9]"
              priority
              filter="grayscale(0.12) sepia(0.18) saturate(0.82) contrast(1.04)"
            />
            <div className="grid gap-4 sm:absolute sm:bottom-6 sm:left-6 sm:right-6 sm:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.6rem] border border-outline/50 bg-background/94 p-5 shadow-soft backdrop-blur sm:rounded-[1.8rem]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">{foundationCopy.badge}</p>
                <p className="mt-2 font-display text-[1.65rem] leading-tight text-ink sm:text-2xl">{foundationCopy.title}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{foundationCopy.description}</p>
              </div>
              <div className="rounded-[1.6rem] border border-outline/50 bg-white/88 p-5 shadow-soft backdrop-blur sm:rounded-[1.8rem]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">{dictionary.home.location.eyebrow}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{addressLine}</p>
                <Link href={paths.contact} className={buttonClasses({ variant: "ghost", className: "mt-4" })}>
                  {dictionary.home.location.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dictionary.home.classes.eyebrow}
            title={dictionary.home.classes.title}
            description={dictionary.home.classes.intro}
          />
          <Link href={paths.inquiry} className={buttonClasses({ variant: "secondary", className: "sm:w-auto" })}>
            {dictionary.common.secondaryInquiry}
          </Link>
        </div>
        <div className="mt-8 grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:mt-10 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
          {dictionary.home.classes.cards.map((track) => (
            <div key={track.key} className="snap-start">
              <ClassCard
                track={track}
                actionHref={`${paths.inquiry}?interest=${track.key}#form`}
                actionLabel={dictionary.common.learnMore}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-outline/40 bg-surface/45">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <SectionHeading eyebrow={dictionary.home.pedagogy.eyebrow} title={dictionary.home.pedagogy.title} />
            <div className="space-y-5 text-base leading-8 text-muted">
              {dictionary.home.pedagogy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {dictionary.home.pedagogy.methods.map((method) => (
                <span key={method} className="rounded-full border border-outline/40 bg-white/82 px-4 py-2 text-sm font-medium text-ink shadow-soft">
                  {method}
                </span>
              ))}
            </div>
            <div className="rounded-[1.6rem] border border-outline/50 bg-white/84 p-5 shadow-soft sm:rounded-[1.9rem] sm:p-6">
              <p className="font-display text-[1.65rem] leading-tight text-ink sm:text-2xl">{dictionary.home.pedagogy.note}</p>
            </div>
          </div>

          <div className="space-y-5">
            <ArtImage
              mediaKey="processHands"
              aspect="aspect-[16/11]"
              filter="grayscale(0.24) sepia(0.18) saturate(0.78) contrast(1.05)"
            />
            <div className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-6 shadow-soft sm:rounded-[2rem] sm:p-8">
              <SectionHeading eyebrow={dictionary.home.about.eyebrow} title={dictionary.home.about.title} />
              <div className="mt-6 space-y-5 text-base leading-8 text-muted">
                {dictionary.home.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted">
                {dictionary.about.whyPoints.slice(0, 3).map((point) => (
                  <li key={point} className="rounded-[1.25rem] bg-surface/82 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
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

      <section className="border-y border-outline/40 bg-surface/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={dictionary.home.blog.eyebrow}
              title={dictionary.home.blog.title}
              description={dictionary.home.blog.description}
            />
            <Link href={paths.blog} className={buttonClasses({ variant: "ghost", className: "px-0 text-sm" })}>
              <span>{dictionary.home.blog.cta}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5">
            {posts.slice(0, 2).map((post, index) => (
              <div key={post.slug} className={index === 1 ? "hidden sm:block" : "block"}>
                <BlogCard post={post} locale={locale} readLabel={dictionary.blog.readArticle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 rounded-[1.9rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow={dictionary.home.location.eyebrow}
              title={dictionary.home.location.title}
              description={dictionary.home.location.description}
            />
            <p className="text-base leading-8 text-muted">{addressLine}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={paths.contact} className={buttonClasses({})}>
                {dictionary.home.location.cta}
              </Link>
              <Link href={siteConfig.mapsPlaceUrl} target="_blank" rel="noreferrer" className={buttonClasses({ variant: "secondary" })}>
                {dictionary.common.openMaps}
              </Link>
            </div>
          </div>
          <ArtImage mediaKey="brandTag" aspect="aspect-[16/11]" className="hidden sm:block" filter="sepia(0.18) saturate(0.88) contrast(1.03)" />
        </div>
      </section>
    </main>
  );
}
