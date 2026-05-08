"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageExifStripper() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [origSize, setOrigSize] = useState(0);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [type, setType] = useState<"image/jpeg" | "image/png">("image/jpeg");

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    setOrigSize(file.size);
    setName(file.name.replace(/\.[^.]+$/, ""));
    setType(file.type === "image/png" ? "image/png" : "image/jpeg");
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
      if (type === "image/jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutSize(blob.size);
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, type, 0.95);
    })();
    return () => { cancelled = true; };
  }, [src, type]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Output format">
            <div className="flex gap-2">
              {(["image/jpeg", "image/png"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition ${type === t ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)]"}`}>
                  {t.split("/")[1].toUpperCase()}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              Re-encoding through canvas drops every metadata block — EXIF, GPS, IPTC, XMP and color profiles included.
            </p>
            <p className="mt-1 text-sm">
              Original: {(origSize / 1024).toFixed(1)} KB · Cleaned: {(outSize / 1024).toFixed(1)} KB
            </p>
          </Panel>
          <Panel title="Cleaned image" action={outUrl && <a href={outUrl} download={`${name}-clean.${type === "image/jpeg" ? "jpg" : "png"}`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Cleaned" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
