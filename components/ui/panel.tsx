import type { ReactNode } from "react";

export function Panel({ title, action, children }: { title?: ReactNode; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {(title || action) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] text-sm">
          <div className="font-medium">{title}</div>
          <div>{action}</div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function inputCls(extra = "") {
  return `w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] ${extra}`;
}

export function textareaCls(extra = "") {
  return `w-full min-h-[180px] rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm font-mono placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] ${extra}`;
}

export function btnPrimary(extra = "") {
  return `inline-flex items-center justify-center px-3.5 py-2 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50 disabled:cursor-not-allowed ${extra}`;
}

export function btnGhost(extra = "") {
  return `inline-flex items-center justify-center px-3.5 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition ${extra}`;
}
