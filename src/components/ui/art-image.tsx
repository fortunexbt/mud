import Image from "next/image";

import type { MediaKey } from "@/lib/media";
import type { Locale } from "@/lib/i18n-config";
import { getMediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

interface ArtImageProps {
  mediaKey: MediaKey;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
  aspect?: string;
  filter?: string;
  locale?: Locale;
}

export function ArtImage({
  mediaKey,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  overlay = true,
  aspect = "aspect-[4/5]",
  filter,
  locale = "pt",
}: ArtImageProps) {
  const asset = getMediaAsset(mediaKey, locale);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.7rem] border border-outline/30 bg-sand shadow-soft sm:rounded-[2.2rem] sm:shadow-card",
        aspect,
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]", imageClassName)}
        style={{
          objectPosition: asset.objectPosition || "50% 50%",
          filter,
        }}
      />
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.05),rgba(38,25,18,0.15))]" />
      ) : null}
    </div>
  );
}
