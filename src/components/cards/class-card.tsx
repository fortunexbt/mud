import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { ClassTrack } from "@/content/site/types";

interface ClassCardProps {
  track: ClassTrack;
  actionHref?: string;
  actionLabel?: string;
}

export function ClassCard({ track, actionHref, actionLabel }: ClassCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(245,240,233,0.72))] p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card active:scale-[0.98] sm:rounded-[2.15rem] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.12),transparent_70%)]" />
      <div className="relative flex h-full flex-col">
        <div className="inline-flex w-fit rounded-full border border-outline/40 bg-white/74 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-terracotta sm:text-xs">
          {track.badge}
        </div>

        <div className="mt-5 space-y-3">
          <h3 className="font-display text-[1.8rem] leading-tight text-ink sm:text-[2rem]">{track.title}</h3>
          <p className="text-[0.98rem] leading-7 text-muted sm:text-base">{track.summary}</p>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-outline/35 bg-white/58 px-4 py-4 text-sm leading-6 text-muted">
          {track.details}
        </div>

        {actionHref && actionLabel ? (
          <div className="mt-auto pt-6">
            <Link href={actionHref} className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition group-hover:gap-3">
              <span>{actionLabel}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}
