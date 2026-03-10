import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n-config";
import { absoluteUrl } from "@/lib/utils";

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  languages?: Record<string, string>;
}

export function buildMetadata({
  title,
  description,
  path,
  locale,
  image = "/icon-512.png",
  languages,
}: SeoInput): Metadata {
  const canonical = absoluteUrl(siteConfig.url, path);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical,
      languages:
        languages || {
          pt: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/pt")),
          es: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/es")),
          en: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/en")),
          "x-default": absoluteUrl(siteConfig.url, "/pt"),
        },
    },
    openGraph: {
      type: "website",
      locale,
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(siteConfig.url, image), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.url, image)],
    },
  };
}
