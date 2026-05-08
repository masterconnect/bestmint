"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function parseIp4(s: string): number[] {
  const parts = s.trim().split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) throw new Error("Invalid IPv4");
  return parts;
}

function v4ToMapped(parts: number[]): string {
  return `::ffff:${parts.join(".")}`;
}
function v4To6to4(parts: number[]): string {
  const hi = (parts[0] * 256 + parts[1]).toString(16);
  const lo = (parts[2] * 256 + parts[3]).toString(16);
  return `2002:${hi.padStart(4, "0")}:${lo.padStart(4, "0")}::`;
}
function v4ToFullExpanded(parts: number[]): string {
  const hi = ((parts[0] << 8) | parts[1]).toString(16).padStart(4, "0");
  const lo = ((parts[2] << 8) | parts[3]).toString(16).padStart(4, "0");
  return `0000:0000:0000:0000:0000:ffff:${hi}:${lo}`;
}

function extractV4FromV6(ipv6: string): string | null {
  const m = ipv6.match(/(?:::ffff:|::)((?:\d{1,3}\.){3}\d{1,3})$/i);
  if (m) return m[1];
  // 6to4 prefix 2002:WWXX:YYZZ::
  const m2 = ipv6.match(/^2002:([0-9a-fA-F]{1,4}):([0-9a-fA-F]{1,4})/);
  if (m2) {
    const hi = parseInt(m2[1], 16);
    const lo = parseInt(m2[2], 16);
    return `${(hi >> 8) & 255}.${hi & 255}.${(lo >> 8) & 255}.${lo & 255}`;
  }
  return null;
}

export default function Ipv4ToIpv6() {
  const [mode, setMode] = useState<"v4" | "v6">("v4");
  const [input, setInput] = useState("192.168.1.42");

  const result = useMemo(() => {
    try {
      if (mode === "v4") {
        const parts = parseIp4(input);
        return { ok: true as const, items: [
          ["IPv4-mapped IPv6 (compressed)", v4ToMapped(parts)],
          ["IPv4-mapped IPv6 (expanded)", v4ToFullExpanded(parts)],
          ["6to4 prefix", v4To6to4(parts)],
        ] };
      }
      const v4 = extractV4FromV6(input.trim());
      if (!v4) throw new Error("No embedded IPv4 found in this IPv6 address");
      return { ok: true as const, items: [["Embedded IPv4", v4]] };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Error" };
    }
  }, [mode, input]);

  return (
    <div className="space-y-4">
      <Panel title="Direction">
        <div className="flex gap-2 flex-wrap">
          <button className={mode === "v4" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => { setMode("v4"); setInput("192.168.1.42"); }}>IPv4 → IPv6</button>
          <button className={mode === "v6" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => { setMode("v6"); setInput("::ffff:192.168.1.42"); }}>IPv6 → IPv4</button>
        </div>
      </Panel>
      <Panel title={mode === "v4" ? "IPv4 address" : "IPv6 address"}>
        <input value={input} onChange={(e) => setInput(e.target.value)} className={inputCls("font-mono")} />
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      {result.ok && (
        <div className="space-y-2">
          {result.items.map(([k, v]) => (
            <div key={k} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs text-[var(--color-muted)]">{k}</div>
                <div className="font-mono text-sm break-all">{v}</div>
              </div>
              <CopyButton value={v} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
