"use client";

import { useState } from "react";
import { saveHomeSectionAction } from "@/app/admin/actions";
import { SubmitButton } from "./SubmitButton";
import { TextEditor } from "./editors/TextEditor";
import { ListEditor } from "./editors/ListEditor";
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

  const handleUpdate = (key: string, value: unknown) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form action={saveHomeSectionAction} className="mt-5 grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sectionKey" value={sectionKey} />
      <input type="hidden" name="contentJson" value={JSON.stringify(content)} />

      <div className="grid gap-6">
        {Object.entries(content).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <ListEditor
                key={key}
                label={key}
                items={value as string[]}
                onChange={(items) => handleUpdate(key, items)}
              />
            );
          }

          if (typeof value === "string") {
            return (
              <TextEditor
                key={key}
                label={key}
                value={value}
                onChange={(val) => handleUpdate(key, val)}
                multiline={key.length > 50 || key.includes("description") || key.includes("paragraphs")}
              />
            );
          }

          return null;
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
          <input type="checkbox" name="isActive" defaultChecked={isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
          Exibir no site
        </label>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <SubmitButton label="Salvar Seção" />
      </div>
    </form>
  );
}
