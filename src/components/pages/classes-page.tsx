import Link from "next/link";

import { ClassCard } from "@/components/cards/class-card";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageContext } from "@/components/pages/types";

export function ClassesPage({ locale, dictionary, paths, whatsappHref }: PageContext) {
  const processEyebrow = locale === "pt" ? "Processo" : locale === "es" ? "Proceso" : "Process";
  const faqEyebrow = locale === "pt" ? "FAQ" : locale === "es" ? "Preguntas" : "FAQ";
  const ctaEyebrow = locale === "pt" ? "Contato" : locale === "es" ? "Contacto" : "Contact";
  const moreProcessLabel = locale === "pt" ? "Ver processo completo" : locale === "es" ? "Ver proceso completo" : "See full process";
  const moreFaqLabel = locale === "pt" ? "Mais perguntas" : locale === "es" ? "Más preguntas" : "More questions";

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-20">
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
          </div>
          <ArtImage mediaKey="processHands" className="hidden sm:block" aspect="aspect-[4/4.35]" filter="grayscale(0.24) sepia(0.18) saturate(0.78) contrast(1.05)" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
          {dictionary.classes.tracks.map((track) => (
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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:rounded-[2rem] sm:p-8">
            <SectionHeading eyebrow="ABC" title={dictionary.classes.abc.title} />
            <p className="mt-5 text-base leading-8 text-muted">{dictionary.classes.abc.description}</p>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted">
              {dictionary.classes.abc.steps.slice(0, 3).map((step) => (
                <li key={step} className="rounded-[1.25rem] bg-surface px-4 py-3 sm:rounded-[1.5rem]">
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={processEyebrow} title={dictionary.classes.timeline.title} />
            <div className="mt-6 grid gap-3 sm:gap-4">
              {dictionary.classes.timeline.items.slice(0, 2).map((item, index) => (
                <article key={item.title} className="rounded-[1.5rem] border border-outline/50 bg-white/82 p-4 shadow-soft sm:rounded-[1.75rem] sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-ink sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                </article>
              ))}
              <details className="rounded-[1.5rem] border border-outline/50 bg-white/70 px-4 py-4 text-sm leading-7 text-muted shadow-soft sm:hidden">
                <summary className="cursor-pointer list-none font-semibold text-ink">{moreProcessLabel}</summary>
                <div className="mt-3 space-y-3 border-t border-outline/50 pt-3">
                  {dictionary.classes.timeline.items.slice(2).map((item, index) => (
                    <div key={item.title}>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta">0{index + 3}</p>
                      <p className="mt-1 font-medium text-ink">{item.title}</p>
                      <p className="mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </details>
              <div className="hidden sm:grid sm:gap-4">
                {dictionary.classes.timeline.items.slice(2).map((item, index) => (
                  <article key={item.title} className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">0{index + 3}</p>
                    <h3 className="mt-2 font-display text-2xl text-ink">{item.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading eyebrow={faqEyebrow} title={dictionary.classes.faqTitle} />
        <div className="mt-8 grid gap-4">
          {dictionary.classes.faqs.slice(0, 2).map((faq) => (
            <details key={faq.question} className="group rounded-[1.5rem] border border-outline/50 bg-white/82 px-4 py-4 shadow-soft sm:rounded-[1.75rem] sm:px-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink sm:text-lg">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-terracotta transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="pt-4 text-base leading-8 text-muted">{faq.answer}</p>
            </details>
          ))}
          <details className="rounded-[1.5rem] border border-outline/50 bg-white/70 px-4 py-4 text-sm leading-7 text-muted shadow-soft sm:hidden">
            <summary className="cursor-pointer list-none font-semibold text-ink">{moreFaqLabel}</summary>
            <div className="mt-3 space-y-3 border-t border-outline/50 pt-3">
              {dictionary.classes.faqs.slice(2).map((faq) => (
                <div key={faq.question}>
                  <p className="font-medium text-ink">{faq.question}</p>
                  <p className="mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          </details>
          <div className="hidden sm:grid sm:gap-4">
            {dictionary.classes.faqs.slice(2).map((faq) => (
              <details key={faq.question} className="group rounded-[1.75rem] border border-outline/50 bg-white/82 px-5 py-4 shadow-soft">
                <summary className="cursor-pointer list-none text-lg font-semibold text-ink">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-terracotta transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="pt-4 text-base leading-8 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-outline/40 bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-end">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-clay/90 sm:text-xs">{ctaEyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight sm:text-4xl">{dictionary.classes.cta.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{dictionary.classes.cta.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({})}>
                {dictionary.classes.cta.primary}
              </Link>
              <Link href={paths.inquiry} className={buttonClasses({ variant: "ghost", className: "text-white hover:text-white/82" })}>
                {dictionary.classes.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
