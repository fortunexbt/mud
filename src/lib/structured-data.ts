import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n-config";
import { absoluteUrl } from "@/lib/utils";

export function buildOrganizationJsonLd(locale: Locale) {
  const address = siteConfig.address;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization", "School"],
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.url, "/icon-512.png"),
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    sameAs: [siteConfig.instagramUrl],
    telephone: `+${siteConfig.whatsappNumber}`,
    areaServed: ["Leblon", "Rio de Janeiro", "Brazil"],
    availableLanguage: locale === "pt" ? ["pt-BR", "es", "en"] : [locale, "pt-BR"],
  };
}

export function buildFaqJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildBlogPostingJsonLd(input: {
  title: string;
  description: string;
  publishedAt: string;
  locale: Locale;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    inLanguage: input.locale,
    mainEntityOfPage: absoluteUrl(siteConfig.url, input.path),
    image: absoluteUrl(siteConfig.url, input.image),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.url, "/icon-512.png"),
      },
    },
  };
}
