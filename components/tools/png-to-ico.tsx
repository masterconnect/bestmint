"use client";
import { useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

const SIZES = [16, 32, 48, 64];

async function buildIco(src: string): Promise<Blob> {
  const img = new Image();
  img.src = src;
  await img.decode();

  const pngs: Uint8Array[] = [];
  for (const size of SIZES) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, size, size);
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
    if (!blob) throw new Error("toBlob failed");
    pngs.push(new Uint8Array(await blob.arrayBuffer()));
  }

  const headerSize = 6;
  const dirSize = 16 * SIZES.length;
  const total = headerSize + dirSize + pngs.reduce((a, b) => a + b.length, 0);
  const buf = new ArrayBuffer(total);
  const dv = new DataView(buf);
  const u8 = new Uint8Array(buf);

  // ICONDIR
  dv.setUint16(0, 0, true);   // reserved
  dv.setUint16(2, 1, true);   // type = 1 (icon)
  dv.setUint16(4, SIZES.length, true);

  let offset = headerSize + dirSize;
  for (let i = 0; i < SIZES.length; i++) {
    const e = headerSize + i * 16;
    const sz = SIZES[i];
    dv.setUint8(e + 0, sz === 256 ? 0 : sz);    // width
    dv.setUint8(e + 1, sz === 256 ? 0 : sz);    // height
    dv.setUint8(e + 2, 0);                       // colors
    dv.setUint8(e + 3, 0);                       // reserved
    dv.setUint16(e + 4, 1, true);                // planes
    dv.setUint16(e + 6, 32, true);               // bit depth
    dv.setUint32(e + 8, pngs[i].length, true);   // size
    dv.setUint32(e + 12, offset, true);          // offset
    u8.set(pngs[i], offset);
    offset += pngs[i].length;
  }

  return new Blob([buf], { type: "image/x-icon" });
}

export default function PngToIco() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("favicon");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) { setError("Please upload an image."); return; }
    setName(file.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = async () => {
      const dataUrl = r.result as string;
      setSrc(dataUrl);
      setLoading(true);
      try {
        const blob = await buildIco(dataUrl);
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to build ICO.");
      } finally { setLoading(false); }
    };
    r.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <Panel title="Source image (PNG works best)">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </Panel>
      {src && (
        <Panel title={`ICO bundle (${SIZES.join(", ")} px)`} action={outUrl && <a href={outUrl} download={`${name}.ico`} className={btnPrimary("text-xs px-2.5 py-1")}>Download .ico</a>}>
          <div className="flex flex-wrap gap-4">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <img src={src} alt="" width={s} height={s} className="border border-[var(--color-border)] rounded-md" style={{ imageRendering: "pixelated" }} />
                <span className="text-xs text-[var(--color-muted)]">{s}×{s}</span>
              </div>
            ))}
          </div>
          {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Building ICO…</p>}
        </Panel>
      )}
    </div>
  );
}
