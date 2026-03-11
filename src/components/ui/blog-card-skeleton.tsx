export function BlogCardSkeleton({ variant = "featured" }: { variant?: "featured" | "compact" }) {
  if (variant === "compact") {
    return (
      <article className="overflow-hidden rounded-[1.65rem] border border-outline/45 bg-white/50 p-4 shadow-soft sm:p-5 animate-pulse">
        <div className="aspect-[16/10] w-full bg-outline/20 rounded-[1.2rem]" />
        <div className="mt-4 space-y-3">
          <div className="h-3 w-1/3 bg-outline/30 rounded" />
          <div className="h-8 w-3/4 bg-outline/40 rounded" />
          <div className="h-16 w-full bg-outline/20 rounded" />
          <div className="h-4 w-1/4 bg-outline/30 rounded" />
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-4 overflow-hidden rounded-[1.85rem] border border-outline/45 bg-white/50 p-4 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:items-start animate-pulse">
      <div className="aspect-[16/11] w-full bg-outline/20 rounded-[1.4rem]" />
      <div className="flex flex-col gap-4 p-1 sm:p-2">
        <div className="h-3 w-1/4 bg-outline/30 rounded" />
        <div className="h-10 w-2/3 bg-outline/40 rounded" />
        <div className="h-24 w-full bg-outline/20 rounded" />
        <div className="h-4 w-1/4 bg-outline/30 rounded" />
      </div>
    </article>
  );
}
