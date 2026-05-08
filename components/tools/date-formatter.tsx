"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const MONTHS_LONG = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function pad(n: number, w = 2) { return String(n).padStart(w, "0"); }

function format(d: Date, fmt: string): string {
  const tokens: [string, string][] = [
    ["YYYY", String(d.getFullYear())],
    ["YY", pad(d.getFullYear() % 100)],
    ["MMMM", MONTHS_LONG[d.getMonth()]],
    ["MMM", MONTHS_SHORT[d.getMonth()]],
    ["MM", pad(d.getMonth() + 1)],
    ["M", String(d.getMonth() + 1)],
    ["DDDD", DAYS_LONG[d.getDay()]],
    ["dddd", DAYS_LONG[d.getDay()]],
    ["ddd", DAYS_SHORT[d.getDay()]],
    ["DD", pad(d.getDate())],
    ["D", String(d.getDate())],
    ["HH", pad(d.getHours())],
    ["H", String(d.getHours())],
    ["hh", pad(((d.getHours() + 11) % 12) + 1)],
    ["h", String(((d.getHours() + 11) % 12) + 1)],
    ["mm", pad(d.getMinutes())],
    ["m", String(d.getMinutes())],
    ["ss", pad(d.getSeconds())],
    ["s", String(d.getSeconds())],
    ["A", d.getHours() < 12 ? "AM" : "PM"],
    ["a", d.getHours() < 12 ? "am" : "pm"],
  ];
  let out = "";
  let i = 0;
  while (i < fmt.length) {
    if (fmt[i] === "[") {
      const close = fmt.indexOf("]", i);
      if (close > -1) { out += fmt.slice(i + 1, close); i = close + 1; continue; }
    }
    let matched = false;
    for (const [tok, val] of tokens) {
      if (fmt.slice(i, i + tok.length) === tok) {
        out += val; i += tok.length; matched = true; break;
      }
    }
    if (!matched) { out += fmt[i]; i++; }
  }
  return out;
}

const TOKENS: [string, string, string][] = [
  ["YYYY", "Year, 4-digit", "2026"],
  ["YY", "Year, 2-digit", "26"],
  ["MMMM", "Month name", "May"],
  ["MMM", "Month short", "May"],
  ["MM", "Month 01-12", "05"],
  ["M", "Month 1-12", "5"],
  ["DD", "Day 01-31", "08"],
  ["D", "Day 1-31", "8"],
  ["dddd", "Weekday", "Friday"],
  ["ddd", "Weekday short", "Fri"],
  ["HH", "Hour 00-23", "14"],
  ["H", "Hour 0-23", "14"],
  ["hh", "Hour 01-12", "02"],
  ["h", "Hour 1-12", "2"],
  ["mm", "Minute 00-59", "07"],
  ["ss", "Second 00-59", "09"],
  ["A", "AM/PM", "PM"],
  ["a", "am/pm", "pm"],
];

function pad2(n: number) { return String(n).padStart(2, "0"); }
function nowLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export default function DateFormatter() {
  const [iso, setIso] = useState(() => nowLocal());
  const [fmt, setFmt] = useState("dddd, MMMM D, YYYY [at] h:mm A");

  const d = new Date(iso);
  const valid = !isNaN(d.getTime());
  const out = valid ? format(d, fmt) : "";

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Date">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Local date and time</span>
            <input type="datetime-local" value={iso} onChange={(e) => setIso(e.target.value)} className={inputCls()} />
          </label>
          <label className="block mt-3">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Format string</span>
            <input value={fmt} onChange={(e) => setFmt(e.target.value)} className={inputCls("font-mono")} />
          </label>
        </Panel>
        <Panel title="Output" action={out ? <CopyButton value={out} /> : null}>
          {!valid ? (
            <p className="text-sm text-red-400">Pick a valid date.</p>
          ) : (
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4 font-mono text-base break-all">
              {out}
            </div>
          )}
          <p className="mt-2 text-xs text-[var(--color-muted)]">Use <span className="font-mono">[brackets]</span> for literal text.</p>
        </Panel>
      </div>

      <Panel title="Token reference">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-muted)]">
                <th className="font-normal py-1.5">Token</th>
                <th className="font-normal py-1.5">Meaning</th>
                <th className="font-normal py-1.5">Example</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map(([tok, mean, ex]) => (
                <tr key={tok} className="border-t border-[var(--color-border)]">
                  <td className="font-mono py-1.5 pr-3">{tok}</td>
                  <td className="py-1.5 pr-3 text-[var(--color-muted)]">{mean}</td>
                  <td className="font-mono py-1.5">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
