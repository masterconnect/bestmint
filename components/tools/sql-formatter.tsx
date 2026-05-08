"use client";
import { useMemo, useState } from "react";
import { format } from "sql-formatter";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `select u.id, u.name, count(o.id) as orders from users u left join orders o on o.user_id=u.id where u.active=true group by u.id, u.name order by orders desc limit 10;`;

const DIALECTS: { value: string; label: string }[] = [
  { value: "sql", label: "Standard SQL" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "tsql", label: "T-SQL (MSSQL)" },
  { value: "bigquery", label: "BigQuery" },
];

export default function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [dialect, setDialect] = useState("sql");
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "" };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = format(input, { language: dialect as any, tabWidth: indent, keywordCase: "upper" });
      return { ok: true as const, output };
    } catch (e) {
      return { ok: false as const, output: e instanceof Error ? e.message : "Format error" };
    }
  }, [input, dialect, indent]);

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="flex flex-wrap gap-2 items-center">
          <select value={dialect} onChange={(e) => setDialect(e.target.value)} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            {DIALECTS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input SQL" action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[320px]")} spellCheck={false} />
        </Panel>
        <Panel title="Formatted" action={<CopyButton value={result.output} />}>
          <pre className={`${textareaCls("min-h-[320px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>{result.output}</pre>
        </Panel>
      </div>
    </div>
  );
}
