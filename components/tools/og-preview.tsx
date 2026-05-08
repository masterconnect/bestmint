"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function OgPreview() {
  const [title, setTitle] = useState("BestMint — Free Online Tools");
  const [desc, setDesc] = useState("A growing collection of free, fast, privacy-friendly online tools.");
  const [url, setUrl] = useState("bestmint.com");
  const [img, setImg] = useState("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop");

  return (
    <div className="space-y-4">
      <Panel title="Page metadata">
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="URL"><input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Description"><input value={desc} onChange={(e) => setDesc(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="OG image URL"><input value={img} onChange={(e) => setImg(e.target.value)} className={inputCls()} /></Lbl>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Facebook / LinkedIn">
          <div className="rounded-lg overflow-hidden border border-[var(--color-border)] bg-white text-black">
            <img src={img} alt="OG preview" className="w-full aspect-[1200/630] object-cover" />
            <div className="p-4">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">{url}</div>
              <div className="mt-1 font-semibold line-clamp-2">{title}</div>
              <div className="mt-1 text-sm text-gray-600 line-clamp-2">{desc}</div>
            </div>
          </div>
        </Panel>
        <Panel title="Twitter / X (summary_large_image)">
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black text-white">
            <img src={img} alt="OG preview" className="w-full aspect-[1200/630] object-cover" />
            <div className="p-3">
              <div className="text-[15px] font-semibold line-clamp-1">{title}</div>
              <div className="text-sm text-gray-400 line-clamp-2">{desc}</div>
              <div className="mt-1 text-xs text-gray-500">{url}</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
