import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StickyCtaBar } from "@/components/site/sticky-cta-bar";
import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import type { PageKey } from "@/lib/routes";

interface SiteFrameProps {
  children: ReactNode;
  locale: Locale;
  dictionary: SiteDictionary;
  currentPage: PageKey;
  navItems: Array<{ label: string; href: string; page: PageKey }>;
  localePaths: Record<Locale, string>;
  instagramUrl: string;
  whatsappHref: string;
  privacyHref: string;
  email?: string;
  phone: string;
  addressLines: string[];
}

export function SiteFrame({
  children,
  locale,
  dictionary,
  currentPage,
  navItems,
  localePaths,
  instagramUrl,
  whatsappHref,
  privacyHref,
  email,
  phone,
  addressLines,
}: SiteFrameProps) {
  const showStickyBar = currentPage !== "privacy";
  const inquiryItem = navItems.find((item) => item.page === "inquiry");
  const classesItem = navItems.find((item) => item.page === "classes");
  const contactItem = navItems.find((item) => item.page === "contact");
  const secondaryMobileAction =
    currentPage === "inquiry"
      ? contactItem ?? classesItem
      : currentPage === "contact"
        ? classesItem ?? inquiryItem
        : inquiryItem ?? classesItem ?? contactItem;

  return (
    <div className={showStickyBar ? "min-h-screen bg-background pb-24 text-ink lg:pb-0" : "min-h-screen bg-background text-ink"}>
      <a href="#main" className="skip-link">
        {dictionary.nav.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        currentPage={currentPage}
        navItems={navItems}
        localePaths={localePaths}
        whatsappHref={whatsappHref}
      />
      {children}
      <SiteFooter
        dictionary={dictionary}
        navItems={navItems}
        whatsappHref={whatsappHref}
        instagramUrl={instagramUrl}
        privacyHref={privacyHref}
        email={email}
        phone={phone}
        addressLines={addressLines}
      />
      {showStickyBar && secondaryMobileAction ? (
        <StickyCtaBar
          primary={{
            label: dictionary.common.primaryWhatsApp,
            href: whatsappHref,
            external: true,
          }}
          secondary={{
            label: secondaryMobileAction.label,
            href: secondaryMobileAction.href,
          }}
        />
      ) : null}
    </div>
  );
}
