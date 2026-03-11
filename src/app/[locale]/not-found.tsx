import { headers, cookies } from "next/headers";

import { NotFoundContent } from "@/components/pages/not-found-content";
import { SiteFrame } from "@/components/site/site-frame";
import { getDictionary } from "@/content/site";
import { siteConfig } from "@/config/site";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n-config";
import { getNavItems, getPagePaths } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata() {
  const headerList = await headers();
  const localeFromHeader = headerList.get("x-locale");
  const locale: Locale = localeFromHeader && isLocale(localeFromHeader) ? localeFromHeader : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.seo.pages.notFound.title,
    description: dictionary.seo.pages.notFound.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const headerList = await headers();
  const localeFromHeader = headerList.get("x-locale");
  const locale: Locale = localeFromHeader && isLocale(localeFromHeader) ? localeFromHeader : defaultLocale;
  const dictionary = getDictionary(locale);
  const cookieStore = await cookies();
  const hasPlayedIntro = cookieStore.has("mud-intro-played");
  const paths = getPagePaths(locale);
  const navItems = getNavItems(locale, dictionary);
  const whatsappHref = buildWhatsAppUrl(locale, "general");

  return (
      <SiteFrame
        hasPlayedIntro={hasPlayedIntro}
        locale={locale}
        dictionary={dictionary}
        currentPage="home"
        navItems={navItems.map((item) => ({ ...item }))}
        localePaths={{
          pt: "/pt",
          es: "/es",
          en: "/en",
        }}
        instagramUrl={siteConfig.instagramUrl}
        whatsappHref={whatsappHref}
        privacyHref={paths.privacy}
        email={siteConfig.email || undefined}
        phone={siteConfig.whatsappNumber}
        addressLines={[
          siteConfig.address.street,
          `${siteConfig.address.neighborhood} - ${siteConfig.address.city}`,
          `CEP ${siteConfig.address.postalCode}`,
        ]}
      >
      <NotFoundContent locale={locale} dictionary={dictionary} homeHref={paths.home} whatsappHref={whatsappHref} />
    </SiteFrame>
  );
}
