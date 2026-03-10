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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline/60 bg-background/94 px-4 py-3 shadow-[0_-18px_40px_-24px_rgba(47,32,21,0.3)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-4">
        <Link
          href={primary.href}
          target={primary.external ? "_blank" : undefined}
          rel={primary.external ? "noreferrer" : undefined}
          className={buttonClasses({ className: "min-h-11 flex-1 justify-center" })}
        >
          {primary.label}
        </Link>
        <Link href={secondary.href} className="shrink-0 text-sm font-semibold text-terracotta">
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}
