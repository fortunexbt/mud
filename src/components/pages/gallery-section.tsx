import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/lib/i18n-config";

const galleryImages = Array.from({ length: 23 }, (_, index) => ({
  src: `/gallery/mud-gallery-${String(index + 1).padStart(2, "0")}.webp`,
  priority: index < 2,
}));

const galleryCopy = {
  pt: {
    eyebrow: "Galeria",
    title: "O atelie em movimento.",
    notes: ["processo", "aulas", "pecas", "encontros"],
    altPrefix: "Cena da galeria da MUD",
  },
  es: {
    eyebrow: "Galeria",
    title: "El taller en movimiento.",
    notes: ["proceso", "clases", "piezas", "encuentros"],
    altPrefix: "Escena de la galeria de MUD",
  },
  en: {
    eyebrow: "Gallery",
    title: "The studio in motion.",
    notes: ["process", "classes", "pieces", "gatherings"],
    altPrefix: "Scene from the MUD gallery",
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  notes: string[];
  altPrefix: string;
}>;

interface GallerySectionProps {
  locale: Locale;
}

export function GallerySection({ locale }: GallerySectionProps) {
  const copy = galleryCopy[locale];

  return (
    <section className="relative overflow-hidden border-y border-outline/40 bg-[linear-gradient(180deg,rgba(237,227,215,0.24),rgba(255,255,255,0.58))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl space-y-6">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
          <div className="flex flex-wrap gap-2.5 rounded-[1.7rem] border border-outline/50 bg-white/74 p-5 shadow-soft sm:p-6">
            {copy.notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-outline/40 bg-background/88 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta/90"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-2 gap-4 sm:columns-3 xl:columns-4 xl:gap-5">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.45rem] border border-outline/45 bg-white/72 p-2 shadow-soft transition-transform duration-500 hover:-translate-y-1 xl:mb-5"
            >
              <div className="relative overflow-hidden rounded-[1.05rem] bg-sand">
                <Image
                  src={image.src}
                  alt={`${copy.altPrefix} ${index + 1}`}
                  width={900}
                  height={1200}
                  sizes="(min-width: 1280px) 21vw, (min-width: 640px) 29vw, 45vw"
                  priority={image.priority}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.02),rgba(38,25,18,0.12))] opacity-80" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
