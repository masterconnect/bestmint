"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const FIRST_M_EN = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan"];
const FIRST_F_EN = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Margaret", "Betty", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Laura", "Sharon", "Cynthia", "Amy"];
const LAST_EN = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

const FIRST_M_ES = ["José", "Antonio", "Juan", "Manuel", "Francisco", "Luis", "Miguel", "Javier", "Ángel", "Carlos", "David", "Pedro", "Daniel", "Alejandro", "Rafael", "Pablo", "Sergio"];
const FIRST_F_ES = ["María", "Carmen", "Ana", "Isabel", "Dolores", "Pilar", "Teresa", "Rosa", "Cristina", "Antonia", "Francisca", "Laura", "Marta", "Elena", "Paula", "Lucía"];
const LAST_ES = ["García", "Martínez", "Rodríguez", "Fernández", "López", "Pérez", "González", "Sánchez", "Ramírez", "Cruz", "Flores", "Rivera", "Torres", "Ruiz", "Jiménez"];

const FIRST_M_FR = ["Jean", "Pierre", "Michel", "André", "Philippe", "Alain", "Bernard", "Louis", "Jacques", "François", "Daniel", "Patrick", "Nicolas", "Henri", "Marc"];
const FIRST_F_FR = ["Marie", "Jeanne", "Françoise", "Monique", "Catherine", "Nathalie", "Isabelle", "Sylvie", "Anne", "Martine", "Christine", "Brigitte", "Nicole", "Patricia"];
const LAST_FR = ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel", "Garcia"];

function pick<T>(arr: T[]) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return arr[a[0] % arr.length];
}

type Gender = "any" | "male" | "female";
type Locale = "en" | "es" | "fr";

function makeName(locale: Locale, gender: Gender) {
  const sets = {
    en: { m: FIRST_M_EN, f: FIRST_F_EN, l: LAST_EN },
    es: { m: FIRST_M_ES, f: FIRST_F_ES, l: LAST_ES },
    fr: { m: FIRST_M_FR, f: FIRST_F_FR, l: LAST_FR },
  }[locale];
  let g = gender;
  if (gender === "any") {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    g = a[0] % 2 === 0 ? "male" : "female";
  }
  const first = pick(g === "male" ? sets.m : sets.f);
  const last = pick(sets.l);
  return { first, last, full: `${first} ${last}`, gender: g };
}

export default function FakeNameGenerator() {
  const [count, setCount] = useState(10);
  const [gender, setGender] = useState<Gender>("any");
  const [locale, setLocale] = useState<Locale>("en");
  const [rows, setRows] = useState(() => Array.from({ length: 10 }, () => makeName("en", "any")));

  function regen() { setRows(Array.from({ length: count }, () => makeName(locale, gender))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-4 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className={inputCls()}>
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Locale</span>
            <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)} className={inputCls()}>
              <option value="en">English (US)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
      </Panel>
      <Panel title={`Names (${rows.length})`} action={<CopyButton value={rows.map((r) => r.full).join("\n")} label="Copy all" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-[var(--color-muted)]">
              <tr><th className="px-2 py-1.5">First</th><th className="px-2 py-1.5">Last</th><th className="px-2 py-1.5">Full</th><th className="px-2 py-1.5">Gender</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-[var(--color-border)]">
                  <td className="px-2 py-1.5">{r.first}</td>
                  <td className="px-2 py-1.5">{r.last}</td>
                  <td className="px-2 py-1.5">{r.full}</td>
                  <td className="px-2 py-1.5 text-[var(--color-muted)]">{r.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
