"use client";
import { useMemo, useState } from "react";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function hashStr(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function svgFor(name: string, size: number, rounded: boolean) {
  const h = hashStr(name);
  const hue = h % 360;
  const sat = 55 + ((h >> 8) % 25);
  const lite = 42 + ((h >> 16) % 12);
  const bg = `hsl(${hue} ${sat}% ${lite}%)`;
  const fg = `hsl(${hue} ${sat}% 96%)`;
  const txt = initials(name);
  const r = rounded ? size / 2 : Math.round(size * 0.12);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="600" font-size="${Math.round(size * 0.42)}" fill="${fg}">${txt}</text></svg>`;
}

export default function AvatarGenerator() {
  const [names, setNames] = useState("Ada Lovelace\nAlan Turing\nGrace Hopper\nLinus Torvalds");
  const [size, setSize] = useState(160);
  const [rounded, setRounded] = useState(true);

  const list = useMemo(() => names.split("\n").map((s) => s.trim()).filter(Boolean), [names]);

  function downloadOne(name: string) {
    const svg = svgFor(name, size, rounded);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Names (one per line)">
        <textarea value={names} onChange={(e) => setNames(e.target.value)} className={inputCls("min-h-[180px] font-mono")} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Size (px)</span>
            <input type="number" min={32} max={512} step={8} value={size} onChange={(e) => setSize(Number(e.target.value) || 160)} className={inputCls()} />
          </label>
          <label className="flex items-center gap-2 mt-6 text-sm">
            <input type="checkbox" checked={rounded} onChange={(e) => setRounded(e.target.checked)} className="accent-[var(--color-accent)]" />
            Circle
          </label>
        </div>
      </Panel>
      <Panel title={`Avatars (${list.length})`}>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {list.map((n) => {
            const svg = svgFor(n, size, rounded);
            const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
            return (
              <div key={n} className="flex flex-col items-center gap-2 rounded-md border border-[var(--color-border)] p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dataUrl} alt={n} className="w-20 h-20" />
                <span className="text-xs text-center break-all line-clamp-1">{n}</span>
                <button onClick={() => downloadOne(n)} className={btnPrimary("text-xs px-2 py-1")}>SVG</button>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
