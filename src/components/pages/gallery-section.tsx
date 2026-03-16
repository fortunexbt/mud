"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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

  const prevIndex = useMemo(
    () => (currentIndex - 1 + allImages.length) % allImages.length,
    [currentIndex]
  );
  const nextIndex = useMemo(
    () => (currentIndex + 1) % allImages.length,
    [currentIndex]
  );
  const visibleIndices = useMemo(
    () => [prevIndex, currentIndex, nextIndex],
    [prevIndex, currentIndex, nextIndex]
  );

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

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
          className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-outline/40 bg-white/72 shadow-soft sm:mt-10 sm:aspect-[16/9]"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative h-full w-full bg-sand">
            {allImages.map((src, index) => {
              const shouldRender = visibleIndices.includes(index);
              return (
                <div
                  key={src}
                  className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{ opacity: index === currentIndex ? 1 : 0 }}
                >
                  {shouldRender && (
                    <Image
                      src={src}
                      alt={`${copy.altPrefix} ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 80vw, (min-width: 768px) 90vw, 100vw"
                      priority={index === currentIndex}
                      className="object-cover"
                      quality={85}
                    />
                  )}
                </div>
              );
            })}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,233,0.03),rgba(38,25,18,0.12))]" />
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-4 md:h-10 md:w-10"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-4 md:h-10 md:w-10"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm md:text-[0.75rem]">
            <span className="tabular-nums">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="tabular-nums">{String(allImages.length).padStart(2, "0")}</span>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
            <button
              onClick={goToPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
              aria-label="Next"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 hidden gap-1.5 md:flex">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/50 ${
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}