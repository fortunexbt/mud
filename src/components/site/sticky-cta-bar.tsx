import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";

interface StickyAction {
  label: string;
  href: string;
  external?: boolean;
}

interface StickyCtaBarProps {
  primary: StickyAction;
  secondary: StickyAction;
}

export function StickyCtaBar({ primary, secondary }: StickyCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline/45 bg-[linear-gradient(180deg,rgba(245,240,233,0.84),rgba(233,223,211,0.96))] px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_40px_-24px_rgba(47,32,21,0.28)] backdrop-blur-2xl lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-[1.6rem] border border-white/45 bg-white/58 p-2 shadow-soft">
        <Link
          href={primary.href}
          target={primary.external ? "_blank" : undefined}
          rel={primary.external ? "noreferrer" : undefined}
          className={buttonClasses({ className: "min-h-11 flex-1 justify-center" })}
        >
          {primary.label}
        </Link>
        <Link href={secondary.href} className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:text-terracotta">
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}
