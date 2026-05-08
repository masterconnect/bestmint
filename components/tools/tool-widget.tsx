import dynamic from "next/dynamic";

const widgets: Record<string, ReturnType<typeof dynamic>> = {
  // Text
  "word-counter": dynamic(() => import("./word-counter").then((m) => m.default)),
  "character-counter": dynamic(() => import("./character-counter").then((m) => m.default)),
  "case-converter": dynamic(() => import("./case-converter").then((m) => m.default)),
  "lorem-ipsum": dynamic(() => import("./lorem-ipsum").then((m) => m.default)),
  "text-reverser": dynamic(() => import("./text-reverser").then((m) => m.default)),
  "text-diff": dynamic(() => import("./text-diff").then((m) => m.default)),
  // Developer
  "json-formatter": dynamic(() => import("./json-formatter").then((m) => m.default)),
  "json-csv": dynamic(() => import("./json-csv").then((m) => m.default)),
  "base64": dynamic(() => import("./base64").then((m) => m.default)),
  "url-encoder": dynamic(() => import("./url-encoder").then((m) => m.default)),
  "html-entities": dynamic(() => import("./html-entities").then((m) => m.default)),
  "jwt-decoder": dynamic(() => import("./jwt-decoder").then((m) => m.default)),
  "hash-generator": dynamic(() => import("./hash-generator").then((m) => m.default)),
  "uuid-generator": dynamic(() => import("./uuid-generator").then((m) => m.default)),
  "regex-tester": dynamic(() => import("./regex-tester").then((m) => m.default)),
  "minifier": dynamic(() => import("./minifier").then((m) => m.default)),
  // Image
  "image-converter": dynamic(() => import("./image-converter").then((m) => m.default)),
  "image-compressor": dynamic(() => import("./image-compressor").then((m) => m.default)),
  "image-resizer": dynamic(() => import("./image-resizer").then((m) => m.default)),
  "image-to-base64": dynamic(() => import("./image-to-base64").then((m) => m.default)),
  "favicon-generator": dynamic(() => import("./favicon-generator").then((m) => m.default)),
  // Color
  "color-picker": dynamic(() => import("./color-picker").then((m) => m.default)),
  "gradient-generator": dynamic(() => import("./gradient-generator").then((m) => m.default)),
  "color-palette": dynamic(() => import("./color-palette").then((m) => m.default)),
  "contrast-checker": dynamic(() => import("./contrast-checker").then((m) => m.default)),
  // Generators
  "password-generator": dynamic(() => import("./password-generator").then((m) => m.default)),
  "qr-generator": dynamic(() => import("./qr-generator").then((m) => m.default)),
  "random-number": dynamic(() => import("./random-number").then((m) => m.default)),
  "slug-generator": dynamic(() => import("./slug-generator").then((m) => m.default)),
  // Calculators
  "unit-converter": dynamic(() => import("./unit-converter").then((m) => m.default)),
  "percentage-calculator": dynamic(() => import("./percentage-calculator").then((m) => m.default)),
  "age-calculator": dynamic(() => import("./age-calculator").then((m) => m.default)),
  "bmi-calculator": dynamic(() => import("./bmi-calculator").then((m) => m.default)),
  "tip-calculator": dynamic(() => import("./tip-calculator").then((m) => m.default)),
  // Datetime
  "timestamp-converter": dynamic(() => import("./timestamp-converter").then((m) => m.default)),
  "timezone-converter": dynamic(() => import("./timezone-converter").then((m) => m.default)),
  "date-diff": dynamic(() => import("./date-diff").then((m) => m.default)),
  // SEO
  "meta-tag-generator": dynamic(() => import("./meta-tag-generator").then((m) => m.default)),
  "og-preview": dynamic(() => import("./og-preview").then((m) => m.default)),
  "robots-generator": dynamic(() => import("./robots-generator").then((m) => m.default)),
  // AI
  "ai-summarizer": dynamic(() => import("./ai-summarizer").then((m) => m.default)),
  "ai-paraphraser": dynamic(() => import("./ai-paraphraser").then((m) => m.default)),
  "ai-translator": dynamic(() => import("./ai-translator").then((m) => m.default)),
};

export function ToolWidget({ slug }: { slug: string }) {
  const Widget = widgets[slug];
  if (!Widget) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-muted)]">
        This tool isn&rsquo;t implemented yet.
      </div>
    );
  }
  return <Widget />;
}
