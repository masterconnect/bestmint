"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const BASES = [2, 8, 10, 16, 32];

function isValidForBase(s: string, base: number): boolean {
  if (!s) return true;
  const re = base === 2 ? /^[01]+$/i :
    base === 8 ? /^[0-7]+$/ :
    base === 10 ? /^-?\d+$/ :
    base === 16 ? /^[0-9a-fA-F]+$/ :
    /^[0-9a-vA-V]+$/;
  return re.test(s);
}

export default function NumberBaseConverter() {
  const [input, setInput] = useState("255");
  const [base, setBase] = useState(10);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, n: 0n };
    if (!isValidForBase(input.trim(), base)) return { ok: false as const, error: `Invalid characters for base ${base}` };
    try {
      let n: bigint;
      if (base === 10) {
        n = BigInt(input.trim());
      } else {
        const num = parseInt(input.trim(), base);
        if (Number.isNaN(num)) throw new Error("Parse error");
        n = BigInt(num);
      }
      return { ok: true as const, n };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Parse error" };
    }
  }, [input, base]);

  return (
    <div className="space-y-4">
      <Panel title="Input number">
        <div className="flex gap-2 items-center flex-wrap">
          <select value={base} onChange={(e) => setBase(Number(e.target.value))} className="text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            {BASES.map((b) => <option key={b} value={b}>Base {b} ({b === 2 ? "binary" : b === 8 ? "octal" : b === 10 ? "decimal" : b === 16 ? "hex" : "base32"})</option>)}
          </select>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={inputCls("font-mono flex-1 min-w-[200px]")} />
        </div>
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      <div className="space-y-2">
        {result.ok && BASES.map((b) => {
          const v = result.n.toString(b).toUpperCase();
          const label = b === 2 ? "Binary" : b === 8 ? "Octal" : b === 10 ? "Decimal" : b === 16 ? "Hexadecimal" : "Base32";
          return (
            <div key={b} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--color-muted)]">{label} (base {b})</span>
                <CopyButton value={v} />
              </div>
              <div className="mt-2 font-mono text-sm break-all">{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
