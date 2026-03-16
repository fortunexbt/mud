"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n-config";

const allImages = Array.from({ length: 23 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/gallery/mud-gallery-${num}.webp`;
});

const galleryCopy = {
  pt: {
    eyebrow: "Galeria",
    title: "O ateliê em movimento.",
    description: "Processo, aula, peças e encontros em uma leitura mais curta e mais viva do estúdio.",
    cta: "Ver mais no Instagram",
    altPrefix: "Cena da galeria da MUD",
  },
  es: {
    eyebrow: "Galería",
    title: "El atelier en movimiento.",
    description: "Proceso, clases, piezas y encuentros en una lectura más breve y más viva del estudio.",
    cta: "Ver más en Instagram",
    altPrefix: "Escena de la galería de MUD",
  },
  en: {
    eyebrow: "Gallery",
    title: "The studio in motion.",
    description: "Process, classes, pieces, and gatherings in a tighter, more tactile view of the studio.",
    cta: "See more on Instagram",
    altPrefix: "Scene from the MUD gallery",
  },
} as const satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    altPrefix: string;
  }
>;

interface GallerySectionProps {
  locale: Locale;
}

export function GallerySection({ locale }: GallerySectionProps) {
  const copy = galleryCopy[locale];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  return (
    <section className="relative overflow-hidden border-y border-outline/40 bg-[linear-gradient(180deg,rgba(237,227,215,0.18),rgba(255,255,255,0.62))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(195,111,65,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-[minmax(0,1fr)_auto] lg:items-end">
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

        <div
          className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-outline/40 bg-white/72 p-3 shadow-soft sm:mt-10 sm:aspect-[16/9]"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-sand">
            {allImages.map((src, index) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: index === currentIndex ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={`${copy.altPrefix} ${index + 1}`}
                  fill
                  sizes="(min-width: 1280px) 80vw, (min-width: 768px) 90vw, 100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.03),rgba(38,25,18,0.12))]" />
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-outline/50 bg-white/85 text-terracotta shadow-soft transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-outline/50 bg-white/85 text-terracotta shadow-soft transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta/50 ${
                  index === currentIndex
                    ? "w-6 bg-terracotta"
                    : "w-2 bg-terracotta/40 hover:bg-terracotta/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-3 right-4 rounded-full border border-outline/40 bg-white/72 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted/85 sm:bottom-4">
            {String(currentIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}