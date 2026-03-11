import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold leading-none tracking-[0.01em] transition duration-300 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-[linear-gradient(135deg,rgba(201,118,71,0.98),rgba(173,93,57,0.98))] px-5 text-white shadow-[0_18px_40px_-22px_rgba(116,56,30,0.62)] hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-22px_rgba(116,56,30,0.68)]",
        secondary:
          "border-outline/55 bg-white/82 px-5 text-ink shadow-[0_14px_36px_-26px_rgba(58,38,24,0.24)] hover:border-terracotta/28 hover:-translate-y-0.5 hover:bg-white",
        ghost:
          "border-transparent bg-transparent px-0 text-ink/78 hover:text-terracotta",
        dark:
          "border-white/12 bg-ink px-5 text-white shadow-[0_16px_38px_-24px_rgba(12,8,5,0.55)] hover:-translate-y-0.5 hover:bg-ink/92",
      },
      size: {
        sm: "min-h-10 px-4 text-[0.82rem]",
        md: "min-h-10 px-5 sm:min-h-11",
        lg: "min-h-11 px-5 text-[0.95rem] sm:min-h-12 sm:px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Variant = VariantProps<typeof buttonVariants>;

export function buttonClasses({
  variant,
  size,
  className,
}: Variant & { className?: string }) {
  return cn(buttonVariants({ variant, size, className }));
}

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & Variant,
) {
  const { variant, size, className, ...rest } = props;
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...rest}
    />
  );
}

export function ButtonLink(
  props: React.ComponentProps<typeof Link> & Variant,
) {
  const { variant, size, className, ...rest } = props;
  return (
    <Link
      className={buttonVariants({ variant, size, className })}
      {...rest}
    />
  );
}
