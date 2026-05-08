"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

type FieldType = "string" | "integer" | "boolean" | "email" | "name" | "address" | "uuid" | "date" | "ipv4" | "color" | "url" | "phone";
type Field = { name: string; type: FieldType };

const FIRST = ["Ada", "Alan", "Grace", "Linus", "Margaret", "Donald", "Tim", "Brian", "Dennis", "Ken", "Elena", "Rosa", "Mei", "Yusuf", "Hiro"];
const LAST = ["Smith", "Lovelace", "Turing", "Hopper", "Torvalds", "Hamilton", "Knuth", "Berners-Lee", "Kernighan", "Ritchie"];
const STREETS = ["Oak", "Pine", "Maple", "Park", "Lake", "Hill", "Spring", "Mill", "Church", "High"];
const CITIES = ["Springfield", "Madison", "Aurora", "Salem", "Franklin", "Burlington", "Cambridge", "Riverside", "Greenville", "Dover"];
const WORDS = ["lorem", "ipsum", "dolor", "amet", "vivid", "swift", "happy", "ocean", "river", "stone", "cloud", "ember", "forge", "echo"];

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function pick<T>(arr: T[]) { return arr[rd(arr.length)]; }
function uuid() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = new Uint8Array(16); crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function genValue(type: FieldType): unknown {
  switch (type) {
    case "string": return `${pick(WORDS)}-${pick(WORDS)}-${rd(1000)}`;
    case "integer": return rd(10000);
    case "boolean": return rd(2) === 0;
    case "email": return `${pick(FIRST).toLowerCase()}.${pick(LAST).toLowerCase()}@example.com`;
    case "name": return `${pick(FIRST)} ${pick(LAST)}`;
    case "address": return `${rd(9999) + 1} ${pick(STREETS)} St, ${pick(CITIES)}`;
    case "uuid": return uuid();
    case "date": {
      const d = new Date(Date.now() - rd(365 * 5) * 86400000);
      return d.toISOString().slice(0, 10);
    }
    case "ipv4": return `${rd(256)}.${rd(256)}.${rd(256)}.${rd(256)}`;
    case "color": {
      const a = new Uint8Array(3); crypto.getRandomValues(a);
      return "#" + Array.from(a, (x) => x.toString(16).padStart(2, "0")).join("");
    }
    case "url": return `https://${pick(WORDS)}.example.com/${pick(WORDS)}`;
    case "phone": return `+1-555-${(rd(900) + 100)}-${(rd(9000) + 1000)}`;
  }
}

const TYPES: FieldType[] = ["string", "integer", "boolean", "email", "name", "address", "uuid", "date", "ipv4", "color", "url", "phone"];

export default function MockJsonBuilder() {
  const [fields, setFields] = useState<Field[]>([
    { name: "id", type: "uuid" },
    { name: "name", type: "name" },
    { name: "email", type: "email" },
    { name: "age", type: "integer" },
    { name: "active", type: "boolean" },
  ]);
  const [count, setCount] = useState(5);
  const [out, setOut] = useState("");

  function gen() {
    const arr = Array.from({ length: count }, () => {
      const obj: Record<string, unknown> = {};
      for (const f of fields) if (f.name) obj[f.name] = genValue(f.type);
      return obj;
    });
    setOut(JSON.stringify(arr, null, 2));
  }

  function update(i: number, patch: Partial<Field>) {
    setFields((p) => p.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }
  function remove(i: number) { setFields((p) => p.filter((_, idx) => idx !== i)); }
  function add() { setFields((p) => [...p, { name: `field${p.length + 1}`, type: "string" }]); }

  return (
    <div className="space-y-4">
      <Panel title="Schema" action={<button onClick={add} className={btnGhost("text-xs px-2.5 py-1")}>+ Field</button>}>
        <div className="space-y-2">
          {fields.map((f, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={f.name} onChange={(e) => update(i, { name: e.target.value })} className={inputCls("flex-1 font-mono text-sm")} placeholder="field name" />
              <select value={f.type} onChange={(e) => update(i, { type: e.target.value as FieldType })} className={inputCls("max-w-[160px] text-sm")}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={() => remove(i)} className={btnGhost("text-xs px-2 py-1")}>Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-end gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Records</span>
            <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} className={inputCls("w-32")} />
          </label>
          <button onClick={gen} className={btnPrimary()}>Generate JSON</button>
        </div>
      </Panel>
      {out && (
        <Panel title="Output" action={<CopyButton value={out} />}>
          <textarea readOnly value={out} className={textareaCls("min-h-[300px]")} />
        </Panel>
      )}
    </div>
  );
}
