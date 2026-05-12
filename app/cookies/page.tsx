import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

const EFFECTIVE_DATE = "May 12, 2026";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookies used on ${SITE.name}: advertising cookies set by Google AdSense, no first-party analytics. How to manage your choices.`,
  alternates: { canonical: `${SITE.url}/cookies` },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span>Cookies</span>
      </nav>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Cookie Policy</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Last updated: {EFFECTIVE_DATE}</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--color-foreground)]/90">
        <section>
          <p>
            This page explains what cookies and similar technologies are used on {SITE.name} and how you can control them.
            For the broader picture of how we handle data, see our <Link className="underline hover:text-[var(--color-accent)]" href="/privacy">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">1. What is a cookie?</h2>
          <p>
            A cookie is a small text file that a website stores on your device. Cookies are used to remember information between page loads or visits — preferences, login state, ad measurement, and similar. Similar technologies (local storage, pixel tags, device identifiers) play comparable roles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">2. Cookies we use</h2>

          <div className="mt-4 rounded-lg border border-[var(--color-border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-surface)] text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                  <th className="px-4 py-3 font-medium">Set by</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                <tr>
                  <td className="px-4 py-3 align-top">First-party functional</td>
                  <td className="px-4 py-3 align-top">None at this time. Tools that remember settings use your browser&apos;s local storage on your device only; nothing is sent to our servers.</td>
                  <td className="px-4 py-3 align-top">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Analytics</td>
                  <td className="px-4 py-3 align-top">We do not run a first-party analytics tracker.</td>
                  <td className="px-4 py-3 align-top">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Advertising</td>
                  <td className="px-4 py-3 align-top">Serve and measure ads, including personalization where consent is given. Common cookies/identifiers include <code>__gads</code>, <code>__gpi</code>, <code>IDE</code>, and the <code>NID</code>/<code>SOCS</code> family.</td>
                  <td className="px-4 py-3 align-top">Google AdSense</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Consent</td>
                  <td className="px-4 py-3 align-top">Stores your consent choices so the banner doesn&apos;t reappear on every page.</td>
                  <td className="px-4 py-3 align-top">Google Funding Choices (CMP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">3. Managing your choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>EEA, UK, Switzerland.</strong> A consent banner is shown on your first visit, where you can accept, reject, or manage individual purposes. Use the &quot;Privacy choices&quot; link in the banner footer to change your selection later.
            </li>
            <li>
              <strong>Ad personalization (any region).</strong> You can opt out of personalized advertising by Google across the web at <a className="underline hover:text-[var(--color-accent)]" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.
            </li>
            <li>
              <strong>Browser controls.</strong> Most browsers let you block or delete cookies in their privacy settings. Blocking all cookies will not prevent {SITE.name} from working, but some ads may be less relevant.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">4. Third-party cookies</h2>
          <p>
            Ads on {SITE.name} are served by Google AdSense. Google uses cookies and similar technologies to serve ads, measure their performance, and — with your consent in regions that require it — personalize them. Google&apos;s practices are described at{" "}
            <a className="underline hover:text-[var(--color-accent)]" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">5. Changes</h2>
          <p>
            If we add new categories of cookies — for example, first-party analytics — we will update this page and reflect the change in the consent banner where required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">6. Contact</h2>
          <p>
            Questions about cookies: <a className="underline hover:text-[var(--color-accent)]" href="mailto:contact@bestmint.com">contact@bestmint.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
