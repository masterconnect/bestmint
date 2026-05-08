import { ImageResponse } from "next/og";
import { CATEGORY_BY_SLUG, CATEGORIES, type CategorySlug } from "@/lib/tools/categories";
import { toolsByCategory } from "@/lib/tools/registry";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category as CategorySlug] ?? CATEGORIES[0];
  const tools = toolsByCategory(cat.slug);
  const accent = cat.accent;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(ellipse 70% 55% at 0% 0%, ${accent}33 0%, #0a0a0b 65%)`,
          color: "#ededee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "white",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 8,
                borderRadius: 4,
                background: accent,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#9a9aa3",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Category
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
              color: "white",
            }}
          >
            {cat.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9a9aa3", maxWidth: 1000 }}>
            {cat.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              background: `${accent}2a`,
              color: accent,
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {`${tools.length} ${tools.length === 1 ? "tool" : "tools"}`}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9a9aa3" }}>· Free · No signup</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
