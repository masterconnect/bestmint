"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel, textareaCls } from "@/components/ui/panel";

interface Rule {
  find: string;
  replace: string;
  caseSensitive: boolean;
  regex: boolean;
  global: boolean;
}

const blank: Rule = { find: "", replace: "", caseSensitive: true, regex: false, global: true };

export default function FindReplace() {
  const [input, setInput] = useState("The quick brown fox jumps over the lazy dog. The fox is quick.");
  const [rules, setRules] = useState<Rule[]>([{ ...blank, find: "fox", replace: "cat" }]);
  const [error, setError] = useState<string | null>(null);

  const output = useMemo(() => {
    let s = input;
    setError(null);
    for (const r of rules) {
      if (!r.find) continue;
      try {
        if (r.regex) {
          const flags = (r.caseSensitive ? "" : "i") + (r.global ? "g" : "");
          s = s.replace(new RegExp(r.find, flags), r.replace);
        } else {
          if (r.global) {
            const re = new RegExp(r.find.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), (r.caseSensitive ? "" : "i") + "g");
            s = s.replace(re, r.replace);
          } else {
            const idx = r.caseSensitive ? s.indexOf(r.find) : s.toLowerCase().indexOf(r.find.toLowerCase());
            if (idx >= 0) s = s.slice(0, idx) + r.replace + s.slice(idx + r.find.length);
          }
        }
      } catch (e) {
        setError(`Rule error: ${(e as Error).message}`);
      }
    }
    return s;
  }, [input, rules]);

  const update = (i: number, patch: Partial<Rule>) => setRules((rs) => rs.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  const remove = (i: number) => setRules((rs) => rs.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Rules">
        <div className="space-y-3">
          {rules.map((r, i) => (
            <div key={i} className="rounded-md border border-[var(--color-border)] p-3 space-y-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={r.find} onChange={(e) => update(i, { find: e.target.value })} placeholder="Find" className={inputCls()} />
                <input value={r.replace} onChange={(e) => update(i, { replace: e.target.value })} placeholder="Replace with" className={inputCls()} />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1"><input type="checkbox" checked={r.caseSensitive} onChange={(e) => update(i, { caseSensitive: e.target.checked })} className="accent-[var(--color-accent)]" />Case-sensitive</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={r.regex} onChange={(e) => update(i, { regex: e.target.checked })} className="accent-[var(--color-accent)]" />Regex</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={r.global} onChange={(e) => update(i, { global: e.target.checked })} className="accent-[var(--color-accent)]" />Global</label>
                <button onClick={() => remove(i)} className="ml-auto px-2 py-1 rounded border border-[var(--color-border)] hover:border-red-400 hover:text-red-400">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setRules((rs) => [...rs, { ...blank }])} className={btnGhost("mt-3")}>Add rule</button>
        {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <textarea readOnly value={output} className={textareaCls()} />
      </Panel>
    </div>
  );
}
