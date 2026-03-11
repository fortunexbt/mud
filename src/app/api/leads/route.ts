import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { createLead, markLeadWebhookStatus } from "@/lib/leads";
import { leadSchema } from "@/lib/forms";
import { hasDatabaseUrl } from "@/lib/server-env";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  const result = leadSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json({ ok: false, message: "Invalid payload." }, { status: 422 });
  }

  if (result.data.formType === "inquiry" && !result.data.interest) {
    return NextResponse.json({ ok: false, message: "Interest is required." }, { status: 422 });
  }

  if (result.data.company) {
    return NextResponse.json({ ok: true });
  }

  const canStoreInDatabase = hasDatabaseUrl();
  const canSendWebhook = Boolean(siteConfig.formsWebhookUrl);

  if (!canStoreInDatabase && !canSendWebhook) {
    return NextResponse.json(
      {
        ok: false,
        message: "Lead destination is not configured.",
      },
      { status: 503 },
    );
  }

  let leadId: string | null = null;

  if (canStoreInDatabase) {
    try {
      console.log("DEBUG: Attempting to store lead in database");
      const lead = await createLead(result.data);
      console.log("DEBUG: Lead stored successfully, ID:", lead.id);
      leadId = lead.id;
      
      // Async background email notification
      console.log("DEBUG: Triggering email notification");
      sendLeadNotificationEmail(lead).catch((err) => {
        console.error("Non-fatal error sending lead email notification:", err);
      });
    } catch (e) {
      console.error("DEBUG: Error storing lead:", e);
      if (!canSendWebhook) {
        return NextResponse.json({ ok: false, message: "Lead storage failed." }, { status: 500 });
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
          return NextResponse.json({ ok: false, message: "Webhook delivery failed." }, { status: 502 });
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
        return NextResponse.json({ ok: false, message: "Webhook delivery failed." }, { status: 502 });
      }
    }
  }

  return NextResponse.json({ ok: true, leadId });
}
