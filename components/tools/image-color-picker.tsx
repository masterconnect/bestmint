"use client";
import { useEffect, useRef, useState } from "react";
import { Panel } from "@/components/ui/panel";
import { CopyButton } from "@/components/ui/copy-button";

function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export default function ImageColorPicker() {
  const [src, setSrc] = useState<string | null>(null);
  const [picked, setPicked] = useState<{ x: number; y: number; r: number; g: number; b: number } | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number; r: number; g: number; b: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(file);
  }

  useEffect(() => {
    if (!src || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      imgRef.current = img;
    };
  }, [src]);

  function sample(e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number; r: number; g: number; b: number } | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * sx);
    const y = Math.floor((e.clientY - rect.top) * sy);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const d = ctx.getImageData(x, y, 1, 1).data;
    return { x, y, r: d[0], g: d[1], b: d[2] };
  }

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Click to pick a color">
            <canvas
              ref={canvasRef}
              onClick={(e) => { const s = sample(e); if (s) setPicked(s); }}
              onMouseMove={(e) => setHover(sample(e))}
              onMouseLeave={() => setHover(null)}
              className="w-full rounded-md cursor-crosshair max-h-[600px] object-contain block"
              style={{ imageRendering: "pixelated" }}
            />
          </Panel>
          <Panel title="Color">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[var(--color-border)] p-4">
                <div className="text-xs text-[var(--color-muted)] mb-2">Picked</div>
                {picked ? (
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md border border-[var(--color-border)]" style={{ background: toHex(picked.r, picked.g, picked.b) }} />
                    <div className="flex-1 text-sm font-mono">
                      <div className="flex items-center gap-2">{toHex(picked.r, picked.g, picked.b)} <CopyButton value={toHex(picked.r, picked.g, picked.b)} /></div>
                      <div>rgb({picked.r}, {picked.g}, {picked.b})</div>
                      <div className="text-xs text-[var(--color-muted)]">px {picked.x},{picked.y}</div>
                    </div>
                  </div>
                ) : <div className="text-sm text-[var(--color-muted)]">Click anywhere on the image.</div>}
              </div>
              <div className="rounded-lg border border-[var(--color-border)] p-4">
                <div className="text-xs text-[var(--color-muted)] mb-2">Hover</div>
                {hover ? (
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md border border-[var(--color-border)]" style={{ background: toHex(hover.r, hover.g, hover.b) }} />
                    <div className="flex-1 text-sm font-mono">
                      <div>{toHex(hover.r, hover.g, hover.b)}</div>
                      <div>rgb({hover.r}, {hover.g}, {hover.b})</div>
                    </div>
                  </div>
                ) : <div className="text-sm text-[var(--color-muted)]">Hover the image to preview.</div>}
              </div>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
