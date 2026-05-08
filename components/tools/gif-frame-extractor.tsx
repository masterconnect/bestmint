"use client";
import { useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

interface DecodedFrame { url: string; index: number; }

// Best-effort GIF block scan for frame count (counts ImageDescriptors, 0x2C separator)
function countFrames(buf: ArrayBuffer): number {
  const u = new Uint8Array(buf);
  if (u[0] !== 0x47 || u[1] !== 0x49 || u[2] !== 0x46) return 0;
  let i = 13; // past header + LSD
  // Skip global color table if present
  if (u[10] & 0x80) {
    const gctSize = 3 * (1 << ((u[10] & 0x07) + 1));
    i += gctSize;
  }
  let count = 0;
  while (i < u.length) {
    const b = u[i];
    if (b === 0x3b) break; // trailer
    if (b === 0x21) {
      i += 2; // ext intro + label
      while (i < u.length) { const sz = u[i++]; if (sz === 0) break; i += sz; }
    } else if (b === 0x2c) {
      count++;
      i += 9; // image descriptor fixed
      const packed = u[i - 1];
      if (packed & 0x80) i += 3 * (1 << ((packed & 0x07) + 1));
      i++; // LZW min code
      while (i < u.length) { const sz = u[i++]; if (sz === 0) break; i += sz; }
    } else { i++; }
  }
  return count;
}

export default function GifFrameExtractor() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("gif");
  const [frames, setFrames] = useState<DecodedFrame[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(file: File) {
    setError(null); setFrames([]); setCount(0);
    if (!file.type.includes("gif") && !file.name.toLowerCase().endsWith(".gif")) {
      setError("Please upload a .gif file."); return;
    }
    setName(file.name.replace(/\.[^.]+$/, ""));
    const buf = await file.arrayBuffer();
    setCount(countFrames(buf));
    const r = new FileReader();
    r.onload = async () => {
      const dataUrl = r.result as string;
      setSrc(dataUrl);
      setLoading(true);
      try {
        // Try ImageDecoder API for full decode
        const ID: any = (window as any).ImageDecoder;
        const out: DecodedFrame[] = [];
        if (ID) {
          const dec = new ID({ data: buf, type: file.type || "image/gif" });
          await dec.tracks.ready;
          const total = dec.tracks.selectedTrack?.frameCount || 1;
          const limit = Math.min(total, 60);
          for (let i = 0; i < limit; i++) {
            const { image } = await dec.decode({ frameIndex: i });
            const c = document.createElement("canvas");
            c.width = image.displayWidth;
            c.height = image.displayHeight;
            c.getContext("2d")!.drawImage(image as any, 0, 0);
            const blob: Blob | null = await new Promise((res) => c.toBlob(res, "image/png"));
            if (blob) out.push({ url: URL.createObjectURL(blob), index: i });
          }
        } else {
          // Fallback: extract first frame via createImageBitmap
          const bmp = await createImageBitmap(file);
          const c = document.createElement("canvas");
          c.width = bmp.width; c.height = bmp.height;
          c.getContext("2d")!.drawImage(bmp, 0, 0);
          const blob: Blob | null = await new Promise((res) => c.toBlob(res, "image/png"));
          if (blob) out.push({ url: URL.createObjectURL(blob), index: 0 });
        }
        setFrames(out);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Decoding failed.");
      } finally { setLoading(false); }
    };
    r.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <Panel title="Source GIF">
        <input type="file" accept="image/gif" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </Panel>
      {src && (
        <>
          <Panel title="Info">
            <p className="text-sm">
              Detected frames: <span className="font-mono">{count || "?"}</span>
              {!("ImageDecoder" in window) && <span className="text-[var(--color-muted)] ml-2">(ImageDecoder unavailable — only first frame extracted)</span>}
            </p>
            <img src={src} alt="GIF" className="mt-3 max-h-64 rounded-md" />
          </Panel>
          {loading && <Panel title="Decoding"><p className="text-sm text-[var(--color-muted)]">Working…</p></Panel>}
          {frames.length > 0 && (
            <Panel title={`Extracted frames (${frames.length})`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {frames.map((f) => (
                  <a key={f.index} href={f.url} download={`${name}-frame-${String(f.index).padStart(3, "0")}.png`}
                    className="rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition p-2 flex flex-col items-center">
                    <img src={f.url} alt={`Frame ${f.index}`} className="max-h-32 rounded" />
                    <span className="mt-2 text-xs text-[var(--color-muted)]">Frame {f.index} · download</span>
                  </a>
                ))}
              </div>
            </Panel>
          )}
        </>
      )}
    </div>
  );
}
