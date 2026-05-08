import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <p className="text-sm text-[var(--color-muted)]">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Tool not found</h1>
      <p className="mt-3 text-[var(--color-muted)]">
        The tool you&rsquo;re looking for doesn&rsquo;t exist (yet). Browse all tools from the homepage.
      </p>
      <Link href="/" className="mt-8 inline-block px-4 py-2 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition">
        ← Back to homepage
      </Link>
    </div>
  );
}
