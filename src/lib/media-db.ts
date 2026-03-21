import fs from "node:fs/promises";
import path from "node:path";

import type { AdminMediaAsset, AdminMediaSection } from "@/lib/admin-media-types";
import { dbQuery } from "@/lib/db";
import { mediaAssets, mediaKeys, type MediaKey } from "@/lib/media";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface MediaAsset {
  id: string;
  fileKey: string;
  fileUrl: string;
  altText: string;
}

function buildSiteMediaAssets(): AdminMediaAsset[] {
  return mediaKeys.map((key) => ({
    id: `site-${key}`,
    fileKey: key,
    fileUrl: mediaAssets[key].src.src,
    altText: mediaAssets[key].alt.pt,
    source: "siteAsset" as const,
    sourceLabel: "Ativo do site",
    description:
      "Imagem estática já usada em páginas públicas e nos campos baseados em MediaKey.",
    isSelectable: true,
    isEditable: false,
  }));
}

async function buildGalleryAssets(): Promise<AdminMediaAsset[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  try {
    const entries = await fs.readdir(galleryDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => ({
        id: `gallery-${entry.name}`,
        fileKey: `gallery/${entry.name}`,
        fileUrl: `/gallery/${entry.name}`,
        altText: entry.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        source: "gallery" as const,
        sourceLabel: "Galeria pública",
        description:
          "Imagem publicada na galeria pública. Hoje segue como arquivo estático do repositório.",
        isSelectable: false,
        isEditable: false,
      }))
      .sort((left, right) => left.fileKey.localeCompare(right.fileKey));
  } catch {
    return [];
  }
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  const result = await dbQuery("SELECT * FROM cms_media ORDER BY created_at DESC");
  return result.rows.map((row: Record<string, unknown>) => ({
    id: String(row.id),
    fileKey: String(row.file_key),
    fileUrl: String(row.file_url),
    altText: String(row.alt_text || ""),
  }));
}

async function buildUploadAssets(): Promise<AdminMediaAsset[]> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const uploadAssets = new Map<string, AdminMediaAsset>();

  if (hasDatabaseUrl()) {
    try {
      const dbAssets = await getMediaAssets();

      dbAssets.forEach((asset) => {
        uploadAssets.set(asset.fileKey, {
          ...asset,
          source: "upload" as const,
          sourceLabel: "Upload CMS",
          description: "Arquivo enviado pelo painel e registrado em cms_media.",
          isSelectable: false,
          isEditable: true,
        });
      });
    } catch {
      // Ignore DB failures so the media library still shows static assets.
    }
  }

  try {
    const entries = await fs.readdir(uploadsDir, { withFileTypes: true });

    entries
      .filter((entry) => entry.isFile())
      .forEach((entry) => {
        if (uploadAssets.has(entry.name)) {
          return;
        }

        uploadAssets.set(entry.name, {
          id: `upload-file-${entry.name}`,
          fileKey: entry.name,
          fileUrl: `/uploads/${entry.name}`,
          altText: entry.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          source: "uploadFileOnly" as const,
          sourceLabel: "Upload sem cadastro",
          description:
            "Arquivo encontrado em /public/uploads, mas ainda não registrado em cms_media.",
          isSelectable: false,
          isEditable: false,
        });
      });
  } catch {
    // Missing uploads directory is fine.
  }

  return Array.from(uploadAssets.values()).sort((left, right) =>
    right.fileKey.localeCompare(left.fileKey),
  );
}

export function getSiteMediaSelectionAssets(keys?: readonly MediaKey[]): AdminMediaAsset[] {
  const assets = buildSiteMediaAssets();

  if (!keys?.length) {
    return assets;
  }

  const keySet = new Set(keys);
  return assets.filter((asset) => keySet.has(asset.fileKey as MediaKey));
}

export async function getAdminMediaSections(): Promise<AdminMediaSection[]> {
  const [galleryAssets, uploadAssets] = await Promise.all([
    buildGalleryAssets(),
    buildUploadAssets(),
  ]);

  return [
    {
      id: "site-assets",
      title: "Ativos usados no site",
      description:
        "Essas imagens já aparecem em páginas públicas e nos blocos que aceitam MediaKey. Elas ficam no repositório e não são editadas pelo CMS hoje.",
      items: buildSiteMediaAssets(),
    },
    {
      id: "gallery-assets",
      title: "Galeria pública",
      description:
        "Arquivos da galeria pública em /public/gallery. Estão visíveis aqui com miniaturas para revisão, mas seguem como arquivos estáticos do projeto.",
      items: galleryAssets,
    },
    {
      id: "uploads",
      title: "Uploads do painel",
      description:
        "Arquivos enviados pelo admin. Itens marcados como 'Upload sem cadastro' existiam em /public/uploads, mas não estavam na tabela cms_media.",
      items: uploadAssets,
    },
  ].filter((section) => section.items.length > 0);
}

export async function saveMediaAsset(input: {
  fileKey: string;
  fileUrl: string;
  altText: string;
  mimeType: string;
}) {
  await dbQuery(
    `
      INSERT INTO cms_media (file_key, file_url, alt_text, mime_type)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (file_key) DO UPDATE SET
        file_url = EXCLUDED.file_url,
        alt_text = EXCLUDED.alt_text,
        mime_type = EXCLUDED.mime_type
    `,
    [input.fileKey, input.fileUrl, input.altText, input.mimeType],
  );
}
