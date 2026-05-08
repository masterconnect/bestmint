"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const AUDIENCES = [
  { id: "5-year-old", label: "5-year-old" },
  { id: "teenager", label: "Teenager" },
  { id: "college-student", label: "College student" },
  { id: "expert", label: "Expert" },
] as const;

type AudienceId = typeof AUDIENCES[number]["id"];

export default function AiExplainer() {
  const [text, setText] = useState("");
  const [audience, setAudience] = useState<AudienceId>("teenager");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, audience }),
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
      <Panel title="Concept or text to explain">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[180px]")} placeholder="Quantum entanglement, the Pythagorean theorem, how DNS works…" />
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-muted)]">Audience</span>
          {AUDIENCES.map((a) => (
            <label key={a.id} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" checked={audience === a.id} onChange={() => setAudience(a.id)} className="accent-[var(--color-accent)]" />
              <span>{a.label}</span>
            </label>
          ))}
          <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !text.trim()}>
            {busy ? "Explaining…" : "Explain it"}
          </button>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Explanation" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
