"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      <header className={cn("sticky top-0 z-50 border-b border-outline/40 bg-background/90 backdrop-blur-2xl transition-transform duration-300", isVisible ? "translate-y-0" : "-translate-y-full")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[4rem] items-center gap-4 py-2 sm:min-h-[5.35rem] sm:py-4">
            <SiteLogo href={`/${locale}`} className="px-3.5 py-2.5" imageClassName="w-[4rem] sm:w-[6rem]" />

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-1.5" aria-label={dictionary.nav.primaryNavLabel}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.page === currentPage ? "page" : undefined}
                  className={cn(
                      "rounded-full px-3.5 py-2.5 text-sm font-medium transition xl:px-4",
                    item.page === currentPage
                      ? "bg-sand/72 text-ink shadow-soft"
                      : "text-muted hover:bg-white/72 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-2 lg:flex xl:gap-3">
              <LanguageSwitcher
                currentLocale={locale}
                localePaths={localePaths}
                label={dictionary.nav.languageSwitcher}
                compact
                className="bg-white/84"
              />
              <Link
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({ variant: "secondary", size: "sm", className: "hidden shrink-0 px-3 xl:inline-flex" })}
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5 text-ink" />
              </Link>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({ size: "sm", className: "shrink-0" })}
              >
                {dictionary.common.primaryWhatsApp}
              </Link>
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
                className="inline-flex min-h-11 items-center justify-center rounded-[1.1rem] border border-outline/45 bg-white/82 px-3.5 shadow-soft transition hover:bg-white"
                aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <CloseIcon className="h-5 w-5 text-ink" /> : <MenuIcon className="h-5 w-5 text-ink" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <div className="fixed inset-0 z-40 xl:hidden">
            <motion.button
              type="button"
              aria-label={dictionary.nav.closeMenu}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[rgba(47,32,21,0.2)] backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 top-[4.5rem] flex flex-col items-center justify-center rounded-[2.2rem] border border-outline/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,240,233,0.92))] p-4 shadow-[0_40px_80px_-20px_rgba(47,32,21,0.2)] sm:inset-x-8 sm:p-6"
            >
              <nav className="mt-2 flex w-full flex-col gap-1.5" aria-label={dictionary.nav.mobileNavLabel}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.page === currentPage ? "page" : undefined}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-[1.4rem] py-3.5 text-center text-[1.1rem] font-display transition-all active:scale-[0.98]",
                      item.page === currentPage
                        ? "bg-ink text-white shadow-soft"
                        : "bg-surface/30 text-ink/90 hover:bg-surface/60 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 grid w-full gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className={buttonClasses({ className: "w-full justify-center py-4 text-[0.95rem] active:scale-[0.98]" })}
                >
                  {dictionary.common.primaryWhatsApp}
                </Link>
                <Link
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className={buttonClasses({ variant: "secondary", className: "w-full justify-center border-outline/40 bg-white/78 px-4 sm:w-auto" })}
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5 text-ink" />
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
