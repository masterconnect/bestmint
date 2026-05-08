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

function shade(rgb: { r: number; g: number; b: number }, factor: number) {
  // factor 0..1 toward black
  return { r: rgb.r * (1 - factor), g: rgb.g * (1 - factor), b: rgb.b * (1 - factor) };
}

function tint(rgb: { r: number; g: number; b: number }, factor: number) {
  // factor 0..1 toward white
  return { r: rgb.r + (255 - rgb.r) * factor, g: rgb.g + (255 - rgb.g) * factor, b: rgb.b + (255 - rgb.b) * factor };
}

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="rounded-md overflow-hidden border border-[var(--color-border)]">
      <div className="h-16" style={{ background: hex }} />
      <div className="px-2 py-1.5 flex items-center justify-between bg-[var(--color-surface)]">
        <span className="text-[10px] font-mono">{hex}</span>
        <CopyButton value={hex} className="text-[10px] px-1.5 py-0.5" label="" />
      </div>
      <div className="text-[10px] text-[var(--color-muted)] text-center pb-1">{label}</div>
    </div>
  );
}

export default function ColorShadesTints() {
  const [hex, setHex] = useState("#6366f1");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);

  const steps = 10;
  const shades = useMemo(() => {
    if (!rgb) return [];
    return Array.from({ length: steps }, (_, i) => {
      const factor = (i + 1) / steps; // 0.1..1.0
      const c = shade(rgb, factor);
      return { hex: rgbToHex(c.r, c.g, c.b), label: `-${Math.round(factor * 100)}%` };
    });
  }, [rgb]);

  const tints = useMemo(() => {
    if (!rgb) return [];
    return Array.from({ length: steps }, (_, i) => {
      const factor = (i + 1) / steps;
      const c = tint(rgb, factor);
      return { hex: rgbToHex(c.r, c.g, c.b), label: `+${Math.round(factor * 100)}%` };
    });
  }, [rgb]);

  return (
    <div className="space-y-4">
      <Panel title="Base color">
        <div className="flex items-center gap-3">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 rounded cursor-pointer" />
          <input value={hex} onChange={(e) => setHex(e.target.value)} className={inputCls("font-mono max-w-xs")} />
        </div>
        {!rgb && <p className="mt-2 text-sm text-red-400">Invalid HEX.</p>}
      </Panel>
      {rgb && (
        <>
          <Panel title="Shades (toward black)">
            <div className="grid grid-cols-5 lg:grid-cols-10 gap-2">
              {shades.map((s, i) => <Swatch key={i} hex={s.hex} label={s.label} />)}
            </div>
          </Panel>
          <Panel title="Tints (toward white)">
            <div className="grid grid-cols-5 lg:grid-cols-10 gap-2">
              {tints.map((s, i) => <Swatch key={i} hex={s.hex} label={s.label} />)}
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
