import { z } from "zod";

export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.array(z.string()).min(1, "At least one bio paragraph is required"),
  imageKey: z.string().min(1, "Image is required"),
  sortOrder: z.coerce.number().int(),
  isFeatured: z.boolean(),
  tagline: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  isActive: z.boolean(),
});

export const FaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  sortOrder: z.coerce.number().int(),
  isActive: z.boolean(),
});

export const ContactTextSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body content is required"),
});

export const ExhibitionSchema = z.object({
  year: z.string().min(1, "Year is required"),
  editionLabel: z.string().min(1, "Edition label is required"),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.array(z.string()).min(1, "At least one location is required"),
  description: z.string().min(1, "Description is required"),
  posterKey: z.string().min(1, "Poster image is required"),
  sortOrder: z.coerce.number().int(),
  isActive: z.boolean(),
});

export const SettingsSchema = z.object({
  instagramUrl: z.string().url("Must be a valid URL"),
  whatsappNumber: z.string().min(10, "Must be a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  hours: z.string().optional(),
});
