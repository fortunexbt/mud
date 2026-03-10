import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { renderSocialCard } from "@/lib/social-card";
import { resolveSocialMetadata } from "@/lib/social";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") || "pt";
  const slug = request.nextUrl.searchParams.get("slug")?.split("/").filter(Boolean) || [];
  const data = await resolveSocialMetadata({ localeParam: locale, slug });

  return new ImageResponse(renderSocialCard(data.card, "opengraph"), {
    width: 1200,
    height: 630,
  });
}
