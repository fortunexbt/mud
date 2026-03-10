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
    <article className="flex h-full flex-col rounded-[1.6rem] border border-outline/50 bg-white/82 p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:rounded-[2rem] sm:p-6">
      <div className="mb-3 inline-flex w-fit rounded-full border border-outline/40 bg-sand/72 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta sm:mb-4 sm:text-xs">
        {track.badge}
      </div>
      <h3 className="font-display text-[1.65rem] leading-tight text-ink sm:text-2xl">{track.title}</h3>
      <p className="mt-2.5 text-[0.98rem] leading-7 text-muted sm:mt-3 sm:text-base">{track.summary}</p>
      <p className="mt-3 hidden text-sm leading-6 text-muted/90 sm:block">{track.details}</p>
      {actionHref && actionLabel ? (
        <div className="mt-auto pt-6 sm:pt-8">
          <Link href={actionHref} className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
            <span>{actionLabel}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </article>
  );
}
