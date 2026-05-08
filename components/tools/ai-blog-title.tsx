"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function AiBlogTitle() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/blog-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience }),
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
      <Panel title="Topic">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Blog topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls()} placeholder="Remote work productivity tips" />
          </div>
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Target audience (optional)</label>
            <input value={audience} onChange={(e) => setAudience(e.target.value)} className={inputCls()} placeholder="Software engineers, marketing managers, etc." />
          </div>
          <div className="flex justify-end">
            <button className={btnPrimary()} onClick={run} disabled={busy || !topic.trim()}>
              {busy ? "Brainstorming…" : "Generate titles"}
            </button>
          </div>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Blog title ideas" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
