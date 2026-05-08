"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

const TONES = ["formal", "casual", "friendly", "professional", "playful", "persuasive"] as const;

export default function AiProductDescription() {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState<typeof TONES[number]>("persuasive");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/product-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, features, tone }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setOut(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <Panel title="Product details">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Product name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls()} placeholder="Aero 3 Wireless Headphones" />
          </div>
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Key features (one per line)</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} className={textareaCls("min-h-[140px]")} placeholder={"Active noise cancelling\n40 hour battery\nFoldable design\nUSB-C fast charge"} />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[var(--color-muted)]">Tone</span>
            {TONES.map((t) => (
              <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="radio" checked={tone === t} onChange={() => setTone(t)} className="accent-[var(--color-accent)]" />
                <span className="capitalize">{t}</span>
              </label>
            ))}
            <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !name.trim() || !features.trim()}>
              {busy ? "Writing…" : "Generate description"}
            </button>
          </div>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Product description" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
