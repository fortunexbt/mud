"use server";

import { redirect } from "next/navigation";

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
import { locales, type Locale, isLocale } from "@/lib/i18n-config";
import { addLeadNote, type LeadStatus, updateLeadStatus } from "@/lib/leads";
import { mediaKeys, type MediaKey } from "@/lib/media";
import { resetManagedServiceTrack, saveManagedServiceTrack } from "@/lib/service-content";
import type { ClassTrack } from "@/content/site/types";

const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "closed", "spam"];
const validBlogStatuses: ManagedBlogPostStatus[] = ["draft", "published"];
const validServiceKeys: ClassTrack["key"][] = ["adults", "kids", "oneOff", "wheel", "groups"];
const validAdminRoles: AdminRole[] = ["director", "editor"];

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (email) {
    const user = await authenticateAdminUser(email, password);

    if (!user) {
      redirect("/admin/login?error=1");
    }

    await createAdminSession({ userId: user.id, email: user.email });
    redirect("/admin/leads");
  }

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
  }).catch(() => null);

  if (!saved) {
    redirect(id ? `/admin/content/blog/${id}?error=validation` : "/admin/content/blog/new?error=validation");
  }

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

export async function createAdminUserAction(formData: FormData) {
  const actor = await requireAdmin();

  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "director").trim() as AdminRole;

  if (!fullName || !email || password.length < 10 || !validAdminRoles.includes(role)) {
    redirect("/admin/users?error=create");
  }

  if (actor.mode === "user" && actor.role !== "director") {
    redirect("/admin/users?error=forbidden");
  }

  const created = await createAdminUser({ fullName, email, password, role }).catch(() => null);
  if (!created) {
    redirect("/admin/users?error=create");
  }

  redirect("/admin/users?saved=1");
}

export async function updateAdminUserPasswordAction(formData: FormData) {
  const actor = await requireAdmin();

  const userId = String(formData.get("userId") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!userId || password.length < 10) {
    redirect("/admin/users?error=password");
  }

  if (actor.mode === "user" && actor.role !== "director" && actor.id !== userId) {
    redirect("/admin/users?error=forbidden");
  }

  await updateAdminUserPassword(userId, password);
  redirect("/admin/users?saved=1");
}

export async function toggleAdminUserAction(formData: FormData) {
  const actor = await requireAdmin();

  const userId = String(formData.get("userId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "").trim();

  if (!userId || !["true", "false"].includes(nextValue)) {
    redirect("/admin/users?error=toggle");
  }

  if (actor.mode === "user" && actor.role !== "director") {
    redirect("/admin/users?error=forbidden");
  }

  await setAdminUserActive(userId, nextValue === "true");
  redirect("/admin/users?saved=1");
}
