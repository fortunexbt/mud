"use client";

import Image from "next/image";
import { type MediaAsset } from "@/lib/media-db";

interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  assets: MediaAsset[];
}

export function ImageSelector({ label, value, onChange, assets }: ImageSelectorProps) {
  const selectedAsset = assets.find(a => a.fileKey === value);

  return (
    <div className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-ink">
        <span>{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        >
          {assets.map((asset) => (
            <option key={asset.id} value={asset.fileKey}>
              {asset.altText}
            </option>
          ))}
        </select>
      </label>

      {selectedAsset && (
        <div className="mt-2 rounded-[1.2rem] overflow-hidden border border-outline/30 w-32 h-32 relative">
          <Image
            src={selectedAsset.fileUrl}
            alt={selectedAsset.altText}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
