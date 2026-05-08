"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const [length, setLength] = useState<"bullets" | "short" | "executive">("short");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, length }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setOut(data.summary);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Text to summarize">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[200px]")} placeholder="Paste an article, report or transcript…" />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs text-[var(--color-muted)]">Style</span>
          {(["bullets", "short", "executive"] as const).map((l) => (
            <label key={l} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" checked={length === l} onChange={() => setLength(l)} className="accent-[var(--color-accent)]" />
              <span className="capitalize">{l}</span>
            </label>
          ))}
          <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !text.trim()}>
            {busy ? "Summarizing…" : "Summarize"}
          </button>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Summary" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
