"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/tools/registry";

export function Search() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return TOOLS.filter((t) =>
      [t.name, t.tagline, t.slug, ...t.seo.keywords].some((s) =>
        s.toLowerCase().includes(query),
      ),
    ).slice(0, 8);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = ref.current?.querySelector("input");
        input?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search tools…"
          className="w-full h-9 pl-8 pr-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]"
          aria-label="Search tools"
        />
        <kbd className="hidden sm:inline absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-muted)] border border-[var(--color-border)] rounded px-1.5 py-0.5">⌘K</kbd>
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full max-h-96 overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl">
          <ul className="py-1">
            {results.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tools/${t.category}/${t.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-3 py-2 hover:bg-[var(--color-surface)] text-sm"
                >
                  <span className="mt-0.5 text-base leading-none">{t.icon}</span>
                  <span>
                    <span className="block">{t.name}</span>
                    <span className="block text-xs text-[var(--color-muted)] line-clamp-1">{t.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
