import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold tracking-[0.02em] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-[linear-gradient(135deg,rgba(195,111,65,0.98),rgba(168,90,55,0.98))] px-5 text-white shadow-[0_16px_38px_-22px_rgba(116,56,30,0.65)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-20px_rgba(116,56,30,0.72)]",
  secondary:
    "border-outline/60 bg-white/82 px-5 text-ink shadow-[0_14px_36px_-24px_rgba(58,38,24,0.22)] hover:border-terracotta/30 hover:-translate-y-0.5 hover:bg-white",
  ghost:
    "border-transparent bg-transparent px-0 text-ink/78 hover:text-terracotta",
  dark:
    "border-white/12 bg-ink px-5 text-white shadow-[0_16px_38px_-24px_rgba(12,8,5,0.55)] hover:-translate-y-0.5 hover:bg-ink/92",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-[0.82rem]",
  md: "min-h-10 px-5 sm:min-h-11",
  lg: "min-h-11 px-5 text-[0.95rem] sm:min-h-12 sm:px-6",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(baseClasses, variants[variant], sizes[size], className);
}

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
  },
) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  return <button className={buttonClasses({ variant, size, className })} {...rest} />;
}

export function ButtonLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    size?: Size;
  },
) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  return <a className={buttonClasses({ variant, size, className })} {...rest} />;
}
