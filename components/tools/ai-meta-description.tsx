"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function AiMetaDescription() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/meta-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keyword }),
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
      <Panel title="Page details">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Page topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls()} placeholder="Best running shoes for flat feet" />
          </div>
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Primary keyword</label>
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className={inputCls()} placeholder="running shoes flat feet" />
          </div>
          <div className="flex justify-end">
            <button className={btnPrimary()} onClick={run} disabled={busy || !topic.trim() || !keyword.trim()}>
              {busy ? "Generating…" : "Generate meta descriptions"}
            </button>
          </div>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="3 meta description options" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
