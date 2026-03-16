"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BookingEmbedProps {
  provider: "calcom" | "calendly";
  url: string;
  config?: Record<string, unknown>;
}

export function BookingEmbed({ provider, url, config }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    
    let script: HTMLScriptElement | null = null;
    let fallbackTimer: NodeJS.Timeout;
    
    if (provider === "calcom") {
      script = document.createElement("script");
      script.src = "https://embed.cal.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (typeof window.Cal !== "undefined" && node) {
          window.Cal("init", {
            origin: "https://cal.com",
          });

          window.Cal("inline", {
            elementOrSelector: node,
            calLink: url.replace(/^https?:\/\//, ""),
            config: config || {},
          });
          
          fallbackTimer = setTimeout(() => setIsLoaded(true), 500);
        }
      };
      document.body.appendChild(script);
    } else if (provider === "calendly") {
      script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        if (typeof window.Calendly !== "undefined" && node) {
          window.Calendly.initInlineWidget({
            url: url.startsWith("http") ? url : `https://calendly.com/${url}`,
            parentElement: node,
            prefill: {},
            utm: {}
          });
          
          fallbackTimer = setTimeout(() => setIsLoaded(true), 800);
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      setIsLoaded(false);
      clearTimeout(fallbackTimer);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (node) {
        node.innerHTML = "";
      }
    };
  }, [provider, url, config]);

  return (
    <div className="relative min-h-[650px] w-full overflow-hidden rounded-[1.5rem] border border-outline/40 bg-white shadow-sm">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
          <div className="flex w-full max-w-3xl animate-pulse flex-col gap-4 p-8 sm:p-12">
            <div className="h-8 w-1/3 rounded-full bg-surface/80" />
            <div className="h-4 w-1/2 rounded-full bg-surface/80" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="h-[300px] rounded-[1.2rem] bg-surface/80" />
              <div className="h-[300px] rounded-[1.2rem] bg-surface/80" />
            </div>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className={cn(
          "h-full min-h-[650px] w-full transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

declare global {
  interface Window {
    Cal: (cmd: string, options?: Record<string, unknown>) => void;
    Calendly: {
      initInlineWidget: (options: Record<string, unknown>) => void;
    };
  }
}
