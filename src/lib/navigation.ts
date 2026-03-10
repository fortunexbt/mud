import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import { getLocalizedPath, type PageKey } from "@/lib/routes";

export function getPagePaths(locale: Locale) {
  return {
    home: getLocalizedPath(locale, "home"),
    about: getLocalizedPath(locale, "about"),
    classes: getLocalizedPath(locale, "classes"),
    team: getLocalizedPath(locale, "team"),
    inquiry: getLocalizedPath(locale, "inquiry"),
    blog: getLocalizedPath(locale, "blog"),
    contact: getLocalizedPath(locale, "contact"),
    privacy: getLocalizedPath(locale, "privacy"),
  } satisfies Record<PageKey, string>;
}

export function getNavItems(locale: Locale, dictionary: SiteDictionary) {
  const paths = getPagePaths(locale);

  return [
    { label: dictionary.nav.home, href: paths.home, page: "home" },
    { label: dictionary.nav.about, href: paths.about, page: "about" },
    { label: dictionary.nav.classes, href: paths.classes, page: "classes" },
    { label: dictionary.nav.team, href: paths.team, page: "team" },
    { label: dictionary.nav.inquiry, href: paths.inquiry, page: "inquiry" },
    { label: dictionary.nav.blog, href: paths.blog, page: "blog" },
    { label: dictionary.nav.contact, href: paths.contact, page: "contact" },
  ] as const;
}
