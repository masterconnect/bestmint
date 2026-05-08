"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

export default function AiGrammarChecker() {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
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
      <Panel title="Text to check">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[200px]")} placeholder="Paste text to check for grammar, spelling and punctuation…" />
        <div className="mt-3 flex items-center gap-3">
          <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !text.trim()}>
            {busy ? "Checking…" : "Check grammar"}
          </button>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Corrected text + notes" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
