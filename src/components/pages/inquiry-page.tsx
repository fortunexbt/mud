import Link from "next/link";

import { LeadForm } from "@/components/forms/lead-form";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageContext } from "@/components/pages/types";

interface InquiryPageProps extends PageContext {
  initialInterest?: "adults" | "kids" | "oneOff" | "wheel" | "groups";
}

export function InquiryPage({
  locale,
  dictionary,
  configured,
  whatsappHref,
  initialInterest,
}: InquiryPageProps) {
  const sideMessage = {
    pt: "O WhatsApp segue como o canal mais rápido para checar disponibilidade, tirar dúvidas sobre idioma e confirmar se algum formato especial está aberto no momento.",
    es: "WhatsApp sigue siendo el canal más rápido para consultar disponibilidad, resolver dudas sobre idioma y confirmar si algún formato especial está abierto en este momento.",
    en: "WhatsApp remains the fastest way to check availability, ask about language support, and confirm whether a special format is currently open.",
  }[locale];

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            eyebrow={dictionary.inquiry.hero.eyebrow}
            title={dictionary.inquiry.hero.title}
            description={dictionary.inquiry.hero.description}
          />
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:hidden">
            {dictionary.inquiry.tracks.map((track) => (
              <Link
                key={track.key}
                href={`?interest=${track.key}#form`}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${initialInterest === track.key ? "border-transparent bg-ink text-white" : "border-outline/50 bg-white/82 text-ink"}`}
              >
                {track.title}
              </Link>
            ))}
          </div>
          <div className="mt-10 hidden auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
            {dictionary.inquiry.tracks.map((track) => (
              <Link
                key={track.key}
                href={`?interest=${track.key}#form`}
                className={`rounded-[1.6rem] border p-4 shadow-soft sm:rounded-[1.75rem] sm:p-5 ${initialInterest === track.key ? "border-transparent bg-sand text-ink" : "border-outline/50 bg-white/80 text-ink"}`}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta sm:text-xs">{track.badge}</p>
                <h2 className="mt-2 font-display text-[1.55rem] leading-tight sm:text-2xl">{track.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{track.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div id="form" className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:rounded-[2rem] sm:p-8">
            <SectionHeading
              eyebrow={dictionary.inquiry.tracksTitle}
              title={dictionary.inquiry.formTitle}
              description={dictionary.inquiry.formIntro}
            />
            <div className="mt-7">
              <LeadForm
                key={initialInterest || "inquiry"}
                locale={locale}
                dictionary={dictionary}
                formType="inquiry"
                configured={configured}
                initialInterest={initialInterest}
              />
            </div>
            <div className="mt-5 rounded-[1.4rem] border border-outline/50 bg-surface/72 px-4 py-4 sm:hidden">
              <p className="text-sm leading-7 text-muted">{sideMessage}</p>
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "mt-4 w-full justify-center" })}>
                {dictionary.inquiry.whatsappCta}
              </Link>
            </div>
          </div>

          <aside className="hidden space-y-5 lg:block">
            <div className="rounded-[1.75rem] border border-outline/50 bg-surface p-5 shadow-soft sm:rounded-[2rem] sm:p-7">
              <h2 className="font-display text-[1.8rem] leading-tight text-ink sm:text-2xl">{dictionary.inquiry.sideTitle}</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {dictionary.inquiry.sidePoints.map((point) => (
                  <li key={point} className="rounded-[1.25rem] bg-white/78 px-4 py-3 sm:rounded-[1.5rem]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-outline/50 bg-ink p-5 text-white shadow-card sm:rounded-[2rem] sm:p-7">
              <p className="text-sm leading-7 text-white/76">{sideMessage}</p>
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "mt-5 w-full justify-center sm:w-auto" })}>
                {dictionary.inquiry.whatsappCta}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
