"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { clearAdminSession, createAdminSession, isValidAdminPassword, requireAdmin } from "@/lib/admin-auth";
import {
  authenticateAdminUser,
  createAdminUser,
  setAdminUserActive,
  updateAdminUserPassword,
  type AdminRole,
} from "@/lib/admin-users";
import {
  deleteAdminBlogPost,
  saveAdminBlogPost,
  type ManagedBlogPostStatus,
} from "@/lib/blog";
import { resetManagedFaq, saveManagedFaq } from "@/lib/faq-content";
import { resetManagedContactText, saveManagedContactText } from "@/lib/contact-content";
import { resetManagedExhibition, saveManagedExhibition } from "@/lib/exhibitions-content";
import { resetManagedHomeSection, saveManagedHomeSection, type HomeSectionKey } from "@/lib/home-content";
import { saveManagedSettings } from "@/lib/settings-content";
import { locales, type Locale, isLocale } from "@/lib/i18n-config";
import { translateText } from "@/lib/translate";
import { addLeadNote, type LeadStatus, updateLeadStatus } from "@/lib/leads";
import { mediaKeys, type MediaKey } from "@/lib/media";
import { resetManagedServiceTrack, saveManagedServiceTrack } from "@/lib/service-content";
import { resetManagedTeamMember, saveManagedTeamMember } from "@/lib/team-content";
import type { ClassTrack } from "@/content/site/types";
import { TeamMemberSchema, FaqSchema, ContactTextSchema, ExhibitionSchema } from "@/lib/cms-schemas";
import { validateFormData } from "@/lib/cms-validation";

const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "closed", "spam"];
const validBlogStatuses: ManagedBlogPostStatus[] = ["draft", "published"];
const validServiceKeys: ClassTrack["key"][] = ["adults", "kids", "oneOff", "wheel", "groups"];
const validAdminRoles: AdminRole[] = ["director", "editor"];

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (email) {
    const user = await authenticateAdminUser(email, password);
    if (!user) redirect("/admin/login?error=1");
    await createAdminSession({ userId: user.id, email: user.email });
    revalidatePath("/", "layout");
    redirect("/admin/leads");
  }

  if (!password || !isValidAdminPassword(password)) redirect("/admin/login?error=1");
  await createAdminSession();
  revalidatePath("/", "layout");
  redirect("/admin/leads");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const leadId = String(formData.get("leadId") || "").trim();
  const status = String(formData.get("status") || "").trim() as LeadStatus;
  if (!leadId || !validStatuses.includes(status)) redirect(`/admin/leads/${leadId}?error=status`);
  await updateLeadStatus(leadId, status);
  revalidatePath("/", "layout");
  redirect(`/admin/leads/${leadId}?saved=1`);
}

export async function addLeadNoteAction(formData: FormData) {
  await requireAdmin();
  const leadId = String(formData.get("leadId") || "").trim();
  const note = String(formData.get("note") || "").trim();
  if (!leadId || !note) redirect(`/admin/leads/${leadId}?error=note`);
  await addLeadNote({ leadId, body: note, authorLabel: "diretoria MUD" });
  revalidatePath("/", "layout");
  redirect(`/admin/leads/${leadId}?saved=1`);
}

export async function saveBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const localeValue = String(formData.get("locale") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const translationKey = String(formData.get("translationKey") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const contentMarkdown = String(formData.get("contentMarkdown") || "").trim();
  const publishedAt = String(formData.get("publishedAt") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const cover = String(formData.get("cover") || "").trim() as MediaKey;
  const status = String(formData.get("status") || "").trim() as ManagedBlogPostStatus;
  const authorLabel = String(formData.get("authorLabel") || "MUD").trim();
  const publishedAtIso = new Date(publishedAt).toISOString();

  if (!isLocale(localeValue) || !slug || !translationKey || !title || !excerpt || !contentMarkdown || !publishedAt || Number.isNaN(new Date(publishedAt).getTime()) || !category || !mediaKeys.includes(cover) || !validBlogStatuses.includes(status)) {
    redirect(id ? `/admin/content/blog/${id}?error=validation` : "/admin/content/blog/new?error=validation");
  }

  const saved = await saveAdminBlogPost({
    id: id || undefined,
    locale: localeValue,
    slug,
    translationKey,
    title,
    excerpt,
    contentMarkdown,
    publishedAt: publishedAtIso,
    category,
    cover,
    status,
    authorLabel,
  }).catch(() => null);

  if (!saved) redirect(id ? `/admin/content/blog/${id}?error=validation` : "/admin/content/blog/new?error=validation");
  revalidatePath("/", "layout");
  redirect(`/admin/content/blog/${saved.id}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/admin/content/blog?error=delete");
  await deleteAdminBlogPost(id);
  revalidatePath("/", "layout");
  redirect("/admin/content/blog?deleted=1");
}

export async function saveServiceTrackAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const serviceKey = String(formData.get("serviceKey") || "").trim() as ClassTrack["key"];
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const details = String(formData.get("details") || "").trim();
  const badge = String(formData.get("badge") || "").trim();
  const cta = String(formData.get("cta") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";

  if (!isLocale(localeValue) || !validServiceKeys.includes(serviceKey) || !title || !summary || !details || !badge || !cta || Number.isNaN(sortOrder)) {
    redirect(`/admin/content/services?locale=${isLocale(localeValue) ? localeValue : locales[0]}&error=validation`);
  }

  await saveManagedServiceTrack({
    locale: localeValue as Locale,
    serviceKey,
    title,
    summary,
    details,
    badge,
    cta,
    sortOrder,
    isActive,
  });

  revalidatePath("/", "layout");
  redirect(`/admin/content/services?locale=${localeValue}&saved=1`);
}

export async function resetServiceTrackAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const serviceKey = String(formData.get("serviceKey") || "").trim() as ClassTrack["key"];
  if (!isLocale(localeValue) || !validServiceKeys.includes(serviceKey)) redirect("/admin/content/services?error=reset");
  await resetManagedServiceTrack(localeValue as Locale, serviceKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/services?locale=${localeValue}&saved=1`);
}

export async function createAdminUserAction(formData: FormData) {
  const actor = await requireAdmin();
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "director").trim() as AdminRole;
  if (!fullName || !email || password.length < 10 || !validAdminRoles.includes(role)) redirect("/admin/users?error=create");
  if (actor.mode === "user" && actor.role !== "director") redirect("/admin/users?error=forbidden");
  const created = await createAdminUser({ fullName, email, password, role }).catch(() => null);
  if (!created) redirect("/admin/users?error=create");
  revalidatePath("/", "layout");
  redirect("/admin/users?saved=1");
}

export async function updateAdminUserPasswordAction(formData: FormData) {
  const actor = await requireAdmin();
  const userId = String(formData.get("userId") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!userId || password.length < 10) redirect("/admin/users?error=password");
  if (actor.mode === "user" && actor.role !== "director" && actor.id !== userId) redirect("/admin/users?error=forbidden");
  await updateAdminUserPassword(userId, password);
  revalidatePath("/", "layout");
  redirect("/admin/users?saved=1");
}

export async function toggleAdminUserAction(formData: FormData) {
  const actor = await requireAdmin();
  const userId = String(formData.get("userId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "").trim();
  if (!userId || !["true", "false"].includes(nextValue)) redirect("/admin/users?error=toggle");
  if (actor.mode === "user" && actor.role !== "director") redirect("/admin/users?error=forbidden");
  await setAdminUserActive(userId, nextValue === "true");
  revalidatePath("/", "layout");
  redirect("/admin/users?saved=1");
}

export async function saveTeamMemberAction(formData: FormData) {
  await requireAdmin();
  const validated = validateFormData(formData, TeamMemberSchema);
  const bio = validated.bio.split("\n\n").filter((p: string) => p.trim());
  const highlights = validated.highlights ? validated.highlights.split("\n").filter((h: string) => h.trim()) : [];
  await saveManagedTeamMember({
    ...validated,
    locale: validated.locale as Locale,
    bio,
    highlights,
  });
  revalidatePath("/", "layout");
  redirect(`/admin/content/team?locale=${validated.locale}&saved=1`);
}

export async function resetTeamMemberAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const memberKey = String(formData.get("memberKey") || "").trim();
  if (!isLocale(localeValue) || !memberKey) redirect("/admin/content/team?error=reset");
  await resetManagedTeamMember(localeValue as Locale, memberKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/team?locale=${localeValue}&saved=1`);
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  const validated = validateFormData(formData, FaqSchema);
  const autoTranslate = formData.get("autoTranslate") === "on";
  await saveManagedFaq({ ...validated, locale: validated.locale as Locale });
  let translationError = false;
  if (autoTranslate) {
    const targetLocales = locales.filter((l) => l !== validated.locale);
    for (const targetLocale of targetLocales) {
      const translatedQuestion = await translateText(validated.question, validated.locale, targetLocale);
      const translatedAnswer = await translateText(validated.answer, validated.locale, targetLocale);
      if (!translatedQuestion.success || !translatedAnswer.success) translationError = true;
      await saveManagedFaq({ ...validated, locale: targetLocale as Locale, question: translatedQuestion.text, answer: translatedAnswer.text });
    }
  }
  const queryParams = new URLSearchParams({ saved: "1" });
  if (translationError) queryParams.set("warning", "translation");
  revalidatePath("/", "layout");
  redirect(`/admin/content/faq?locale=${validated.locale}&${queryParams.toString()}`);
}

export async function resetFaqAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const faqKey = String(formData.get("faqKey") || "").trim();
  if (!isLocale(localeValue) || !faqKey) redirect("/admin/content/faq?error=reset");
  await resetManagedFaq(localeValue as Locale, faqKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/faq?locale=${localeValue}&saved=1`);
}

export async function saveContactTextAction(formData: FormData) {
  await requireAdmin();
  const validated = validateFormData(formData, ContactTextSchema);
  const autoTranslate = formData.get("autoTranslate") === "on";
  await saveManagedContactText({ ...validated, locale: validated.locale as Locale });
  let translationError = false;
  if (autoTranslate) {
    const targetLocales = locales.filter((l) => l !== validated.locale);
    for (const targetLocale of targetLocales) {
      const translatedTitle = await translateText(validated.title, validated.locale, targetLocale);
      const translatedBody = await translateText(validated.body, validated.locale, targetLocale);
      if (!translatedTitle.success || !translatedBody.success) translationError = true;
      await saveManagedContactText({ ...validated, locale: targetLocale as Locale, title: translatedTitle.text, body: translatedBody.text });
    }
  }
  const queryParams = new URLSearchParams({ saved: "1" });
  if (translationError) queryParams.set("warning", "translation");
  revalidatePath("/", "layout");
  redirect(`/admin/content/contact?locale=${validated.locale}&${queryParams.toString()}`);
}

export async function resetContactTextAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const sectionKey = String(formData.get("sectionKey") || "").trim() as "details" | "map" | "form";
  if (!isLocale(localeValue) || !["details", "map", "form"].includes(sectionKey)) redirect("/admin/content/contact?error=reset");
  await resetManagedContactText(localeValue as Locale, sectionKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/contact?locale=${localeValue}&saved=1`);
}

export async function saveExhibitionAction(formData: FormData) {
  await requireAdmin();
  const validated = validateFormData(formData, ExhibitionSchema);
  const autoTranslate = formData.get("autoTranslate") === "on";
  await saveManagedExhibition({ ...validated, locale: validated.locale as Locale });
  let translationError = false;
  if (autoTranslate) {
    const targetLocales = locales.filter((l) => l !== validated.locale);
    for (const targetLocale of targetLocales) {
      const translatedEditionLabel = await translateText(validated.editionLabel, validated.locale, targetLocale);
      const translatedTitle = await translateText(validated.title, validated.locale, targetLocale);
      const translatedDate = await translateText(validated.date, validated.locale, targetLocale);
      const translatedDescription = await translateText(validated.description, validated.locale, targetLocale);
      const joinedLocation = validated.location.join(" || ");
      const translatedJoinedLocation = await translateText(joinedLocation, validated.locale, targetLocale);
      if (!translatedEditionLabel.success || !translatedTitle.success || !translatedDate.success || !translatedDescription.success || !translatedJoinedLocation.success) translationError = true;
      const translatedLocation = translatedJoinedLocation.text.split("||").map((l) => l.trim());
      await saveManagedExhibition({ ...validated, locale: targetLocale as Locale, editionLabel: translatedEditionLabel.text, title: translatedTitle.text, date: translatedDate.text, description: translatedDescription.text, location: translatedLocation });
    }
  }
  const queryParams = new URLSearchParams({ saved: "1" });
  if (translationError) queryParams.set("warning", "translation");
  revalidatePath("/", "layout");
  redirect(`/admin/content/exhibitions?locale=${validated.locale}&${queryParams.toString()}`);
}

export async function resetExhibitionAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const exhibitionKey = String(formData.get("exhibitionKey") || "").trim();
  if (!isLocale(localeValue) || !exhibitionKey) redirect("/admin/content/exhibitions?error=reset");
  await resetManagedExhibition(localeValue as Locale, exhibitionKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/exhibitions?locale=${localeValue}&saved=1`);
}

export async function saveHomeSectionAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const sectionKey = String(formData.get("sectionKey") || "").trim() as HomeSectionKey;
  const contentJsonStr = String(formData.get("contentJson") || "").trim();
  const isActive = formData.get("isActive") === "on";
  if (!isLocale(localeValue) || !sectionKey || !contentJsonStr) redirect(`/admin/content/home?locale=${isLocale(localeValue) ? localeValue : locales[0]}&error=validation`);
  let contentJson: Record<string, unknown>;
  try { contentJson = JSON.parse(contentJsonStr); } catch { redirect(`/admin/content/home?locale=${localeValue}&error=json`); }
  await saveManagedHomeSection({ locale: localeValue as Locale, sectionKey, contentJson, isActive });
  revalidatePath("/", "layout");
  redirect(`/admin/content/home?locale=${localeValue}&saved=1`);
}

export async function resetHomeSectionAction(formData: FormData) {
  await requireAdmin();
  const localeValue = String(formData.get("locale") || "").trim();
  const sectionKey = String(formData.get("sectionKey") || "").trim() as HomeSectionKey;
  if (!isLocale(localeValue) || !sectionKey) redirect("/admin/content/home?error=reset");
  await resetManagedHomeSection(localeValue as Locale, sectionKey);
  revalidatePath("/", "layout");
  redirect(`/admin/content/home?locale=${localeValue}&saved=1`);
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const instagramUrl = String(formData.get("instagramUrl") || "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const hours = String(formData.get("hours") || "").trim();
  if (!instagramUrl || !whatsappNumber) redirect("/admin/settings?error=validation");
  await saveManagedSettings({ instagramUrl, whatsappNumber, email, hours });
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
