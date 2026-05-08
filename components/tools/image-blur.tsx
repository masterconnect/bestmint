"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageBlur() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [radius, setRadius] = useState(8);
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
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = `blur(${radius}px)`;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, radius]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title={`Blur radius (${radius}px)`}>
            <input type="range" min={0} max={20} step={0.5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-blur.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Blurred" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
