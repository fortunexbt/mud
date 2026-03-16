import { enDictionary } from "@/content/site/en";
import { esDictionary } from "@/content/site/es";
import { ptDictionary } from "@/content/site/pt";
import type { SiteDictionary } from "@/content/site/types";
import type { Locale } from "@/lib/i18n-config";
import { deepMerge } from "@/lib/deep-merge";

const dictionaries: Record<Locale, SiteDictionary> = {
  pt: ptDictionary,
  es: esDictionary,
  en: enDictionary,
};

export interface DictionaryOverrides {
  team?: Partial<SiteDictionary["team"]>;
  classes?: Partial<SiteDictionary["classes"]>;
  contact?: Partial<SiteDictionary["contact"]>;
  about?: Partial<SiteDictionary["about"]>;
  home?: Partial<SiteDictionary["home"]>;
}

export function getDictionary(locale: Locale, overrides?: DictionaryOverrides): SiteDictionary {
  const base = dictionaries[locale];
  
  if (!overrides) {
    return base;
  }

  // Deep merge overrides to ensure structural integrity
  return deepMerge(base, overrides) as SiteDictionary;
}

export type { SiteDictionary } from "@/content/site/types";
