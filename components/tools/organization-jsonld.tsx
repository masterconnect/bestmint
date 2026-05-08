"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function OrganizationJsonLd() {
  const [name, setName] = useState("BestMint");
  const [url, setUrl] = useState("https://bestmint.com");
  const [logo, setLogo] = useState("https://bestmint.com/logo.png");
  const [description, setDescription] = useState("Free, privacy-friendly online tools.");
  const [sameAs, setSameAs] = useState("https://twitter.com/bestmint\nhttps://github.com/bestmint");
  const [email, setEmail] = useState("hi@bestmint.com");
  const [phone, setPhone] = useState("");

  const out = useMemo(() => {
    const json: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      url,
      logo,
      description,
    };
    const list = sameAs.split("\n").map((s) => s.trim()).filter(Boolean);
    if (list.length) json.sameAs = list;
    if (email || phone) {
      json.contactPoint = {
        "@type": "ContactPoint",
        contactType: "customer support",
        ...(email ? { email } : {}),
        ...(phone ? { telephone: phone } : {}),
      };
    }
    return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
  }, [name, url, logo, description, sameAs, email, phone]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Organization">
        <Lbl label="Name *"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="URL *"><input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Logo URL"><input value={logo} onChange={(e) => setLogo(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} className={textareaCls("min-h-[70px]")} /></Lbl>
        <Lbl label="sameAs (one URL per line)"><textarea value={sameAs} onChange={(e) => setSameAs(e.target.value)} className={textareaCls("min-h-[80px]")} /></Lbl>
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label="Contact email"><input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Contact phone"><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls()} /></Lbl>
        </div>
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
