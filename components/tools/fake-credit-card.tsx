"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

type Brand = "visa" | "mastercard" | "amex" | "discover";

const PREFIX: Record<Brand, { p: string[]; len: number; cvvLen: number }> = {
  visa: { p: ["4"], len: 16, cvvLen: 3 },
  mastercard: { p: ["51", "52", "53", "54", "55", "2221", "2222", "2223", "2224", "2225"], len: 16, cvvLen: 3 },
  amex: { p: ["34", "37"], len: 15, cvvLen: 4 },
  discover: { p: ["6011", "65"], len: 16, cvvLen: 3 },
};

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function pick<T>(arr: T[]) { return arr[rd(arr.length)]; }

function luhnDigit(num: string) {
  let sum = 0;
  let alt = true;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return (10 - (sum % 10)) % 10;
}

function genCard(brand: Brand) {
  const { p, len, cvvLen } = PREFIX[brand];
  const prefix = pick(p);
  let body = prefix;
  while (body.length < len - 1) body += rd(10).toString();
  body += luhnDigit(body).toString();
  const month = (rd(12) + 1).toString().padStart(2, "0");
  const year = ((new Date().getFullYear() + rd(5) + 1) % 100).toString().padStart(2, "0");
  let cvv = "";
  for (let i = 0; i < cvvLen; i++) cvv += rd(10).toString();
  return { number: body, formatted: format(body, brand), expiry: `${month}/${year}`, cvv };
}

function format(num: string, brand: Brand) {
  if (brand === "amex") return `${num.slice(0, 4)} ${num.slice(4, 10)} ${num.slice(10)}`;
  return num.match(/.{1,4}/g)!.join(" ");
}

export default function FakeCreditCard() {
  const [brand, setBrand] = useState<Brand>("visa");
  const [count, setCount] = useState(5);
  const [cards, setCards] = useState(() => Array.from({ length: 5 }, () => genCard("visa")));

  function regen() { setCards(Array.from({ length: count }, () => genCard(brand))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Brand</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value as Brand)} className={inputCls()}>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
        <p className="mt-3 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2">For testing only. These pass the Luhn checksum but are not real cards and have no funds, no issuer and no real expiry. Never attempt real charges with these numbers.</p>
      </Panel>
      <Panel title={`Test cards (${cards.length})`}>
        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <div key={i} className="rounded-md border border-[var(--color-border)] p-3 bg-[var(--color-background)]">
              <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{brand}</div>
              <div className="font-mono text-lg mt-1 flex items-center gap-2">
                <span>{c.formatted}</span>
                <CopyButton value={c.number} />
              </div>
              <div className="mt-2 text-sm flex gap-4">
                <div><span className="text-[var(--color-muted)]">Exp</span> <span className="font-mono">{c.expiry}</span></div>
                <div><span className="text-[var(--color-muted)]">CVV</span> <span className="font-mono">{c.cvv}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
