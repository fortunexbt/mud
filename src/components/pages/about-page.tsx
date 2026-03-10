import Link from "next/link";

import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutPage({ locale, dictionary, paths, whatsappHref }: PageContext) {
  const fullStoryLabel = locale === "pt" ? "Ler história completa" : locale === "es" ? "Leer la historia completa" : "Read the full story";
  const exhibitions = dictionary.about.exhibitions?.items ?? [];

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.about.hero.eyebrow}
              title={dictionary.about.hero.title}
              description={dictionary.about.hero.description}
            />
            <div className="space-y-5 text-base leading-8 text-muted">
              {dictionary.about.story.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <details className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-4 py-4 text-sm leading-7 text-muted shadow-soft sm:hidden">
                <summary className="cursor-pointer list-none font-semibold text-ink">{fullStoryLabel}</summary>
                <div className="mt-3 space-y-3 border-t border-outline/50 pt-3">
                  {dictionary.about.story.slice(2).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
              <div className="hidden space-y-5 sm:block">
                {dictionary.about.story.slice(2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <ArtImage mediaKey="brandSeal" className="hidden sm:block" aspect="aspect-[4/4.7]" filter="sepia(0.2) saturate(0.88) contrast(1.05)" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <ArtImage mediaKey="founderPortrait" className="hidden sm:block" aspect="aspect-[4/4.7]" filter="sepia(0.15) saturate(0.92) contrast(1.03)" />
          <div className="space-y-8 rounded-[1.75rem] border border-outline/50 bg-white/82 p-6 shadow-soft sm:rounded-[2rem] sm:p-9">
            <div>
              <h2 className="font-display text-3xl text-ink">{dictionary.about.philosophyTitle}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                {dictionary.about.philosophy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">{dictionary.about.whyTitle}</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                {dictionary.about.whyPoints.map((point) => (
                  <li key={point} className="rounded-[1.4rem] bg-surface/82 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-outline/40 bg-surface/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <SectionHeading eyebrow={dictionary.about.valuesTitle} title={dictionary.about.slowNote} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {dictionary.about.values.map((value) => (
              <article key={value.title} className="rounded-[1.75rem] border border-outline/50 bg-white/84 p-5 shadow-soft sm:rounded-[2rem] sm:p-6">
                <h3 className="font-display text-2xl text-ink">{value.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {exhibitions.length ? (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow={dictionary.about.exhibitions!.eyebrow}
            title={dictionary.about.exhibitions!.title}
            description={dictionary.about.exhibitions!.intro[0]}
          />
          {dictionary.about.exhibitions!.intro[1] ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{dictionary.about.exhibitions!.intro[1]}</p>
          ) : null}
          <div className="mt-10 grid gap-4 lg:hidden">
            {exhibitions.map((item, index) => (
              <details key={item.year} open={index === 0} className="group overflow-hidden rounded-[1.7rem] border border-outline/50 bg-white/84 shadow-soft">
                <summary className="cursor-pointer list-none">
                  <ArtImage mediaKey={item.posterKey} aspect="aspect-[4/4.9]" className="rounded-none shadow-none" overlay={false} />
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta">
                      <span>{item.editionLabel}</span>
                      <span>{item.year}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-[1.55rem] leading-tight text-ink">{item.title}</h3>
                      <span className="mt-1 text-terracotta transition group-open:rotate-45">+</span>
                    </div>
                  </div>
                </summary>
                <div className="space-y-3 border-t border-outline/50 px-5 py-4">
                  <p className="text-sm leading-6 text-muted">{item.description}</p>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted/80">
                    <p>{item.date}</p>
                    <p className="mt-1">{item.location.join(" · ")}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-2">
            {exhibitions.map((item) => (
              <article key={item.year} className="overflow-hidden rounded-[1.7rem] border border-outline/50 bg-white/84 shadow-soft">
                <div className="grid gap-0 xl:grid-cols-[0.86fr_1.14fr]">
                  <ArtImage mediaKey={item.posterKey} aspect="aspect-[4/5.2]" className="rounded-none shadow-none xl:aspect-auto" overlay={false} />
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta">
                      <span>{item.editionLabel}</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="font-display text-[1.65rem] leading-tight text-ink">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted">{item.description}</p>
                    <div className="border-t border-outline/50 pt-3 text-xs uppercase tracking-[0.16em] text-muted/80">
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="rounded-[1.9rem] border border-outline/50 bg-ink px-5 py-8 text-white shadow-card sm:rounded-[2.25rem] sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-6">
          <div>
            <h2 className="font-display text-[2rem] leading-tight sm:text-4xl">{dictionary.classes.cta.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/74">{dictionary.classes.cta.description}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link href={paths.classes} className={buttonClasses({ variant: "secondary", className: "border-white/15 bg-white/12 text-white hover:bg-white/18 hover:text-white" })}>
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
