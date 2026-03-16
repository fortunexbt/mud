"use client";

import { useEffect, useRef } from "react";

interface BookingEmbedProps {
  calUrl: string;
  config?: {
    theme?: string;
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    hideLandingPageDetails?: boolean;
    hideEventTypeDetails?: boolean;
    layout?: string;
  };
}

export function BookingEmbed({ calUrl, config }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://embed.cal.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.Cal !== "undefined" && containerRef.current) {
        window.Cal("init", {
          origin: "https://cal.com",
        });

        window.Cal("inline", {
          elementOrSelector: containerRef.current,
          calLink: calUrl.replace(/^https?:\/\//, ""),
          config: config || {},
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [calUrl, config]);

  return (
    <div
      ref={containerRef}
      className="cal-embed min-h-[700px] w-full rounded-[1.5rem] border border-outline/40 bg-white"
    />
  );
}

declare global {
  interface Window {
    Cal: (cmd: string, options?: Record<string, unknown>) => void;
  }
}