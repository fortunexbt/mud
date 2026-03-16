/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminTableProps<T> {
  columns: { header: string; accessor: (item: T) => ReactNode }[];
  data: T[];
  emptyMessage?: string;
  rowHref?: (item: T) => string;
}

export function AdminTable<T>({ columns, data, emptyMessage = "Nenhum registro encontrado.", rowHref }: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-outline/50 shadow-soft">
      <div className="hidden gap-4 bg-surface/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted md:grid md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
        {columns.map((col, idx) => (
          <span key={idx}>{col.header}</span>
        ))}
      </div>
      {data.length > 0 ? (
        <div className="divide-y divide-outline/40 bg-white">
          {data.map((item, idx) => {
            const Element = rowHref ? "a" : "div";
            const props = rowHref ? { href: rowHref(item), className: "grid gap-3 px-5 py-4 transition hover:bg-surface/28 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:items-center md:gap-4" } : { className: "grid gap-3 px-5 py-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:items-center md:gap-4" };

            return (
              <Element key={idx} {...props}>
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="text-sm text-muted">
                    {col.accessor(item)}
                  </div>
                ))}
              </Element>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-10 text-sm text-muted bg-white">{emptyMessage}</div>
      )}
    </div>
  );
}
