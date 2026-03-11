import Link from "next/link";

import type { Locale } from "@/lib/i18n-config";

import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import type { SiteDictionary } from "@/content/site";

interface NotFoundContentProps {
  locale: Locale;
  dictionary: SiteDictionary;
  homeHref: string;
  whatsappHref: string;
}

export function NotFoundContent({ locale, dictionary, homeHref, whatsappHref }: NotFoundContentProps) {
  return (
    <main id="main" className="mx-auto grid min-h-[70vh] max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
      <ArtImage mediaKey="glowLogo" aspect="aspect-[1/1]" className="min-h-[20rem]" overlay={false} locale={locale} />
      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-terracotta">404</p>
        <h1 className="mt-4 font-display text-[2.8rem] leading-[1.02] text-ink sm:text-[4rem]">
          {dictionary.notFound.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{dictionary.notFound.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={homeHref} className={buttonClasses({})}>
            {dictionary.notFound.primary}
          </Link>
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ variant: "secondary" })}>
            {dictionary.notFound.secondary}
          </Link>
        </div>
      </div>
    </main>
  );
}
