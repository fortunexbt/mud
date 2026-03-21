import Link from "next/link";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ClassCard } from "@/components/cards/class-card";
import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function ClassesPage({ locale, dictionary, paths }: PageContext) {
  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:px-8 lg:py-14">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.classes.hero.eyebrow}
              title={dictionary.classes.hero.title}
              description={dictionary.classes.hero.description}
            />

            <div className="space-y-4 text-base leading-8 text-muted">
              {dictionary.classes.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={paths.inquiry} className={buttonClasses({})}>
                {dictionary.classes.cta.secondary}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <ArtImage
              mediaKey="classesStudio"
              aspect="aspect-[4/4.4]"
              filter="grayscale(0.16) sepia(0.16) saturate(0.9) contrast(1.04)"
              locale={locale}
            />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
            {dictionary.classes.tracks.map((track, index) => (
              <div key={track.key} className={index < 3 ? "xl:col-span-4" : "xl:col-span-6"}>
                <ClassCard
                  track={track}
                  actionHref={`${paths.inquiry}?interest=${track.key}#form`}
                  actionLabel={dictionary.common.learnMore}
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="border-y border-outline/40 bg-surface/42">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="space-y-7">
            <SectionHeading
              eyebrow={dictionary.classes.abcEyebrow}
              title={dictionary.classes.abc.title}
              description={dictionary.classes.abc.description}
              align="center"
            />
            <div className="grid gap-4 md:grid-cols-2 md:items-start">
              {dictionary.classes.abc.steps.map((step, index) => (
                <article key={step} className="rounded-[1.8rem] border border-outline/45 bg-white/88 p-6 shadow-soft sm:p-7">
                  <p className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-terracotta/18 bg-sand/72 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 max-w-[34rem] text-sm leading-7 text-muted sm:text-base sm:leading-8">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <SectionHeading eyebrow={dictionary.classes.faqEyebrow} title={dictionary.classes.faqTitle} />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {dictionary.classes.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-[1.7rem] border border-outline/45 bg-white/82 px-5 py-4 shadow-soft sm:px-6">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink sm:text-lg">
                <span className="flex items-start justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="mt-1 text-terracotta transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="pt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-outline/40 bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 text-white sm:px-6 sm:py-10 lg:px-8 lg:py-18">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-clay/90 sm:text-xs">{dictionary.classes.contactEyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight sm:text-[2.7rem]">{dictionary.classes.cta.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{dictionary.classes.cta.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={paths.inquiry} className={buttonClasses({})}>
                {dictionary.classes.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
