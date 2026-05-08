"use client";
import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/panel";
import { CopyButton } from "@/components/ui/copy-button";

const RAMP = " .:-=+*#%@";

export default function ImageToAsciiArt() {
  const [src, setSrc] = useState<string | null>(null);
  const [width, setWidth] = useState(100);
  const [out, setOut] = useState("");
  const [invert, setInvert] = useState(false);

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
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = width;
      const h = Math.max(1, Math.round(width * aspect * 0.5));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      const ramp = invert ? RAMP.split("").reverse().join("") : RAMP;
      const len = ramp.length - 1;
      let s = "";
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
          s += ramp[Math.round((lum / 255) * len)];
        }
        s += "\n";
      }
      if (!cancelled) setOut(s);
    })();
    return () => { cancelled = true; };
  }, [src, width, invert]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Settings">
            <label className="block">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Width ({width} chars)</span>
              <input type="range" min={40} max={200} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} className="accent-[var(--color-accent)]" />
              Invert (light backgrounds)
            </label>
          </Panel>
          <Panel title="ASCII output" action={<CopyButton value={out} />}>
            <pre className="text-[8px] sm:text-[10px] leading-[1] font-mono whitespace-pre overflow-auto p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)]">
{out}
            </pre>
          </Panel>
        </>
      )}
    </div>
  );
}
