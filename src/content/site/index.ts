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

export interface DictionaryOverrides {
  team?: {
    founderRole?: string;
    founderBio?: string[];
    featuredMember?: SiteDictionary["team"]["featuredMember"];
    members?: SiteDictionary["team"]["members"];
  };
}

export function getDictionary(locale: Locale, overrides?: DictionaryOverrides): SiteDictionary {
  const base = dictionaries[locale];
  
  if (!overrides) {
    return base;
  }

  return {
    ...base,
    team: {
      ...base.team,
      ...overrides.team,
    },
  };
}

export type { SiteDictionary } from "@/content/site/types";
