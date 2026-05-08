"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel } from "@/components/ui/panel";

const VENDORS: { name: string; oui: string }[] = [
  { name: "Random", oui: "" },
  { name: "Apple", oui: "00:1B:63" },
  { name: "Cisco", oui: "00:1A:A1" },
  { name: "Dell", oui: "00:14:22" },
  { name: "HP", oui: "00:1B:78" },
  { name: "Intel", oui: "00:1B:21" },
  { name: "Microsoft Hyper-V", oui: "00:15:5D" },
  { name: "Netgear", oui: "00:14:6C" },
  { name: "Raspberry Pi", oui: "B8:27:EB" },
  { name: "Samsung", oui: "F0:25:B7" },
  { name: "TP-Link", oui: "00:1D:0F" },
  { name: "VMware", oui: "00:50:56" },
  { name: "VirtualBox", oui: "08:00:27" },
];

type Sep = "colon" | "dash" | "none";

function genBytes(prefix?: string): number[] {
  const out = new Uint8Array(6);
  crypto.getRandomValues(out);
  if (prefix) {
    const p = prefix.split(":").map((b) => parseInt(b, 16));
    for (let i = 0; i < 3; i++) out[i] = p[i];
  } else {
    // Set locally administered, unicast
    out[0] = (out[0] & 0xfc) | 0x02;
  }
  return Array.from(out);
}

function format(bytes: number[], sep: Sep, upper: boolean): string {
  const parts = bytes.map((b) => b.toString(16).padStart(2, "0"));
  const formatted = sep === "none" ? parts.join("") : parts.join(sep === "colon" ? ":" : "-");
  return upper ? formatted.toUpperCase() : formatted.toLowerCase();
}

export default function MacAddressGenerator() {
  const [vendor, setVendor] = useState("");
  const [sep, setSep] = useState<Sep>("colon");
  const [upper, setUpper] = useState(true);
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);

  function generate() {
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      out.push(format(genBytes(vendor || undefined), sep, upper));
    }
    setList(out);
  }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Vendor prefix</span>
            <select value={vendor} onChange={(e) => setVendor(e.target.value)} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
              {VENDORS.map((v) => <option key={v.name} value={v.oui}>{v.name}{v.oui && ` (${v.oui})`}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Separator</span>
            <select value={sep} onChange={(e) => setSep(e.target.value as Sep)} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
              <option value="colon">Colons (00:11:22:…)</option>
              <option value="dash">Dashes (00-11-22-…)</option>
              <option value="none">None (001122…)</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Count</span>
            <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1" />
          </label>
          <label className="flex items-center gap-2 mt-5">
            <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="accent-[var(--color-accent)]" />
            Uppercase
          </label>
        </div>
        <button onClick={generate} className={btnPrimary("text-sm mt-3")}>Generate</button>
      </Panel>
      {list.length > 0 && (
        <Panel title={`${list.length} addresses`} action={<CopyButton value={list.join("\n")} label="Copy all" />}>
          <ul className="font-mono text-sm space-y-1">
            {list.map((m, i) => (
              <li key={i} className="flex items-center justify-between border-b border-[var(--color-border)]/50 py-1 last:border-b-0">
                <span>{m}</span>
                <CopyButton value={m} />
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
