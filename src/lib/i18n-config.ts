export const locales = ["pt", "es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeCookieName = "MUD_LOCALE";

export const localeLabels: Record<Locale, string> = {
  pt: "Português",
  es: "Español",
  en: "English",
};

const spanishCountryCodes = new Set([
  "ar",
  "bo",
  "cl",
  "co",
  "cr",
  "cu",
  "do",
  "ec",
  "es",
  "gq",
  "gt",
  "hn",
  "mx",
  "ni",
  "pa",
  "pe",
  "pr",
  "py",
  "sv",
  "uy",
  "ve",
]);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocaleFromHeader(value: string | null) {
  if (!value) {
    return null;
  }

  const candidates = value
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    if (candidate.startsWith("pt")) {
      return "pt" satisfies Locale;
    }

    if (candidate.startsWith("es")) {
      return "es" satisfies Locale;
    }
  }

  return null;
}

export function resolveLocaleFromCountry(value: string | null) {
  if (!value) {
    return null;
  }

  const country = value.toLowerCase();

  if (country === "br" || country === "pt") {
    return "pt" satisfies Locale;
  }

  if (spanishCountryCodes.has(country)) {
    return "es" satisfies Locale;
  }

  return null;
}
