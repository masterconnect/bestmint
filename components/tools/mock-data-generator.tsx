"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

const TYPES = ["string", "int", "float", "boolean", "name", "email", "address", "phone", "uuid", "date", "ipv4", "color", "url"] as const;
type T = typeof TYPES[number];

const FIRST = ["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Liam", "Mia", "Noah", "Olivia", "Paul"];
const LAST = ["Smith", "Johnson", "Lee", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson"];
const STREETS = ["Main St", "Oak Ave", "Maple Rd", "Cedar Ln", "Pine St", "Elm Dr", "Birch Way", "Willow Pl"];
const CITIES = ["Springfield", "Riverdale", "Hillview", "Lakewood", "Brookside", "Westfield", "Maplewood"];
const DOMAINS = ["example.com", "mail.com", "test.org", "demo.io", "fake.dev"];

function rint(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function value(type: T): unknown {
  switch (type) {
    case "string": return Math.random().toString(36).slice(2, 10);
    case "int": return rint(1, 1000);
    case "float": return Math.round(Math.random() * 10000) / 100;
    case "boolean": return Math.random() < 0.5;
    case "name": return `${pick(FIRST)} ${pick(LAST)}`;
    case "email": return `${pick(FIRST).toLowerCase()}.${pick(LAST).toLowerCase()}@${pick(DOMAINS)}`;
    case "address": return `${rint(1, 9999)} ${pick(STREETS)}, ${pick(CITIES)}`;
    case "phone": return `+1-${rint(200, 999)}-${rint(200, 999)}-${rint(1000, 9999)}`;
    case "uuid": return uuid();
    case "date": {
      const d = new Date(Date.now() - rint(0, 365 * 24 * 3600 * 1000));
      return d.toISOString().slice(0, 10);
    }
    case "ipv4": return `${rint(1, 255)}.${rint(0, 255)}.${rint(0, 255)}.${rint(0, 255)}`;
    case "color": return `#${rint(0, 0xffffff).toString(16).padStart(6, "0")}`;
    case "url": return `https://${pick(DOMAINS)}/${Math.random().toString(36).slice(2, 8)}`;
  }
}

type Field = { key: string; type: T };

export default function MockDataGenerator() {
  const [fields, setFields] = useState<Field[]>([
    { key: "id", type: "uuid" },
    { key: "name", type: "name" },
    { key: "email", type: "email" },
    { key: "age", type: "int" },
  ]);
  const [count, setCount] = useState(10);
  const [out, setOut] = useState("");

  function update(i: number, patch: Partial<Field>) {
    setFields((f) => f.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function add() { setFields((f) => [...f, { key: `field${f.length + 1}`, type: "string" }]); }
  function remove(i: number) { setFields((f) => f.filter((_, idx) => idx !== i)); }

  function generate() {
    const arr: Record<string, unknown>[] = [];
    for (let i = 0; i < count; i++) {
      const obj: Record<string, unknown> = {};
      for (const f of fields) if (f.key) obj[f.key] = value(f.type);
      arr.push(obj);
    }
    setOut(JSON.stringify(arr, null, 2));
  }

  return (
    <div className="space-y-4">
      <Panel title="Schema">
        <div className="space-y-2">
          {fields.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input value={f.key} onChange={(e) => update(i, { key: e.target.value })} placeholder="field name" className={inputCls("flex-1 font-mono")} />
              <select value={f.type} onChange={(e) => update(i, { type: e.target.value as T })} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm">
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={() => remove(i)} className={btnGhost("text-xs")}>×</button>
            </div>
          ))}
          <button onClick={add} className={btnGhost("text-xs")}>+ Add field</button>
        </div>
      </Panel>
      <Panel title="Generate">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-sm">
            Count
            <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm" />
          </label>
          <button onClick={generate} className={btnPrimary("text-sm")}>Generate JSON</button>
        </div>
      </Panel>
      {out && (
        <Panel title="Output" action={<CopyButton value={out} />}>
          <textarea readOnly value={out} className={textareaCls("min-h-[280px]")} />
        </Panel>
      )}
    </div>
  );
}
