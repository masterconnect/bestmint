"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const STREETS = ["Main", "Oak", "Pine", "Maple", "Cedar", "Elm", "Park", "Washington", "Lake", "Hill", "Walnut", "Spring", "Mill", "Church", "High", "School", "River", "Forest", "Meadow", "Sunset", "Highland", "Madison", "Lincoln", "Jefferson"];
const SUFFIX_US = ["St", "Ave", "Rd", "Blvd", "Ln", "Dr", "Way", "Ct", "Pl"];
const SUFFIX_UK = ["Street", "Road", "Lane", "Avenue", "Crescent", "Close", "Drive"];

const CITIES_US = [["Springfield", "IL", "62704"], ["Madison", "WI", "53703"], ["Aurora", "CO", "80012"], ["Salem", "OR", "97301"], ["Franklin", "TN", "37064"], ["Greenville", "SC", "29601"], ["Burlington", "VT", "05401"], ["Riverside", "CA", "92501"], ["Dover", "DE", "19901"], ["Cambridge", "MA", "02139"]];
const CITIES_UK = [["London", "Greater London", "SW1A 1AA"], ["Manchester", "Greater Manchester", "M1 1AE"], ["Birmingham", "West Midlands", "B1 1AA"], ["Leeds", "West Yorkshire", "LS1 1AA"], ["Liverpool", "Merseyside", "L1 1AA"], ["Bristol", "Bristol", "BS1 1AA"], ["Edinburgh", "Midlothian", "EH1 1AA"], ["Glasgow", "Lanarkshire", "G1 1AA"]];
const CITIES_CA = [["Toronto", "ON", "M5H 2N2"], ["Montreal", "QC", "H3A 1A1"], ["Vancouver", "BC", "V6B 1A1"], ["Calgary", "AB", "T2P 1A1"], ["Ottawa", "ON", "K1A 0A6"], ["Edmonton", "AB", "T5J 0K1"], ["Winnipeg", "MB", "R3C 0A1"], ["Halifax", "NS", "B3J 0A1"]];

type Country = "US" | "UK" | "CA";

function pick<T>(arr: T[]) { const a = new Uint32Array(1); crypto.getRandomValues(a); return arr[a[0] % arr.length]; }
function num(min: number, max: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return min + (a[0] % (max - min + 1)); }

function makeAddr(country: Country) {
  const number = num(1, 9999);
  if (country === "UK") {
    const [city, region, postal] = pick(CITIES_UK);
    return { street: `${number} ${pick(STREETS)} ${pick(SUFFIX_UK)}`, city, region, postal, country: "United Kingdom" };
  }
  if (country === "CA") {
    const [city, region, postal] = pick(CITIES_CA);
    return { street: `${number} ${pick(STREETS)} ${pick(SUFFIX_US)}`, city, region, postal, country: "Canada" };
  }
  const [city, region, postal] = pick(CITIES_US);
  return { street: `${number} ${pick(STREETS)} ${pick(SUFFIX_US)}`, city, region, postal, country: "United States" };
}

export default function FakeAddressGenerator() {
  const [count, setCount] = useState(10);
  const [country, setCountry] = useState<Country>("US");
  const [rows, setRows] = useState(() => Array.from({ length: 10 }, () => makeAddr("US")));

  function regen() { setRows(Array.from({ length: count }, () => makeAddr(country))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value as Country)} className={inputCls()}>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
            </select>
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
      </Panel>
      <Panel title={`Addresses (${rows.length})`} action={<CopyButton value={rows.map((r) => `${r.street}, ${r.city}, ${r.region} ${r.postal}, ${r.country}`).join("\n")} label="Copy all" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-[var(--color-muted)]">
              <tr><th className="px-2 py-1.5">Street</th><th className="px-2 py-1.5">City</th><th className="px-2 py-1.5">Region</th><th className="px-2 py-1.5">Postal</th><th className="px-2 py-1.5">Country</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-[var(--color-border)]">
                  <td className="px-2 py-1.5">{r.street}</td>
                  <td className="px-2 py-1.5">{r.city}</td>
                  <td className="px-2 py-1.5">{r.region}</td>
                  <td className="px-2 py-1.5 font-mono text-xs">{r.postal}</td>
                  <td className="px-2 py-1.5 text-[var(--color-muted)]">{r.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
