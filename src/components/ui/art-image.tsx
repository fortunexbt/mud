import Image from "next/image";

import type { MediaKey } from "@/lib/media";
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
}: ArtImageProps) {
  const asset = getMediaAsset(mediaKey);

  return (
    <div className={cn("relative overflow-hidden rounded-[1.6rem] bg-sand shadow-soft sm:rounded-organic sm:shadow-card", aspect, className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
        style={{
          objectPosition: asset.objectPosition,
          filter,
        }}
      />
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.05),rgba(38,25,18,0.15))]" />
      ) : null}
    </div>
  );
}
