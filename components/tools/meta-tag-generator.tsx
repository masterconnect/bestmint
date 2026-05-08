"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("BestMint — Free Online Tools");
  const [desc, setDesc] = useState("A growing collection of free, fast, privacy-friendly online tools.");
  const [url, setUrl] = useState("https://bestmint.com");
  const [image, setImage] = useState("https://bestmint.com/og.png");
  const [twitter, setTwitter] = useState("@bestmint");

  const out = `<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">

<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${twitter}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${image}">`;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Page title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Description"><textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={textareaCls("min-h-[80px]")} /></Lbl>
        <Lbl label="URL"><input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="OG image"><input value={image} onChange={(e) => setImage(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Twitter @handle"><input value={twitter} onChange={(e) => setTwitter(e.target.value)} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="<head> snippet" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[480px] overflow-auto">{out}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
