"use client";

import Link from "next/link";

import { GlobeIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  localePaths: Record<Locale, string>;
  label: string;
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ currentLocale, localePaths, label, className, compact = false }: LanguageSwitcherProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-outline/45 bg-white/80 p-1 text-sm shadow-soft backdrop-blur",
        compact ? "gap-0.5 p-0.5" : "",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <GlobeIcon className={cn("ml-1 hidden h-4 w-4 text-muted md:block", compact ? "md:hidden" : "")} aria-hidden="true" />
      {(Object.keys(localePaths) as Locale[]).map((locale) => (
        <Link
          key={locale}
          href={localePaths[locale]}
          aria-current={locale === currentLocale ? "page" : undefined}
          className={cn(
            "inline-flex min-h-11 min-w-[2.75rem] items-center justify-center rounded-full px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] transition active:scale-[0.95]",
            compact ? "min-h-11 min-w-[2.5rem] px-2 text-[0.64rem] tracking-[0.12em]" : "",
            locale === currentLocale
              ? "bg-ink text-white shadow-[0_10px_24px_-18px_rgba(47,32,21,0.7)]"
              : "text-muted hover:bg-sand/82 hover:text-ink",
          )}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
