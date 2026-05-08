"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

type Country = "DE" | "GB" | "FR" | "ES" | "IT" | "NL";

const SPECS: Record<Country, { len: number; bbanLen: number }> = {
  DE: { len: 22, bbanLen: 18 },
  GB: { len: 22, bbanLen: 18 },
  FR: { len: 27, bbanLen: 23 },
  ES: { len: 24, bbanLen: 20 },
  IT: { len: 27, bbanLen: 23 },
  NL: { len: 18, bbanLen: 14 },
};

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }

function digitFor(ch: string) {
  const c = ch.toUpperCase().charCodeAt(0);
  if (c >= 48 && c <= 57) return ch;
  if (c >= 65 && c <= 90) return (c - 55).toString();
  return "";
}

function mod97(s: string) {
  let r = 0;
  for (const ch of s) r = (r * 10 + (ch.charCodeAt(0) - 48)) % 97;
  return r;
}

function randAlnum(len: number) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[rd(chars.length)];
  return out;
}

function randDigits(len: number) {
  let out = "";
  for (let i = 0; i < len; i++) out += rd(10).toString();
  return out;
}

function genIban(country: Country) {
  const { bbanLen } = SPECS[country];
  // Most countries use digits-only BBAN; UK/IT use letters in part
  let bban: string;
  if (country === "GB") bban = randAlnum(4) + randDigits(bbanLen - 4);
  else if (country === "IT") bban = randAlnum(1) + randDigits(bbanLen - 1);
  else bban = randDigits(bbanLen);
  // mod-97 calc: BBAN + country letters + "00", then 98 - (mod 97)
  let asDigits = "";
  for (const ch of bban + country + "00") asDigits += digitFor(ch);
  const check = (98 - mod97(asDigits)).toString().padStart(2, "0");
  return country + check + bban;
}

function format(iban: string) {
  return iban.match(/.{1,4}/g)!.join(" ");
}

export default function FakeIban() {
  const [country, setCountry] = useState<Country>("DE");
  const [count, setCount] = useState(5);
  const [ibans, setIbans] = useState(() => Array.from({ length: 5 }, () => genIban("DE")));

  function regen() { setIbans(Array.from({ length: count }, () => genIban(country))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value as Country)} className={inputCls()}>
              <option value="DE">Germany (DE)</option>
              <option value="GB">United Kingdom (GB)</option>
              <option value="FR">France (FR)</option>
              <option value="ES">Spain (ES)</option>
              <option value="IT">Italy (IT)</option>
              <option value="NL">Netherlands (NL)</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
        <p className="mt-3 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2">For testing only. These pass IBAN length and mod-97 checksum but are not real bank accounts.</p>
      </Panel>
      <Panel title={`IBANs (${ibans.length})`} action={<CopyButton value={ibans.join("\n")} label="Copy all" />}>
        <ul className="font-mono text-sm space-y-1">
          {ibans.map((id, i) => (
            <li key={i} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-1.5">
              <span className="flex-1 break-all">{format(id)}</span>
              <CopyButton value={id} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
