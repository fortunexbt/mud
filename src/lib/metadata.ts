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
  openGraphImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  twitterImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  languages?: Record<string, string>;
  openGraphType?: "website" | "article";
  section?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function buildMetadata({
  title,
  description,
  path,
  locale,
  image = "/icon-512.png",
  openGraphImage,
  twitterImage,
  languages,
  openGraphType = "website",
  section,
  publishedTime,
  authors,
  tags,
}: SeoInput): Metadata {
  const canonical = absoluteUrl(siteConfig.url, path);
  const resolvedOpenGraphImage = openGraphImage || {
    url: absoluteUrl(siteConfig.url, "/opengraph-image.png"),
    width: 1200,
    height: 630,
    alt: title,
  };
  const resolvedTwitterImage = twitterImage || {
    url: absoluteUrl(siteConfig.url, "/twitter-image.png"),
    width: 1600,
    height: 900,
    alt: title,
  };

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
      type: openGraphType,
      locale: {
        pt: "pt_BR",
        es: "es_ES",
        en: "en_US",
      }[locale],
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [resolvedOpenGraphImage],
      ...(section ? { section } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedTwitterImage],
    },
    category: section,
  };
}
