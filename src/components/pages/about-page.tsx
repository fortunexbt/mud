import Link from "next/link";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutPage({ locale, dictionary, paths, whatsappHref }: PageContext) {
  const fullStoryLabel =
    locale === "pt" ? "Ler história completa" : locale === "es" ? "Leer la historia completa" : "Read the full story";
  const exhibitions = dictionary.about.exhibitions?.items ?? [];

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.about.hero.eyebrow}
              title={dictionary.about.hero.title}
              description={dictionary.about.hero.description}
            />

            <div className="space-y-4 text-base leading-8 text-muted">
              {dictionary.about.story.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <details className="rounded-[1.5rem] border border-outline/45 bg-white/76 px-4 py-4 text-sm leading-7 text-muted shadow-soft">
              <summary className="cursor-pointer list-none font-semibold text-ink">{fullStoryLabel}</summary>
              <div className="mt-3 space-y-3 border-t border-outline/45 pt-3">
                {dictionary.about.story.slice(2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={paths.classes} className={buttonClasses({})}>
                {dictionary.nav.classes}
              </Link>
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ variant: "secondary" })}>
                {dictionary.common.primaryWhatsApp}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <ArtImage
              mediaKey="brandSeal"
              aspect="aspect-[4/4.65]"
              filter="sepia(0.18) saturate(0.9) contrast(1.04)"
            />
            <div className="rounded-[1.8rem] border border-outline/45 bg-white/78 p-5 shadow-soft sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
                {dictionary.about.whyTitle}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {dictionary.about.whyPoints.map((point) => (
                  <div key={point} className="rounded-[1.25rem] bg-surface/78 px-4 py-4 text-sm leading-6 text-muted">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="border-b border-outline/40 bg-surface/38">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
            <div className="space-y-5">
              <div className="rounded-[1.9rem] border border-outline/45 bg-white/84 p-6 shadow-soft sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-xs">
                  {dictionary.about.valuesTitle}
                </p>
                <p className="mt-4 font-display text-[2rem] leading-tight text-ink sm:text-[2.45rem]">{dictionary.about.slowNote}</p>
              </div>
              <ArtImage
                mediaKey="founderPortrait"
                aspect="aspect-[4/4.8]"
                filter="sepia(0.14) saturate(0.92) contrast(1.03)"
              />
            </div>

            <div className="space-y-8">
              <div>
                <SectionHeading eyebrow={dictionary.about.philosophyTitle} title={dictionary.about.valuesTitle} />
                <div className="mt-6 space-y-4 text-base leading-8 text-muted">
                  {dictionary.about.philosophy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {dictionary.about.values.map((value) => (
                  <article key={value.title} className="rounded-[1.7rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-6">
                    <h3 className="font-display text-[1.65rem] leading-tight text-ink">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {exhibitions.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow={dictionary.about.exhibitions!.eyebrow}
            title={dictionary.about.exhibitions!.title}
            description={dictionary.about.exhibitions!.intro[0]}
          />
          {dictionary.about.exhibitions!.intro[1] ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{dictionary.about.exhibitions!.intro[1]}</p>
          ) : null}

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {exhibitions.map((item) => (
              <article key={item.year} className="overflow-hidden rounded-[1.85rem] border border-outline/45 bg-white/84 shadow-soft">
                <div className="grid gap-0 xl:grid-cols-[0.86fr_1.14fr]">
                  <ArtImage mediaKey={item.posterKey} aspect="aspect-[4/5.15]" className="rounded-none border-0 shadow-none xl:aspect-auto" overlay={false} />
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta">
                      <span>{item.editionLabel}</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="font-display text-[1.7rem] leading-tight text-ink">{item.title}</h3>
                    <p className="text-sm leading-7 text-muted">{item.description}</p>
                    <div className="border-t border-outline/45 pt-3 text-xs uppercase tracking-[0.16em] text-muted/80">
                      <p>{item.date}</p>
                      <p className="mt-1">{item.location.join(" · ")}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-outline/45 bg-ink px-5 py-8 text-white shadow-card sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="font-display text-[2rem] leading-tight sm:text-[2.6rem]">{dictionary.classes.cta.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/74">{dictionary.classes.cta.description}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href={paths.classes}
              className={buttonClasses({
                variant: "secondary",
                className: "border-white/15 bg-white/10 text-white hover:bg-white/18 hover:text-white",
              })}
            >
              {dictionary.nav.classes}
            </Link>
            <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({})}>
              {dictionary.common.primaryWhatsApp}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
