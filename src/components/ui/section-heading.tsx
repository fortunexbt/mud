import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div
      className={cn(
        "space-y-3 sm:space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <p
        className={cn(
          "inline-flex w-fit items-center rounded-full border border-outline/50 bg-white/76 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta/90 shadow-soft sm:text-xs",
          align === "center" ? "mx-auto" : "",
        )}
      >
        {eyebrow}
      </p>
      <HeadingTag className="font-display text-[2rem] leading-[1.02] text-ink sm:text-[2.7rem] lg:text-[3.15rem]">
        {title}
      </HeadingTag>
      {description ? (
        <p className={cn("max-w-[42rem] text-base leading-7 text-muted sm:text-lg sm:leading-8", align === "center" ? "mx-auto" : "")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
