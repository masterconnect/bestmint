"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageMirror() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [axis, setAxis] = useState<"horizontal" | "vertical">("horizontal");
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
      if (axis === "horizontal") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, axis]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Mirror axis">
            <div className="flex gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="axis" checked={axis === "horizontal"} onChange={() => setAxis("horizontal")} className="accent-[var(--color-accent)]" />
                Horizontal (flip left↔right)
              </label>
              <label className="flex items-center gap-2 text-sm ml-4">
                <input type="radio" name="axis" checked={axis === "vertical"} onChange={() => setAxis("vertical")} className="accent-[var(--color-accent)]" />
                Vertical (flip top↔bottom)
              </label>
            </div>
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-mirror.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Mirrored" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
