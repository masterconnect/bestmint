import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

const EFFECTIVE_DATE = "May 12, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data. Most tools run entirely in your browser; AI tools send prompts to Google Gemini; ads are served by Google AdSense.`,
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span>Privacy</span>
      </nav>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Last updated: {EFFECTIVE_DATE}</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--color-foreground)]/90">
        <section>
          <p>
            {SITE.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides free online utilities at {SITE.url}.
            This policy explains what data we collect, how we use it, and the third parties involved. We do not
            require accounts and we do not sell personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">1. What we collect</h2>
          <p className="mb-3">Most of our tools run entirely inside your browser — the input you type never leaves your device. Specific cases where data does leave your device:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>AI tools.</strong> Tools marked &quot;AI&quot; (such as the AI summarizer, translator, paraphraser, and similar) send the text you submit to Google&apos;s Gemini API to generate a response. We do not store these prompts on our servers; they pass through our backend and are sent to Google. Google&apos;s own data handling is described in the{" "}
              <a className="underline hover:text-[var(--color-accent)]" href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Gemini API terms</a>.
            </li>
            <li>
              <strong>Rate-limiting metadata.</strong> When you use an AI tool, we briefly hold your IP address in memory to prevent abuse. It is not written to disk and is discarded when the server process restarts.
            </li>
            <li>
              <strong>Standard server logs.</strong> Our hosting provider (Vercel) records standard request metadata (IP, user agent, timestamp, requested URL) for operational and security purposes.
            </li>
            <li>
              <strong>Advertising.</strong> We display ads served by Google AdSense, which uses cookies and similar technologies to personalize and measure ads. See the{" "}
              <Link className="underline hover:text-[var(--color-accent)]" href="/cookies">Cookie Policy</Link>{" "}for details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">2. What we do not collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not require email addresses, accounts, or sign-ins.</li>
            <li>We do not run our own analytics tracker on visitors.</li>
            <li>We do not store the contents of files you upload to in-browser tools (image converters, JSON formatters, etc.) — those run locally.</li>
            <li>We do not sell or rent any visitor data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">3. Third-party services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google AdSense</strong> — serves ads and may use cookies for personalization and measurement (<a className="underline hover:text-[var(--color-accent)]" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google uses information</a>).</li>
            <li><strong>Google Gemini API</strong> — processes prompts submitted to AI tools.</li>
            <li><strong>Vercel</strong> — hosts the site and provides standard infrastructure logging.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">4. Visitors in the EEA, UK, and Switzerland</h2>
          <p>
            We use Google&apos;s certified consent management platform (CMP) to collect your consent before showing personalized ads. You can accept, reject, or manage your choices through the consent banner that appears on your first visit, and revisit it at any time via the &quot;Privacy choices&quot; link in the consent banner footer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">5. Visitors in California (CCPA/CPRA)</h2>
          <p>
            We do not sell personal information as defined by the CCPA. You may submit requests to know or delete data we hold by contacting us at the address below; in practice, because we don&apos;t maintain user accounts, we hold very little information that could be linked back to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">6. Children</h2>
          <p>
            {SITE.name} is not directed at children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided personal information, contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">7. Security</h2>
          <p>
            We use industry-standard HTTPS to encrypt traffic in transit. No system is perfectly secure; in the unlikely event of a breach that affects user data we hold, we will notify affected users and applicable authorities as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">8. Changes</h2>
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top reflects the most recent change. Material changes will be highlighted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-3">9. Contact</h2>
          <p>
            Questions or requests about this policy: <a className="underline hover:text-[var(--color-accent)]" href="mailto:contact@bestmint.com">contact@bestmint.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
