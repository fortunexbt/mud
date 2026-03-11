import Image from "next/image";

import type { TeamMember } from "@/content/site/types";
import { getMediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

import { TeamPortraitPlaceholder } from "@/components/ui/team-portrait-placeholder";

interface TeamPortraitProps {
  member: TeamMember;
  placeholderLabel: string;
  className?: string;
  priority?: boolean;
}

export function TeamPortrait({ member, placeholderLabel, className, priority = false }: TeamPortraitProps) {
  if (member.imageKey === "teamPlaceholder") {
    return <TeamPortraitPlaceholder name={member.name} label={placeholderLabel} className={className} />;
  }

  const asset = getMediaAsset(member.imageKey);

  return (
    <div className={cn("relative overflow-hidden rounded-[1.35rem] border border-outline/45 bg-sand shadow-soft sm:rounded-[1.6rem]", className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 40vw, 100vw"
        className="object-cover"
        style={{ objectPosition: asset.objectPosition }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,240,0.02),rgba(42,28,18,0.08))]" />
    </div>
  );
}
