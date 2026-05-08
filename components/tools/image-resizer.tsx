"use client";
import { useEffect, useState } from "react";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function ImageResizer() {
  const [src, setSrc] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [name, setName] = useState("image");
  const [outUrl, setOutUrl] = useState<string | null>(null);

  function load(file: File) {
    setName(file.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = async () => {
      const dataUrl = r.result as string;
      setSrc(dataUrl);
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      setOrigW(img.naturalWidth);
      setOrigH(img.naturalHeight);
      setW(img.naturalWidth);
      setH(img.naturalHeight);
    };
    r.readAsDataURL(file);
  }

  useEffect(() => {
    if (!src || !w || !h) return;
    let cancelled = false;
    (async () => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, w, h]);

  function setWidth(v: number) {
    setW(v);
    if (lock && origW) setH(Math.round((v / origW) * origH));
  }
  function setHeight(v: number) {
    setH(v);
    if (lock && origH) setW(Math.round((v / origH) * origW));
  }

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Dimensions">
            <div className="flex flex-wrap items-end gap-3">
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Width (px)</span>
                <input type="number" min={1} value={w} onChange={(e) => setWidth(Number(e.target.value))} className={inputCls("w-32")} />
              </label>
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Height (px)</span>
                <input type="number" min={1} value={h} onChange={(e) => setHeight(Number(e.target.value))} className={inputCls("w-32")} />
              </label>
              <label className="flex items-center gap-2 mb-1.5 text-sm">
                <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="accent-[var(--color-accent)]" />
                Lock aspect
              </label>
              <span className="text-xs text-[var(--color-muted)]">Original {origW}×{origH}</span>
            </div>
          </Panel>
          <div className="grid lg:grid-cols-2 gap-4">
            <Panel title="Original"><img src={src} alt="Original" className="w-full rounded-md max-h-96 object-contain" /></Panel>
            <Panel title="Resized" action={outUrl && <a href={outUrl} download={`${name}-${w}x${h}.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
              {outUrl && <img src={outUrl} alt="Resized" className="w-full rounded-md max-h-96 object-contain" />}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
