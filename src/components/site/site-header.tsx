import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/site/language-switcher";
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

export function SiteHeader({
  locale,
  dictionary,
  currentPage,
  navItems,
  localePaths,
  whatsappHref,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-outline/50 bg-background/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center rounded-[1.45rem] border border-outline/35 bg-white/82 px-3 py-2 shadow-soft"
          aria-label="MUD Escola de Cerâmica"
        >
          <div className="flex h-11 w-[7.7rem] items-center overflow-hidden rounded-[1rem] bg-background/95 px-2 sm:h-12 sm:w-[8.6rem] sm:rounded-[1.1rem]">
            <div className="relative h-[4.8rem] w-full">
              <Image
                src="/brand/logo-wordmark.png"
                alt="MUD Escola de Cerâmica"
                fill
                className="object-contain"
                priority
                sizes="(min-width: 640px) 138px, 123px"
              />
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.page === currentPage ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                item.page === currentPage
                  ? "bg-surface-alt/80 text-ink shadow-soft"
                  : "text-muted hover:bg-white/78 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher
            currentLocale={locale}
            localePaths={localePaths}
            label={dictionary.nav.languageSwitcher}
            compact
          />
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ size: "sm" })}>
            {dictionary.common.primaryWhatsApp}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher
            currentLocale={locale}
            localePaths={localePaths}
            label={dictionary.nav.languageSwitcher}
            compact
            className="bg-white/82"
          />
        </div>
      </div>
    </header>
  );
}
