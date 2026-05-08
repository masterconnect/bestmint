"use client";
import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel } from "@/components/ui/panel";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGIT = "0123456789";
const SYMBOL = "!@#$%&*-_=+";
const CONFUSING = /[O0Il1|`'"5S2Zz]/g;

function rand(set: string) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return set[arr[0] % set.length];
}

export default function WifiPasswordGenerator() {
  const [len, setLen] = useState(16);
  const [easy, setEasy] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [pw, setPw] = useState("");

  const gen = useCallback(() => {
    let pool = LOWER + UPPER + DIGIT;
    if (includeSymbols) pool += SYMBOL;
    if (easy) pool = pool.replace(CONFUSING, "");
    let out = "";
    for (let i = 0; i < len; i++) out += rand(pool);
    setPw(out);
  }, [len, easy, includeSymbols]);

  useEffect(gen, [gen]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Options">
        <label className="block">
          <span className="flex justify-between text-sm mb-2">
            <span>Length</span>
            <span className="font-mono text-[var(--color-accent)]">{len}</span>
          </span>
          <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </label>
        <div className="mt-4 space-y-2 text-sm">
          <label className="flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-border)] cursor-pointer">
            <input type="checkbox" checked={easy} onChange={(e) => setEasy(e.target.checked)} className="accent-[var(--color-accent)]" />
            Easy to read aloud (no 0/O/1/l/I etc.)
          </label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-border)] cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="accent-[var(--color-accent)]" />
            Include symbols
          </label>
        </div>
      </Panel>
      <Panel title="WiFi password" action={<div className="flex gap-2"><CopyButton value={pw} /><button onClick={gen} className={btnPrimary("text-xs px-2.5 py-1")}>Regenerate</button></div>}>
        <div className="font-mono text-2xl tracking-wider break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-4">
          {pw}
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Tip: pair with our QR WiFi tool to print a guest-network card.</p>
      </Panel>
    </div>
  );
}
