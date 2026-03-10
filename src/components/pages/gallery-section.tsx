import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n-config";

const galleryImages = [
  { src: "/gallery/mud-gallery-02.webp", labelIndex: 0, className: "md:col-span-7 xl:col-span-5" },
  { src: "/gallery/mud-gallery-07.webp", labelIndex: 1, className: "md:col-span-5 xl:col-span-3" },
  { src: "/gallery/mud-gallery-10.webp", labelIndex: 2, className: "md:col-span-5 xl:col-span-4" },
  { src: "/gallery/mud-gallery-13.webp", labelIndex: 3, className: "md:col-span-7 xl:col-span-4" },
  { src: "/gallery/mud-gallery-16.webp", labelIndex: 1, className: "md:col-span-6 xl:col-span-3" },
  { src: "/gallery/mud-gallery-18.webp", labelIndex: 0, className: "md:col-span-6 xl:col-span-2" },
  { src: "/gallery/mud-gallery-21.webp", labelIndex: 2, className: "md:col-span-6 xl:col-span-2" },
  { src: "/gallery/mud-gallery-23.webp", labelIndex: 3, className: "md:col-span-6 xl:col-span-4" },
] as const;

const galleryCopy = {
  pt: {
    eyebrow: "Galeria",
    title: "O ateliê em movimento.",
    description: "Processo, aula, peças e encontros em uma leitura mais curta e mais viva do estúdio.",
    notes: ["processo", "aulas", "peças", "encontros"],
    cta: "Ver mais no Instagram",
    altPrefix: "Cena da galeria da MUD",
  },
  es: {
    eyebrow: "Galería",
    title: "El atelier en movimiento.",
    description: "Proceso, clases, piezas y encuentros en una lectura más breve y más viva del estudio.",
    notes: ["proceso", "clases", "piezas", "encuentros"],
    cta: "Ver más en Instagram",
    altPrefix: "Escena de la galería de MUD",
  },
  en: {
    eyebrow: "Gallery",
    title: "The studio in motion.",
    description: "Process, classes, pieces, and gatherings in a tighter, more tactile view of the studio.",
    notes: ["process", "classes", "pieces", "gatherings"],
    cta: "See more on Instagram",
    altPrefix: "Scene from the MUD gallery",
  },
} as const satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    notes: string[];
    cta: string;
    altPrefix: string;
  }
>;

interface GallerySectionProps {
  locale: Locale;
}

export function GallerySection({ locale }: GallerySectionProps) {
  const copy = galleryCopy[locale];

  return (
    <section className="relative overflow-hidden border-y border-outline/40 bg-[linear-gradient(180deg,rgba(237,227,215,0.18),rgba(255,255,255,0.62))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <Link
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonClasses({ variant: "ghost", className: "w-fit px-0 text-sm lg:justify-self-end" })}
          >
            <span>{copy.cta}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5 sm:mt-10">
          {copy.notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-outline/40 bg-white/72 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta/90"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-12 xl:gap-5">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden rounded-[1.6rem] border border-outline/40 bg-white/72 p-2 shadow-soft ${image.className}`}
            >
              <div className="relative overflow-hidden rounded-[1.1rem] bg-sand">
                <Image
                  src={image.src}
                  alt={`${copy.altPrefix} ${index + 1}`}
                  width={900}
                  height={1200}
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                  priority={false}
                  className="h-[18rem] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[23rem]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.03),rgba(38,25,18,0.12))]" />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted/85">
                <span>{copy.notes[image.labelIndex]}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
