"use client";

import { useState } from "react";

import { saveExhibitionAction } from "@/app/admin/actions";
import type { AdminMediaAsset } from "@/lib/admin-media-types";
import type { Locale } from "@/lib/i18n-config";

import { TextEditor } from "./editors/TextEditor";
import { ListEditor } from "./editors/ListEditor";
import { ImageSelector } from "./editors/ImageSelector";

export function ExhibitionEditor({
  locale,
  initialData,
  assets,
}: {
  locale: Locale;
  initialData: Record<string, unknown>;
  assets: AdminMediaAsset[];
}) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);

  const update = (key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form action={saveExhibitionAction} className="mt-5 grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="exhibitionKey" value={data.exhibitionKey as string} />

      <div className="grid gap-4 md:grid-cols-2">
        <TextEditor name="year" label="Ano" value={data.year as string} onChange={(val) => update("year", val)} />
        <TextEditor name="editionLabel" label="Selo da Edição" value={data.editionLabel as string} onChange={(val) => update("editionLabel", val)} />
        <TextEditor name="title" label="Título" value={data.title as string} onChange={(val) => update("title", val)} />
        <TextEditor name="date" label="Data" value={data.date as string} onChange={(val) => update("date", val)} />
        <div className="md:col-span-2">
          <ImageSelector name="posterKey" label="Pôster" value={data.posterKey as string} onChange={(val) => update("posterKey", val)} assets={assets} />
        </div>
        <div className="md:col-span-2">
          <TextEditor name="description" label="Descrição" value={data.description as string} onChange={(val) => update("description", val)} multiline />
        </div>
        <div className="md:col-span-2">
          <ListEditor name="location" label="Localização" items={data.location as string[]} onChange={(val) => update("location", val)} />
        </div>
        <label className="grid gap-2 text-sm font-medium text-ink">
          <span>Ordem</span>
          <input type="number" name="sortOrder" defaultValue={data.sortOrder as number} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-2">
        <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
          <input type="checkbox" name="isActive" defaultChecked={!!data.isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
          Exibir no site
        </label>
        
        <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-900">
          <input type="checkbox" name="autoTranslate" className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
          Auto-traduzir (usar IA)
        </label>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
          Salvar Exposição
        </button>
      </div>
    </form>
  );
}
