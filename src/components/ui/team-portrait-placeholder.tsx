import { cn } from "@/lib/utils";

interface TeamPortraitPlaceholderProps {
  name: string;
  label: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamPortraitPlaceholder({ name, label, className }: TeamPortraitPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[46%_54%_52%_48%/56%_40%_60%_44%] border border-outline/50 bg-[radial-gradient(circle_at_top,_rgba(244,154,111,0.22),_rgba(246,241,234,0.95)_58%)] shadow-soft",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grain opacity-30" />
      <div className="absolute inset-x-[18%] top-[18%] h-[38%] rounded-full border border-outline/30 bg-white/40" />
      <div className="absolute inset-x-[24%] bottom-[14%] h-[32%] rounded-[46%_54%_48%_52%/55%_45%_55%_45%] border border-outline/30 bg-white/35" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-5 text-center">
        <span className="font-display text-3xl text-terracotta/75">{getInitials(name)}</span>
        <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
      </div>
    </div>
  );
}
