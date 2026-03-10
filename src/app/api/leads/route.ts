import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { leadSchema } from "@/lib/forms";

export async function POST(request: Request) {
  const payload = await request.json();
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

  if (!siteConfig.formsWebhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message: "Lead destination is not configured.",
      },
      { status: 503 },
    );
  }

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
    }),
    cache: "no-store",
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Webhook delivery failed.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
