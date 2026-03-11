import Link from "next/link";

import { CompassIcon, ComposeIcon, GridIcon, HomeIcon } from "@/components/icons";
import type { SiteDictionary } from "@/content/site";
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
  dictionary: SiteDictionary;
}

const iconMap = {
  home: HomeIcon,
  classes: GridIcon,
  contact: CompassIcon,
  inquiry: ComposeIcon,
} as const;

export function MobileDock({ items, currentPage, dictionary }: MobileDockProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline/45 bg-[linear-gradient(180deg,rgba(245,240,233,0.88),rgba(232,223,212,0.98))] px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_40px_-28px_rgba(47,32,21,0.32)] backdrop-blur-2xl sm:hidden">
      <nav
        className="mx-auto grid max-w-md grid-cols-4 gap-2 rounded-[1.75rem] border border-white/45 bg-white/56 p-2 shadow-card"
        aria-label={dictionary.nav.mobileDockLabel}
      >
        {items.map((item) => {
          const Icon = iconMap[item.page as keyof typeof iconMap];

          return (
              <Link
                key={item.page}
                href={item.href}
                aria-current={item.page === currentPage ? "page" : undefined}
                className={cn(
                  "flex min-h-[3.5rem] min-w-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-[1.1rem] px-2 py-1 text-center transition active:scale-[0.95]",
                  item.page === currentPage
                    ? "bg-ink text-white shadow-soft"
                    : "text-ink/88 hover:bg-white/64 hover:text-ink",
                )}
              >
              <Icon className="h-4 w-4 opacity-90" />
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
