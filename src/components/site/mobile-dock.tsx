import Link from "next/link";

import { CompassIcon, ComposeIcon, GridIcon, HomeIcon } from "@/components/icons";
import type { PageKey } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface MobileDockItem {
  label: string;
  href: string;
  page: PageKey;
}

interface MobileDockProps {
  items: MobileDockItem[];
  currentPage: PageKey;
}

const iconMap = {
  home: HomeIcon,
  classes: GridIcon,
  contact: CompassIcon,
  inquiry: ComposeIcon,
} as const;

export function MobileDock({ items, currentPage }: MobileDockProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline/55 bg-[linear-gradient(180deg,rgba(245,240,233,0.82),rgba(232,223,212,0.94))] px-3 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-20px_45px_-30px_rgba(47,32,21,0.35)] backdrop-blur-2xl sm:hidden">
      <nav className="mx-auto grid max-w-md grid-cols-4 gap-2 rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,252,248,0.72),rgba(214,194,172,0.18))] p-2 shadow-card" aria-label="Primary mobile navigation">
        {items.map((item) => {
          const Icon = iconMap[item.page as keyof typeof iconMap];

          return (
            <Link
              key={item.page}
              href={item.href}
              aria-current={item.page === currentPage ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.15rem] border px-2 py-2 text-center transition",
                item.page === currentPage
                  ? "border-transparent bg-ink text-white shadow-soft"
                  : "border-white/15 bg-white/14 text-ink/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-white/22 hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4 opacity-90" />
              <span className="text-[0.63rem] font-semibold uppercase tracking-[0.14em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
