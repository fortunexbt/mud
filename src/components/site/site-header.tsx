"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "./language-switcher";
import { SiteLogo } from "./site-logo";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-outline/40 bg-background/90 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[5rem] items-center gap-4 py-3 sm:min-h-[5.35rem] sm:py-4">
            <SiteLogo href={`/${locale}`} priority className="px-3.5 py-2.5" imageClassName="w-[4.95rem] sm:w-[6rem]" />

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
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex min-h-11 items-center justify-center rounded-[1.1rem] border border-outline/45 bg-white/82 px-3 shadow-soft transition hover:bg-white xl:hidden"
                aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <CloseIcon className="h-5 w-5 text-ink" /> : <MenuIcon className="h-5 w-5 text-ink" />}
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <LanguageSwitcher
                currentLocale={locale}
                localePaths={localePaths}
                label={dictionary.nav.languageSwitcher}
                compact
                className="bg-white/84"
              />
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex min-h-11 items-center justify-center rounded-[1.1rem] border border-outline/45 bg-white/82 px-3 shadow-soft transition hover:bg-white"
                aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <CloseIcon className="h-5 w-5 text-ink" /> : <MenuIcon className="h-5 w-5 text-ink" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            type="button"
            aria-label={dictionary.nav.closeMenu}
            onClick={closeMenu}
            className="absolute inset-0 bg-[rgba(47,32,21,0.18)] backdrop-blur-sm"
          />
          <div className="absolute inset-x-3 top-[5.6rem] rounded-[2rem] border border-outline/45 bg-background/97 p-4 shadow-card sm:inset-x-6 sm:top-[6rem]">
            <div className="rounded-[1.6rem] border border-outline/35 bg-white/74 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta/90 sm:text-xs">
                    {dictionary.nav.languageSwitcher}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">MUD Escola de Cerâmica</p>
                </div>
                <SiteLogo href={`/${locale}`} className="px-2.5 py-2" imageClassName="w-[4.4rem]" />
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
                  onClick={closeMenu}
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
              onClick={closeMenu}
              className={buttonClasses({ className: "mt-4 w-full justify-center" })}
            >
              {dictionary.common.primaryWhatsApp}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
