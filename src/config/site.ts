import type { Locale } from "@/lib/i18n-config";

export const siteConfig = {
  name: "MUD Escola de Cerâmica",
  shortName: "MUD",
  description:
    "Ceramics school and atelier in Leblon, Rio de Janeiro, with classes for adults, children, one-off experiences, and group inquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/mud_escoladeceramica",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5521991225879",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  hours: process.env.NEXT_PUBLIC_OPENING_HOURS || "",
  formsWebhookUrl: process.env.LEAD_WEBHOOK_URL || "",
  formsWebhookSecret: process.env.LEAD_WEBHOOK_SECRET || "",
  address: {
    street: "Rua Ataulfo de Paiva, 1174, Sobreloja 14/15",
    neighborhood: "Leblon",
    city: "Rio de Janeiro",
    state: "RJ",
    postalCode: "22440-035",
    country: "Brasil",
  },
  coordinates: {
    latitude: -22.9859,
    longitude: -43.2234,
  },
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.046413402483!2d-43.23198801626762!3d-22.985320687033628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd546f3a82613%3A0x19905dba8e9689e!2sMUD%20ESCOLA%20DE%20CER%C3%82MICA!5e0!3m2!1sen!2sit!4v1773080702607!5m2!1sen!2sit",
  mapsPlaceUrl:
    "https://www.google.com/maps/place/MUD+ESCOLA+DE+CER%C3%82MICA/@-22.9853207,-43.231988,17z/",
  mapsQuery:
    "Rua Ataulfo de Paiva, 1174, Sobreloja 14/15, Leblon, Rio de Janeiro, RJ, Brasil, 22440-035",
};

export function getLocalizedBusinessType(locale: Locale) {
  if (locale === "pt") return "escola e atelier de cerâmica";
  if (locale === "es") return "escuela y atelier de cerámica";
  return "ceramics school and atelier";
}

export function hasLeadRoutingConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim() || siteConfig.formsWebhookUrl);
}
