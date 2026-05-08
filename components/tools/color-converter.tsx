"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
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
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
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

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: max * 100 };
}

function hsvToRgb(h: number, s: number, v: number) {
  h = ((h % 360) + 360) % 360 / 60;
  s = clamp(s, 0, 100) / 100;
  v = clamp(v, 0, 100) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 1) { r = c; g = x; }
  else if (h < 2) { r = x; g = c; }
  else if (h < 3) { g = c; b = x; }
  else if (h < 4) { g = x; b = c; }
  else if (h < 5) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function rgbToCmyk(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

function cmykToRgb(c: number, m: number, y: number, k: number) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return { r: 255 * (1 - c) * (1 - k), g: 255 * (1 - m) * (1 - k), b: 255 * (1 - y) * (1 - k) };
}

function rgbToLab(r: number, g: number, b: number) {
  // sRGB -> linear
  const lin = (v: number) => {
    v /= 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };
  const R = lin(r), G = lin(g), B = lin(b);
  // Linear sRGB -> XYZ (D65)
  const X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  const Y = R * 0.2126729 + G * 0.7151522 + B * 0.0721750;
  const Z = R * 0.0193339 + G * 0.1191920 + B * 0.9503041;
  // D65 ref white
  const xn = 0.95047, yn = 1.0, zn = 1.08883;
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 116);
  const fx = f(X / xn), fy = f(Y / yn), fz = f(Z / zn);
  return { l: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

function labToRgb(L: number, a: number, b: number) {
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const xn = 0.95047, yn = 1.0, zn = 1.08883;
  const fInv = (t: number) => {
    const t3 = t * t * t;
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  };
  const X = fInv(fx) * xn;
  const Y = fInv(fy) * yn;
  const Z = fInv(fz) * zn;
  // XYZ -> linear sRGB
  let R = X * 3.2404542 + Y * -1.5371385 + Z * -0.4985314;
  let G = X * -0.9692660 + Y * 1.8760108 + Z * 0.0415560;
  let B = X * 0.0556434 + Y * -0.2040259 + Z * 1.0572252;
  const unlin = (v: number) => v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;
  R = unlin(R); G = unlin(G); B = unlin(B);
  return { r: clamp(R * 255, 0, 255), g: clamp(G * 255, 0, 255), b: clamp(B * 255, 0, 255) };
}

function parseInput(input: string): { rgb: { r: number; g: number; b: number }; format: string } | null {
  const s = input.trim();
  if (!s) return null;
  // HEX
  if (/^#?[0-9a-f]{3}$|^#?[0-9a-f]{6}$/i.test(s)) {
    const rgb = hexToRgb(s.startsWith("#") ? s : "#" + s);
    return rgb ? { rgb, format: "HEX" } : null;
  }
  // rgb/rgba
  const rgbM = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbM) return { rgb: { r: +rgbM[1], g: +rgbM[2], b: +rgbM[3] }, format: "RGB" };
  // hsl/hsla
  const hslM = s.match(/^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?/i);
  if (hslM) return { rgb: hslToRgb(+hslM[1], +hslM[2], +hslM[3]), format: "HSL" };
  // hsv
  const hsvM = s.match(/^hsv\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?/i);
  if (hsvM) return { rgb: hsvToRgb(+hsvM[1], +hsvM[2], +hsvM[3]), format: "HSV" };
  // cmyk
  const cmykM = s.match(/^cmyk\(\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?/i);
  if (cmykM) return { rgb: cmykToRgb(+cmykM[1], +cmykM[2], +cmykM[3], +cmykM[4]), format: "CMYK" };
  // lab
  const labM = s.match(/^lab\(\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)/i);
  if (labM) return { rgb: labToRgb(+labM[1], +labM[2], +labM[3]), format: "LAB" };
  return null;
}

export default function ColorConverter() {
  const [input, setInput] = useState("#6366f1");
  const parsed = useMemo(() => parseInput(input), [input]);

  if (!parsed) {
    return (
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Color input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={inputCls("font-mono")}
            placeholder="#6366f1, rgb(99,102,241), hsl(...), cmyk(...), lab(...)"
          />
          <p className="mt-3 text-sm text-red-400">Could not parse input — try HEX (#fff), rgb(), hsl(), hsv(), cmyk(), or lab() syntax.</p>
        </Panel>
      </div>
    );
  }

  const { rgb, format } = parsed;
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const lab = rgbToLab(rgb.r, rgb.g, rgb.b);

  const fmt = (n: number) => Math.round(n);
  const f1 = (n: number) => Math.round(n * 10) / 10;

  const rows = [
    { label: "HEX", value: hex },
    { label: "RGB", value: `rgb(${fmt(rgb.r)}, ${fmt(rgb.g)}, ${fmt(rgb.b)})` },
    { label: "HSL", value: `hsl(${fmt(hsl.h)}, ${fmt(hsl.s)}%, ${fmt(hsl.l)}%)` },
    { label: "HSV", value: `hsv(${fmt(hsv.h)}, ${fmt(hsv.s)}%, ${fmt(hsv.v)}%)` },
    { label: "CMYK", value: `cmyk(${fmt(cmyk.c)}%, ${fmt(cmyk.m)}%, ${fmt(cmyk.y)}%, ${fmt(cmyk.k)}%)` },
    { label: "LAB", value: `lab(${f1(lab.l)}, ${f1(lab.a)}, ${f1(lab.b)})` },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Color input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={inputCls("font-mono")}
          placeholder="HEX, rgb(), hsl(), hsv(), cmyk(), lab()"
        />
        <div className="mt-2 text-xs text-[var(--color-muted)]">Detected: <span className="font-mono">{format}</span></div>
        <div
          className="mt-4 h-32 rounded-lg border border-[var(--color-border)]"
          style={{ background: hex }}
        />
      </Panel>
      <Panel title="All formats">
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
              <span className="w-14 text-xs text-[var(--color-muted)] font-mono">{r.label}</span>
              <span className="flex-1 font-mono text-sm break-all">{r.value}</span>
              <CopyButton value={r.value} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
