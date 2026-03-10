"use server";

import { redirect } from "next/navigation";

import { clearAdminSession, createAdminSession, isValidAdminPassword, requireAdmin } from "@/lib/admin-auth";
import {
  deleteAdminBlogPost,
  saveAdminBlogPost,
  type ManagedBlogPostStatus,
} from "@/lib/blog";
import { locales, type Locale, isLocale } from "@/lib/i18n-config";
import { addLeadNote, type LeadStatus, updateLeadStatus } from "@/lib/leads";
import { mediaKeys, type MediaKey } from "@/lib/media";
import { resetManagedServiceTrack, saveManagedServiceTrack } from "@/lib/service-content";
import type { ClassTrack } from "@/content/site/types";

const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "closed", "spam"];
const validBlogStatuses: ManagedBlogPostStatus[] = ["draft", "published"];
const validServiceKeys: ClassTrack["key"][] = ["adults", "kids", "oneOff", "wheel", "groups"];

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "").trim();

  if (!password || !isValidAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
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

  if (!leadId || !validStatuses.includes(status)) {
    redirect(`/admin/leads/${leadId}?error=status`);
  }

  await updateLeadStatus(leadId, status);
  redirect(`/admin/leads/${leadId}?saved=1`);
}

export async function addLeadNoteAction(formData: FormData) {
  await requireAdmin();

  const leadId = String(formData.get("leadId") || "").trim();
  const note = String(formData.get("note") || "").trim();

  if (!leadId || !note) {
    redirect(`/admin/leads/${leadId}?error=note`);
  }

  await addLeadNote({ leadId, body: note, authorLabel: "diretoria MUD" });
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

  if (
    !isLocale(localeValue)
    || !slug
    || !translationKey
    || !title
    || !excerpt
    || !contentMarkdown
    || !publishedAt
    || Number.isNaN(new Date(publishedAt).getTime())
    || !category
    || !mediaKeys.includes(cover)
    || !validBlogStatuses.includes(status)
  ) {
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
  });

  redirect(`/admin/content/blog/${saved.id}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "").trim();
  if (!id) {
    redirect("/admin/content/blog?error=delete");
  }

  await deleteAdminBlogPost(id);
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

  redirect(`/admin/content/services?locale=${localeValue}&saved=1`);
}

export async function resetServiceTrackAction(formData: FormData) {
  await requireAdmin();

  const localeValue = String(formData.get("locale") || "").trim();
  const serviceKey = String(formData.get("serviceKey") || "").trim() as ClassTrack["key"];

  if (!isLocale(localeValue) || !validServiceKeys.includes(serviceKey)) {
    redirect("/admin/content/services?error=reset");
  }

  await resetManagedServiceTrack(localeValue as Locale, serviceKey);
  redirect(`/admin/content/services?locale=${localeValue}&saved=1`);
}
