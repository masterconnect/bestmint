"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

function clamp(n: number) { return Math.max(0, Math.min(255, n)); }

// Brettel et al. simulation matrices in linear RGB. We approximate by working in sRGB linear space.
function srgbToLinear(c: number) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function linearToSrgb(c: number) { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return clamp(v * 255); }

// Standard simulation matrices (in linear RGB) — Machado/Viénot et al.
const matrices: Record<string, number[]> = {
  Protanopia: [0.567, 0.433, 0.0, 0.558, 0.442, 0.0, 0.0, 0.242, 0.758],
  Deuteranopia: [0.625, 0.375, 0.0, 0.7, 0.3, 0.0, 0.0, 0.3, 0.7],
  Tritanopia: [0.95, 0.05, 0.0, 0.0, 0.433, 0.567, 0.0, 0.475, 0.525],
  Achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

function simulate(rgb: { r: number; g: number; b: number }, type: string) {
  const m = matrices[type];
  const r = srgbToLinear(rgb.r), g = srgbToLinear(rgb.g), b = srgbToLinear(rgb.b);
  // matrices above are designed for sRGB; some sources prefer linear, but they're commonly applied in sRGB directly.
  // Apply matrix on sRGB values for simplicity (common practice in CSS-style filters).
  const sr = m[0] * rgb.r + m[1] * rgb.g + m[2] * rgb.b;
  const sg = m[3] * rgb.r + m[4] * rgb.g + m[5] * rgb.b;
  const sb = m[6] * rgb.r + m[7] * rgb.g + m[8] * rgb.b;
  // (suppress unused warnings)
  void r; void g; void b;
  return { r: clamp(sr), g: clamp(sg), b: clamp(sb) };
}

export default function ColorBlindnessSimulator() {
  const [hex, setHex] = useState("#ef4444");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);

  if (!rgb) {
    return (
      <Panel title="Color">
        <input value={hex} onChange={(e) => setHex(e.target.value)} className={inputCls("font-mono")} />
        <p className="mt-3 text-sm text-red-400">Invalid HEX color.</p>
      </Panel>
    );
  }

  const types = ["Protanopia", "Deuteranopia", "Tritanopia", "Achromatopsia"] as const;

  return (
    <div className="space-y-4">
      <Panel title="Original color">
        <div className="flex items-center gap-4">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-16 w-24 rounded cursor-pointer" />
          <input value={hex} onChange={(e) => setHex(e.target.value)} className={inputCls("font-mono max-w-xs")} />
        </div>
        <div className="mt-4 h-24 rounded-lg border border-[var(--color-border)]" style={{ background: hex }} />
      </Panel>
      <Panel title="Simulated vision deficiencies">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {types.map((t) => {
            const sim = simulate(rgb, t);
            const simHex = rgbToHex(sim.r, sim.g, sim.b);
            return (
              <div key={t} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <div className="h-24" style={{ background: simHex }} />
                <div className="p-3">
                  <div className="text-sm font-medium">{t}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-xs">{simHex}</span>
                    <CopyButton value={simHex} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">
          Approximations using standard color deficiency matrices. Results help check color choices but should not replace user testing with affected users.
        </p>
      </Panel>
    </div>
  );
}
