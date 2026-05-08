"use client";
import { useState } from "react";

export function CopyButton({ value, label = "Copy", className = "" }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          /* ignore */
        }
      }}
      className={`px-2.5 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
