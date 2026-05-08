"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const NAMES: Record<number, string> = {
  0: "NUL (null)", 1: "SOH (start of heading)", 2: "STX (start of text)", 3: "ETX (end of text)",
  4: "EOT (end of transmission)", 5: "ENQ (enquiry)", 6: "ACK (acknowledge)", 7: "BEL (bell)",
  8: "BS (backspace)", 9: "HT (horizontal tab)", 10: "LF (line feed)", 11: "VT (vertical tab)",
  12: "FF (form feed)", 13: "CR (carriage return)", 14: "SO (shift out)", 15: "SI (shift in)",
  16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB",
  24: "CAN", 25: "EM", 26: "SUB", 27: "ESC (escape)", 28: "FS", 29: "GS", 30: "RS", 31: "US",
  32: "SP (space)", 127: "DEL (delete)",
};

export default function AsciiTable() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    return Array.from({ length: 128 }, (_, i) => ({
      dec: i,
      hex: i.toString(16).toUpperCase().padStart(2, "0"),
      oct: i.toString(8).padStart(3, "0"),
      bin: i.toString(2).padStart(7, "0"),
      char: i < 32 || i === 127 ? "" : String.fromCharCode(i),
      name: NAMES[i] || (i < 32 || i === 127 ? "(control)" : ""),
    }));
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) =>
      String(r.dec).includes(needle) ||
      r.hex.toLowerCase().includes(needle) ||
      r.oct.includes(needle) ||
      r.char.toLowerCase().includes(needle) ||
      r.name.toLowerCase().includes(needle)
    );
  }, [rows, q]);

  return (
    <div className="space-y-4">
      <Panel title="Filter">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by code, char, or name…" className={inputCls()} />
      </Panel>
      <Panel title={`ASCII (${filtered.length} rows)`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead className="text-xs text-[var(--color-muted)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-left p-2">Dec</th>
                <th className="text-left p-2">Hex</th>
                <th className="text-left p-2">Oct</th>
                <th className="text-left p-2">Bin</th>
                <th className="text-left p-2">Char</th>
                <th className="text-left p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.dec} className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-background)]">
                  <td className="p-2">{r.dec}</td>
                  <td className="p-2">{r.hex}</td>
                  <td className="p-2">{r.oct}</td>
                  <td className="p-2">{r.bin}</td>
                  <td className="p-2 text-[var(--color-accent)]">{r.char}</td>
                  <td className="p-2 text-[var(--color-muted)]">{r.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
