"use server";

import { redirect } from "next/navigation";

import { clearAdminSession, createAdminSession, isValidAdminPassword, requireAdmin } from "@/lib/admin-auth";
import { addLeadNote, type LeadStatus, updateLeadStatus } from "@/lib/leads";

const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "closed", "spam"];

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
