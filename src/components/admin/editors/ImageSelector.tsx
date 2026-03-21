"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { AdminMediaAsset } from "@/lib/admin-media-types";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
  label: string;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  assets: AdminMediaAsset[];
}

export function ImageSelector({
  label,
  name,
  value,
  onChange,
  assets,
}: ImageSelectorProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const selectedAsset = assets.find((asset) => asset.fileKey === selectedValue);

  const handleChange = (nextValue: string) => {
    setSelectedValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div className="grid gap-4">
      {name ? <input type="hidden" name={name} value={selectedValue} /> : null}

      <label className="grid gap-2 text-sm font-medium text-ink">
        <span>{label}</span>
        <select
          value={selectedValue}
          onChange={(event) => handleChange(event.target.value)}
          className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        >
          {assets.map((asset) => (
            <option key={asset.id} value={asset.fileKey}>
              {asset.altText} ({asset.fileKey})
            </option>
          ))}
        </select>
      </label>

      {selectedAsset ? (
        <div className="grid gap-3 rounded-[1.2rem] border border-outline/35 bg-surface/25 p-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
          <div className="relative aspect-square overflow-hidden rounded-[1rem] border border-outline/30 bg-sand">
            <Image
              src={selectedAsset.fileUrl}
              alt={selectedAsset.altText}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-ink">
              {selectedAsset.altText || selectedAsset.fileKey}
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-terracotta">
              {selectedAsset.sourceLabel}
            </p>
            <p className="font-mono text-[0.72rem] leading-6 text-muted">
              {selectedAsset.fileKey}
            </p>
            <p className="text-xs leading-6 text-muted">{selectedAsset.description}</p>
          </div>
        </div>
      ) : null}

      <details className="rounded-[1.2rem] border border-outline/35 bg-white/70 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          Ver miniaturas disponíveis
        </summary>
        <div className="mt-4 grid max-h-[26rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => {
            const isSelected = asset.fileKey === selectedValue;

            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleChange(asset.fileKey)}
                className={cn(
                  "grid gap-3 rounded-[1.1rem] border p-3 text-left transition",
                  isSelected
                    ? "border-terracotta bg-terracotta/8 shadow-soft"
                    : "border-outline/25 bg-surface/20 hover:border-terracotta/40 hover:bg-white",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-sand">
                  <Image
                    src={asset.fileUrl}
                    alt={asset.altText}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 12vw, (min-width: 640px) 22vw, 40vw"
                  />
                </div>
                <div className="space-y-1">
                  <p className="line-clamp-2 text-sm font-semibold text-ink">
                    {asset.altText || asset.fileKey}
                  </p>
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-terracotta">
                    {asset.sourceLabel}
                  </p>
                  <p className="font-mono text-[0.68rem] leading-5 text-muted">
                    {asset.fileKey}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
