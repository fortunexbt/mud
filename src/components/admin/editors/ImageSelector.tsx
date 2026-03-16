"use client";

import Image from "next/image";
import { mediaKeys, getMediaAsset } from "@/lib/media";

interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ImageSelector({ label, value, onChange }: ImageSelectorProps) {
  const selectedAsset = value ? getMediaAsset(value as any) : null;

  return (
    <div className="grid gap-4">
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

      {selectedAsset && (
        <div className="mt-2 rounded-[1.2rem] overflow-hidden border border-outline/30 w-32 h-32">
          <Image
            src={selectedAsset.src}
            alt={selectedAsset.alt}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
