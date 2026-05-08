"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, inputCls } from "@/components/ui/panel";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

export default function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const rgb = hexToRgb(hex) ?? { r: 99, g: 102, b: 241 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Pick a color">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-32 w-32 rounded-lg cursor-pointer border-0 bg-transparent"
            aria-label="Color picker"
          />
          <div className="flex-1">
            <label className="text-xs text-[var(--color-muted)]">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className={inputCls("font-mono mt-1")}
            />
          </div>
        </div>
        <div
          className="mt-4 h-24 rounded-lg border border-[var(--color-border)]"
          style={{ background: hex }}
        />
      </Panel>
      <Panel title="Color formats">
        <div className="space-y-2">
          {formats.map((f) => (
            <div key={f.label} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
              <span className="w-12 text-xs text-[var(--color-muted)] font-mono">{f.label}</span>
              <span className="flex-1 font-mono text-sm">{f.value}</span>
              <CopyButton value={f.value} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
