import type { ReactNode } from "react";

import { MobileDock } from "@/components/site/mobile-dock";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
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
  const showMobileDock = currentPage !== "privacy";
  const dockItems = navItems.filter((item) => item.page === "home" || item.page === "classes" || item.page === "inquiry" || item.page === "contact");

  return (
    <div className={showMobileDock ? "min-h-screen bg-background pb-28 text-ink sm:pb-0" : "min-h-screen bg-background text-ink"}>
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
      {showMobileDock ? <MobileDock items={dockItems} currentPage={currentPage} /> : null}
    </div>
  );
}
