export type AdminMediaSource = "siteAsset" | "gallery" | "upload" | "uploadFileOnly";

export interface AdminMediaAsset {
  id: string;
  fileKey: string;
  fileUrl: string;
  altText: string;
  source: AdminMediaSource;
  sourceLabel: string;
  description: string;
  isSelectable: boolean;
  isEditable: boolean;
}

export interface AdminMediaSection {
  id: string;
  title: string;
  description: string;
  items: AdminMediaAsset[];
}
