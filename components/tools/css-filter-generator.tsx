"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel } from "@/components/ui/panel";

export default function CssFilterGenerator() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const filter = [
    `blur(${blur}px)`,
    `brightness(${brightness}%)`,
    `contrast(${contrast}%)`,
    `grayscale(${grayscale}%)`,
    `hue-rotate(${hueRotate}deg)`,
    `invert(${invert}%)`,
    `opacity(${opacity}%)`,
    `saturate(${saturate}%)`,
    `sepia(${sepia}%)`,
  ].join(" ");
  const css = `filter: ${filter};`;

  const reset = () => {
    setBlur(0); setBrightness(100); setContrast(100); setGrayscale(0);
    setHueRotate(0); setInvert(0); setOpacity(100); setSaturate(100); setSepia(0);
  };

  // SVG-only preview avoids external image fetch
  const previewSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="400" height="240" fill="url(#g1)"/>
  <circle cx="100" cy="80" r="50" fill="#fde68a"/>
  <rect x="200" y="40" width="160" height="80" rx="12" fill="#22d3ee" opacity="0.85"/>
  <polygon points="80,200 160,140 240,200" fill="#a3e635"/>
  <text x="200" y="220" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="700" font-size="22">Sample</text>
</svg>`)}`;

  const sliders: { label: string; val: number; set: (n: number) => void; min: number; max: number; unit: string }[] = [
    { label: "Blur", val: blur, set: setBlur, min: 0, max: 20, unit: "px" },
    { label: "Brightness", val: brightness, set: setBrightness, min: 0, max: 200, unit: "%" },
    { label: "Contrast", val: contrast, set: setContrast, min: 0, max: 200, unit: "%" },
    { label: "Grayscale", val: grayscale, set: setGrayscale, min: 0, max: 100, unit: "%" },
    { label: "Hue rotate", val: hueRotate, set: setHueRotate, min: 0, max: 360, unit: "deg" },
    { label: "Invert", val: invert, set: setInvert, min: 0, max: 100, unit: "%" },
    { label: "Opacity", val: opacity, set: setOpacity, min: 0, max: 100, unit: "%" },
    { label: "Saturate", val: saturate, set: setSaturate, min: 0, max: 200, unit: "%" },
    { label: "Sepia", val: sepia, set: setSepia, min: 0, max: 100, unit: "%" },
  ];

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={css} />}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <div className="text-xs mb-1 text-[var(--color-muted)]">Original</div>
            <div className="rounded-lg overflow-hidden border border-[var(--color-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewSvg} alt="Original" className="w-full" />
            </div>
          </div>
          <div>
            <div className="text-xs mb-1 text-[var(--color-muted)]">Filtered</div>
            <div className="rounded-lg overflow-hidden border border-[var(--color-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewSvg} alt="Filtered" className="w-full" style={{ filter }} />
            </div>
          </div>
        </div>
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{css}</code>
      </Panel>
      <Panel title="Filters" action={<button onClick={reset} className={btnGhost("text-xs")}>Reset</button>}>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {sliders.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs mb-1"><span>{s.label}</span><span className="font-mono text-[var(--color-muted)]">{s.val}{s.unit}</span></div>
              <input type="range" min={s.min} max={s.max} value={s.val} onChange={(e) => s.set(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
