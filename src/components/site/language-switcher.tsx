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
        "flex items-center gap-1.5 rounded-full border border-outline/55 bg-white/78 px-1.5 py-1 text-sm shadow-soft backdrop-blur",
        compact ? "px-1 py-1" : "",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <GlobeIcon className={cn("hidden h-4 w-4 text-muted sm:block", compact ? "sm:hidden" : "")} aria-hidden="true" />
      {(Object.keys(localePaths) as Locale[]).map((locale) => (
        <Link
          key={locale}
          href={localePaths[locale]}
          aria-current={locale === currentLocale ? "page" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition",
            compact ? "px-2 py-1 tracking-[0.12em]" : "",
            locale === currentLocale
              ? "bg-ink text-white"
              : "text-muted hover:bg-sand/85 hover:text-ink",
          )}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
