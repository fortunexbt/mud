import Image from "next/image";
import Link from "next/link";

import logoPrimary from "@/assets/brand/logo-primary.png";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  href?: string | null;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function SiteLogo({
  href,
  className,
  imageClassName,
  priority = false,
}: SiteLogoProps) {
  const content = (
    <span
      className={cn(
        "relative inline-flex items-center overflow-hidden rounded-[1.55rem] border border-outline/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,240,233,0.74))] px-3 py-2 shadow-soft",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.1),transparent_62%)]" />
      <Image
        src={logoPrimary}
        alt="MUD Escola de Cerâmica"
        priority={priority}
        className={cn("relative h-auto w-[4.75rem] sm:w-[5.8rem]", imageClassName)}
      />
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label="MUD Escola de Cerâmica" className="shrink-0">
      {content}
    </Link>
  );
}
