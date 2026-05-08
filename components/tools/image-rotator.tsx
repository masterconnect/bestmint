"use client";
import { useEffect, useState } from "react";
import { btnGhost, btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageRotator() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    setName(file.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = () => { setSrc(r.result as string); setRotation(0); setFlipH(false); setFlipV(false); };
    r.readAsDataURL(file);
  }

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    (async () => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const swap = rotation % 180 !== 0;
      const w = swap ? img.naturalHeight : img.naturalWidth;
      const h = swap ? img.naturalWidth : img.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, rotation, flipH, flipV]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Transform">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setRotation((r) => (r - 90 + 360) % 360)} className={btnGhost()}>↺ Rotate −90°</button>
              <button onClick={() => setRotation((r) => (r + 90) % 360)} className={btnGhost()}>↻ Rotate +90°</button>
              <button onClick={() => setRotation((r) => (r + 180) % 360)} className={btnGhost()}>180°</button>
              <button onClick={() => setFlipH((v) => !v)} className={btnGhost()}>Flip horizontal</button>
              <button onClick={() => setFlipV((v) => !v)} className={btnGhost()}>Flip vertical</button>
              <button onClick={() => { setRotation(0); setFlipH(false); setFlipV(false); }} className={btnGhost()}>Reset</button>
            </div>
            <p className="mt-3 text-xs text-[var(--color-muted)]">Rotation: {rotation}° · H-flip: {flipH ? "on" : "off"} · V-flip: {flipV ? "on" : "off"}</p>
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-rotated.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Result" className="max-w-full rounded-md mx-auto" />}
          </Panel>
        </>
      )}
    </div>
  );
}
