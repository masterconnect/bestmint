"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

export default function UtmBuilder() {
  const [base, setBase] = useState("https://example.com/landing");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("spring_launch");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const { url, valid, error } = useMemo(() => {
    let u: URL;
    try { u = new URL(base); } catch { return { url: "", valid: false, error: "Base URL is invalid." }; }
    const set = (k: string, v: string) => { if (v) u.searchParams.set(k, v); };
    set("utm_source", source);
    set("utm_medium", medium);
    set("utm_campaign", campaign);
    set("utm_term", term);
    set("utm_content", content);
    return { url: u.toString(), valid: true, error: "" };
  }, [base, source, medium, campaign, term, content]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Parameters">
        <Lbl label="Base URL *"><input value={base} onChange={(e) => setBase(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="utm_source * (e.g. newsletter, twitter)"><input value={source} onChange={(e) => setSource(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="utm_medium * (e.g. email, social, cpc)"><input value={medium} onChange={(e) => setMedium(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="utm_campaign *"><input value={campaign} onChange={(e) => setCampaign(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="utm_term (optional, paid keyword)"><input value={term} onChange={(e) => setTerm(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="utm_content (optional, A/B variant)"><input value={content} onChange={(e) => setContent(e.target.value)} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="Tagged URL" action={valid && url ? <CopyButton value={url} /> : null}>
        {valid ? (
          <pre className="font-mono text-xs whitespace-pre-wrap break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{url}</pre>
        ) : (
          <div className="text-sm text-amber-400">{error}</div>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
