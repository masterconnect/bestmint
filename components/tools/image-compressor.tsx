"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageCompressor() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [origSize, setOrigSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [type, setType] = useState("image/jpeg");

  function load(file: File) {
    setOrigSize(file.size);
    setType(file.type === "image/png" ? "image/jpeg" : (file.type as string));
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
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutSize(blob.size);
        setOutUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
      }, type, quality);
    })();
    return () => { cancelled = true; };
  }, [src, quality, type]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title={`Quality (${Math.round(quality * 100)})`}>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            <div className="mt-3 flex gap-2">
              <select value={type} onChange={(e) => setType(e.target.value)} className="text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WEBP</option>
              </select>
              <span className="text-sm text-[var(--color-muted)] flex items-center">
                {(origSize/1024).toFixed(1)} KB → {(outSize/1024).toFixed(1)} KB
                {origSize > 0 && outSize > 0 && (
                  <span className="ml-2 text-emerald-400">{Math.round((1 - outSize/origSize) * 100)}% smaller</span>
                )}
              </span>
            </div>
          </Panel>
          <div className="grid lg:grid-cols-2 gap-4">
            <Panel title="Original"><img src={src} alt="Original" className="w-full rounded-md max-h-96 object-contain" /></Panel>
            <Panel title="Compressed" action={outUrl && <a href={outUrl} download={`${name}-compressed.${type === "image/webp" ? "webp" : "jpg"}`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
              {outUrl && <img src={outUrl} alt="Compressed" className="w-full rounded-md max-h-96 object-contain" />}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
