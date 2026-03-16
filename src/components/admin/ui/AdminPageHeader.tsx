import { ReactNode } from "react";

interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function AdminPageHeader({ eyebrow, title, description, children }: AdminPageHeaderProps) {
  return (
    <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">{title}</h2>
          {description && <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{description}</p>}
        </div>
        {children && <div className="flex shrink-0 items-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
