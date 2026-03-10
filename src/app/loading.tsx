import type { StaticImageData } from "next/image";
import Image from "next/image";

import logoClay from "@/assets/brand/logo-clay.png";
import logoPrimary from "@/assets/brand/logo-primary.png";
import logoSlate from "@/assets/brand/logo-slate.png";
import logoSoft from "@/assets/brand/logo-soft.png";
import logoTeal from "@/assets/brand/logo-teal.png";
import logoTextured from "@/assets/brand/logo-textured.png";

interface LoadingVariant {
  src: StaticImageData;
  alt: string;
}

const loadingVariants: LoadingVariant[] = [
  { src: logoTeal, alt: "MUD logo in teal" },
  { src: logoSlate, alt: "MUD logo in slate blue" },
  { src: logoClay, alt: "MUD logo in clay" },
  { src: logoSoft, alt: "MUD logo in a soft palette" },
  { src: logoTextured, alt: "MUD logo on a textured background" },
  { src: logoPrimary, alt: "MUD primary logo" },
];

function getRandomVariant() {
  return loadingVariants[Math.floor(Math.random() * loadingVariants.length)] ?? loadingVariants[0];
}

export default function Loading() {
  const variant = getRandomVariant();

  return (
    <div className="loading-screen flex min-h-screen flex-col items-center justify-center gap-7 overflow-hidden px-6 text-center text-muted">
      <div className="loading-visual w-[min(78vw,24rem)] sm:w-[min(64vw,27rem)] md:w-[min(48vw,30rem)]">
        <Image
          key={variant.src.src}
          src={variant.src}
          alt={variant.alt}
          priority
          sizes="(min-width: 768px) 30rem, 78vw"
          className="h-auto w-full object-contain"
        />
      </div>
      <p className="loading-label text-xs uppercase tracking-[0.42em] text-ink/70 sm:text-sm">
        Loading MUD
      </p>
    </div>
  );
}
