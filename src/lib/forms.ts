import { z } from "zod";

export const interests = ["adults", "kids", "oneOff", "wheel", "groups"] as const;
export const preferredLanguages = ["pt", "es", "en"] as const;

export const leadSchema = z.object({
  formType: z.enum(["contact", "inquiry"]),
  locale: z.enum(["pt", "es", "en"]),
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(8).max(40),
  message: z.string().trim().min(10).max(1200),
  interest: z.enum(interests).optional(),
  preferredLanguage: z.enum(preferredLanguages).optional(),
  availability: z.string().trim().max(160).optional(),
  foundUs: z.string().trim().max(120).optional(),
  childAge: z.string().trim().max(40).optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
  pagePath: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(300).optional(),
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  utmTerm: z.string().trim().max(120).optional(),
  utmContent: z.string().trim().max(120).optional(),
  company: z.string().trim().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
