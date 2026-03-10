import { enDictionary } from "@/content/site/en";
import { esDictionary } from "@/content/site/es";
import { ptDictionary } from "@/content/site/pt";
import type { SiteDictionary } from "@/content/site/types";
import type { Locale } from "@/lib/i18n-config";

const dictionaries: Record<Locale, SiteDictionary> = {
  pt: ptDictionary,
  es: esDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type { SiteDictionary } from "@/content/site/types";
