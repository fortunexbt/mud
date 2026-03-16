import { dbQuery } from "@/lib/db";

export interface MediaAsset {
  id: string;
  fileKey: string;
  fileUrl: string;
  altText: string;
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
        alt_text = EXCLUDED.alt_text
    `,
    [input.fileKey, input.fileUrl, input.altText, input.mimeType],
  );
}
