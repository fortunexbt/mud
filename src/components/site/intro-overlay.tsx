"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoPrimary from "@/assets/brand/logo-primary.png";

export function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Only play on first visit per session
    const hasPlayed = sessionStorage.getItem("mud-intro-played");
    if (hasPlayed) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 1000); // Wait for fade-out
      sessionStorage.setItem("mud-intro-played", "true");
    }, 2000); // Hold for 2s

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-[min(60vw,20rem)] animate-in fade-in duration-1000">
        <Image
          src={logoPrimary}
          alt="MUD"
          priority
          className="h-auto w-full object-contain"
        />
      </div>
      <p className="mt-8 animate-in fade-in duration-1000 delay-500 text-xs uppercase tracking-[0.42em] text-ink/60">
        MUD Escola de Cerâmica
      </p>
    </div>
  );
}
