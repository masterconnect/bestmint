"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

const TYPES = ["Article", "NewsArticle", "BlogPosting"] as const;

export default function ArticleJsonLd() {
  const [type, setType] = useState<typeof TYPES[number]>("BlogPosting");
  const [headline, setHeadline] = useState("How to choose a great cup of coffee");
  const [image, setImage] = useState("https://example.com/cover.jpg");
  const [datePublished, setDatePublished] = useState("2025-01-15");
  const [dateModified, setDateModified] = useState("2025-01-20");
  const [authorName, setAuthorName] = useState("Jane Doe");
  const [publisherName, setPublisherName] = useState("BestMint");
  const [publisherLogo, setPublisherLogo] = useState("https://bestmint.com/logo.png");
  const [description, setDescription] = useState("A practical guide to picking better beans, grind and brewing method.");

  const out = useMemo(() => {
    const json = {
      "@context": "https://schema.org",
      "@type": type,
      headline,
      image: image ? [image] : undefined,
      datePublished,
      dateModified: dateModified || datePublished,
      author: { "@type": "Person", name: authorName },
      publisher: {
        "@type": "Organization",
        name: publisherName,
        logo: publisherLogo ? { "@type": "ImageObject", url: publisherLogo } : undefined,
      },
      description,
    };
    return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
  }, [type, headline, image, datePublished, dateModified, authorName, publisherName, publisherLogo, description]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Article fields">
        <Lbl label="Type">
          <select value={type} onChange={(e) => setType(e.target.value as typeof TYPES[number])} className={inputCls()}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Lbl>
        <Lbl label="Headline *"><input value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Image URL"><input value={image} onChange={(e) => setImage(e.target.value)} className={inputCls()} /></Lbl>
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label="Date published"><input value={datePublished} onChange={(e) => setDatePublished(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Date modified"><input value={dateModified} onChange={(e) => setDateModified(e.target.value)} className={inputCls()} /></Lbl>
        </div>
        <Lbl label="Author name"><input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Publisher name"><input value={publisherName} onChange={(e) => setPublisherName(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Publisher logo URL"><input value={publisherLogo} onChange={(e) => setPublisherLogo(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} className={textareaCls("min-h-[80px]")} /></Lbl>
      </Panel>
      <Panel title="JSON-LD" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[560px] overflow-auto">{out}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
