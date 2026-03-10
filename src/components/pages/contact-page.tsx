import Link from "next/link";

import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";
import { LeadForm } from "@/components/forms/lead-form";
import { MapEmbed } from "@/components/forms/map-embed";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { PageContext } from "@/components/pages/types";
import { formatPhoneDisplay } from "@/lib/utils";

export function ContactPage({ locale, dictionary, configured, whatsappHref }: PageContext) {
  const moreOptionsLabel = locale === "pt" ? "Mais formas de contato" : locale === "es" ? "Más formas de contacto" : "More contact options";

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            eyebrow={dictionary.contact.hero.eyebrow}
            title={dictionary.contact.hero.title}
            description={dictionary.contact.hero.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:rounded-[2rem] sm:p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-terracotta/90 sm:text-xs">
                {dictionary.contact.detailsTitle}
              </p>
              <p className="mt-3 text-base leading-8 text-muted">{dictionary.contact.detailsBody}</p>
              <div className="mt-5 rounded-[1.5rem] bg-surface/75 px-4 py-4 text-sm leading-7 text-muted">
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
                <Link href={siteConfig.mapsPlaceUrl} target="_blank" rel="noreferrer" className={buttonClasses({ variant: "secondary", className: "w-full justify-center" })}>
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
                {siteConfig.email ? (
                  <Link href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                    {siteConfig.email}
                  </Link>
                ) : null}
              </div>
              <details className="mt-4 rounded-[1.4rem] border border-outline/50 bg-white/72 px-4 py-4 text-sm leading-7 text-muted sm:hidden">
                <summary className="cursor-pointer list-none font-semibold text-ink">{moreOptionsLabel}</summary>
                <div className="mt-3 space-y-3 border-t border-outline/50 pt-3">
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

            <div className="hidden sm:block">
              <MapEmbed />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:rounded-[2rem] sm:p-8">
              <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.35rem]">{dictionary.contact.formTitle}</h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-muted">{dictionary.contact.formIntro}</p>
              <div className="mt-7">
                <LeadForm locale={locale} dictionary={dictionary} formType="contact" configured={configured} />
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-outline/50 bg-surface/82 p-5 shadow-soft sm:rounded-[2rem] sm:p-6">
              <h2 className="font-display text-[1.8rem] leading-tight text-ink sm:text-2xl">{dictionary.contact.mapTitle}</h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-muted">{dictionary.contact.mapBody}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={siteConfig.mapsPlaceUrl} target="_blank" rel="noreferrer" className={buttonClasses({ variant: "secondary" })}>
                  {dictionary.common.openMaps}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
