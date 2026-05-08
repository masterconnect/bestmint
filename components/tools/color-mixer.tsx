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

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360 / 360;
  s = s / 100; l = l / 100;
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return { r: hk(h + 1 / 3) * 255, g: hk(h) * 255, b: hk(h - 1 / 3) * 255 };
}

export default function ColorMixer() {
  const [a, setA] = useState("#6366f1");
  const [b, setB] = useState("#ec4899");
  const [ratio, setRatio] = useState(50);

  const rgbA = useMemo(() => hexToRgb(a) ?? { r: 0, g: 0, b: 0 }, [a]);
  const rgbB = useMemo(() => hexToRgb(b) ?? { r: 0, g: 0, b: 0 }, [b]);

  const t = ratio / 100;

  // RGB mix
  const mixRgb = {
    r: rgbA.r * (1 - t) + rgbB.r * t,
    g: rgbA.g * (1 - t) + rgbB.g * t,
    b: rgbA.b * (1 - t) + rgbB.b * t,
  };
  const rgbHex = rgbToHex(mixRgb.r, mixRgb.g, mixRgb.b);

  // HSL mix (shortest hue path)
  const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
  const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
  let dh = hslB.h - hslA.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const mixHsl = {
    h: (hslA.h + dh * t + 360) % 360,
    s: hslA.s * (1 - t) + hslB.s * t,
    l: hslA.l * (1 - t) + hslB.l * t,
  };
  const mixHslRgb = hslToRgb(mixHsl.h, mixHsl.s, mixHsl.l);
  const hslHex = rgbToHex(mixHslRgb.r, mixHslRgb.g, mixHslRgb.b);

  return (
    <div className="space-y-4">
      <Panel title="Inputs">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[var(--color-muted)]">Color A</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="color" value={a} onChange={(e) => setA(e.target.value)} className="h-10 w-12 rounded cursor-pointer" />
              <input value={a} onChange={(e) => setA(e.target.value)} className={inputCls("font-mono")} />
            </div>
          </div>
          <div>
            <label className="text-xs text-[var(--color-muted)]">Color B</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="color" value={b} onChange={(e) => setB(e.target.value)} className="h-10 w-12 rounded cursor-pointer" />
              <input value={b} onChange={(e) => setB(e.target.value)} className={inputCls("font-mono")} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs text-[var(--color-muted)]">Mix ratio: {ratio}% B</label>
          <input
            type="range"
            min={0}
            max={100}
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full accent-[var(--color-accent)] mt-1"
          />
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Mix in RGB" action={<CopyButton value={rgbHex} />}>
          <div className="h-32 rounded-lg border border-[var(--color-border)]" style={{ background: rgbHex }} />
          <div className="mt-3 font-mono text-sm">{rgbHex}</div>
          <div className="mt-1 text-xs text-[var(--color-muted)]">rgb({Math.round(mixRgb.r)}, {Math.round(mixRgb.g)}, {Math.round(mixRgb.b)})</div>
        </Panel>
        <Panel title="Mix in HSL" action={<CopyButton value={hslHex} />}>
          <div className="h-32 rounded-lg border border-[var(--color-border)]" style={{ background: hslHex }} />
          <div className="mt-3 font-mono text-sm">{hslHex}</div>
          <div className="mt-1 text-xs text-[var(--color-muted)]">hsl({Math.round(mixHsl.h)}, {Math.round(mixHsl.s)}%, {Math.round(mixHsl.l)}%)</div>
        </Panel>
      </div>
    </div>
  );
}
