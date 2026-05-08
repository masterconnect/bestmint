export type CategorySlug =
  | "text"
  | "developer"
  | "image"
  | "color"
  | "generators"
  | "calculators"
  | "datetime"
  | "seo"
  | "ai";

export interface CategoryFAQ {
  q: string;
  a: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** Long-form intro paragraphs rendered on the category page. */
  intro: string[];
  /** Category-level FAQs rendered with FAQPage JSON-LD. */
  faqs: CategoryFAQ[];
  accent: string; // hex tint used in UI
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const CATEGORIES: Category[] = [
  {
    slug: "text",
    name: "Text & Writing",
    tagline: "Word counters, case converters, lorem ipsum, text utilities.",
    description:
      "Everyday text utilities for writers, students, and content teams: count words and characters, transform case, generate placeholder text, compare and reverse strings.",
    intro: [
      "BestMint's free text and writing tools are built for anyone who works with words: bloggers checking word counts before submission, marketers fitting copy under Twitter and meta-description limits, students proofreading essays, and developers normalising case in variable names. Every tool is browser-based, so you can paste sensitive drafts, contracts or unreleased copy without it touching a server.",
      "Use the Word Counter to see live word, character, sentence and reading-time stats while you write. The Character Counter shows progress against the most common platform limits — Twitter (280), meta titles (60), meta descriptions (160) — so you stop hitting the cut-off mid-sentence. The Case Converter switches between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and CONSTANT_CASE in one click, and the Lorem Ipsum Generator produces clean placeholder text by paragraphs, sentences or words.",
      "For comparison and inspection workflows, the Text Diff Checker highlights line-by-line additions, deletions and changes between two blocks of text using the same LCS algorithm Git uses. The Text Reverser flips strings by character, word or line — useful for palindrome puzzles, log inspection and creative writing. All six tools are free, ad-light and never upload your input.",
    ],
    faqs: [
      {
        q: "Are these text tools really free with no signup?",
        a: "Yes. Every tool in this category — Word Counter, Character Counter, Case Converter, Lorem Ipsum Generator, Text Reverser and Text Diff Checker — is completely free with no account, no rate limit and no paywalled features.",
      },
      {
        q: "Will my text be stored or sent to a server?",
        a: "No. All text tools in this category run entirely in your browser using JavaScript. Your input is never uploaded to a server, logged or shared, which makes them safe to use for sensitive drafts, contracts and unreleased copy.",
      },
      {
        q: "Do the tools support Unicode and non-English languages?",
        a: "Yes. Counts and transformations are based on Unicode code points / grapheme clusters, so Chinese, Japanese, Korean, Arabic and Hebrew text are handled correctly — including emoji, which stay intact when reversing.",
      },
      {
        q: "What's the difference between word and character count?",
        a: "Word count splits on whitespace and counts the resulting tokens. Character count totals every Unicode character (with or without spaces). For SEO meta tags and tweets, character count is what matters; for essays and articles, word count is the usual unit.",
      },
    ],
    accent: "#f59e0b",
    seo: {
      title: "Free Text & Writing Tools — Word Counter, Case Converter & More | BestMint",
      description:
        "Free online text tools: word counter, character counter, case converter, lorem ipsum generator, text reverser, text diff. No signup, runs in your browser.",
      keywords: [
        "text tools",
        "writing tools online",
        "word counter",
        "character counter",
        "case converter",
        "lorem ipsum generator",
        "text diff online",
      ],
    },
  },
  {
    slug: "developer",
    name: "Developer",
    tagline: "JSON, Base64, JWT, regex, hashes — the daily dev toolbox.",
    description:
      "A complete browser-based toolkit for developers: format and validate JSON, encode/decode Base64 and URLs, decode JWTs, generate UUIDs and hashes, test regular expressions, minify HTML/CSS/JS.",
    intro: [
      "BestMint's developer category is the most-used part of the site — a free, browser-only collection of utilities for the daily work of building, debugging and shipping software. Whether you are inspecting a JWT from a flaky auth flow, formatting a deeply nested JSON response, computing the SHA-256 of a file you cannot upload, or testing a tricky regular expression with multiple capture groups, every tool here is designed to load fast, work offline and never send your input over the wire.",
      "The headline tools are the JSON Formatter & Validator (RFC 8259-strict, with line-accurate error messages), JSON ↔ CSV Converter (handles nested objects via dot-paths and quotes per RFC 4180), Base64 Encoder & Decoder (UTF-8 and URL-safe variants used in JWTs), URL Encoder & Decoder, HTML Entity Encoder, JWT Decoder (parses header, payload and signature with friendly timestamps), Hash Generator (MD5, SHA-1, SHA-256, SHA-512), UUID v4 Generator, Regex Tester with live highlighting, and an HTML/CSS/JS Minifier for inline scripts and email templates.",
      "Everything runs locally using the Web Crypto API, JSON.parse, the WHATWG URL standard and the browser's RegExp engine, so output matches what your production code will produce in Chrome, Firefox or Node.js. Tokens, secrets, payloads and hashes are computed on your device and never logged. If you find yourself bookmarking three or four single-purpose dev sites, this category is meant to replace all of them.",
    ],
    faqs: [
      {
        q: "Are the developer tools safe to use with production data and tokens?",
        a: "Yes. Every developer tool — JSON Formatter, JWT Decoder, Hash Generator, Base64 — runs entirely in your browser. Your tokens, payloads and secrets are not sent to any server and are not logged. You can safely paste production JWTs and JSON to debug.",
      },
      {
        q: "Does the JWT Decoder verify signatures?",
        a: "No. Signature verification requires the secret or public key, which is server-side. The decoder only parses the token (header, payload, signature) so you can read its contents and check claims like exp, iss and sub.",
      },
      {
        q: "Which regex flavour does the Regex Tester use?",
        a: "ECMAScript / JavaScript regex, identical to the engine in Chrome, Firefox and Node.js. Patterns from Python, PCRE or .NET may need adaptation — particularly named groups and look-behind in older browsers.",
      },
      {
        q: "Is MD5 still safe to use?",
        a: "MD5 is broken for security purposes (collisions are easy to construct), but it remains fine for non-security uses like file checksums and cache keys. Use SHA-256 or SHA-512 if you need cryptographic security.",
      },
      {
        q: "Can the JSON Formatter handle large files?",
        a: "Yes — comfortably up to several megabytes. Above that the browser's built-in JSON.parse may slow down regardless of the tool. For multi-gigabyte logs, use a streaming parser like jq.",
      },
    ],
    accent: "#6366f1",
    seo: {
      title: "Free Developer Tools Online — JSON, Base64, JWT, Regex | BestMint",
      description:
        "Free developer tools: JSON formatter & validator, Base64 encoder, JWT decoder, regex tester, hash generator (MD5/SHA-256), UUID generator and more. Runs entirely in the browser.",
      keywords: [
        "developer tools online",
        "free programming tools",
        "json formatter",
        "base64 encoder",
        "jwt decoder",
        "regex tester",
        "uuid generator",
        "hash generator",
      ],
    },
  },
  {
    slug: "image",
    name: "Image",
    tagline: "Convert, compress, resize and encode images in your browser.",
    description:
      "Image utilities that never upload your files: convert between PNG, JPG and WEBP, compress for the web, resize to exact dimensions, encode to Base64, generate favicons.",
    intro: [
      "BestMint's image tools are unusual in one important way: they never upload your files. Every conversion, compression, resize and encoding runs through the HTML Canvas API in your own browser. That means you can drop in screenshots containing private data, photos still under embargo, or proprietary assets without worrying about a server-side cache, an ad-tech pixel, or a leaked URL.",
      "The five image tools cover the most common day-to-day needs: the Image Format Converter switches between PNG, JPG and WEBP with a quality slider; the Image Compressor reduces JPG, PNG or WEBP file size with a side-by-side preview so you see exactly what each quality setting trades; the Image Resizer scales to exact pixel dimensions or by percentage with optional aspect-ratio lock; the Image to Base64 tool produces data URIs ready to paste into HTML, CSS or JSON; and the Favicon Generator outputs the full favicon set (16, 32, 48, 180 and 512 px) from any square source.",
      "Because everything is browser-based, performance scales with your hardware. A modern laptop will compress a 10 MB photo in well under a second; phone browsers will be slower but still local. There is no upload limit, no daily quota, and no watermark on the output.",
    ],
    faqs: [
      {
        q: "Are my images uploaded to a server?",
        a: "No. All image tools — converter, compressor, resizer, base64 encoder, favicon generator — process your image entirely in your browser using the Canvas API. Your files are never sent to any server.",
      },
      {
        q: "What's the best output format for the web?",
        a: "WEBP gives the smallest file size for both photos and graphics in modern browsers (~95% support). Fall back to JPG for photos and PNG for screenshots/transparency if you need universal compatibility.",
      },
      {
        q: "Why is my JPG bigger than the original PNG?",
        a: "JPG has overhead at high quality settings, and for images with large flat areas (UI screenshots, logos, line art) PNG is genuinely smaller. Try lowering JPG quality to 80–85, or stay on PNG/WEBP for non-photographic content.",
      },
      {
        q: "Will resizing reduce image quality?",
        a: "Downscaling rarely shows visible loss. Upscaling (making images larger) always loses quality because new pixel detail can't be invented from nothing — for that you'd need a dedicated AI upscaler.",
      },
    ],
    accent: "#10b981",
    seo: {
      title: "Free Online Image Tools — Convert, Compress, Resize | BestMint",
      description:
        "Free image tools online: convert PNG to JPG, JPG to WEBP, compress images, resize, generate favicons and image-to-base64. All processing happens in your browser.",
      keywords: [
        "image tools online",
        "free image converter",
        "png to jpg",
        "jpg to webp",
        "image compressor",
        "image resizer",
        "favicon generator",
        "image to base64",
      ],
    },
  },
  {
    slug: "color",
    name: "Color",
    tagline: "Pickers, palettes, gradients and contrast checkers.",
    description:
      "Color tools for designers and front-end developers: pick a color and copy HEX/RGB/HSL, build CSS gradients, generate harmonious palettes, check WCAG contrast ratios.",
    intro: [
      "Color sits at the intersection of design and code, and BestMint's color category is built for both audiences. Designers get a friendly visual picker with copyable HEX, RGB, HSL and HSV values, harmony-aware palette generation (complementary, analogous, triadic, tetradic) and a live CSS gradient builder. Front-end developers get accurate accessibility-grade contrast checking against WCAG 2.1 AA and AAA thresholds, with separate pass/fail flags for normal and large text.",
      "The Color Picker is the most-used tool in the category — drag the saturation/value square or type a value, and every color space updates live so you can copy whichever fits your stack (HEX for CSS, RGB for canvas, HSL for design tokens). The CSS Gradient Generator lets you stack multiple color stops on a linear or radial gradient, adjust angle, and copy ready-to-paste CSS that drops straight into a Tailwind arbitrary value or a vanilla stylesheet.",
      "The Color Palette Generator is the fastest way to build a brand palette from a single base color: choose a harmony rule and you'll get four to five complementary swatches, each copyable as HEX or exportable as CSS custom properties. Finally, the WCAG Contrast Checker is the accessibility safety net — paste a foreground/background pair and it tells you whether the combination passes AA (4.5:1 normal, 3:1 large) and AAA (7:1 normal, 4.5:1 large), so you never ship illegible body text.",
    ],
    faqs: [
      {
        q: "Which color format should I use in CSS?",
        a: "HEX (#6366f1) is the most common and readable. HSL (hsl(245, 80%, 67%)) is better when you want to derive related shades. RGB is most useful when interpolating colors in JavaScript. The picker shows all three so you can pick whichever fits.",
      },
      {
        q: "What's a 'good' contrast ratio?",
        a: "WCAG AA — the legal/industry standard — requires 4.5:1 for normal text and 3:1 for large text (≥18pt or 14pt bold). AAA (the stricter target) requires 7:1 and 4.5:1. Aim for AA at minimum on production sites; AAA where readability is critical (long-form reading, documents).",
      },
      {
        q: "Why does my gradient look banded?",
        a: "Banding shows up when adjacent color stops are too close in hue or value. Try widening the spread, or add an intermediate stop in a different hue family — the human eye perceives smooth gradients only when the hue/value path is gradual.",
      },
      {
        q: "Which palette should I pick for a brand?",
        a: "Analogous palettes feel calm and unified — good for content sites. Complementary pairs grab attention — good for buttons and CTAs. Triadic feels playful and balanced — good for illustration-heavy sites. Start with analogous for content and add a complementary accent.",
      },
    ],
    accent: "#ec4899",
    seo: {
      title: "Free Color Tools Online — Picker, Palette, Gradient, Contrast | BestMint",
      description:
        "Free online color tools: color picker (HEX, RGB, HSL), CSS gradient generator, palette generator, WCAG contrast checker. Built for designers and front-end developers.",
      keywords: [
        "color tools",
        "color picker online",
        "hex to rgb",
        "css gradient generator",
        "color palette generator",
        "wcag contrast checker",
      ],
    },
  },
  {
    slug: "generators",
    name: "Generators",
    tagline: "Passwords, QR codes, slugs and random data.",
    description:
      "Quickly generate the data you need: secure passwords, QR codes for any URL, URL-safe slugs, random numbers and more.",
    intro: [
      "The Generators category collects the small but crucial utilities that you reach for several times a week: a strong random password for a new account, a QR code to put in a slide deck, a URL-safe slug for a fresh blog post, a random number for a draw or a simulation. Every generator uses the browser's cryptographically secure random source (crypto.getRandomValues), the same source modern browsers use to derive cryptographic keys — so the output is genuinely unpredictable, not a Math.random shortcut.",
      "The Password Generator lets you tune length and character classes (uppercase, lowercase, digits, symbols) and optionally exclude lookalike characters (0/O, 1/l/I) for easier typing. The QR Code Generator produces scannable codes for any URL, contact card, Wi-Fi credential or arbitrary text and exports them as PNG (for slides and print) or SVG (for scaling and embedding). The Slug Generator converts any title into a URL-safe form: lowercase, hyphenated, ASCII-only with diacritics stripped — perfect for blog post permalinks. The Random Number Generator handles ranges, integers vs decimals, count, and duplicate-allowed rolls.",
      "Because everything is browser-only, the generated values never leak. A password you generate here is never logged or transmitted; a QR code's payload is encoded locally; a random number is computed on your device. That makes these tools safe for high-stakes use cases like account credentials and giveaway draws.",
    ],
    faqs: [
      {
        q: "Are the generated passwords cryptographically random?",
        a: "Yes. The Password Generator uses crypto.getRandomValues(), the browser's cryptographically secure random source. This is the same source modern browsers use to derive cryptographic keys.",
      },
      {
        q: "Do the QR codes expire?",
        a: "No — these are static QR codes that encode the data directly into the image. They work forever as long as the destination URL stays live. Dynamic QR codes (which redirect through a third-party service) are not supported here.",
      },
      {
        q: "How long should a password be?",
        a: "16+ characters with at least three character classes for important accounts. For low-risk accounts, 12 is fine. The strongest approach is to use a password manager and generate a unique 20+ character password per site.",
      },
      {
        q: "Is the random number generator suitable for raffles?",
        a: "Yes — randomness comes from your browser's secure random source, which is cryptographically unbiased. For high-stakes public draws, also share a verifiable seed or screen recording so participants can verify the result was not tampered with.",
      },
    ],
    accent: "#8b5cf6",
    seo: {
      title: "Free Online Generators — Password, QR Code, UUID, Slug | BestMint",
      description:
        "Free online generators: password generator, QR code generator, slug generator, random number generator. Fast, secure, no signup.",
      keywords: [
        "online generators",
        "password generator",
        "qr code generator",
        "slug generator",
        "random number generator",
      ],
    },
  },
  {
    slug: "calculators",
    name: "Calculators & Converters",
    tagline: "Units, percentages, age, BMI, tip splitters.",
    description:
      "Everyday calculators and unit converters: convert length/weight/temperature/volume, calculate percentages, BMI, age, and split bills.",
    intro: [
      "The calculators category brings together the everyday math that doesn't need a spreadsheet but is fiddly to do in your head. Convert kilometres to miles for a trip plan, kilograms to pounds for a recipe, Celsius to Fahrenheit for a forecast — the Unit Converter handles length, weight, temperature and volume with live two-way input, so you can type in any field and the others update instantly.",
      "The Percentage Calculator solves the three forms most people actually need: what is X% of Y (tax, tip, discount), X is what percent of Y (commission, score), and percent change from old → new (growth, sale price). The Age Calculator returns exact years, months and days between any birthdate and reference date, plus total days, hours and minutes lived — useful for milestone planning. The BMI Calculator supports both metric and imperial input and shows the WHO classification (a useful screen, not a diagnosis). The Tip & Bill Splitter calculates tip on pre-tax or total and divides cleanly across any number of people.",
      "All five calculators use exact international conversion factors (1 inch = 2.54 cm, 1 lb = 0.45359237 kg) and real calendar arithmetic for dates (leap years, varying month lengths). They run entirely in your browser, so they work on flaky restaurant Wi-Fi when the bill arrives.",
    ],
    faqs: [
      {
        q: "Are the unit conversion factors exact?",
        a: "Yes. We use the international definitions: 1 inch = 2.54 cm exactly, 1 lb = 0.45359237 kg exactly, 1 US gallon = 3.785411784 L. Temperature uses the exact ratios (°F = °C × 9/5 + 32).",
      },
      {
        q: "Is BMI an accurate measure of health?",
        a: "BMI is a population-level proxy and ignores muscle mass, frame size and body composition. Treat it as a rough screen, not a diagnosis. Athletes often have a 'high' BMI from muscle, not fat.",
      },
      {
        q: "Should I tip on the pre-tax or post-tax total?",
        a: "By US convention, tip is calculated on the pre-tax subtotal. Many people tip on the total for simplicity, which is slightly more generous. The Tip Splitter lets you toggle between the two.",
      },
      {
        q: "How is percent change calculated?",
        a: "(new − old) / old × 100. So going from 80 to 100 is a 25% increase ((100-80)/80 × 100), and going from 100 to 80 is a 20% decrease. A negative result means a decrease.",
      },
    ],
    accent: "#0ea5e9",
    seo: {
      title: "Free Online Calculators & Unit Converters | BestMint",
      description:
        "Free online calculators and converters: unit converter (length, weight, temperature, volume), percentage calculator, age calculator, BMI calculator, tip and bill splitter.",
      keywords: [
        "online calculator",
        "unit converter",
        "percentage calculator",
        "age calculator",
        "bmi calculator",
        "tip calculator",
      ],
    },
  },
  {
    slug: "datetime",
    name: "Time & Date",
    tagline: "Timestamps, time zones, date math.",
    description:
      "Tools for working with time: convert Unix timestamps, translate between time zones, and calculate the exact difference between two dates.",
    intro: [
      "Working with time is famously the source of most production bugs — daylight saving transitions, leap years, timestamps in seconds vs milliseconds, and the seventy-something IANA timezones. BestMint's time and date tools take the guesswork out of the three most common operations: converting Unix timestamps to readable dates and back, translating between time zones, and computing exact differences between two dates.",
      "The Unix Timestamp Converter auto-detects whether your input is in seconds (10 digits, the Unix standard) or milliseconds (13 digits, JavaScript's Date.now), and displays the result in both UTC and your local time. A one-click 'now' button gives you the current epoch instantly — handy for log inspection, cache busting and JWT exp claims.",
      "The Timezone Converter pulls from the IANA timezone database via the browser's Intl API, which means daylight saving transitions are handled correctly (including historical and upcoming changes). Pick a source zone, target zone(s) and a date/time and you'll see the equivalent local time everywhere. The Date Difference Calculator returns the exact span between two dates in days, weeks, months and years — with an optional business-day mode that excludes weekends, useful for project planning and SLA calculations.",
    ],
    faqs: [
      {
        q: "Is my Unix timestamp in seconds or milliseconds?",
        a: "10-digit timestamps are usually seconds (the Unix standard). 13-digit timestamps are milliseconds (JavaScript's Date.now()). The converter autodetects the most likely interpretation and shows both for ambiguous values.",
      },
      {
        q: "Does the timezone converter handle daylight saving?",
        a: "Yes. We use the IANA timezone database via the browser's Intl API, which knows historical and upcoming DST transitions for every zone. So a meeting at 10:00 New York on November 5 will correctly show 15:00 London on the same date, even though the offset shifts.",
      },
      {
        q: "Are days inclusive or exclusive in the date difference?",
        a: "By default we count whole days between the two dates (exclusive of the end). The Date Difference tool has an inclusive toggle if you want to include both endpoints — useful for vacation-day counts and rental periods.",
      },
      {
        q: "Why is the result of subtracting two dates wrong by an hour?",
        a: "DST. When the difference spans a daylight-saving transition, the wall-clock difference can be off by an hour from the actual elapsed time. We handle this correctly by computing in UTC internally and only converting to local time for display.",
      },
    ],
    accent: "#f97316",
    seo: {
      title: "Free Time & Date Tools — Timestamp, Timezone, Date Diff | BestMint",
      description:
        "Free online time and date tools: Unix timestamp converter, timezone converter, date difference calculator. Fast and accurate, runs in your browser.",
      keywords: [
        "time tools",
        "date tools",
        "unix timestamp converter",
        "epoch converter",
        "timezone converter",
        "date difference calculator",
      ],
    },
  },
  {
    slug: "seo",
    name: "SEO",
    tagline: "Meta tags, Open Graph previews, robots.txt.",
    description:
      "SEO helpers for site owners and marketers: build meta tags, preview how your page looks on Facebook/Twitter/LinkedIn, generate a robots.txt.",
    intro: [
      "Search engine optimisation comes down to a handful of unglamorous but essential checks: are your meta tags well-formed, will your Open Graph preview look right when someone shares the URL on Slack or LinkedIn, and is your robots.txt telling crawlers what you want them to see? BestMint's SEO tools cover those three workflows directly.",
      "The Meta Tag Generator produces a complete <head> block in seconds: standard SEO (title, description, canonical), Open Graph (og:title, og:description, og:url, og:image, og:type) and Twitter Card (summary_large_image with twitter:title, twitter:description, twitter:image). Paste your title, description, URL and image and copy the output straight into your HTML — exactly the format Google, Facebook and Twitter expect.",
      "The Open Graph Preview is the social-share equivalent of pixel-perfect QA: paste a live URL and see how it renders on Facebook, LinkedIn, Twitter/X and Slack — including the OG image, title and description. Use it before launch to verify your meta tags actually produce the right preview. The Robots.txt Generator builds a valid robots.txt with allow/disallow rules per user agent and a sitemap pointer — handy when you need to block a staging path, exclude a crawler, or get crawling re-enabled after a launch.",
    ],
    faqs: [
      {
        q: "Do I need both Open Graph and Twitter Card meta tags?",
        a: "Twitter does fall back to Open Graph if no twitter:* tags are present, so technically OG-only works. But adding a few twitter:* tags lets you customise the share view on Twitter/X specifically — usually a different image dimension or a more concise title.",
      },
      {
        q: "Why doesn't my Open Graph preview update after I changed the meta tags?",
        a: "Social platforms cache OG data aggressively, often for days or weeks. Use Facebook's Sharing Debugger or LinkedIn's Post Inspector to force a re-fetch, or change the URL slightly (e.g., add a query param) to bust the cache.",
      },
      {
        q: "Does robots.txt actually block crawling?",
        a: "It tells well-behaved crawlers (Googlebot, Bingbot) what not to fetch. It is not a security control — sensitive content should be protected by authentication, not by robots.txt. Many crawlers ignore it entirely, and any URL listed in robots.txt is publicly visible.",
      },
      {
        q: "What's a good meta description length?",
        a: "Aim for 140–160 characters. Google will truncate longer descriptions in the search snippet, and overly short ones (<70) often get rewritten by Google's algorithm with content from the page.",
      },
    ],
    accent: "#22c55e",
    seo: {
      title: "Free SEO Tools — Meta Tag Generator, OG Preview, Robots.txt | BestMint",
      description:
        "Free SEO tools: meta tag generator, Open Graph preview, robots.txt generator. Improve how your pages look in search and social.",
      keywords: [
        "seo tools",
        "meta tag generator",
        "open graph preview",
        "robots.txt generator",
        "social card preview",
      ],
    },
  },
  {
    slug: "ai",
    name: "AI Tools",
    tagline: "Summarize, paraphrase and translate with Gemma.",
    description:
      "Practical AI utilities powered by Google Gemma: summarize long articles, paraphrase text in a chosen tone, translate between languages.",
    intro: [
      "Unlike the rest of BestMint, the AI category genuinely calls a model — Google's Gemma — for the heavy lifting, because that's what these tasks fundamentally need. The three tools (Summarizer, Paraphraser and Translator) cover the most common everyday uses of generative AI for text, packaged as focused single-purpose UIs instead of an open-ended chat box.",
      "The AI Text Summarizer takes any article, paper or long note and returns a concise summary in a chosen format: bullet points (skim-friendly), short paragraph (executive summary style) or one-line abstract. Paste up to ~30,000 characters per request — long enough for most blog posts, news articles and meeting transcripts. The AI Paraphraser rewrites text in a chosen tone (formal, casual, concise, friendly, playful) while preserving meaning, useful for emails, marketing copy and tightening prose. The AI Translator handles 40+ languages and tends to produce more idiom-aware output than dictionary-style translators, especially for longer sentences.",
      "Privacy note: because these tools call Google's Gemma API, your input does leave your device for that single request. We don't log or persist the content beyond the request itself, but if you're handling truly sensitive material (health records, legal documents, internal corporate text), use the browser-only tools instead. Rate limits apply per IP to keep the service free for everyone.",
    ],
    faqs: [
      {
        q: "Is my input stored when I use the AI tools?",
        a: "No. Your text is sent directly to Google's Gemma API for processing — we don't log or persist the content beyond the request. Note that this means the input briefly leaves your device, unlike our browser-only tools.",
      },
      {
        q: "How long can my input be?",
        a: "Up to roughly 30,000 characters per request. For longer documents, split them into sections of 3–5 minutes' reading length and summarise each, then summarise the summaries.",
      },
      {
        q: "Are the AI tools really free?",
        a: "Yes. We absorb the API cost and apply a per-IP rate limit (20 requests per minute) to keep the service free for everyone. No signup, no payment.",
      },
      {
        q: "How does Gemma compare to GPT or Claude for these tasks?",
        a: "Gemma is a smaller open model. For translation, summarization and paraphrasing of typical web content, the quality is comparable to commercial offerings. For complex reasoning or very specialised domains, frontier models from Anthropic or OpenAI will pull ahead — but for these focused tools, Gemma is a strong fit.",
      },
    ],
    accent: "#a855f7",
    seo: {
      title: "Free AI Tools Online — Summarizer, Paraphraser, Translator | BestMint",
      description:
        "Free AI tools powered by Gemma: text summarizer, paraphraser/rewriter, language translator. Fast, simple, no signup.",
      keywords: [
        "ai tools online",
        "free ai summarizer",
        "ai paraphraser",
        "ai translator",
        "gemma tools",
      ],
    },
  },
];

export const CATEGORY_BY_SLUG: Record<CategorySlug, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;
