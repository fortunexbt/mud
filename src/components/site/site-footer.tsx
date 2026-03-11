import Link from "next/link";

import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";
import { SiteLogo } from "./site-logo";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { SiteDictionary } from "@/content/site";
import type { PageKey } from "@/lib/routes";
import { formatPhoneDisplay } from "@/lib/utils";

interface FooterProps {
  dictionary: SiteDictionary;
  navItems: Array<{ label: string; href: string; page: PageKey }>;
  whatsappHref: string;
  instagramUrl: string;
  privacyHref: string;
  email?: string;
  phone: string;
  addressLines: string[];
}

export function SiteFooter({
  dictionary,
  navItems,
  whatsappHref,
  instagramUrl,
  privacyHref,
  email,
  phone,
  addressLines,
}: FooterProps) {
  const year = new Date().getFullYear();
  const homeHref = navItems.find((item) => item.page === "home")?.href ?? "/";
  const footerLinks = [
    ...navItems.map((item) => ({ href: item.href, label: item.label })),
    { href: privacyHref, label: dictionary.footer.privacy },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-outline/40 bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,141,98,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-card backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.88fr_0.9fr] lg:gap-10">
            <div className="space-y-6">
              <SiteLogo
                href={homeHref}
                className="rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,240,233,0.82))] px-4 py-3"
                imageClassName="w-[7.2rem] sm:w-[8.6rem]"
              />
              <p className="max-w-sm text-base leading-8 text-white/76">{dictionary.footer.statement}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ size: "sm" })}>
                  {dictionary.common.primaryWhatsApp}
                </Link>
                <Link
                  href={siteConfig.mapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClasses({
                    variant: "secondary",
                    size: "sm",
                    className: "border-white/15 bg-white/10 text-white hover:bg-white/16 hover:text-white",
                  })}
                >
                  {dictionary.common.openMaps}
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                {dictionary.footer.contactTitle}
              </h2>
              <div className="rounded-[1.55rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/76">
                <p className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-clay" />
                  <span>
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-clay" />
                    {formatPhoneDisplay(phone)}
                  </Link>
                  {email ? (
                    <Link href={`mailto:${email}`} className="block hover:text-white">
                      {email}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              <div>
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                  {dictionary.footer.socialTitle}
                </h2>
                <div className="mt-4 grid gap-3 text-sm text-white/76">
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-clay" />
                    {formatPhoneDisplay(phone)}
                  </Link>
                  <Link
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <InstagramIcon className="h-4 w-4 text-clay" />
                    Instagram
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                  {dictionary.footer.linksTitle}
                </h2>
                <nav className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/76">
                  {footerLinks.map((item) => (
                    <Link key={`${item.href}-${item.label}`} href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dictionary.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
