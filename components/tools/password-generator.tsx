"use client";
import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel } from "@/components/ui/panel";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGIT = "0123456789";
const SYMBOL = "!@#$%^&*()-_=+[]{};:,.?/";
const LOOKALIKE = /[O0Il1|`'"\\]/g;

function rand(set: string) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return set[arr[0] % set.length];
}

function generate(opts: { len: number; lower: boolean; upper: boolean; digit: boolean; symbol: boolean; noLookalike: boolean }) {
  let pool = "";
  if (opts.lower) pool += LOWER;
  if (opts.upper) pool += UPPER;
  if (opts.digit) pool += DIGIT;
  if (opts.symbol) pool += SYMBOL;
  if (opts.noLookalike) pool = pool.replace(LOOKALIKE, "");
  if (!pool) return "";
  let out = "";
  for (let i = 0; i < opts.len; i++) out += rand(pool);
  return out;
}

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong", "Excellent"];
  return { score, label: labels[Math.min(score, labels.length - 1)] };
}

export default function PasswordGenerator() {
  const [opts, setOpts] = useState({ len: 16, lower: true, upper: true, digit: true, symbol: true, noLookalike: false });
  const [pw, setPw] = useState("");

  const regenerate = useCallback(() => setPw(generate(opts)), [opts]);
  useEffect(regenerate, [regenerate]);

  const s = strength(pw);
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-emerald-500", "bg-emerald-400", "bg-emerald-300"][Math.min(s.score, 6)];

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Options">
        <div>
          <label className="flex justify-between text-sm mb-2">
            <span>Length</span>
            <span className="font-mono text-[var(--color-accent)]">{opts.len}</span>
          </label>
          <input
            type="range"
            min={6}
            max={64}
            value={opts.len}
            onChange={(e) => setOpts({ ...opts, len: Number(e.target.value) })}
            className="w-full accent-[var(--color-accent)]"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {(
            [
              ["lower", "Lowercase (a–z)"],
              ["upper", "Uppercase (A–Z)"],
              ["digit", "Digits (0–9)"],
              ["symbol", "Symbols"],
              ["noLookalike", "No look-alikes"],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-accent)]/60">
              <input
                type="checkbox"
                checked={opts[k] as boolean}
                onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
                className="accent-[var(--color-accent)]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </Panel>
      <Panel
        title="Password"
        action={
          <div className="flex items-center gap-2">
            <CopyButton value={pw} />
            <button className={btnPrimary("text-xs px-2.5 py-1")} onClick={regenerate}>Regenerate</button>
          </div>
        }
      >
        <div className="font-mono text-lg break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-3 min-h-[60px]">
          {pw}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-muted)]">Strength</span>
            <span>{s.label}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-[var(--color-background)]">
            <div className={`h-full ${strengthColor}`} style={{ width: `${((s.score + 1) / 7) * 100}%` }} />
          </div>
        </div>
      </Panel>
    </div>
  );
}
