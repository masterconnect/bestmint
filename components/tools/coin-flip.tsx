"use client";
import { useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

function flip(): "H" | "T" {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % 2 === 0 ? "H" : "T";
}

export default function CoinFlip() {
  const [result, setResult] = useState<"H" | "T" | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<("H" | "T")[]>([]);

  function go() {
    setSpinning(true);
    setTimeout(() => {
      const r = flip();
      setResult(r);
      setHistory((p) => [r, ...p].slice(0, 20));
      setSpinning(false);
    }, 700);
  }

  const heads = history.filter((x) => x === "H").length;
  const tails = history.length - heads;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Flip">
        <div className="flex flex-col items-center justify-center py-8">
          <button
            onClick={go}
            disabled={spinning}
            className="relative w-40 h-40 rounded-full select-none focus:outline-none"
            style={{ perspective: "800px" }}
            aria-label="Flip coin"
          >
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center text-5xl font-bold transition-transform"
              style={{
                transformStyle: "preserve-3d",
                transform: spinning ? "rotateY(1080deg)" : result === "T" ? "rotateY(180deg)" : "rotateY(0deg)",
                transitionDuration: spinning ? "700ms" : "300ms",
                background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 70%, white), var(--color-accent))",
                color: "white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              }}
            >
              {spinning ? "" : result === "H" ? "H" : result === "T" ? "T" : "?"}
            </div>
          </button>
          <button onClick={go} disabled={spinning} className={btnPrimary("mt-6 px-8 py-3 text-base")}>{spinning ? "Flipping…" : "Flip coin"}</button>
          {result && !spinning && <div className="mt-3 text-lg">It&apos;s <span className="font-semibold">{result === "H" ? "Heads" : "Tails"}</span></div>}
        </div>
      </Panel>
      <Panel title="History">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-md border border-[var(--color-border)] p-3 text-center">
            <div className="text-xs text-[var(--color-muted)]">Heads</div>
            <div className="text-2xl font-semibold">{heads}</div>
          </div>
          <div className="rounded-md border border-[var(--color-border)] p-3 text-center">
            <div className="text-xs text-[var(--color-muted)]">Tails</div>
            <div className="text-2xl font-semibold">{tails}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {history.length === 0 ? <p className="text-sm text-[var(--color-muted)]">Flip the coin to start.</p> : history.map((h, i) => (
            <span key={i} className={`w-8 h-8 rounded-full inline-flex items-center justify-center font-mono text-sm font-semibold ${h === "H" ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]" : "bg-[var(--color-border)]"}`}>{h}</span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
