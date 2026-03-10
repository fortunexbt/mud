import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import type { PageKey } from "@/lib/routes";

export interface PageContext {
  locale: Locale;
  dictionary: SiteDictionary;
  paths: Record<PageKey, string>;
  whatsappHref: string;
  configured: boolean;
}
