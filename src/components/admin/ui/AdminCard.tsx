import { ReactNode } from "react";

interface AdminCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function AdminCard({ title, subtitle, children, className = "" }: AdminCardProps) {
  return (
    <div className={`rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6 ${className}`}>
      {title && (
        <div className="mb-6">
          <h3 className="font-display text-[1.5rem] leading-tight text-ink">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
