import Link from "next/link";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { SiteLogo } from "@/components/site/site-logo";
import { buttonClasses } from "@/components/ui/button";
import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import type { PageKey } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  dictionary: SiteDictionary;
  currentPage: PageKey;
  navItems: Array<{ label: string; href: string; page: PageKey }>;
  localePaths: Record<Locale, string>;
  whatsappHref: string;
}

interface HeaderMenuProps extends HeaderProps {
  className?: string;
}

function HeaderMenu({
  locale,
  dictionary,
  currentPage,
  navItems,
  localePaths,
  whatsappHref,
  className,
}: HeaderMenuProps) {
  return (
    <details className={cn("group relative", className)}>
      <summary
        className="flex min-h-11 list-none items-center justify-center rounded-[1.1rem] border border-outline/45 bg-white/82 px-3 shadow-soft marker:content-none [&::-webkit-details-marker]:hidden"
        aria-label={dictionary.nav.openMenu}
      >
        <MenuIcon className="h-5 w-5 text-ink group-open:hidden" />
        <CloseIcon className="hidden h-5 w-5 text-ink group-open:block" />
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.8rem)] z-50 w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.9rem] border border-outline/45 bg-background/96 p-4 shadow-card backdrop-blur-2xl sm:w-[22rem]">
        <div className="rounded-[1.55rem] border border-outline/35 bg-white/72 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta/90 sm:text-xs">
                {dictionary.nav.languageSwitcher}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">MUD Escola de Cerâmica</p>
            </div>
            <SiteLogo
              href={`/${locale}`}
              className="rounded-[1.25rem] px-2.5 py-2"
              imageClassName="w-[4.25rem]"
            />
          </div>
          <LanguageSwitcher
            currentLocale={locale}
            localePaths={localePaths}
            label={dictionary.nav.languageSwitcher}
            compact
            className="mt-4 bg-background/92"
          />
        </div>

        <nav className="mt-4 grid gap-2" aria-label="Mobile primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.page === currentPage ? "page" : undefined}
              className={cn(
                "rounded-[1.2rem] border px-4 py-3 text-sm font-medium transition",
                item.page === currentPage
                  ? "border-transparent bg-ink text-white shadow-soft"
                  : "border-outline/40 bg-white/76 text-ink hover:bg-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({ className: "mt-4 w-full justify-center" })}
        >
          {dictionary.common.primaryWhatsApp}
        </Link>
      </div>
    </details>
  );
}

export function SiteHeader({
  locale,
  dictionary,
  currentPage,
  navItems,
  localePaths,
  whatsappHref,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-outline/40 bg-background/86 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.9rem] items-center gap-4 py-3 sm:min-h-[5.3rem] sm:py-4">
          <SiteLogo href={`/${locale}`} priority />

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.page === currentPage ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  item.page === currentPage
                    ? "bg-sand/72 text-ink shadow-soft"
                    : "text-muted hover:bg-white/72 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <LanguageSwitcher
              currentLocale={locale}
              localePaths={localePaths}
              label={dictionary.nav.languageSwitcher}
              compact
              className="bg-white/84"
            />
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ size: "sm", className: "shrink-0" })}
            >
              {dictionary.common.primaryWhatsApp}
            </Link>
            <HeaderMenu
              locale={locale}
              dictionary={dictionary}
              currentPage={currentPage}
              navItems={navItems}
              localePaths={localePaths}
              whatsappHref={whatsappHref}
              className="xl:hidden"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <LanguageSwitcher
              currentLocale={locale}
              localePaths={localePaths}
              label={dictionary.nav.languageSwitcher}
              compact
              className="bg-white/84"
            />
            <HeaderMenu
              locale={locale}
              dictionary={dictionary}
              currentPage={currentPage}
              navItems={navItems}
              localePaths={localePaths}
              whatsappHref={whatsappHref}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
