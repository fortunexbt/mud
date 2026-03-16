"use client";

import { mediaKeys } from "@/lib/media";

interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ImageSelector({ label, value, onChange }: ImageSelectorProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
      >
        {mediaKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </label>
  );
}
