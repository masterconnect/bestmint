"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

function hexToHsl(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return [0, 0, 0];
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let H = 0, S = 0;
  const L = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: H = (g - b) / d + (g < b ? 6 : 0); break; case g: H = (b - r) / d + 2; break; case b: H = (r - g) / d + 4; break; }
    H /= 6;
  }
  return [H * 360, S * 100, L * 100];
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

const SCHEMES: { name: string; offsets: number[] }[] = [
  { name: "Complementary", offsets: [0, 180] },
  { name: "Analogous", offsets: [-30, 0, 30] },
  { name: "Triadic", offsets: [0, 120, 240] },
  { name: "Tetradic", offsets: [0, 90, 180, 270] },
  { name: "Split-complementary", offsets: [0, 150, 210] },
];

export default function ColorPalette() {
  const [base, setBase] = useState("#6366f1");
  const [h, s, l] = hexToHsl(base);

  return (
    <div className="space-y-4">
      <Panel title="Base color">
        <div className="flex items-center gap-3">
          <input type="color" value={base} onChange={(e) => setBase(e.target.value)} className="h-12 w-16 rounded cursor-pointer" />
          <input value={base} onChange={(e) => setBase(e.target.value)} className={inputCls("font-mono w-40")} />
        </div>
      </Panel>
      <div className="space-y-3">
        {SCHEMES.map((scheme) => {
          const colors = scheme.offsets.map((o) => hslToHex((h + o + 360) % 360, s, l));
          return (
            <Panel key={scheme.name} title={scheme.name} action={<CopyButton value={colors.join(", ")} label="Copy all" />}>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <div key={c} className="flex flex-col items-center text-xs font-mono">
                    <div className="h-16 w-16 rounded-md border border-[var(--color-border)]" style={{ background: c }} />
                    <span className="mt-1.5">{c}</span>
                  </div>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
