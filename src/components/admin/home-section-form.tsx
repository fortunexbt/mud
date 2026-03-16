"use client";

import { useState } from "react";
import { saveHomeSectionAction } from "@/app/admin/actions";
import type { Locale } from "@/lib/i18n-config";

export function HomeSectionForm({
  locale,
  sectionKey,
  initialContent,
  isActive,
}: {
  locale: Locale;
  sectionKey: string;
  initialContent: Record<string, unknown>;
  isActive: boolean;
}) {
  const [content, setContent] = useState<Record<string, unknown>>(initialContent);

  const handleStringChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    setContent((prev) => {
      const currentArr = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      const newArr = [...currentArr];
      newArr[index] = value;
      return { ...prev, [key]: newArr };
    });
  };

  const handleArrayAdd = (key: string) => {
    setContent((prev) => {
      const currentArr = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      return { ...prev, [key]: [...currentArr, ""] };
    });
  };

  const handleArrayRemove = (key: string, index: number) => {
    setContent((prev) => {
      const currentArr = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      const newArr = [...currentArr];
      newArr.splice(index, 1);
      return { ...prev, [key]: newArr };
    });
  };

  return (
    <form action={saveHomeSectionAction} className="mt-5 grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sectionKey" value={sectionKey} />
      <input type="hidden" name="contentJson" value={JSON.stringify(content)} />

      <div className="grid gap-4">
        {Object.entries(content).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key} className="space-y-3 rounded-[1.2rem] border border-outline/30 bg-surface/20 p-4">
                <p className="text-sm font-semibold capitalize text-ink">{key}</p>
                {value.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <textarea
                      value={item}
                      onChange={(e) => handleArrayChange(key, idx, e.target.value)}
                      className="min-h-[4rem] w-full rounded-[1rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove(key, idx)}
                      className="flex h-[4rem] w-[4rem] shrink-0 items-center justify-center rounded-[1rem] border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayAdd(key)}
                  className="text-sm font-medium text-terracotta hover:underline"
                >
                  + Adicionar item a {key}
                </button>
              </div>
            );
          }

          if (typeof value === "string") {
            return (
              <label key={key} className="grid gap-2 text-sm font-medium text-ink">
                <span className="capitalize">{key}</span>
                {value.length > 80 || key.includes("description") || key.includes("note") ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleStringChange(key, e.target.value)}
                    className="min-h-[6rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                ) : (
                  <input
                    value={value}
                    onChange={(e) => handleStringChange(key, e.target.value)}
                    className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                )}
              </label>
            );
          }

          return null; // Skip complex objects like classes
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-2">
        <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
          <input type="checkbox" name="isActive" defaultChecked={isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
          Exibir no site
        </label>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
          Salvar Seção
        </button>
      </div>
    </form>
  );
}
