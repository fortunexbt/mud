import type { Locale } from "@/lib/i18n-config";

export type PageKey =
  | "home"
  | "about"
  | "classes"
  | "team"
  | "inquiry"
  | "blog"
  | "contact"
  | "privacy";

const routeDictionary = {
  home: { pt: [], es: [], en: [] },
  about: { pt: ["sobre"], es: ["sobre"], en: ["about"] },
  classes: { pt: ["aulas"], es: ["clases"], en: ["classes"] },
  team: { pt: ["equipe"], es: ["equipo"], en: ["team"] },
  inquiry: {
    pt: ["inscricao"],
    es: ["inscripcion"],
    en: ["enroll"],
  },
  blog: { pt: ["blog"], es: ["blog"], en: ["blog"] },
  contact: { pt: ["contato"], es: ["contacto"], en: ["contact"] },
  privacy: {
    pt: ["privacidade"],
    es: ["privacidad"],
    en: ["privacy"],
  },
} as const satisfies Record<PageKey, Record<Locale, string[]>>;

export type ResolvedRoute =
  | { type: "page"; page: PageKey }
  | { type: "blogPost"; slug: string };

export function getRouteSegments(locale: Locale, page: PageKey) {
  return routeDictionary[page][locale];
}

export function getLocalizedPath(
  locale: Locale,
  page: PageKey,
  options?: { slug?: string },
) {
  const base = `/${locale}/${getRouteSegments(locale, page).join("/")}`.replace(/\/$/, "");

  if (page === "home") {
    return `/${locale}`;
  }

  if (options?.slug && page === "blog") {
    return `${base}/${options.slug}`;
  }

  return base;
}

export function resolveRoute(locale: Locale, slug?: string[]): ResolvedRoute | null {
  if (!slug || slug.length === 0) {
    return { type: "page", page: "home" };
  }

  const blogSegment = getRouteSegments(locale, "blog")[0];

  if (slug[0] === blogSegment) {
    if (slug.length === 1) {
      return { type: "page", page: "blog" };
    }

    if (slug.length === 2) {
      return { type: "blogPost", slug: slug[1] };
    }

    return null;
  }

  const match = (Object.keys(routeDictionary) as PageKey[]).find((page) => {
    if (page === "home" || page === "blog") {
      return false;
    }

    const segments = routeDictionary[page][locale];
    return segments.length === slug.length && segments.every((segment, index) => segment === slug[index]);
  });

  if (!match) {
    return null;
  }

  return { type: "page", page: match };
}

export function getAllStaticRoutes() {
  return (Object.keys(routeDictionary) as PageKey[]).flatMap((page) =>
    (Object.keys(routeDictionary[page]) as Locale[]).map((locale) => ({
      locale,
      slug: routeDictionary[page][locale],
      page,
    })),
  );
}
