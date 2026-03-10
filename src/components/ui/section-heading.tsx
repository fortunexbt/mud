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
      ? "font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-ink tracking-tight"
      : "font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] text-ink tracking-tight";

  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-[39rem]",
        className,
      )}
    >
      <p
        className={cn(
          "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-terracotta/90 sm:text-xs",
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
            "max-w-[42rem] text-[0.95rem] leading-relaxed text-muted sm:text-[1.06rem]",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
