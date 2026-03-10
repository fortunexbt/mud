import Link from "next/link";

import { LeadForm } from "@/components/forms/lead-form";
import { MapEmbed } from "@/components/forms/map-embed";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";
import type { PageContext } from "@/components/pages/types";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { formatPhoneDisplay } from "@/lib/utils";

export function ContactPage({ locale, dictionary, configured, whatsappHref }: PageContext) {
  const moreOptionsLabel =
    locale === "pt" ? "Mais formas de contato" : locale === "es" ? "Más formas de contacto" : "More contact options";

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.contact.hero.eyebrow}
              title={dictionary.contact.hero.title}
              description={dictionary.contact.hero.description}
            />

            <div className="rounded-[1.8rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-terracotta sm:text-xs">
                {dictionary.contact.detailsTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{dictionary.contact.detailsBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="space-y-5">
            <div className="rounded-[1.85rem] border border-outline/45 bg-white/82 p-5 shadow-soft sm:p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-terracotta/90 sm:text-xs">
                {dictionary.contact.detailsTitle}
              </p>
              <div className="mt-5 rounded-[1.5rem] bg-surface/72 px-4 py-4 text-sm leading-7 text-muted">
                <p className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-terracotta" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.neighborhood} · {siteConfig.address.city}
                    <br />
                    CEP {siteConfig.address.postalCode}
                  </span>
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "w-full justify-center" })}>
                  {dictionary.contact.whatsappCta}
                </Link>
                <Link
                  href={siteConfig.mapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClasses({ variant: "secondary", className: "w-full justify-center" })}
                >
                  {dictionary.common.openMaps}
                </Link>
              </div>
              <div className="mt-5 hidden flex-wrap gap-x-5 gap-y-3 text-sm text-muted sm:flex">
                <Link href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
                  <WhatsAppIcon className="h-4 w-4 text-terracotta" />
                  {formatPhoneDisplay(siteConfig.whatsappNumber)}
                </Link>
                <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
                  <InstagramIcon className="h-4 w-4 text-terracotta" />
                  {dictionary.contact.instagramCta}
                </Link>
                {siteConfig.email ? <Link href={`mailto:${siteConfig.email}`} className="hover:text-ink">{siteConfig.email}</Link> : null}
              </div>
              <details className="mt-4 rounded-[1.4rem] border border-outline/45 bg-white/72 px-4 py-4 text-sm leading-7 text-muted sm:hidden">
                <summary className="cursor-pointer list-none font-semibold text-ink">{moreOptionsLabel}</summary>
                <div className="mt-3 space-y-3 border-t border-outline/45 pt-3">
                  <Link href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink">
                    <WhatsAppIcon className="h-4 w-4 text-terracotta" />
                    {formatPhoneDisplay(siteConfig.whatsappNumber)}
                  </Link>
                  <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink">
                    <InstagramIcon className="h-4 w-4 text-terracotta" />
                    {dictionary.contact.instagramCta}
                  </Link>
                  {siteConfig.email ? <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link> : null}
                </div>
              </details>
            </div>

            <div className="overflow-hidden rounded-[1.85rem] border border-outline/45 bg-white/82 shadow-soft">
              <div className="border-b border-outline/45 px-5 py-4 sm:px-6">
                <h2 className="font-display text-[1.8rem] leading-tight text-ink sm:text-[2.1rem]">{dictionary.contact.mapTitle}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{dictionary.contact.mapBody}</p>
              </div>
              <MapEmbed />
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-outline/45 bg-white/84 p-5 shadow-soft sm:p-8">
            <SectionHeading eyebrow={dictionary.contact.formTitle} title={dictionary.contact.formTitle} description={dictionary.contact.formIntro} />
            <div className="mt-7">
              <LeadForm locale={locale} dictionary={dictionary} formType="contact" configured={configured} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
