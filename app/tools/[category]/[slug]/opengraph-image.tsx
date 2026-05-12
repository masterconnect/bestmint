import { ImageResponse } from "next/og";
import { TOOL_BY_SLUG } from "@/lib/tools/registry";
import { CATEGORY_BY_SLUG } from "@/lib/tools/categories";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Glyphs the OG renderer's default font can't resolve — substituted only here, not on-page. */
const OG_ICON_FALLBACK: Record<string, string> = {
  "▣": "QR",
  "⇄": "↔",
};

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[slug];
  if (!tool) {
    return new ImageResponse(
      (<div style={{ display: "flex", width: "100%", height: "100%" }}>{SITE.name}</div>),
      { ...size },
    );
  }
  const cat = CATEGORY_BY_SLUG[tool.category];
  const accent = cat.accent;
  const icon = OG_ICON_FALLBACK[tool.icon] ?? tool.icon;
  const isTextIcon = icon.length > 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: `radial-gradient(ellipse 60% 50% at 100% 0%, ${accent}26 0%, #0a0a0b 60%)`,
          color: "#ededee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
                color: "white",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              {SITE.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: 999,
              background: `${accent}26`,
              color: accent,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {cat.name}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
          <div
            style={{
              width: 128,
              height: 128,
              borderRadius: 28,
              background: `${accent}26`,
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isTextIcon ? 44 : 72,
              fontWeight: isTextIcon ? 800 : 400,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: -1.5,
                lineHeight: 1.05,
                color: "white",
              }}
            >
              {tool.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#9a9aa3",
                lineHeight: 1.35,
              }}
            >
              {tool.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#9a9aa3" }}>
          <div style={{ display: "flex" }}>Free</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>No signup</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>{tool.ai ? "AI-powered" : "Runs in your browser"}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
