"use client";
import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/panel";

const SIZES = [16, 32, 48, 180, 192, 512];

export default function FaviconGenerator() {
  const [src, setSrc] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<{ size: number; url: string }[]>([]);

  function load(file: File) {
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
      const out: { size: number; url: string }[] = [];
      for (const size of SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, size, size);
        const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
        if (blob) out.push({ size, url: URL.createObjectURL(blob) });
      }
      if (!cancelled) setOutputs(out);
    })();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div className="space-y-4">
      <Panel title="Source (square works best)">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {outputs.length > 0 && (
        <Panel title="Generated favicons">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {outputs.map((o) => (
              <a key={o.size} href={o.url} download={`favicon-${o.size}x${o.size}.png`} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 hover:border-[var(--color-accent)] transition flex flex-col items-center">
                <img src={o.url} width={Math.min(64, o.size)} height={Math.min(64, o.size)} alt={`${o.size}px`} />
                <span className="mt-2 text-xs text-[var(--color-muted)]">{o.size} × {o.size}</span>
                <span className="mt-1 text-xs text-[var(--color-accent)]">Download</span>
              </a>
            ))}
          </div>
          <pre className="mt-4 text-xs font-mono p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] whitespace-pre-wrap">
{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}
          </pre>
        </Panel>
      )}
    </div>
  );
}
