import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n-config";

export type WhatsAppIntent =
  | "general"
  | "adults"
  | "kids"
  | "oneOff"
  | "wheel"
  | "groups";

const messages: Record<Locale, Record<WhatsAppIntent, string>> = {
  pt: {
    general:
      "Oi! Tenho interesse em uma aula de cerâmica na MUD. Pode me passar mais informações?",
    adults:
      "Oi! Tenho interesse nas aulas de cerâmica para adultos na MUD. Pode me passar mais informações?",
    kids:
      "Oi! Tenho interesse nas aulas de cerâmica para crianças na MUD. Pode me passar mais informações?",
    oneOff:
      "Oi! Tenho interesse na aula avulsa de cerâmica da MUD. Pode me passar mais informações?",
    wheel:
      "Oi! Tenho interesse nas aulas de torno da MUD. Pode me passar mais informações?",
    groups:
      "Oi! Tenho interesse em uma experiência de cerâmica para grupo, empresa ou evento na MUD. Pode me passar mais informações?",
  },
  es: {
    general:
      "¡Hola! Me interesa una clase de cerámica en MUD. ¿Podrían darme más información?",
    adults:
      "¡Hola! Me interesan las clases de cerámica para adultos en MUD. ¿Podrían darme más información?",
    kids:
      "¡Hola! Me interesan las clases de cerámica para niños en MUD. ¿Podrían darme más información?",
    oneOff:
      "¡Hola! Me interesa la clase suelta de cerámica de MUD. ¿Podrían darme más información?",
    wheel:
      "¡Hola! Me interesan las clases de torno cerámico en MUD. ¿Podrían darme más información?",
    groups:
      "¡Hola! Me interesa una experiencia de cerámica para grupos, empresas o eventos en MUD. ¿Podrían darme más información?",
  },
  en: {
    general:
      "Hi! I’m interested in a ceramics class at MUD. Could you send me more information?",
    adults:
      "Hi! I’m interested in the adult ceramics classes at MUD. Could you send me more information?",
    kids:
      "Hi! I’m interested in the kids ceramics classes at MUD. Could you send me more information?",
    oneOff:
      "Hi! I’m interested in the one-off ceramics class at MUD. Could you send me more information?",
    wheel:
      "Hi! I’m interested in the wheel-throwing classes at MUD. Could you send me more information?",
    groups:
      "Hi! I’m interested in a ceramics experience for a group, company, or event at MUD. Could you send me more information?",
  },
};

export function buildWhatsAppUrl(locale: Locale, intent: WhatsAppIntent = "general", customNumber?: string) {
  const numberToUse = customNumber || siteConfig.whatsappNumber;
  const number = numberToUse.replace(/\D/g, "");
  const text = encodeURIComponent(messages[locale][intent]);
  return `https://wa.me/${number}?text=${text}`;
}

export function getWhatsAppMessage(locale: Locale, intent: WhatsAppIntent = "general") {
  return messages[locale][intent];
}
