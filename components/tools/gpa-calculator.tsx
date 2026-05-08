"use client";
import { useState } from "react";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

const GRADES: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

type Row = { name: string; credits: number; grade: string };

export default function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { name: "Course 1", credits: 3, grade: "A" },
    { name: "Course 2", credits: 4, grade: "B+" },
    { name: "Course 3", credits: 3, grade: "A-" },
  ]);

  const totalCredits = rows.reduce((s, r) => s + (r.credits || 0), 0);
  const points = rows.reduce((s, r) => s + (r.credits || 0) * (GRADES[r.grade] ?? 0), 0);
  const gpa = totalCredits > 0 ? points / totalCredits : 0;

  const update = (i: number, patch: Partial<Row>) => setRows((rs) => rs.map((r, j) => j === i ? { ...r, ...patch } : r));
  const remove = (i: number) => setRows((rs) => rs.filter((_, j) => j !== i));
  const add = () => setRows((rs) => [...rs, { name: `Course ${rs.length + 1}`, credits: 3, grade: "A" }]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Panel title="Courses" action={<button onClick={add} className={btnGhost("text-xs")}>+ Add</button>}>
          <div className="space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input value={r.name} onChange={(e) => update(i, { name: e.target.value })} className={inputCls("col-span-5")} />
                <input type="number" min={0} value={r.credits} onChange={(e) => update(i, { credits: Number(e.target.value) })} className={inputCls("col-span-3 font-mono")} placeholder="Credits" />
                <select value={r.grade} onChange={(e) => update(i, { grade: e.target.value })} className={inputCls("col-span-3")}>
                  {Object.keys(GRADES).map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <button onClick={() => remove(i)} className="col-span-1 text-[var(--color-muted)] hover:text-red-400">×</button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="GPA">
        <div className="text-6xl font-bold tabular-nums">{gpa.toFixed(2)}</div>
        <div className="text-sm text-[var(--color-muted)] mt-1">on 4.0 scale</div>
        <div className="mt-4 text-sm space-y-1">
          <div>Total credits: <span className="font-mono">{totalCredits}</span></div>
          <div>Quality points: <span className="font-mono">{points.toFixed(2)}</span></div>
        </div>
      </Panel>
    </div>
  );
}
