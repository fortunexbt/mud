import type { ReactElement } from "react";

import type { SocialCardData } from "@/lib/social";

/* eslint-disable @next/next/no-img-element */

type SocialCardVariant = "opengraph" | "twitter";

export function renderSocialCard(card: SocialCardData, variant: SocialCardVariant): ReactElement {
  const isTwitter = variant === "twitter";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: isTwitter ? 46 : 40,
        background: `linear-gradient(135deg, ${card.surface} 0%, #f8f2eb 38%, #ebe1d6 100%)`,
        color: "#1e2421",
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          borderRadius: 34,
          overflow: "hidden",
          background: "rgba(255,255,255,0.48)",
          border: "1px solid rgba(80, 62, 48, 0.08)",
          boxShadow: "0 18px 50px rgba(76, 54, 32, 0.14)",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: isTwitter ? "52%" : "48%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={card.mediaUrl}
            alt={card.mediaAlt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(22, 24, 23, 0.06) 0%, rgba(22, 24, 23, 0.22) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 22,
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,0.4)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: isTwitter ? "42px 44px" : "38px 40px",
            background: `radial-gradient(circle at top right, ${card.accentTo}22 0%, transparent 36%), linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.88) 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -120,
              right: -90,
              width: 320,
              height: 320,
              borderRadius: 999,
              background: `radial-gradient(circle, ${card.accentFrom}30 0%, transparent 68%)`,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "Arial, sans-serif",
                  fontSize: 22,
                  letterSpacing: 2.6,
                  textTransform: "uppercase",
                  color: "#4f5c58",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: `linear-gradient(135deg, ${card.accentFrom} 0%, ${card.accentTo} 100%)`,
                  }}
                />
                {card.eyebrow}
              </div>

              <div
                style={{
                  display: "flex",
                  borderRadius: 999,
                  padding: "10px 16px",
                  background: "rgba(42, 51, 47, 0.08)",
                  fontFamily: "Arial, sans-serif",
                  fontSize: 18,
                  letterSpacing: 1.2,
                  color: "#33403c",
                }}
              >
                {card.localeLabel}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  fontFamily: "Arial, sans-serif",
                  fontSize: 18,
                  color: "#6b665f",
                  textTransform: "uppercase",
                  letterSpacing: 1.3,
                }}
              >
                <span>{card.pageLabel}</span>
                <span style={{ color: "#a08d7d" }}>•</span>
                <span>{card.pathLabel}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: isTwitter ? 78 : 68,
                  lineHeight: 1.02,
                  color: "#1f211f",
                  maxWidth: 660,
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  display: "flex",
                  fontFamily: "Arial, sans-serif",
                  fontSize: isTwitter ? 29 : 25,
                  lineHeight: 1.35,
                  color: "#4e504c",
                  maxWidth: 700,
                }}
              >
                {card.description}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {card.chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    borderRadius: 999,
                    padding: "12px 18px",
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(90, 70, 56, 0.08)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 19,
                    color: "#3f433f",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 8,
                fontFamily: "Arial, sans-serif",
                color: "#3e4945",
              }}
            >
              <div style={{ display: "flex", fontSize: 22, letterSpacing: 1.6, textTransform: "uppercase" }}>MUD</div>
              <div style={{ display: "flex", fontSize: 18, color: "#6d726c" }}>mudceramica.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
