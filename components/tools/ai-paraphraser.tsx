"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const TONES = ["formal", "casual", "concise", "friendly", "playful"] as const;

export default function AiParaphraser() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<typeof TONES[number]>("formal");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
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
      <Panel title="Original">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[160px]")} placeholder="Paste the text you want rewritten…" />
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-muted)]">Tone</span>
          {TONES.map((t) => (
            <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" checked={tone === t} onChange={() => setTone(t)} className="accent-[var(--color-accent)]" />
              <span className="capitalize">{t}</span>
            </label>
          ))}
          <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !text.trim()}>
            {busy ? "Rewriting…" : "Rewrite"}
          </button>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Rewritten" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
