"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImagePixelate() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [block, setBlock] = useState(12);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    setName(file.name.replace(/\.[^.]+$/, ""));
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
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const small = document.createElement("canvas");
      const sw = Math.max(1, Math.floor(w / block));
      const sh = Math.max(1, Math.floor(h / block));
      small.width = sw;
      small.height = sh;
      const sctx = small.getContext("2d")!;
      sctx.imageSmoothingEnabled = false;
      sctx.drawImage(img, 0, 0, sw, sh);
      const big = document.createElement("canvas");
      big.width = w;
      big.height = h;
      const bctx = big.getContext("2d")!;
      bctx.imageSmoothingEnabled = false;
      bctx.drawImage(small, 0, 0, sw, sh, 0, 0, w, h);
      big.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, block]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title={`Block size (${block}px)`}>
            <input type="range" min={4} max={64} value={block} onChange={(e) => setBlock(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-pixelated.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Pixelated" className="w-full rounded-md max-h-[600px] object-contain" style={{ imageRendering: "pixelated" }} />}
          </Panel>
        </>
      )}
    </div>
  );
}
