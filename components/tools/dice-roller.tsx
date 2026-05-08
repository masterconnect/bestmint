"use client";
import { useState } from "react";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const DICE = [4, 6, 8, 10, 12, 20, 100];

function rollDie(sides: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return (a[0] % sides) + 1;
}

export default function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState<number[]>([]);
  const [history, setHistory] = useState<{ dice: string; total: number; rolls: number[] }[]>([]);

  function roll() {
    const r = Array.from({ length: count }, () => rollDie(sides));
    setRolls(r);
    setHistory((p) => [{ dice: `${count}d${sides}`, total: r.reduce((a, b) => a + b, 0), rolls: r }, ...p].slice(0, 20));
  }

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Roll">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Die</span>
            <select value={sides} onChange={(e) => setSides(Number(e.target.value))} className={inputCls()}>
              {DICE.map((d) => <option key={d} value={d}>d{d}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
        </div>
        <button onClick={roll} className={btnPrimary("mt-3 w-full text-base py-3")}>Roll {count}d{sides}</button>
        {rolls.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {rolls.map((r, i) => (
                <span key={i} className="inline-flex items-center justify-center w-12 h-12 rounded-md border-2 border-[var(--color-accent)] text-lg font-mono font-semibold">{r}</span>
              ))}
            </div>
            <div className="mt-3 text-2xl">
              <span className="text-[var(--color-muted)] text-sm mr-2">Total</span>
              <span className="font-mono font-semibold">{total}</span>
            </div>
          </div>
        )}
      </Panel>
      <Panel title={`History (${history.length})`}>
        {history.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">Roll some dice to see results here.</p>
        ) : (
          <ul className="text-sm space-y-1 max-h-[400px] overflow-y-auto">
            {history.map((h, i) => (
              <li key={i} className="flex justify-between rounded border border-[var(--color-border)] px-3 py-1.5 font-mono">
                <span><span className="text-[var(--color-muted)]">{h.dice}</span> [{h.rolls.join(", ")}]</span>
                <span className="font-semibold">{h.total}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
