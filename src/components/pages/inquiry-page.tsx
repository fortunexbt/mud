import Link from "next/link";

import { LeadForm } from "@/components/forms/lead-form";
import type { PageContext } from "@/components/pages/types";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

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
    pt: "WhatsApp segue como o canal mais rápido para checar disponibilidade, idioma e formatos especiais.",
    es: "WhatsApp sigue siendo el canal más rápido para consultar disponibilidad, idioma y formatos especiales.",
    en: "WhatsApp is still the fastest channel for availability, language support, and special format questions.",
  }[locale];

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.inquiry.hero.eyebrow}
              title={dictionary.inquiry.hero.title}
              description={dictionary.inquiry.hero.description}
            />

            <div className="rounded-[1.8rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-terracotta sm:text-xs">
                {dictionary.inquiry.whatsappCta}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{sideMessage}</p>
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "mt-5 w-full justify-center" })}>
                {dictionary.inquiry.whatsappCta}
              </Link>
            </div>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:hidden">
            {dictionary.inquiry.tracks.map((track) => (
              <Link
                key={track.key}
                href={`?interest=${track.key}#form`}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold",
                  initialInterest === track.key ? "border-transparent bg-ink text-white" : "border-outline/45 bg-white/82 text-ink",
                )}
              >
                {track.title}
              </Link>
            ))}
          </div>

          <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-12 xl:gap-5">
            {dictionary.inquiry.tracks.map((track, index) => (
              <Link
                key={track.key}
                href={`?interest=${track.key}#form`}
                className={cn(
                  "rounded-[1.7rem] border p-5 shadow-soft transition hover:-translate-y-0.5",
                  index < 3 ? "xl:col-span-4" : "xl:col-span-6",
                  initialInterest === track.key
                    ? "border-transparent bg-sand/88 text-ink"
                    : "border-outline/45 bg-white/82 text-ink",
                )}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta sm:text-xs">{track.badge}</p>
                <h2 className="mt-3 font-display text-[1.65rem] leading-tight sm:text-[1.95rem]">{track.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{track.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div id="form" className="rounded-[1.9rem] border border-outline/45 bg-white/84 p-5 shadow-soft sm:p-8">
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
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.85rem] border border-outline/45 bg-surface/84 p-5 shadow-soft sm:p-7">
              <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.2rem]">{dictionary.inquiry.sideTitle}</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {dictionary.inquiry.sidePoints.map((point) => (
                  <li key={point} className="rounded-[1.3rem] bg-white/78 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.85rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-terracotta sm:text-xs">
                {dictionary.inquiry.whatsappCta}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{sideMessage}</p>
              <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "mt-5 w-full justify-center" })}>
                {dictionary.inquiry.whatsappCta}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
