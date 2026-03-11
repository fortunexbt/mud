"use server";

import { siteConfig } from "@/config/site";
import { createLead, markLeadWebhookStatus } from "@/lib/leads";
import { leadSchema } from "@/lib/forms";
import { hasDatabaseUrl } from "@/lib/server-env";

export async function submitLeadAction(prevState: unknown, formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  // Handle boolean and specific type conversions for the schema
  const formattedPayload = {
    ...payload,
    consent: payload.consent === "on",
    interest: payload.interest || undefined,
    preferredLanguage: payload.preferredLanguage || undefined,
    availability: payload.availability || undefined,
    foundUs: payload.foundUs || undefined,
    childAge: payload.childAge || undefined,
    company: payload.company || undefined,
    referrer: payload.referrer || undefined,
    pagePath: payload.pagePath || undefined,
    utmSource: payload.utmSource || undefined,
    utmMedium: payload.utmMedium || undefined,
    utmCampaign: payload.utmCampaign || undefined,
    utmTerm: payload.utmTerm || undefined,
    utmContent: payload.utmContent || undefined,
  };

  const result = leadSchema.safeParse(formattedPayload);

  if (!result.success) {
    return { ok: false, message: "Invalid payload." };
  }

  if (result.data.company) {
    return { ok: true };
  }

  const canStoreInDatabase = hasDatabaseUrl();
  const canSendWebhook = Boolean(siteConfig.formsWebhookUrl);

  if (!canStoreInDatabase && !canSendWebhook) {
    return {
      ok: false,
      message: "Lead destination is not configured.",
      status: 503,
    };
  }

  let leadId: string | null = null;

  if (canStoreInDatabase) {
    try {
      const lead = await createLead(result.data);
      leadId = lead.id;
    } catch {
      if (!canSendWebhook) {
        return { ok: false, message: "Lead storage failed." };
      }
    }
  }

  if (canSendWebhook) {
    if (leadId) {
      await markLeadWebhookStatus({ id: leadId, status: "pending" });
    }

    try {
      const webhookResponse = await fetch(siteConfig.formsWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(siteConfig.formsWebhookSecret
            ? { Authorization: `Bearer ${siteConfig.formsWebhookSecret}` }
            : {}),
          "x-mud-source": "website",
        },
        body: JSON.stringify({
          ...result.data,
          submittedAt: new Date().toISOString(),
          leadId: leadId || undefined,
        }),
        cache: "no-store",
      });

      if (!webhookResponse.ok) {
        if (leadId) {
          await markLeadWebhookStatus({
            id: leadId,
            status: "failed",
            error: `Webhook delivery failed with status ${webhookResponse.status}.`,
          });
        }

        if (!leadId) {
          return { ok: false, message: "Webhook delivery failed." };
        }
      } else if (leadId) {
        await markLeadWebhookStatus({ id: leadId, status: "delivered", error: null });
      }
    } catch {
      if (leadId) {
        await markLeadWebhookStatus({
          id: leadId,
          status: "failed",
          error: "Webhook delivery request failed.",
        });
      }

      if (!leadId) {
        return { ok: false, message: "Webhook delivery failed." };
      }
    }
  }

  return { ok: true, leadId };
}
