"use client";
import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/panel";
import { CopyButton } from "@/components/ui/copy-button";

function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function quantize(data: Uint8ClampedArray, n: number): { hex: string; count: number }[] {
  const buckets = new Map<string, { r: number; g: number; b: number; c: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = data[i] & 0xf0;
    const g = data[i + 1] & 0xf0;
    const b = data[i + 2] & 0xf0;
    const key = `${r}-${g}-${b}`;
    const ex = buckets.get(key);
    if (ex) {
      ex.r += data[i]; ex.g += data[i + 1]; ex.b += data[i + 2]; ex.c += 1;
    } else {
      buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], c: 1 });
    }
  }
  const arr = [...buckets.values()].map((v) => ({
    hex: toHex(Math.round(v.r / v.c), Math.round(v.g / v.c), Math.round(v.b / v.c)),
    count: v.c,
  }));
  arr.sort((a, b) => b.count - a.count);
  return arr.slice(0, n);
}

export default function ImageColorExtractor() {
  const [src, setSrc] = useState<string | null>(null);
  const [count, setCount] = useState(5);
  const [colors, setColors] = useState<{ hex: string; count: number }[]>([]);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(file);
  }

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    (async () => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const max = 200;
      const ratio = Math.min(max / img.naturalWidth, max / img.naturalHeight, 1);
      const w = Math.max(1, Math.round(img.naturalWidth * ratio));
      const h = Math.max(1, Math.round(img.naturalHeight * ratio));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      if (cancelled) return;
      setColors(quantize(data, count));
    })();
    return () => { cancelled = true; };
  }, [src, count]);

  const total = colors.reduce((a, b) => a + b.count, 0) || 1;

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title={`Number of colors (${count})`}>
            <input type="range" min={3} max={12} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
          </Panel>
          <Panel title="Image">
            <img src={src} alt="Source" className="w-full rounded-md max-h-80 object-contain" />
          </Panel>
          <Panel title="Dominant colors">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {colors.map((c) => (
                <div key={c.hex} className="rounded-lg overflow-hidden border border-[var(--color-border)]">
                  <div className="h-20" style={{ background: c.hex }} />
                  <div className="p-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono">{c.hex}</div>
                      <div className="text-[10px] text-[var(--color-muted)]">{((c.count / total) * 100).toFixed(1)}%</div>
                    </div>
                    <CopyButton value={c.hex} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
