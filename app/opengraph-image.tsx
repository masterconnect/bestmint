import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools/registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function Image() {
  const total = TOOLS.length;
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
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #1a1a2e 0%, #0a0a0b 60%)",
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

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "white",
            }}
          >
            <div style={{ display: "flex" }}>Free online tools</div>
            <div
              style={{
                display: "flex",
                background: "linear-gradient(90deg, #a5b4fc, #c4b5fd, #f9a8d4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              for developers, designers and creators.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9a9aa3", maxWidth: 980 }}>
            JSON, image, color, text, SEO and AI utilities — fast, private, free.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(99,102,241,0.18)",
              color: "#a5b4fc",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {`${total} free tools`}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9a9aa3" }}>
            · No signup · Browser-only
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
