"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const TONES = ["formal", "casual", "friendly"] as const;
const TYPES = ["request", "follow-up", "thank-you", "intro", "complaint"] as const;

export default function AiEmailWriter() {
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState<typeof TONES[number]>("formal");
  const [type, setType] = useState<typeof TYPES[number]>("request");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, tone, type }),
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
      <Panel title="Brief or bullet points">
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} className={textareaCls("min-h-[160px]")} placeholder="- I need an extension on the deadline\n- Project hit a vendor delay\n- Propose new date next Friday" />
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-muted)]">Type</span>
          {TYPES.map((t) => (
            <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" checked={type === t} onChange={() => setType(t)} className="accent-[var(--color-accent)]" />
              <span className="capitalize">{t}</span>
            </label>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-muted)]">Tone</span>
          {TONES.map((t) => (
            <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" checked={tone === t} onChange={() => setTone(t)} className="accent-[var(--color-accent)]" />
              <span className="capitalize">{t}</span>
            </label>
          ))}
          <button className={btnPrimary("ml-auto")} onClick={run} disabled={busy || !brief.trim()}>
            {busy ? "Drafting…" : "Write email"}
          </button>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Email draft" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
