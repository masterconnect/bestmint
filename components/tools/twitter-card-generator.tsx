"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

const CARDS = ["summary", "summary_large_image", "app", "player"] as const;

export default function TwitterCardGenerator() {
  const [card, setCard] = useState<typeof CARDS[number]>("summary_large_image");
  const [title, setTitle] = useState("BestMint — Free Online Tools");
  const [desc, setDesc] = useState("Free, fast, privacy-friendly utilities you can use in your browser.");
  const [image, setImage] = useState("https://bestmint.com/og.png");
  const [site, setSite] = useState("@bestmint");
  const [creator, setCreator] = useState("@bestmint");

  const out = useMemo(() => {
    const lines = [
      `<meta name="twitter:card" content="${card}">`,
      `<meta name="twitter:title" content="${title}">`,
      `<meta name="twitter:description" content="${desc}">`,
    ];
    if (image) lines.push(`<meta name="twitter:image" content="${image}">`);
    if (site) lines.push(`<meta name="twitter:site" content="${site}">`);
    if (creator) lines.push(`<meta name="twitter:creator" content="${creator}">`);
    return lines.join("\n");
  }, [card, title, desc, image, site, creator]);

  const isLarge = card === "summary_large_image";

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Inputs">
          <Lbl label="Card type">
            <select value={card} onChange={(e) => setCard(e.target.value as typeof CARDS[number])} className={inputCls()}>
              {CARDS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Lbl>
          <Lbl label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Description"><textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={textareaCls("min-h-[70px]")} /></Lbl>
          <Lbl label="Image URL"><input value={image} onChange={(e) => setImage(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Site (@handle)"><input value={site} onChange={(e) => setSite(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Creator (@handle)"><input value={creator} onChange={(e) => setCreator(e.target.value)} className={inputCls()} /></Lbl>
        </Panel>
        <Panel title="Preview">
          {isLarge ? (
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black text-white">
              {image && <img src={image} alt="" className="w-full aspect-[1200/630] object-cover" />}
              <div className="p-3">
                <div className="text-[15px] font-semibold line-clamp-1">{title}</div>
                <div className="text-sm text-gray-400 line-clamp-2">{desc}</div>
                <div className="mt-1 text-xs text-gray-500">{site}</div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black text-white flex">
              {image && <img src={image} alt="" className="w-32 h-32 object-cover" />}
              <div className="p-3 flex-1">
                <div className="text-[15px] font-semibold line-clamp-2">{title}</div>
                <div className="text-sm text-gray-400 line-clamp-2 mt-1">{desc}</div>
                <div className="mt-1 text-xs text-gray-500">{site}</div>
              </div>
            </div>
          )}
        </Panel>
      </div>
      <Panel title="<head> snippet" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{out}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
