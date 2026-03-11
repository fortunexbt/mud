import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/site";
import { getPostBySlug, getPostTranslations, type BlogPost } from "@/lib/blog";
import { isLocale, localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { buildMetadata } from "@/lib/metadata";
import { getMediaAsset, type MediaKey } from "@/lib/media";
import { getLocalizedPath, resolveRoute, type PageKey } from "@/lib/routes";
import { absoluteUrl } from "@/lib/utils";

type SocialTheme = {
  eyebrow: string;
  chips: string[];
  mediaKey: MediaKey;
  accentFrom: string;
  accentTo: string;
  surface: string;
};

export interface SocialCardData {
  eyebrow: string;
  title: string;
  description: string;
  localeLabel: string;
  pageLabel: string;
  pathLabel: string;
  chips: string[];
  mediaUrl: string;
  mediaAlt: string;
  accentFrom: string;
  accentTo: string;
  surface: string;
}

export interface ResolvedSocialMetadata {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  languages: Record<string, string>;
  openGraphType: "website" | "article";
  section?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  card: SocialCardData;
}

const pageThemes: Record<Locale, Record<PageKey, SocialTheme>> = {
  pt: {
    home: {
      eyebrow: "Escola + ateliê de cerâmica",
      chips: ["Rio de Janeiro", "Adultos + crianças", "Ritmo acolhedor de ateliê"],
      mediaKey: "heroProcess",
      accentFrom: "#d7a27a",
      accentTo: "#6f8f83",
      surface: "#f4ece2",
    },
    about: {
      eyebrow: "História do ateliê",
      chips: ["Pedagogia", "Exposições", "Prática artesanal"],
      mediaKey: "founderPortrait",
      accentFrom: "#b56f52",
      accentTo: "#7b8f83",
      surface: "#f3e9de",
    },
    classes: {
      eyebrow: "Percursos de aprendizagem",
      chips: ["Modelagem", "Torno", "Avulsa + grupos"],
      mediaKey: "brandSeal",
      accentFrom: "#b86845",
      accentTo: "#7aa08f",
      surface: "#f6ecdf",
    },
    team: {
      eyebrow: "Artistas + educadoras",
      chips: ["Acompanhamento", "Turmas pequenas", "Orientação de ateliê"],
      mediaKey: "doloresPortrait",
      accentFrom: "#a45d49",
      accentTo: "#647b75",
      surface: "#f2e7da",
    },
    inquiry: {
      eyebrow: "Comece sua inscrição",
      chips: ["Contato rápido", "Horários flexíveis", "Retorno por WhatsApp"],
      mediaKey: "brandTag",
      accentFrom: "#bb744f",
      accentTo: "#6f887d",
      surface: "#f5eadf",
    },
    blog: {
      eyebrow: "Blog + reflexões",
      chips: ["Notas de processo", "Cultura de ateliê", "Prática cerâmica"],
      mediaKey: "legacyBlogHeader",
      accentFrom: "#b67852",
      accentTo: "#5f7b75",
      surface: "#f4eadf",
    },
    contact: {
      eyebrow: "Visite o ateliê",
      chips: ["Leblon", "Mapa + rotas", "Contato direto"],
      mediaKey: "processHands",
      accentFrom: "#c27a57",
      accentTo: "#6c8c84",
      surface: "#f4eadf",
    },
    privacy: {
      eyebrow: "Privacidade + confiança",
      chips: ["Políticas claras", "Contato seguro", "Uso respeitoso de dados"],
      mediaKey: "moodboard",
      accentFrom: "#8d654f",
      accentTo: "#556d69",
      surface: "#eee3d7",
    },
  },
  es: {
    home: {
      eyebrow: "Escuela + atelier de cerámica",
      chips: ["Río de Janeiro", "Adultos + niños", "Ritmo cálido de atelier"],
      mediaKey: "heroProcess",
      accentFrom: "#d7a27a",
      accentTo: "#6f8f83",
      surface: "#f4ece2",
    },
    about: {
      eyebrow: "Historia del atelier",
      chips: ["Pedagogía", "Exposiciones", "Práctica artesanal"],
      mediaKey: "founderPortrait",
      accentFrom: "#b56f52",
      accentTo: "#7b8f83",
      surface: "#f3e9de",
    },
    classes: {
      eyebrow: "Recorridos de aprendizaje",
      chips: ["Modelado", "Torno", "Suelta + grupos"],
      mediaKey: "brandSeal",
      accentFrom: "#b86845",
      accentTo: "#7aa08f",
      surface: "#f6ecdf",
    },
    team: {
      eyebrow: "Artistas + educadoras",
      chips: ["Acompañamiento", "Grupos pequeños", "Guía de atelier"],
      mediaKey: "doloresPortrait",
      accentFrom: "#a45d49",
      accentTo: "#647b75",
      surface: "#f2e7da",
    },
    inquiry: {
      eyebrow: "Comienza tu inscripción",
      chips: ["Contacto rápido", "Horarios flexibles", "Seguimiento por WhatsApp"],
      mediaKey: "brandTag",
      accentFrom: "#bb744f",
      accentTo: "#6f887d",
      surface: "#f5eadf",
    },
    blog: {
      eyebrow: "Blog + reflexiones",
      chips: ["Notas de proceso", "Cultura de atelier", "Práctica cerámica"],
      mediaKey: "legacyBlogHeader",
      accentFrom: "#b67852",
      accentTo: "#5f7b75",
      surface: "#f4eadf",
    },
    contact: {
      eyebrow: "Visita el atelier",
      chips: ["Leblon", "Mapa + rutas", "Contacto directo"],
      mediaKey: "processHands",
      accentFrom: "#c27a57",
      accentTo: "#6c8c84",
      surface: "#f4eadf",
    },
    privacy: {
      eyebrow: "Privacidad + confianza",
      chips: ["Políticas claras", "Contacto seguro", "Uso respetuoso de datos"],
      mediaKey: "moodboard",
      accentFrom: "#8d654f",
      accentTo: "#556d69",
      surface: "#eee3d7",
    },
  },
  en: {
    home: {
      eyebrow: "Ceramics school + atelier",
      chips: ["Rio de Janeiro", "Adults + kids", "Warm studio rhythm"],
      mediaKey: "heroProcess",
      accentFrom: "#d7a27a",
      accentTo: "#6f8f83",
      surface: "#f4ece2",
    },
    about: {
      eyebrow: "Studio story",
      chips: ["Pedagogy", "Exhibitions", "Handcrafted practice"],
      mediaKey: "founderPortrait",
      accentFrom: "#b56f52",
      accentTo: "#7b8f83",
      surface: "#f3e9de",
    },
    classes: {
      eyebrow: "Learning pathways",
      chips: ["Handbuilding", "Wheel", "One-off + groups"],
      mediaKey: "brandSeal",
      accentFrom: "#b86845",
      accentTo: "#7aa08f",
      surface: "#f6ecdf",
    },
    team: {
      eyebrow: "Artists + educators",
      chips: ["Mentorship", "Small groups", "Studio guidance"],
      mediaKey: "doloresPortrait",
      accentFrom: "#a45d49",
      accentTo: "#647b75",
      surface: "#f2e7da",
    },
    inquiry: {
      eyebrow: "Start your enrollment",
      chips: ["Fast contact", "Flexible schedules", "WhatsApp follow-up"],
      mediaKey: "brandTag",
      accentFrom: "#bb744f",
      accentTo: "#6f887d",
      surface: "#f5eadf",
    },
    blog: {
      eyebrow: "Journal + reflections",
      chips: ["Process notes", "Studio culture", "Ceramic practice"],
      mediaKey: "legacyBlogHeader",
      accentFrom: "#b67852",
      accentTo: "#5f7b75",
      surface: "#f4eadf",
    },
    contact: {
      eyebrow: "Visit the studio",
      chips: ["Leblon", "Map + directions", "Direct contact"],
      mediaKey: "processHands",
      accentFrom: "#c27a57",
      accentTo: "#6c8c84",
      surface: "#f4eadf",
    },
    privacy: {
      eyebrow: "Privacy + trust",
      chips: ["Clear policies", "Contact safety", "Respectful data use"],
      mediaKey: "moodboard",
      accentFrom: "#8d654f",
      accentTo: "#556d69",
      surface: "#eee3d7",
    },
  },
};

function getPageTheme(locale: Locale, page: PageKey) {
  return pageThemes[locale][page];
}

function getPageLabel(locale: Locale, page: PageKey) {
  const dictionary = getDictionary(locale);

  switch (page) {
    case "home":
      return dictionary.nav.home;
    case "about":
      return dictionary.nav.about;
    case "classes":
      return dictionary.nav.classes;
    case "team":
      return dictionary.nav.team;
    case "inquiry":
      return dictionary.nav.inquiry;
    case "blog":
      return dictionary.nav.blog;
    case "contact":
      return dictionary.nav.contact;
    case "privacy":
      return dictionary.footer.privacy;
  }
}

function getPathLabel(path: string) {
  return path === "/pt" || path === "/es" || path === "/en" ? "/" : path.replace(/^\/(pt|es|en)/, "") || "/";
}

function getPathSlug(path: string) {
  return path.replace(/^\/(pt|es|en)\/?/, "");
}

function getSocialImageUrl(locale: Locale, path: string, kind: "opengraph" | "twitter") {
  const slug = getPathSlug(path);
  const searchParams = new URLSearchParams({ locale });

  if (slug) {
    searchParams.set("slug", slug);
  }

  return absoluteUrl(siteConfig.url, `/api/${kind}?${searchParams.toString()}`);
}

function getAssetUrl(key: MediaKey) {
  const asset = getMediaAsset(key);

  return {
    url: absoluteUrl(siteConfig.url, asset.src.src),
    alt: asset.alt,
  };
}

function buildStaticLanguages(path: string) {
  return {
    pt: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/pt")),
    es: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/es")),
    en: absoluteUrl(siteConfig.url, path.replace(/^\/(pt|es|en)/, "/en")),
    "x-default": absoluteUrl(siteConfig.url, "/pt"),
  };
}

function formatPublishedLabel(locale: Locale, publishedAt: string) {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(publishedAt));
}

function buildPageCard(locale: Locale, page: PageKey, path: string, title: string, description: string): SocialCardData {
  const theme = getPageTheme(locale, page);
  const asset = getAssetUrl(theme.mediaKey);

  return {
    eyebrow: theme.eyebrow,
    title,
    description,
    localeLabel: localeLabels[locale],
    pageLabel: getPageLabel(locale, page),
    pathLabel: getPathLabel(path),
    chips: theme.chips,
    mediaUrl: asset.url,
    mediaAlt: asset.alt,
    accentFrom: theme.accentFrom,
    accentTo: theme.accentTo,
    surface: theme.surface,
  };
}

function buildBlogCard(locale: Locale, path: string, title: string, description: string, post: BlogPost): SocialCardData {
  const asset = getAssetUrl(post.cover);
  const theme = getPageTheme(locale, "blog");

  return {
    eyebrow: post.category,
    title,
    description,
    localeLabel: localeLabels[locale],
    pageLabel: getPageLabel(locale, "blog"),
    pathLabel: getPathLabel(path),
    chips: [post.readTime, formatPublishedLabel(locale, post.publishedAt), siteConfig.shortName],
    mediaUrl: asset.url,
    mediaAlt: asset.alt,
    accentFrom: theme.accentFrom,
    accentTo: theme.accentTo,
    surface: theme.surface,
  };
}

export async function resolveSocialMetadata(input: {
  localeParam: string;
  slug?: string[];
}): Promise<ResolvedSocialMetadata> {
  const { localeParam, slug = [] } = input;
  const locale = isLocale(localeParam) ? localeParam : "pt";
  const dictionary = getDictionary(locale);
  const route = resolveRoute(locale, slug);
  const fallbackPath = `/${locale}/${slug.join("/")}`.replace(/\/$/, "");

  if (!route) {
    return {
      title: dictionary.seo.pages.notFound.title,
      description: dictionary.seo.pages.notFound.description,
      locale,
      path: fallbackPath || `/${locale}`,
      languages: buildStaticLanguages(fallbackPath || `/${locale}`),
      openGraphType: "website",
      card: buildPageCard(
        locale,
        "home",
        fallbackPath || `/${locale}`,
        dictionary.seo.pages.notFound.title,
        dictionary.seo.pages.notFound.description,
      ),
    };
  }

  if (route.type === "blogPost") {
    const post = await getPostBySlug(locale, route.slug);

    if (!post) {
      return {
        title: dictionary.seo.pages.notFound.title,
        description: dictionary.seo.pages.notFound.description,
        locale,
        path: fallbackPath || `/${locale}`,
        languages: buildStaticLanguages(fallbackPath || `/${locale}`),
        openGraphType: "website",
        card: buildPageCard(
          locale,
          "home",
          fallbackPath || `/${locale}`,
          dictionary.seo.pages.notFound.title,
          dictionary.seo.pages.notFound.description,
        ),
      };
    }

    const path = getLocalizedPath(locale, "blog", { slug: post.slug });
    const translations = await getPostTranslations(post.translationKey);
    const languages = Object.fromEntries(
      translations.map((entry) => [
        entry.locale,
        absoluteUrl(siteConfig.url, getLocalizedPath(entry.locale, "blog", { slug: entry.slug })),
      ]),
    ) as Record<string, string>;

    languages["x-default"] = languages.pt || absoluteUrl(siteConfig.url, "/pt");

    return {
      title: `${post.title} | ${siteConfig.shortName}`,
      description: post.excerpt,
      locale,
      path,
      languages,
      openGraphType: "article",
      section: post.category,
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
      tags: [post.category, siteConfig.shortName, localeLabels[locale]],
      card: buildBlogCard(locale, path, `${post.title} | ${siteConfig.shortName}`, post.excerpt, post),
    };
  }

  const page = route.page;
  const path = getLocalizedPath(locale, page);
  const pagePaths = Object.fromEntries(locales.map((entryLocale) => [entryLocale, getLocalizedPath(entryLocale, page)]));

  return {
    title: dictionary.seo.pages[page].title,
    description: dictionary.seo.pages[page].description,
    locale,
    path,
    languages: {
      ...Object.fromEntries(
        Object.entries(pagePaths).map(([key, value]) => [key, absoluteUrl(siteConfig.url, value)]),
      ),
      "x-default": absoluteUrl(siteConfig.url, pagePaths.pt),
    },
    openGraphType: "website",
    card: buildPageCard(locale, page, path, dictionary.seo.pages[page].title, dictionary.seo.pages[page].description),
  };
}

export function buildResolvedMetadata(data: ResolvedSocialMetadata) {
  const openGraphImage = getSocialImageUrl(data.locale, data.path, "opengraph");
  const twitterImage = getSocialImageUrl(data.locale, data.path, "twitter");

  return buildMetadata({
    title: data.title,
    description: data.description,
    path: data.path,
    locale: data.locale,
    languages: data.languages,
    openGraphType: data.openGraphType,
    section: data.section,
    publishedTime: data.publishedTime,
    authors: data.authors,
    tags: data.tags,
    openGraphImage: {
      url: openGraphImage,
      width: 1200,
      height: 630,
      alt: data.card.mediaAlt,
    },
    twitterImage: {
      url: twitterImage,
      width: 1600,
      height: 900,
      alt: data.card.mediaAlt,
    },
  });
}
