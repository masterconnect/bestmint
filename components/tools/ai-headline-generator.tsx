"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const STYLES = ["curiosity", "listicle", "how-to", "urgency", "benefit"] as const;

export default function AiHeadlineGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<typeof STYLES[number]>("curiosity");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style }),
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
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls()} placeholder="Habit-tracking apps for students" />
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[var(--color-muted)]">Style</span>
            {STYLES.map((s) => (
              <label key={s} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="radio" checked={style === s} onChange={() => setStyle(s)} className="accent-[var(--color-accent)]" />
                <span className="capitalize">{s}</span>
              </label>
            ))}
            <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !topic.trim()}>
              {busy ? "Brainstorming…" : "Generate headlines"}
            </button>
          </div>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Headline options" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
