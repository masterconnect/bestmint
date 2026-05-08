"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function ImageToBase64() {
  const [dataUrl, setDataUrl] = useState("");
  const [meta, setMeta] = useState<{ name: string; size: number; type: string } | null>(null);

  function load(file: File) {
    setMeta({ name: file.name, size: file.size, type: file.type });
    const r = new FileReader();
    r.onload = () => setDataUrl(r.result as string);
    r.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <Panel title="Image">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
        {meta && <p className="mt-2 text-xs text-[var(--color-muted)]">{meta.name} · {meta.type} · {(meta.size/1024).toFixed(1)} KB</p>}
      </Panel>
      {dataUrl && (
        <>
          <Panel title="Preview"><img src={dataUrl} alt="Preview" className="max-h-72 rounded-md" /></Panel>
          <Panel title="Data URI" action={<CopyButton value={dataUrl} />}>
            <textarea readOnly value={dataUrl} className={textareaCls("min-h-[160px] break-all")} />
          </Panel>
          <Panel title="HTML <img>" action={<CopyButton value={`<img src="${dataUrl}" alt="" />`} />}>
            <code className="text-sm font-mono break-all">{`<img src="${dataUrl.slice(0, 80)}…" alt="" />`}</code>
          </Panel>
        </>
      )}
    </div>
  );
}
