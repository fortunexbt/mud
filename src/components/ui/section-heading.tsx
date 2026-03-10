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
  const titleClasses =
    as === "h1"
      ? "font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-ink"
      : "font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[0.98] text-ink";

  return (
    <div
      className={cn(
        "space-y-3 sm:space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-[39rem]",
        className,
      )}
    >
      <p
        className={cn(
          "inline-flex w-fit items-center rounded-full border border-outline/45 bg-white/76 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-terracotta/90 shadow-soft sm:text-xs",
          align === "center" ? "mx-auto" : "",
        )}
      >
        {eyebrow}
      </p>
      <HeadingTag className={titleClasses}>
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            "max-w-[42rem] text-base leading-8 text-muted sm:text-[1.06rem] sm:leading-8",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
