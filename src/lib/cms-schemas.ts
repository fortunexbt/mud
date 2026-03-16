import { z } from "zod";

export const TeamMemberSchema = z.object({
  locale: z.string(),
  memberKey: z.string(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"), // Keep as raw string for validation, split later
  imageKey: z.string().min(1, "Image is required"),
  sortOrder: z.coerce.number().int(),
  isFeatured: z.boolean().default(false),
  tagline: z.string().optional(),
  highlights: z.string().optional(), // Keep as raw string for validation, split later
  isActive: z.boolean().default(true),
});

export const ExhibitionSchema = z.object({
  locale: z.string(),
  exhibitionKey: z.string(),
  year: z.string().min(1, "Year is required"),
  editionLabel: z.string().min(1, "Edition label is required"),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.array(z.string()).min(1, "At least one location is required"),
  description: z.string().min(1, "Description is required"),
  posterKey: z.string().min(1, "Poster image is required"),
  sortOrder: z.coerce.number().int(),
  isActive: z.boolean().default(true),
});

export const FaqSchema = z.object({
  locale: z.string(),
  faqKey: z.string(),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  sortOrder: z.coerce.number().int(),
  isActive: z.boolean().default(true),
});

export const ContactTextSchema = z.object({
  locale: z.string(),
  sectionKey: z.enum(["details", "map", "form"]),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body content is required"),
});

export const SettingsSchema = z.object({
  instagramUrl: z.string().url("Must be a valid URL"),
  whatsappNumber: z.string().min(10, "Must be a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  hours: z.string().optional(),
});
