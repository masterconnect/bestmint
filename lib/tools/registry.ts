import type { CategorySlug } from "./categories";

export interface FAQ {
  q: string;
  a: string;
}

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Tool {
  slug: string;
  category: CategorySlug;
  name: string;
  tagline: string;
  /** Longer description used on the tool page above the working tool. */
  summary: string;
  /** Common use cases — short bullet items, rendered as a list on the tool page. */
  useCases: string[];
  /** Single emoji or short label used in cards. */
  icon: string;
  /** AI-only — flagged so we know to render the API-backed widget. */
  ai?: boolean;
  seo: ToolSEO;
  faqs: FAQ[];
}

export const TOOLS: Tool[] = [
  // ─── Text & Writing ─────────────────────────────────────────────────────────
  {
    slug: "word-counter",
    category: "text",
    name: "Word Counter",
    tagline: "Count words, characters, sentences and reading time as you type.",
    summary:
      "A free online word counter. Paste or type your text and instantly see the number of words, characters (with and without spaces), sentences, paragraphs and an estimated reading time. Useful for essays, blog posts, social-media captions and SEO content briefs.",
    useCases: [
      "Track word count for essays, term papers and academic submissions",
      "Stay under social-media character limits like Twitter/X (280) and LinkedIn",
      "Estimate reading time for newsletters, blog posts and Medium articles",
      "Verify SEO meta-title (60) and meta-description (160) length before publishing",
    ],
    icon: "📝",
    seo: {
      title: "Free Word Counter Online — Words, Characters, Reading Time | BestMint",
      description:
        "Free online word counter. Count words, characters, sentences, paragraphs and reading time instantly. Works in your browser, no signup.",
      keywords: [
        "word counter",
        "word count tool",
        "character counter",
        "reading time calculator",
        "online word counter",
        "free word counter",
      ],
    },
    faqs: [
      { q: "Is the word counter free?", a: "Yes. All counting happens in your browser — there are no limits, no signup, and your text never leaves your device." },
      { q: "How is reading time calculated?", a: "Reading time is estimated at 225 words per minute, the average adult reading speed for typical web prose." },
      { q: "Does it count Chinese, Japanese or Korean characters?", a: "Yes — character count is based on Unicode code points, so CJK characters are counted accurately." },
      { q: "What counts as a sentence?", a: "Sentences are split on terminal punctuation (. ! ?) followed by whitespace or end-of-input. Abbreviations like 'Dr.' inside a sentence are ignored heuristically." },
    ],
  },
  {
    slug: "character-counter",
    category: "text",
    name: "Character Counter",
    tagline: "Count characters with and without spaces, ideal for tweets and SEO meta tags.",
    summary:
      "A precise character counter for any text. See the live count with and without spaces, the byte size in UTF-8, and progress against common limits like Twitter (280), meta titles (60) and meta descriptions (160).",
    useCases: [
      "Stay under Twitter/X 280-character limits when drafting threads",
      "Hit the SEO sweet spot for meta titles (50–60) and meta descriptions (140–160)",
      "Check Instagram caption length (2,200) and bio length (150)",
      "Measure UTF-8 byte size for database TEXT columns and API payload limits",
    ],
    icon: "🔤",
    seo: {
      title: "Free Character Counter Online — With/Without Spaces | BestMint",
      description:
        "Free character counter online. Count characters with and without spaces, plus byte size and Twitter/SEO meta-tag limit progress. Runs in your browser.",
      keywords: [
        "character counter",
        "letter counter",
        "twitter character count",
        "meta description length",
        "online character count",
      ],
    },
    faqs: [
      { q: "What's the difference between characters and bytes?", a: "Characters count visible glyphs; bytes count the storage size in UTF-8, where many non-ASCII characters take 2–4 bytes." },
      { q: "Why does it show Twitter and meta tag limits?", a: "These are the most common reasons people count characters online, so we show your progress toward each limit at a glance." },
      { q: "Does an emoji count as one character?", a: "Visually yes, but in storage many emoji are 2–4 UTF-16 code units. We count by grapheme cluster (visual character) for the main count and show byte size separately." },
    ],
  },
  {
    slug: "case-converter",
    category: "text",
    name: "Case Converter",
    tagline: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and kebab-case.",
    summary:
      "Convert text between common letter-case styles in one click: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, CONSTANT_CASE and kebab-case. Useful for renaming variables, tidying headlines and normalising data.",
    useCases: [
      "Rename JavaScript / TypeScript variables to camelCase or PascalCase",
      "Convert column headers to snake_case for SQL or pandas DataFrames",
      "Build URL-friendly slugs by switching titles to kebab-case",
      "Tidy book and article headlines into proper Title Case",
    ],
    icon: "Aa",
    seo: {
      title: "Free Case Converter — UPPERCASE, lowercase, camelCase, snake_case | BestMint",
      description:
        "Free online case converter. Switch text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. Instant, browser-only.",
      keywords: [
        "case converter",
        "uppercase to lowercase",
        "camelcase converter",
        "snake case converter",
        "kebab case converter",
        "title case converter",
      ],
    },
    faqs: [
      { q: "What's Title Case vs Sentence case?", a: "Title Case capitalises the first letter of each major word (\"The Quick Brown Fox\"). Sentence case capitalises only the first letter of the sentence (\"The quick brown fox\")." },
      { q: "Does camelCase remove punctuation?", a: "Yes — for camelCase, PascalCase, snake_case and kebab-case we treat any non-alphanumeric character as a word boundary and drop it from the output." },
      { q: "Will it preserve acronyms?", a: "Title Case preserves them (USA stays USA). camelCase/PascalCase lower-case them by default — toggle 'preserve acronyms' if you need APIClient instead of apiClient." },
    ],
  },
  {
    slug: "lorem-ipsum",
    category: "text",
    name: "Lorem Ipsum Generator",
    tagline: "Generate placeholder text by words, sentences or paragraphs.",
    summary:
      "Generate Lorem Ipsum placeholder text on demand. Choose how many paragraphs, sentences or words you need, optionally start with the classic \"Lorem ipsum dolor sit amet…\" opener, and copy with a click.",
    useCases: [
      "Fill design mockups in Figma, Sketch or Adobe XD without distracting copy",
      "Stub out blog posts, product descriptions and CMS entries during development",
      "Test text wrapping, line height and typography in CSS layouts",
      "Generate placeholder for empty-state screens and skeleton loaders",
    ],
    icon: "📄",
    seo: {
      title: "Lorem Ipsum Generator — Free Placeholder Text Online | BestMint",
      description:
        "Free Lorem Ipsum generator. Create dummy placeholder text by paragraphs, sentences or words for mockups, designs and prototypes. Copy with one click.",
      keywords: [
        "lorem ipsum generator",
        "placeholder text generator",
        "dummy text generator",
        "lipsum",
        "filler text",
      ],
    },
    faqs: [
      { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is scrambled Latin used as filler text since the 1500s. It lets designers focus on layout and typography without being distracted by readable copy." },
      { q: "Can I start without the classic opener?", a: "Yes — toggle off \"Start with 'Lorem ipsum…'\" and the generator will start with random words instead." },
      { q: "Why use Lorem Ipsum instead of real copy?", a: "Real copy makes you read it instead of evaluating the design. Lorem Ipsum has the same visual weight and word-length distribution as English without the meaning." },
    ],
  },
  {
    slug: "text-reverser",
    category: "text",
    name: "Text Reverser",
    tagline: "Reverse text by characters, words or lines.",
    summary:
      "Flip your text in three ways: reverse the order of characters, words, or lines. Useful for puzzles, palindromes, log file inspection and creative writing.",
    useCases: [
      "Test palindromes by reversing and comparing case-insensitively",
      "Reverse log files to read newest-first when your viewer doesn't support it",
      "Generate creative text effects for posters, branding and social posts",
      "Reverse word order to spot accidental phrase repetition in long-form writing",
    ],
    icon: "⇄",
    seo: {
      title: "Free Text Reverser Online — Reverse Characters, Words, Lines | BestMint",
      description:
        "Reverse text online for free. Flip the order of characters, words or lines. Works in your browser, no signup.",
      keywords: [
        "text reverser",
        "reverse text online",
        "reverse string",
        "backwards text generator",
      ],
    },
    faqs: [
      { q: "Does it preserve emoji?", a: "Yes. We reverse by Unicode grapheme cluster, so emoji and combining characters stay intact." },
      { q: "Is reversing useful for palindromes?", a: "Yes — reverse and compare to the original (case- and space-insensitive) to test whether a string is a palindrome." },
      { q: "Will it work on right-to-left languages?", a: "Yes — reversal happens at the code-point level. RTL scripts (Arabic, Hebrew) reverse correctly, though display direction is determined by your browser's bidi algorithm." },
    ],
  },
  {
    slug: "text-diff",
    category: "text",
    name: "Text Diff Checker",
    tagline: "Compare two blocks of text and highlight differences line by line.",
    summary:
      "Paste two blocks of text and see exactly what changed. The diff highlights added, removed and unchanged lines side-by-side, similar to git diff but in your browser. Useful for proofreading, contract reviews and code comparisons.",
    useCases: [
      "Compare contract or policy revisions before signing",
      "Spot proofreading edits between draft and final article versions",
      "Review code snippets without setting up a git repository",
      "Compare configuration files (.env, YAML, JSON) across environments",
    ],
    icon: "≠",
    seo: {
      title: "Free Text Diff Checker — Compare Two Texts Online | BestMint",
      description:
        "Compare two pieces of text online for free. Highlights line-by-line differences (additions, deletions, changes) in your browser. No signup.",
      keywords: [
        "text diff",
        "compare text",
        "text comparison tool",
        "diff checker online",
        "text difference highlighter",
      ],
    },
    faqs: [
      { q: "Is my text uploaded anywhere?", a: "No. The comparison runs entirely in your browser — nothing is sent to a server." },
      { q: "What algorithm does it use?", a: "A standard longest-common-subsequence (LCS) line diff, which is the same family of algorithm Git and most diff tools use." },
      { q: "Can I diff two large files?", a: "Yes — comfortably up to ~1 MB per side. For bigger comparisons, use a desktop tool like meld or VS Code's built-in diff." },
    ],
  },

  // ─── Developer ──────────────────────────────────────────────────────────────
  {
    slug: "json-formatter",
    category: "developer",
    name: "JSON Formatter & Validator",
    tagline: "Beautify, validate and minify JSON instantly in your browser.",
    summary:
      "Paste any JSON and get pretty-printed, validated output. Errors include the exact line and column. One click to minify, copy, or download. Everything runs locally — your data never leaves the page.",
    useCases: [
      "Pretty-print API responses copied from browser DevTools or Postman",
      "Validate JSON config files (package.json, tsconfig.json) before committing",
      "Minify JSON for production payloads or tight HTTP request bodies",
      "Inspect JWT payloads, webhooks and Stripe event JSON during debugging",
    ],
    icon: "{}",
    seo: {
      title: "Free JSON Formatter & Validator Online — Beautify, Minify | BestMint",
      description:
        "Free online JSON formatter and validator. Beautify, validate and minify JSON instantly with line-accurate error messages. Browser-only — your data stays private.",
      keywords: [
        "json formatter",
        "json validator",
        "json beautifier",
        "json minifier",
        "json pretty print",
        "online json tool",
      ],
    },
    faqs: [
      { q: "Will my JSON be uploaded?", a: "No — formatting and validation run entirely in your browser, so sensitive payloads never leave your machine." },
      { q: "Can it handle large JSON files?", a: "Yes, comfortably up to several megabytes. Above that the browser's built-in JSON.parse may slow down regardless of the tool." },
      { q: "What does the validator check?", a: "Strict RFC 8259 compliance — comments and trailing commas are reported as errors with the exact position." },
      { q: "Can I sort keys alphabetically?", a: "Yes — toggle 'sort keys' to alphabetise object keys at every nesting level. This is helpful when diffing two JSON files for meaningful changes." },
    ],
  },
  {
    slug: "json-csv",
    category: "developer",
    name: "JSON ↔ CSV Converter",
    tagline: "Convert JSON arrays to CSV and CSV back to JSON.",
    summary:
      "Convert between JSON and CSV in either direction. Auto-detects column headers, handles nested objects via dot-paths, and quotes values containing commas, newlines or quote characters per RFC 4180.",
    useCases: [
      "Convert API JSON responses to CSV for spreadsheet analysis in Excel or Google Sheets",
      "Import CSV exports from CRMs and analytics tools as JSON for backend processing",
      "Flatten nested API objects into a tabular format for reporting",
      "Quickly transform Postman/Insomnia exports between JSON and CSV",
    ],
    icon: "↔",
    seo: {
      title: "Free JSON to CSV / CSV to JSON Converter Online | BestMint",
      description:
        "Convert JSON to CSV and CSV to JSON online for free. Handles nested fields, quoting and escaping. Runs entirely in your browser.",
      keywords: [
        "json to csv",
        "csv to json",
        "json csv converter",
        "convert json csv online",
      ],
    },
    faqs: [
      { q: "Can it flatten nested JSON?", a: "Yes — nested object keys become dot-paths in the CSV header (e.g., user.email). Toggle off to keep them as JSON-encoded strings." },
      { q: "Does it support semicolons or tabs as delimiters?", a: "Yes. The CSV parser detects the delimiter automatically; the writer lets you choose comma, semicolon or tab." },
      { q: "How are nulls and empty strings handled?", a: "JSON null becomes an empty CSV cell; CSV empty cells become null in JSON by default. You can switch to empty-string for round-trip fidelity." },
    ],
  },
  {
    slug: "base64",
    category: "developer",
    name: "Base64 Encoder & Decoder",
    tagline: "Encode and decode Base64 strings, including UTF-8 and binary.",
    summary:
      "Encode any text or file to Base64 and decode Base64 back to text. Handles full Unicode (UTF-8) correctly and supports URL-safe Base64 used in JWTs.",
    useCases: [
      "Encode binary files for embedding in HTML, CSS, JSON or email MIME parts",
      "Decode JWT segments to inspect headers and payloads",
      "Encode credentials for HTTP Basic auth (Authorization: Basic ...)",
      "Convert API request/response samples between binary and text representations",
    ],
    icon: "B64",
    seo: {
      title: "Free Base64 Encoder & Decoder Online | BestMint",
      description:
        "Encode and decode Base64 online for free. Supports UTF-8, URL-safe Base64 (used in JWTs), and runs entirely in your browser.",
      keywords: [
        "base64 encoder",
        "base64 decoder",
        "base64 online",
        "url safe base64",
        "base64 to text",
      ],
    },
    faqs: [
      { q: "What is URL-safe Base64?", a: "A variant that replaces + and / with - and _ so the output is safe to embed in URLs and JWTs without further encoding." },
      { q: "Why do I get garbled text after decoding?", a: "If the source was UTF-8 but you decoded as ASCII, multi-byte characters break. Toggle to UTF-8 decoding and it should render correctly." },
      { q: "Can I encode files?", a: "Yes — drop a file in and the encoder produces a data URI suitable for inline embedding (data:image/png;base64,…)." },
    ],
  },
  {
    slug: "url-encoder",
    category: "developer",
    name: "URL Encoder & Decoder",
    tagline: "Percent-encode and decode URL components safely.",
    summary:
      "Encode any string for safe use in a URL, or decode percent-encoded URLs back to readable text. Choose between full-string encoding and component encoding (the difference between encodeURI and encodeURIComponent).",
    useCases: [
      "Build query string parameters that contain spaces, &, ? or # characters",
      "Decode opaque URLs from analytics, redirects and tracking links",
      "Escape file paths and resource names for HTTP requests",
      "Encode user input before constructing URLs to prevent XSS and routing bugs",
    ],
    icon: "%",
    seo: {
      title: "Free URL Encoder & Decoder Online | BestMint",
      description:
        "URL encode and decode online for free. Choose between full URL encoding and component encoding. Runs entirely in your browser.",
      keywords: [
        "url encoder",
        "url decoder",
        "percent encoding",
        "encodeuricomponent",
        "decode url",
      ],
    },
    faqs: [
      { q: "What's the difference between encodeURI and encodeURIComponent?", a: "encodeURI preserves URL structure characters (: / ? & =), while encodeURIComponent escapes them — use the latter for query parameter values." },
      { q: "Can it handle non-ASCII characters?", a: "Yes — all encoding is UTF-8 based, matching the WHATWG URL standard used by modern browsers." },
      { q: "Is the + sign a space?", a: "In application/x-www-form-urlencoded (the form-POST format) yes, + means space. In standard URL percent-encoding, + means literal plus and space is %20. The tool handles both." },
    ],
  },
  {
    slug: "html-entities",
    category: "developer",
    name: "HTML Entity Encoder & Decoder",
    tagline: "Escape and unescape HTML entities like &amp;, &lt;, &gt;.",
    summary:
      "Convert characters to their HTML entity equivalents and back. Useful for safely embedding user content in HTML, displaying code on a webpage, or de-escaping copied source.",
    useCases: [
      "Embed code snippets in blog posts without breaking the surrounding markup",
      "Sanitise user-generated content before rendering as HTML",
      "Decode escaped entities copied from email source or webpage view-source",
      "Safely include angle brackets, ampersands and quotes in static HTML",
    ],
    icon: "&;",
    seo: {
      title: "HTML Entity Encoder & Decoder Online — Free | BestMint",
      description:
        "Encode and decode HTML entities online. Escape characters like <, >, & and decode them back. Free, browser-only.",
      keywords: [
        "html entity encoder",
        "html entity decoder",
        "html escape",
        "html unescape",
      ],
    },
    faqs: [
      { q: "Why escape HTML entities?", a: "To prevent user-controlled text from being interpreted as HTML or executed as script. Escaping <, >, &, \" and ' is the foundation of XSS-safe rendering." },
      { q: "Should I use named or numeric entities?", a: "Named entities (&amp;, &lt;) are more readable; numeric (&#38;, &#60;) work everywhere. Both are valid HTML5 — pick named for clarity, numeric for universal compatibility." },
    ],
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    name: "JWT Decoder",
    tagline: "Decode JWT header and payload, view claims and expiry at a glance.",
    summary:
      "Paste a JSON Web Token and instantly inspect the header, payload and signature. Standard claims (iss, sub, exp, iat) are highlighted with human-readable timestamps. The decoder runs in your browser; tokens are never sent anywhere.",
    useCases: [
      "Debug authentication flows by inspecting the actual claims in a JWT",
      "Verify token expiry (exp), issuance (iat) and not-before (nbf) timestamps",
      "Confirm the issuer (iss) and audience (aud) of an incoming token",
      "Inspect custom claims to verify role/permission encoding from your auth server",
    ],
    icon: "🔐",
    seo: {
      title: "Free JWT Decoder Online — Inspect Token Claims | BestMint",
      description:
        "Decode JSON Web Tokens (JWTs) online for free. View header, payload and signature with friendly timestamps. Browser-only — tokens stay private.",
      keywords: [
        "jwt decoder",
        "jwt parser",
        "decode jwt online",
        "json web token decoder",
      ],
    },
    faqs: [
      { q: "Does the tool verify signatures?", a: "No — verification requires the secret or public key, which is server-side concern. This decoder only parses the token so you can read its contents." },
      { q: "Are my tokens uploaded anywhere?", a: "No. Decoding happens entirely in your browser." },
      { q: "What if my JWT has 5 segments instead of 3?", a: "5-segment tokens are JWE (encrypted) — this tool decodes JWS (signed) only. JWE requires the recipient's private key to read, which makes a browser tool impractical." },
    ],
  },
  {
    slug: "hash-generator",
    category: "developer",
    name: "Hash Generator (MD5, SHA-1, SHA-256, SHA-512)",
    tagline: "Compute cryptographic hashes from any text.",
    summary:
      "Compute MD5, SHA-1, SHA-256 and SHA-512 hashes of any input string. Hashes are computed locally using the Web Crypto API (and a tiny pure-JS MD5 fallback) — your input never leaves the browser.",
    useCases: [
      "Verify file integrity by computing a SHA-256 checksum and matching against publisher",
      "Generate cache keys, etags or deterministic IDs from input strings",
      "Compare an MD5 hash from a download page to verify a file before installation",
      "Hash sensitive identifiers for privacy-preserving analytics buckets",
    ],
    icon: "#",
    seo: {
      title: "Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | BestMint",
      description:
        "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes online for free. Computed in your browser via the Web Crypto API.",
      keywords: [
        "hash generator",
        "md5 generator",
        "sha256 generator",
        "sha512 generator",
        "online hash tool",
      ],
    },
    faqs: [
      { q: "Is MD5 still safe?", a: "MD5 is broken for security purposes (collisions are easy to construct), but it's fine for non-security uses like file checksums and cache keys. Use SHA-256 or SHA-512 if you need cryptographic security." },
      { q: "Can I hash binary data?", a: "Yes — drop a file in and the generator hashes the raw bytes, which matches the output of command-line tools like sha256sum or shasum." },
      { q: "Why is the SHA-256 output different from my server's?", a: "Encoding differences: server-side hashes might include a trailing newline, use UTF-16 instead of UTF-8, or hex-encode differently. Match the exact byte sequence to get matching hashes." },
    ],
  },
  {
    slug: "uuid-generator",
    category: "developer",
    name: "UUID Generator",
    tagline: "Generate v4 UUIDs in bulk, with copy-all support.",
    summary:
      "Generate one or many version-4 UUIDs (random universally unique identifiers). UUIDs come from your browser's cryptographic random source, suitable for use as primary keys and request IDs.",
    useCases: [
      "Create primary keys for database records that need to be globally unique",
      "Generate request IDs for distributed tracing and log correlation",
      "Seed test data with realistic-looking unique identifiers",
      "Issue idempotency keys for API requests to prevent duplicate operations",
    ],
    icon: "🆔",
    seo: {
      title: "Free UUID Generator Online — UUID v4 | BestMint",
      description:
        "Generate UUID v4 online for free. Create one or many UUIDs at a time using your browser's secure random source.",
      keywords: [
        "uuid generator",
        "uuid v4 generator",
        "guid generator",
        "online uuid",
      ],
    },
    faqs: [
      { q: "Are these UUIDs cryptographically random?", a: "Yes. They use crypto.randomUUID() (or crypto.getRandomValues()), the same source used for cryptographic keys." },
      { q: "What's the difference between v4 and v7 UUIDs?", a: "v4 is fully random. v7 prefixes a millisecond timestamp so they sort by creation time — useful for database primary keys with B-tree indexes. We currently generate v4 only." },
      { q: "How likely are collisions?", a: "Negligible — 122 bits of entropy gives a 50% collision chance only after generating roughly 2.7 quintillion UUIDs. Treat them as effectively unique forever." },
    ],
  },
  {
    slug: "regex-tester",
    category: "developer",
    name: "Regex Tester",
    tagline: "Test JavaScript regular expressions against a string with live highlighting.",
    summary:
      "Write a regular expression, set flags, and see matches highlighted in your test string in real time. Captured groups are shown beside each match. Uses the JavaScript regex engine for parity with browsers and Node.js.",
    useCases: [
      "Test patterns for form validation (email, phone, postcode) before shipping",
      "Build regexes for log parsing and string extraction in JavaScript / Node",
      "Debug an existing regex by stepping through which characters it matches",
      "Verify capture groups extract the right substrings from sample input",
    ],
    icon: "/.*/",
    seo: {
      title: "Free Regex Tester Online — JavaScript Regular Expressions | BestMint",
      description:
        "Test JavaScript regular expressions online with live match highlighting. Inspect captured groups and flags. Free, runs in your browser.",
      keywords: [
        "regex tester",
        "javascript regex tester",
        "regular expression tester",
        "regex match online",
      ],
    },
    faqs: [
      { q: "Which regex flavour does it use?", a: "ECMAScript / JavaScript regex, identical to the engine in Chrome, Firefox and Node.js." },
      { q: "Why is my Python or PCRE regex not matching?", a: "JavaScript regex doesn't support look-behind in older browsers and lacks named-group syntax variants. Adapt your pattern or use a server-side tool." },
      { q: "How do I match across multiple lines?", a: "Add the m flag for multiline mode (^ and $ match each line) and the s flag for dotall (. matches newlines). Both are standard ECMAScript flags." },
    ],
  },
  {
    slug: "minifier",
    category: "developer",
    name: "HTML / CSS / JS Minifier",
    tagline: "Strip whitespace and comments from HTML, CSS or JavaScript.",
    summary:
      "Paste HTML, CSS or JavaScript and get a minified version with comments and unnecessary whitespace removed. Useful for inline-script blocks, email templates and quick size checks. Heavy production builds should still use a dedicated build tool.",
    useCases: [
      "Minify inline-script and inline-style blocks in static HTML pages",
      "Strip whitespace from HTML email templates to fit Gmail's 102 KB limit",
      "Quickly test how much smaller a piece of CSS or JS becomes when minified",
      "Reduce payload size for analytics tags, snippets and code embeds",
    ],
    icon: "—",
    seo: {
      title: "Free HTML, CSS, JS Minifier Online | BestMint",
      description:
        "Minify HTML, CSS or JavaScript online for free. Strip comments and whitespace to reduce file size. Browser-only.",
      keywords: [
        "html minifier",
        "css minifier",
        "javascript minifier",
        "online minifier",
        "code minifier",
      ],
    },
    faqs: [
      { q: "Will minified JS still run?", a: "Yes — we only remove whitespace and comments. Variable renaming (true minification) requires AST-aware tools like Terser or esbuild." },
      { q: "Will it break my JavaScript?", a: "It is conservative — preserves string literals, regex literals and template literals exactly. Code that depends on whitespace (e.g., raw HTML inside a template literal) is preserved unchanged." },
    ],
  },

  // ─── Image ──────────────────────────────────────────────────────────────────
  {
    slug: "image-converter",
    category: "image",
    name: "Image Format Converter (PNG ↔ JPG ↔ WEBP)",
    tagline: "Convert images between PNG, JPG and WEBP entirely in your browser.",
    summary:
      "Drop in any PNG, JPG or WEBP image and convert it to another format. Adjust quality for JPG and WEBP outputs. All conversion uses the Canvas API in your browser — your images are never uploaded.",
    useCases: [
      "Convert PNG screenshots to JPG to drastically reduce file size",
      "Re-encode photos as WEBP for faster web page loads",
      "Drop transparent PNGs to JPG with a chosen background color",
      "Bulk-prep iPhone HEIC exports as universally compatible JPG or PNG",
    ],
    icon: "🖼️",
    seo: {
      title: "Free Image Converter — PNG to JPG, JPG to WEBP | BestMint",
      description:
        "Convert images between PNG, JPG and WEBP online for free. Quality control, browser-only — images never leave your device.",
      keywords: [
        "image converter online",
        "png to jpg",
        "jpg to png",
        "webp to png",
        "jpg to webp",
        "convert image format",
      ],
    },
    faqs: [
      { q: "Will my images be uploaded?", a: "No. Conversion happens entirely in your browser using the Canvas API. Nothing is sent to a server." },
      { q: "Why is my JPG bigger than the PNG?", a: "JPG has overhead at high quality settings. For images with large flat areas, PNG can be smaller. Try lowering JPG quality to 80–85." },
      { q: "Does it support animated formats?", a: "GIF and animated WEBP keep only the first frame on conversion — Canvas-based conversion is single-frame. For animated output, use a dedicated tool like FFmpeg." },
    ],
  },
  {
    slug: "image-compressor",
    category: "image",
    name: "Image Compressor",
    tagline: "Reduce image file size with adjustable quality, preview before saving.",
    summary:
      "Shrink JPG, PNG or WEBP images to a target file size or quality. Compare original and compressed side-by-side, then download. Compression runs locally in your browser.",
    useCases: [
      "Reduce photo size before email attachments and chat uploads",
      "Compress images to fit under WordPress and CMS upload limits",
      "Optimise images for fast page loads and Core Web Vitals",
      "Prepare photos for Wix, Squarespace, Shopify or Webflow upload caps",
    ],
    icon: "🗜️",
    seo: {
      title: "Free Image Compressor Online — Reduce JPG, PNG, WEBP Size | BestMint",
      description:
        "Compress images online for free with quality preview. Reduce JPG, PNG and WEBP file size in your browser — no uploads.",
      keywords: [
        "image compressor",
        "compress jpg",
        "compress png",
        "compress webp",
        "reduce image size",
      ],
    },
    faqs: [
      { q: "What's the best quality for the web?", a: "Around 75–85 for JPG/WEBP gives 60–80% size reduction with little visible loss for most photos." },
      { q: "Will compression damage the original?", a: "No — the original file on disk is untouched. The tool generates a new compressed version you can save separately." },
    ],
  },
  {
    slug: "image-resizer",
    category: "image",
    name: "Image Resizer",
    tagline: "Resize images to exact pixel dimensions or by percentage.",
    summary:
      "Resize any image to a specific width and height (with optional aspect-ratio lock) or by percentage. Choose the output format and download. Everything runs in your browser.",
    useCases: [
      "Resize photos to social-media specifications (Instagram square 1080×1080)",
      "Generate thumbnail variants of large images for blog posts",
      "Scale UI assets to match required pixel sizes (e.g., 512×512 app icons)",
      "Halve image dimensions to drop file size for faster web pages",
    ],
    icon: "📐",
    seo: {
      title: "Free Image Resizer Online — Pixel Perfect Resizing | BestMint",
      description:
        "Resize images online for free. Set exact pixel dimensions or scale by percent, optionally locking aspect ratio. Browser-only.",
      keywords: [
        "image resizer",
        "resize image online",
        "resize jpg",
        "resize png",
        "image dimensions changer",
      ],
    },
    faqs: [
      { q: "Will resizing reduce quality?", a: "Downscaling rarely shows visible loss. Upscaling (making images larger) always loses quality because new pixel detail can't be invented from nothing." },
      { q: "Can I keep the aspect ratio?", a: "Yes — toggle 'lock aspect ratio' and the height auto-updates as you change the width (and vice versa)." },
    ],
  },
  {
    slug: "image-to-base64",
    category: "image",
    name: "Image to Base64",
    tagline: "Encode an image as a Base64 data URI for inline embedding.",
    summary:
      "Convert any image to a Base64 data URI suitable for embedding directly in HTML, CSS or JSON. Useful for icons in emails, single-file demos and tiny inline assets.",
    useCases: [
      "Embed small icons inline in HTML emails to avoid external image fetches",
      "Inline assets in single-file CodePen / JSFiddle / StackBlitz demos",
      "Embed images in JSON payloads when separate file uploads aren't possible",
      "Inline above-the-fold images as data URIs to remove a render-blocking request",
    ],
    icon: "🔁",
    seo: {
      title: "Free Image to Base64 Converter Online | BestMint",
      description:
        "Convert any image to a Base64 data URI online for free. Paste straight into HTML, CSS or JSON. Runs in your browser.",
      keywords: [
        "image to base64",
        "base64 image converter",
        "data uri converter",
        "encode image base64",
      ],
    },
    faqs: [
      { q: "When should I inline images as Base64?", a: "Only for very small icons (≲4 KB) or single-file deliverables. For most websites, separate image files compress and cache better." },
      { q: "Why is my Base64 longer than the original file?", a: "Base64 adds about 33% overhead by design — it encodes 3 binary bytes as 4 ASCII characters. That's expected." },
    ],
  },
  {
    slug: "favicon-generator",
    category: "image",
    name: "Favicon Generator",
    tagline: "Generate favicon ICO and PNG sizes from any image.",
    summary:
      "Drop in a square image and download a complete favicon set: 16x16, 32x32, 48x48, 180x180 (Apple touch icon) and 512x512 PNGs, ready to drop into your site.",
    useCases: [
      "Generate full favicon set for a new website launch in seconds",
      "Create iOS Apple Touch Icons (180×180) for home-screen shortcuts",
      "Output PWA icons (192×192, 512×512) for the web app manifest",
      "Refresh an existing site's branding by re-generating from an updated logo",
    ],
    icon: "⭐",
    seo: {
      title: "Free Favicon Generator — Multi-size PNG & Apple Touch | BestMint",
      description:
        "Generate favicons online for free from any image. Get all standard sizes including Apple touch icon. Runs in your browser.",
      keywords: [
        "favicon generator",
        "favicon maker",
        "apple touch icon generator",
        "online favicon",
      ],
    },
    faqs: [
      { q: "What HTML do I need?", a: "Add <link rel=\"icon\" href=\"/favicon-32x32.png\" sizes=\"32x32\"> and a <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\"> in your <head>." },
      { q: "Should the source image be square?", a: "Yes — favicons are always square. If you provide a non-square image, the tool centre-crops to a square first." },
    ],
  },

  // ─── Color ──────────────────────────────────────────────────────────────────
  {
    slug: "color-picker",
    category: "color",
    name: "Color Picker (HEX/RGB/HSL)",
    tagline: "Pick a color and copy it as HEX, RGB, HSL or HSV.",
    summary:
      "An interactive color picker. Drag the saturation/value square or type a value, and instantly see the color expressed in HEX, RGB, HSL and HSV. Click any value to copy.",
    useCases: [
      "Pick brand colors for a website or app design and copy as HEX",
      "Convert a known HEX value to HSL for design tokens or theming",
      "Sample colors across formats when porting between Figma and code",
      "Find a similar shade by adjusting hue, saturation or lightness independently",
    ],
    icon: "🎨",
    seo: {
      title: "Free Online Color Picker — HEX, RGB, HSL, HSV | BestMint",
      description:
        "Free online color picker. Pick a color and copy it as HEX, RGB, HSL or HSV. Designed for designers and front-end developers.",
      keywords: [
        "color picker",
        "online color picker",
        "hex color picker",
        "rgb color picker",
        "hsl converter",
      ],
    },
    faqs: [
      { q: "What's HSL good for?", a: "HSL (hue/saturation/lightness) is intuitive when you want to derive related colors — shifting hue gives you the same color in a different family, lightness gives a tint or shade." },
      { q: "Why are HSL values from different tools slightly different?", a: "Floating-point rounding. We round to the nearest integer for display, but compute internally at full precision so round-trip conversions stay accurate." },
    ],
  },
  {
    slug: "gradient-generator",
    category: "color",
    name: "CSS Gradient Generator",
    tagline: "Build linear and radial CSS gradients with live preview.",
    summary:
      "Design linear or radial CSS gradients with multiple color stops, adjust angle and direction, then copy the ready-to-paste CSS.",
    useCases: [
      "Design hero-section background gradients for landing pages",
      "Create button hover gradients and accent strips",
      "Build colorful card backgrounds and container fills",
      "Prototype gradient overlays for hero images and call-to-action banners",
    ],
    icon: "🌈",
    seo: {
      title: "Free CSS Gradient Generator — Linear & Radial | BestMint",
      description:
        "Build CSS gradients online for free. Linear and radial gradients, multiple color stops, copy ready-to-use CSS. Live preview.",
      keywords: [
        "css gradient generator",
        "linear gradient generator",
        "radial gradient generator",
        "gradient maker",
      ],
    },
    faqs: [
      { q: "Can I export to Tailwind?", a: "The output is plain CSS. You can wrap it in a Tailwind arbitrary value: bg-[linear-gradient(...)]." },
      { q: "How do I add more color stops?", a: "Click on the gradient bar to add a stop, drag stops to reposition, and click an existing stop to change its color or remove it." },
    ],
  },
  {
    slug: "color-palette",
    category: "color",
    name: "Color Palette Generator",
    tagline: "Generate harmonious color schemes from a base color.",
    summary:
      "Pick a base color and generate complementary, analogous, triadic, tetradic and split-complementary palettes. Copy any swatch as HEX or export the whole palette as CSS variables.",
    useCases: [
      "Generate a brand palette from a single seed color in seconds",
      "Build a complementary accent for an existing brand primary",
      "Create design-token palettes for Tailwind, CSS variables or design systems",
      "Explore color harmony rules for charts, illustrations and icon sets",
    ],
    icon: "🎨",
    seo: {
      title: "Free Color Palette Generator — Complementary, Analogous | BestMint",
      description:
        "Generate color palettes online for free: complementary, analogous, triadic, tetradic. Export as HEX or CSS variables.",
      keywords: [
        "color palette generator",
        "complementary colors",
        "analogous colors",
        "triadic colors",
        "color scheme generator",
      ],
    },
    faqs: [
      { q: "Which palette should I use?", a: "Analogous palettes feel calm and unified. Complementary pairs grab attention. Triadic feels playful. Start with analogous for content sites and complementary for buttons or accents." },
      { q: "How are the palettes computed?", a: "We rotate the hue in HSL space — complementary is +180°, triadic is +120/+240, analogous is ±30°, etc. Saturation and lightness can be optionally varied for accent shades." },
    ],
  },
  {
    slug: "contrast-checker",
    category: "color",
    name: "WCAG Contrast Checker",
    tagline: "Check color contrast ratios against WCAG AA/AAA accessibility levels.",
    summary:
      "Enter a foreground and background color and instantly see the contrast ratio along with WCAG AA and AAA pass/fail flags for normal and large text.",
    useCases: [
      "Verify body-text contrast against WCAG AA (4.5:1) before launch",
      "Audit existing pages for accessibility compliance with WCAG 2.1",
      "Test a brand color combination for legibility on dark and light themes",
      "Pick chart colors that remain readable for users with color vision deficiencies",
    ],
    icon: "👁",
    seo: {
      title: "Free WCAG Color Contrast Checker | BestMint",
      description:
        "Check WCAG color contrast online for free. See AA and AAA pass/fail for normal and large text. Built for accessible web design.",
      keywords: [
        "contrast checker",
        "wcag contrast checker",
        "color accessibility",
        "a11y contrast",
      ],
    },
    faqs: [
      { q: "What's the WCAG threshold?", a: "AA requires 4.5:1 for normal text and 3:1 for large text (≥18pt or 14pt bold). AAA requires 7:1 and 4.5:1 respectively." },
      { q: "Does it support transparent colors?", a: "Yes — for semi-transparent foregrounds, the contrast calculation simulates the result over an opaque background you specify." },
    ],
  },

  // ─── Generators ────────────────────────────────────────────────────────────
  {
    slug: "password-generator",
    category: "generators",
    name: "Password Generator",
    tagline: "Generate strong, random passwords with customizable rules.",
    summary:
      "Generate cryptographically random passwords. Choose length, and whether to include uppercase, lowercase, digits and symbols. Optionally exclude lookalike characters (0/O, 1/l/I) for easier typing.",
    useCases: [
      "Create unique strong passwords for new accounts",
      "Generate Wi-Fi pre-shared keys for home and office networks",
      "Produce random API keys, signing secrets and database credentials",
      "Bulk-generate passwords for one-time accounts and seed data",
    ],
    icon: "🔑",
    seo: {
      title: "Free Strong Password Generator Online | BestMint",
      description:
        "Generate secure random passwords online for free. Customize length and character classes, exclude lookalikes. Generated in your browser using crypto random.",
      keywords: [
        "password generator",
        "strong password generator",
        "random password generator",
        "secure password",
      ],
    },
    faqs: [
      { q: "How is randomness generated?", a: "Using crypto.getRandomValues(), the browser's cryptographically secure random source — the same source used to derive cryptographic keys." },
      { q: "How long should my password be?", a: "16+ characters for important accounts, with at least three character classes. Or use a password manager and never type the password yourself." },
      { q: "Do you log generated passwords?", a: "No. Passwords are generated entirely in your browser using local randomness. We never see them and they are never sent over the network." },
    ],
  },
  {
    slug: "qr-generator",
    category: "generators",
    name: "QR Code Generator",
    tagline: "Generate a QR code for any URL or text and download as PNG or SVG.",
    summary:
      "Type a URL, contact card, Wi-Fi credentials or any text and get a scannable QR code. Adjust error correction and size, then download as PNG or SVG.",
    useCases: [
      "Add scannable URLs to slides, posters and printed brochures",
      "Share Wi-Fi credentials with guests via a single QR code",
      "Print menu QR codes for restaurants and cafés",
      "Embed contact cards (vCard) so people can save your details by scanning",
    ],
    icon: "▣",
    seo: {
      title: "Free QR Code Generator — PNG & SVG Download | BestMint",
      description:
        "Generate QR codes online for free for any URL or text. Adjust error correction, download as PNG or SVG. Browser-only, no signup.",
      keywords: [
        "qr code generator",
        "free qr code maker",
        "qr generator png",
        "qr code svg",
      ],
    },
    faqs: [
      { q: "Do the QR codes expire?", a: "No — these are static QR codes. They encode the data directly, so they work forever as long as the destination URL stays live." },
      { q: "Which error correction level should I use?", a: "L (7%) is fine for digital displays. M (15%) is the default for general use. Q (25%) and H (30%) are useful for print where the QR code may be partly obscured or damaged." },
    ],
  },
  {
    slug: "random-number",
    category: "generators",
    name: "Random Number Generator",
    tagline: "Generate random integers or decimals within a range.",
    summary:
      "Generate one or many random numbers within a chosen range. Choose integers or decimals, set how many to generate, and optionally allow duplicates.",
    useCases: [
      "Pick random winners for giveaways, raffles and contests",
      "Seed test data with random IDs, ages or quantities",
      "Roll dice or simulate probability for tabletop games",
      "Generate sample numbers for statistics demos and homework",
    ],
    icon: "🎲",
    seo: {
      title: "Free Random Number Generator Online | BestMint",
      description:
        "Generate random numbers online for free. Pick range, count, integers or decimals, with or without duplicates. Cryptographic randomness in your browser.",
      keywords: [
        "random number generator",
        "rng online",
        "random integer generator",
      ],
    },
    faqs: [
      { q: "Is it suitable for raffles?", a: "Yes — randomness comes from your browser's secure random source, which is cryptographically unbiased. For high-stakes draws, ask participants to verify the seed publicly." },
      { q: "Can I generate without duplicates?", a: "Yes — toggle 'unique only' to draw without replacement. The tool will warn if your range can't supply enough unique values." },
    ],
  },
  {
    slug: "slug-generator",
    category: "generators",
    name: "Slug Generator",
    tagline: "Convert any title into a clean, URL-safe slug.",
    summary:
      "Turn a page title into a URL-friendly slug: lowercase, hyphenated, ASCII-only with diacritics stripped. Useful for blog posts, e-commerce URLs and SEO-friendly paths.",
    useCases: [
      "Create permalinks for blog posts and CMS articles",
      "Build clean product URLs for an e-commerce catalogue",
      "Convert headlines to file names for static-site generators (Hugo, Jekyll, Next.js)",
      "Sanitise user-provided titles into safe URL paths",
    ],
    icon: "/",
    seo: {
      title: "Free Slug Generator — URL-friendly Slugs | BestMint",
      description:
        "Generate URL-safe slugs from any title online for free. Lowercase, hyphenated, ASCII-only — perfect for blog posts and SEO URLs.",
      keywords: [
        "slug generator",
        "url slug",
        "seo slug",
        "permalink generator",
      ],
    },
    faqs: [
      { q: "Does it handle accents?", a: "Yes — diacritics are normalised (é → e, ü → u) using Unicode normalisation, then non-alphanumerics become hyphens." },
      { q: "What about non-Latin scripts?", a: "Cyrillic, Arabic, Chinese and Japanese characters are stripped by default since they don't have ASCII equivalents. Toggle 'transliterate' to romanise them where possible." },
    ],
  },

  // ─── Calculators & Converters ──────────────────────────────────────────────
  {
    slug: "unit-converter",
    category: "calculators",
    name: "Unit Converter",
    tagline: "Convert length, weight, temperature and volume.",
    summary:
      "A general-purpose unit converter for length (m/ft/in/km/mi), weight (kg/lb/oz), temperature (°C/°F/K) and volume (L/gal/cup). Type in any field and the others update live.",
    useCases: [
      "Convert kilometres to miles for trip planning and running pace",
      "Switch recipes between metric (g, kg, ml) and imperial (oz, lb, cups)",
      "Convert °C ↔ °F for travel weather forecasts",
      "Translate between US and UK gallons (they're different) for fuel economy",
    ],
    icon: "↔",
    seo: {
      title: "Free Unit Converter — Length, Weight, Temperature, Volume | BestMint",
      description:
        "Convert units online for free: length, weight, temperature, volume. Live two-way conversion. Browser-only, no signup.",
      keywords: [
        "unit converter",
        "length converter",
        "weight converter",
        "temperature converter",
        "volume converter",
      ],
    },
    faqs: [
      { q: "Are the conversion factors exact?", a: "Yes — we use the international definitions (1 inch = 2.54 cm exactly, 1 lb = 0.45359237 kg)." },
      { q: "Does it support US and UK gallons?", a: "Yes — select 'US gallon' (3.785 L) or 'UK / imperial gallon' (4.546 L) explicitly. They differ enough to matter for fuel economy and recipes." },
    ],
  },
  {
    slug: "percentage-calculator",
    category: "calculators",
    name: "Percentage Calculator",
    tagline: "Compute percent of a number, percent change, and inverse percent.",
    summary:
      "Three calculators in one: what is X% of Y; X is what percent of Y; and percent increase/decrease between two numbers. Useful for tips, tax, discounts and analytics.",
    useCases: [
      "Calculate sales tax, VAT, and discount amounts on prices",
      "Compute tip on restaurant bills and split per person",
      "Measure month-over-month growth in analytics and KPIs",
      "Compute commission, markup and margin on sales transactions",
    ],
    icon: "%",
    seo: {
      title: "Free Percentage Calculator Online | BestMint",
      description:
        "Free percentage calculator online: percent of, what percent, percent change. Fast, accurate, runs in your browser.",
      keywords: [
        "percentage calculator",
        "percent calculator",
        "percent change calculator",
        "percent of a number",
      ],
    },
    faqs: [
      { q: "How is percent change calculated?", a: "(new − old) / old × 100. A negative result means a decrease." },
      { q: "Why is going up 50% then down 50% not back to the original?", a: "Because the bases differ: +50% on 100 = 150, then -50% on 150 = 75. Asymmetric percent changes don't cancel out — a common cause of finance/marketing-report errors." },
    ],
  },
  {
    slug: "age-calculator",
    category: "calculators",
    name: "Age Calculator",
    tagline: "Calculate exact age in years, months and days from a birthdate.",
    summary:
      "Enter a birthdate (and optional reference date) to get the exact age in years, months and days, plus total days, hours and minutes lived.",
    useCases: [
      "Compute exact age for legal forms requiring years, months and days",
      "Plan birthday milestones (10,000 days, 1 billion seconds, etc.)",
      "Calculate age between two arbitrary dates for historical research",
      "Verify age-eligibility cutoffs for school, retirement or insurance",
    ],
    icon: "🎂",
    seo: {
      title: "Free Age Calculator Online — Exact Years, Months, Days | BestMint",
      description:
        "Calculate age online for free. Get exact years, months and days between birthdate and any reference date.",
      keywords: [
        "age calculator",
        "exact age",
        "date of birth calculator",
        "age in days",
      ],
    },
    faqs: [
      { q: "Does it handle leap years?", a: "Yes — calculations use real calendar arithmetic, so February 29 and leap years are correctly counted." },
      { q: "How is the months count handled?", a: "We count completed months between the dates. So Jan 15 → March 14 is 1 month and 27 days, not 2 months." },
    ],
  },
  {
    slug: "bmi-calculator",
    category: "calculators",
    name: "BMI Calculator",
    tagline: "Calculate body mass index in metric or imperial units.",
    summary:
      "Enter your height and weight (metric or imperial) to compute Body Mass Index along with the WHO classification. Educational only — not medical advice.",
    useCases: [
      "Get a quick screening BMI value for general health context",
      "Compare BMI between metric and imperial units for international comparison",
      "Plot BMI category trends over time alongside weight",
      "Check the BMI thresholds defined by the WHO for adult populations",
    ],
    icon: "⚖",
    seo: {
      title: "Free BMI Calculator Online — Metric & Imperial | BestMint",
      description:
        "Free BMI calculator online. Compute body mass index in metric or imperial units with WHO category. Educational only.",
      keywords: [
        "bmi calculator",
        "body mass index",
        "imperial bmi calculator",
        "metric bmi calculator",
      ],
    },
    faqs: [
      { q: "Is BMI accurate?", a: "BMI is a population-level proxy and ignores muscle mass, frame size and body composition. Treat it as a rough screen, not a diagnosis." },
      { q: "What are the WHO BMI categories?", a: "Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (≥30). The tool labels your input against these thresholds." },
    ],
  },
  {
    slug: "tip-calculator",
    category: "calculators",
    name: "Tip & Bill Splitter",
    tagline: "Calculate tip and split a bill across any number of people.",
    summary:
      "Enter the bill, choose a tip percentage, and the number of people. The calculator shows the tip total, the bill total and the per-person amount.",
    useCases: [
      "Split a restaurant bill across multiple diners with the right tip",
      "Calculate the right tip for taxi rides, food delivery and salons",
      "Round up the per-person amount to make payment easier",
      "Compare 15%, 18% and 20% tip totals before deciding",
    ],
    icon: "💵",
    seo: {
      title: "Free Tip Calculator & Bill Splitter Online | BestMint",
      description:
        "Free tip calculator and bill splitter online. Split any bill with any tip across any number of people.",
      keywords: [
        "tip calculator",
        "bill splitter",
        "split bill calculator",
        "restaurant tip",
      ],
    },
    faqs: [
      { q: "Should tip be calculated before or after tax?", a: "By convention in the US, tip is calculated on the pre-tax subtotal — though many calculators (including this one) tip on the total for simplicity. Toggle accordingly." },
      { q: "What's a typical tip amount?", a: "US: 18–20% sit-down, 10–15% counter service. Europe: 5–10% (often included as service charge). Tip culture varies — check local norms when travelling." },
    ],
  },

  // ─── Time & Date ───────────────────────────────────────────────────────────
  {
    slug: "timestamp-converter",
    category: "datetime",
    name: "Unix Timestamp Converter",
    tagline: "Convert between Unix timestamps and human-readable dates.",
    summary:
      "Paste a Unix timestamp (seconds or milliseconds) to see the corresponding UTC and local date, or pick a date to get its timestamp. Includes \"now\" with one click.",
    useCases: [
      "Decode Unix timestamps from server logs, audit trails and database fields",
      "Translate JWT exp / iat / nbf claims from epoch seconds to readable dates",
      "Compute the current epoch in seconds or milliseconds for an API request",
      "Convert millisecond timestamps from JavaScript Date.now() and React DevTools",
    ],
    icon: "⏱",
    seo: {
      title: "Free Unix Timestamp Converter — Epoch to Date | BestMint",
      description:
        "Convert Unix timestamps to human-readable dates and vice versa, online for free. Supports seconds and milliseconds. Browser-only.",
      keywords: [
        "unix timestamp converter",
        "epoch converter",
        "timestamp to date",
        "date to epoch",
      ],
    },
    faqs: [
      { q: "Is your timestamp in seconds or milliseconds?", a: "10-digit timestamps are usually seconds (Unix epoch); 13-digit are milliseconds (JavaScript Date.now). The tool autodetects the most likely interpretation." },
      { q: "What is epoch time?", a: "The number of seconds since 1970-01-01 00:00:00 UTC. It's the most common way computers store and exchange dates because it's timezone-independent." },
    ],
  },
  {
    slug: "timezone-converter",
    category: "datetime",
    name: "Timezone Converter",
    tagline: "Convert a time between any two time zones.",
    summary:
      "Pick a date/time, source timezone and one or more target zones to see the equivalent local time everywhere. Daylight-saving transitions handled correctly via the browser's Intl API.",
    useCases: [
      "Schedule meetings across multiple offices in different time zones",
      "Plan coordinated launches and announcements at the right local hour",
      "Convert event start times across continents for invitations",
      "Verify daylight-saving impact when scheduling around DST transitions",
    ],
    icon: "🌐",
    seo: {
      title: "Free Timezone Converter Online | BestMint",
      description:
        "Convert times between time zones online for free. Handles daylight saving correctly. Multi-zone view.",
      keywords: [
        "timezone converter",
        "time zone converter",
        "world clock converter",
        "convert time across timezones",
      ],
    },
    faqs: [
      { q: "Does it handle daylight saving time?", a: "Yes — we use the IANA timezone database via the browser's Intl API, which knows historical and upcoming DST transitions." },
      { q: "Can I see multiple time zones at once?", a: "Yes — add as many target zones as you need. Useful when scheduling across global teams." },
    ],
  },
  {
    slug: "date-diff",
    category: "datetime",
    name: "Date Difference Calculator",
    tagline: "Calculate days, weeks, months and years between two dates.",
    summary:
      "Pick a start and end date and get the exact difference in days, weeks, months and years. Optionally exclude weekends to count business days.",
    useCases: [
      "Compute project duration in days, weeks or business days",
      "Calculate the number of days until a deadline, launch or birthday",
      "Verify SLA windows by counting business days between two dates",
      "Track elapsed time on long-running tasks and contracts",
    ],
    icon: "📅",
    seo: {
      title: "Free Date Difference Calculator Online | BestMint",
      description:
        "Calculate the difference between two dates in days, weeks, months and years online for free. Optional business-day count.",
      keywords: [
        "date difference calculator",
        "days between dates",
        "date duration calculator",
        "business days calculator",
      ],
    },
    faqs: [
      { q: "Are end-date inclusive or exclusive?", a: "By convention we count whole days between the two dates (exclusive of the end). Toggle inclusive if you want to include both endpoints." },
      { q: "Does business-day mode account for holidays?", a: "It excludes Saturdays and Sundays only. Public holidays vary by country, so the tool doesn't apply a fixed list — adjust the count manually for known holidays." },
    ],
  },

  // ─── SEO ───────────────────────────────────────────────────────────────────
  {
    slug: "meta-tag-generator",
    category: "seo",
    name: "Meta Tag Generator",
    tagline: "Generate complete <head> meta tags for SEO and social sharing.",
    summary:
      "Enter your title, description, URL and image to get a full set of <head> meta tags: standard SEO, Open Graph (Facebook, LinkedIn) and Twitter Card. Copy and paste straight into your HTML.",
    useCases: [
      "Generate meta tags for a new blog post or landing page",
      "Add Open Graph and Twitter Card tags to existing pages for social previews",
      "Build canonical, robots and viewport meta in one place",
      "Quickly QA a meta-tag block before pasting into a CMS template",
    ],
    icon: "🏷",
    seo: {
      title: "Free Meta Tag Generator — SEO, Open Graph, Twitter | BestMint",
      description:
        "Generate <head> meta tags online for free: SEO, Open Graph and Twitter Cards. Copy and paste into any site.",
      keywords: [
        "meta tag generator",
        "open graph generator",
        "twitter card generator",
        "seo meta tags",
      ],
    },
    faqs: [
      { q: "Do I need both Open Graph and Twitter Card tags?", a: "Yes — Twitter falls back to OG, but adding a few twitter:* tags lets you customise the share view on Twitter/X specifically." },
      { q: "What size should the OG image be?", a: "1200×630 px is the safe default for Facebook, LinkedIn and Twitter (summary_large_image). Smaller images may render at low resolution on retina displays." },
    ],
  },
  {
    slug: "og-preview",
    category: "seo",
    name: "Open Graph Preview",
    tagline: "Preview how a URL will look when shared on social media.",
    summary:
      "Paste a URL and see how it would appear shared on Facebook, LinkedIn, Twitter/X and Slack — including the OG image, title and description. Useful for verifying meta tags before launch.",
    useCases: [
      "Verify meta tags actually produce the expected preview before launch",
      "Debug why a Slack or Discord unfurl shows wrong title/image",
      "Compare OG previews across Facebook, LinkedIn, Twitter and Slack at once",
      "Audit existing pages to confirm Open Graph data is set correctly",
    ],
    icon: "🔗",
    seo: {
      title: "Free Open Graph Preview — Facebook, Twitter, LinkedIn | BestMint",
      description:
        "Preview how a URL looks shared on Facebook, Twitter/X, LinkedIn and Slack. Free Open Graph debugger online.",
      keywords: [
        "open graph preview",
        "og preview tool",
        "social card preview",
        "facebook share preview",
      ],
    },
    faqs: [
      { q: "Why doesn't my preview update?", a: "Social platforms cache OG data. Use Facebook's Sharing Debugger or the platform's developer tools to force a re-fetch after you change tags." },
      { q: "Can I preview a URL behind authentication?", a: "No — the previewer fetches the URL like a public crawler. URLs behind login redirect to the auth page and the preview will show the login page's tags instead." },
    ],
  },
  {
    slug: "robots-generator",
    category: "seo",
    name: "Robots.txt Generator",
    tagline: "Build a robots.txt with allow/disallow rules and sitemap pointer.",
    summary:
      "Build a valid robots.txt by adding allow/disallow rules per user agent, plus a sitemap URL. Copy the output to /robots.txt at your site root.",
    useCases: [
      "Block staging or admin paths from being crawled",
      "Allow Googlebot but block scraping bots like AhrefsBot or SemrushBot",
      "Add a sitemap pointer so crawlers find your XML sitemap",
      "Re-enable crawling after a launch by replacing a 'Disallow: /' file",
    ],
    icon: "🤖",
    seo: {
      title: "Free Robots.txt Generator Online | BestMint",
      description:
        "Generate a robots.txt file online for free. Allow/disallow per user agent, add sitemap. Copy and deploy.",
      keywords: [
        "robots.txt generator",
        "robots txt creator",
        "seo robots file",
      ],
    },
    faqs: [
      { q: "Does robots.txt block crawling?", a: "It tells well-behaved crawlers what not to fetch. It is not a security control — sensitive content should be protected by auth, not just by robots.txt." },
      { q: "Where do I put the robots.txt file?", a: "At the root of your domain — exactly /robots.txt. It must be accessible at https://yoursite.com/robots.txt to be honored by crawlers." },
    ],
  },

  // ─── AI ────────────────────────────────────────────────────────────────────
  {
    slug: "ai-summarizer",
    category: "ai",
    name: "AI Text Summarizer",
    tagline: "Summarize articles, papers or notes into a tight, readable paragraph.",
    summary:
      "Paste any article, paper or note and get a concise summary in a few seconds, powered by Google Gemma. Choose summary length: bullets, short paragraph or executive summary.",
    useCases: [
      "Summarise long articles into bullets for quick skimming",
      "Distill research papers and PDFs to abstract-length summaries",
      "Compress meeting transcripts into action items and decisions",
      "Generate executive-summary previews for blog post intros",
    ],
    icon: "📑",
    ai: true,
    seo: {
      title: "Free AI Text Summarizer Online — Gemma-powered | BestMint",
      description:
        "Summarize text online for free with AI. Powered by Google Gemma. Bullets, short paragraph or executive summary.",
      keywords: [
        "ai summarizer",
        "text summarizer",
        "ai summary tool",
        "gemma summarizer",
        "free summarizer",
      ],
    },
    faqs: [
      { q: "Is the input stored?", a: "No — your text is sent directly to Google's Gemma API for processing. We don't log or persist the content beyond the request." },
      { q: "How long can the input be?", a: "Up to roughly 30,000 characters per request. Longer documents should be split into sections." },
      { q: "Is this safe for confidential documents?", a: "The text leaves your browser to reach Google's Gemma API — that single hop is encrypted but not zero-knowledge. For genuinely sensitive material, use the browser-only tools instead." },
    ],
  },
  {
    slug: "ai-paraphraser",
    category: "ai",
    name: "AI Paraphraser",
    tagline: "Rewrite text in a chosen tone — formal, casual, concise, or playful.",
    summary:
      "Paste text and choose a tone — formal, casual, concise, friendly or playful — and Gemma will rewrite while preserving meaning. Useful for emails, marketing copy and tightening prose.",
    useCases: [
      "Rewrite a casual draft into formal email tone before sending",
      "Tighten verbose copy into concise marketing taglines",
      "Make support replies sound friendlier without losing accuracy",
      "Generate alternative phrasings for headlines and CTAs",
    ],
    icon: "🔁",
    ai: true,
    seo: {
      title: "Free AI Paraphraser & Rewriter Online — Gemma | BestMint",
      description:
        "Free AI paraphraser online. Rewrite text in formal, casual, concise or playful tone. Powered by Google Gemma.",
      keywords: [
        "ai paraphraser",
        "ai rewriter",
        "rephrase tool",
        "gemma paraphraser",
        "tone changer",
      ],
    },
    faqs: [
      { q: "Will the rewritten output keep my facts?", a: "Gemma is instructed to preserve meaning; for legal/medical/financial copy you should still verify the output before publishing." },
      { q: "Is paraphrased text considered plagiarism?", a: "If you paraphrase someone else's work without attribution, that's still plagiarism. Use this tool to refine your own writing or with clear attribution to the source." },
    ],
  },
  {
    slug: "ai-translator",
    category: "ai",
    name: "AI Translator",
    tagline: "Translate text between major world languages, powered by Gemma.",
    summary:
      "Translate text between English, Spanish, French, German, Chinese, Japanese, Arabic and 30+ other languages. Gemma handles idioms and context better than dictionary-style translators.",
    useCases: [
      "Translate emails and customer messages between languages",
      "Convert documentation between English and other major languages",
      "Translate idioms with context-aware results, not literal word-by-word",
      "Get a quick translation for travel phrases, menus and signs",
    ],
    icon: "🌍",
    ai: true,
    seo: {
      title: "Free AI Translator Online — 40+ Languages | BestMint",
      description:
        "Translate text between 40+ languages online for free. Powered by Google Gemma for idiom-aware, context-aware translation.",
      keywords: [
        "ai translator",
        "free translator online",
        "gemma translator",
        "language translator",
      ],
    },
    faqs: [
      { q: "How does it compare to Google Translate?", a: "Gemma is a large language model rather than a dedicated translation engine. It often produces more natural phrasing for longer text but may differ on niche technical terms." },
      { q: "Which languages are supported?", a: "Most major world languages including Spanish, French, German, Chinese (simplified and traditional), Japanese, Korean, Arabic, Russian, Portuguese, Italian, Hindi, plus 30+ more." },
    ],
  },
  // ─── New: Text & Writing ─────────────────────────────────────────────
  {
    slug: "text-cleaner",
    category: "text",
    name: "Text Cleaner",
    tagline: "Strip extra whitespace, smart quotes and hidden control characters from any text.",
    summary:
      "Clean up messy text in one click. Toggle options to collapse multiple spaces, trim each line, drop blank lines, normalise newlines, swap smart quotes for regular ones and strip non-printable control characters. Useful for tidying copied PDFs, AI output and pasted Word documents before publishing.",
    useCases: [
      "Tidy text copied from PDFs, Word docs or AI chat before publishing",
      "Normalise CRLF/LF newlines before piping into a CLI or build script",
      "Replace curly “smart” quotes and em-dashes with plain ASCII equivalents",
      "Remove invisible control characters that break JSON, CSV or YAML files",
    ],
    icon: "🧹",
    seo: {
      title: "Free Text Cleaner Online — Strip Whitespace & Smart Quotes | BestMint",
      description:
        "Clean text online for free. Collapse spaces, trim lines, remove blanks, normalise newlines, swap smart quotes and strip control characters. Browser-only.",
      keywords: [
        "text cleaner",
        "remove extra spaces",
        "strip whitespace",
        "smart quotes to regular",
        "normalize line endings",
      ],
    },
    faqs: [
      { q: "Does it modify my text without permission?", a: "No — every transformation is opt-in via a checkbox, so you choose exactly what gets cleaned." },
      { q: "What counts as 'non-printable'?", a: "ASCII control characters in U+0000–U+001F (excluding \\n and \\t) and the DEL character U+007F. These often sneak in from email clients and PDF copy-paste." },
      { q: "Will it break Markdown formatting?", a: "Trimming and collapsing spaces can affect Markdown indentation. If you're editing Markdown, leave 'Trim lines' off and use the find-replace tool instead." },
    ],
  },
  {
    slug: "text-sorter",
    category: "text",
    name: "Text Line Sorter",
    tagline: "Sort lines alphabetically, by length, numerically, randomly or in reverse.",
    summary:
      "Paste lines and instantly reorder them: A→Z, Z→A, by length, by leading number, randomly shuffled or simply reversed. Optionally drop duplicates as you sort. Runs entirely in your browser — no signup, no tracking.",
    useCases: [
      "Alphabetise CSV or shopping lists before importing into a spreadsheet",
      "Sort log lines by length to find anomalously short or long entries",
      "Shuffle a list of names for fair raffle draws or random team picks",
      "Reverse-sort numeric leaderboards or version numbers",
    ],
    icon: "🔢",
    seo: {
      title: "Free Online Line Sorter — Alphabetical, Numeric, Random | BestMint",
      description:
        "Sort lines of text online for free. A–Z, Z–A, by length, numerically, randomly or in reverse. Remove duplicates while sorting. Runs in your browser.",
      keywords: [
        "sort lines online",
        "alphabetize text",
        "line sorter",
        "shuffle list",
        "sort text by length",
      ],
    },
    faqs: [
      { q: "How does numeric sort handle mixed text?", a: "It looks for the first number in each line and sorts by that value. Lines without a number sort as zero." },
      { q: "Is the random shuffle truly random?", a: "We use Fisher-Yates with the browser's Math.random — uniformly random, but not cryptographically secure. Click 'Re-shuffle' for a new arrangement." },
      { q: "Can I sort case-insensitively?", a: "Yes — A→Z and Z→A use locale-aware compareString, which treats 'apple' and 'Apple' equivalently for ordering." },
    ],
  },
  {
    slug: "text-deduplicator",
    category: "text",
    name: "Duplicate Line Remover",
    tagline: "Strip duplicate lines from any list with optional case-insensitive and trim modes.",
    summary:
      "Paste any list and remove duplicate lines instantly. Toggle case-insensitive matching, trim each line before comparing, and optionally show how many times each unique line appeared. Browser-only — your list never leaves your device.",
    useCases: [
      "Clean up an email mailing list before importing into Mailchimp or HubSpot",
      "Deduplicate a shopping or to-do list copied from multiple sources",
      "Find unique error messages in a verbose log file",
      "Count how many times each item appears in a survey response export",
    ],
    icon: "📋",
    seo: {
      title: "Remove Duplicate Lines Online — Free Deduplicator | BestMint",
      description:
        "Remove duplicate lines from any list online. Case-insensitive option, trim option, and occurrence counts. Free, browser-only and unlimited.",
      keywords: [
        "remove duplicate lines",
        "deduplicate text",
        "unique lines online",
        "duplicate remover",
        "list deduplicator",
      ],
    },
    faqs: [
      { q: "Does it preserve the order of first appearances?", a: "Yes. The first occurrence of each line keeps its position; later duplicates are dropped." },
      { q: "What does 'case-insensitive' do?", a: "When enabled, 'Apple', 'apple' and 'APPLE' are treated as the same line. The output keeps whichever variant appeared first." },
      { q: "Can I see counts?", a: "Yes — toggle 'Show occurrence counts' and the output becomes a tab-separated count + line, ready to paste into a spreadsheet." },
    ],
  },
  {
    slug: "find-replace",
    category: "text",
    name: "Find & Replace",
    tagline: "Run multiple find-and-replace rules at once with regex and case-sensitivity options.",
    summary:
      "Stack as many find-and-replace rules as you need and apply them to your text in order. Each rule has independent flags for case-sensitivity, regular expressions and global replacement. Faster than fiddling with VS Code's regex syntax for one-off cleanups.",
    useCases: [
      "Bulk-rename variables across a code snippet before pasting it back",
      "Normalise inconsistent product names in a CSV pulled from multiple stores",
      "Strip personal information from a document with a chain of regex rules",
      "Migrate API response keys (camelCase ↔ snake_case) in a JSON sample",
    ],
    icon: "🔁",
    seo: {
      title: "Free Online Find & Replace — Multi-rule Regex Editor | BestMint",
      description:
        "Find and replace text online with multiple rules and regex support. Case-sensitive, global and chained replacements. Free, browser-only.",
      keywords: [
        "find and replace online",
        "regex find replace",
        "bulk find replace",
        "multi find replace",
      ],
    },
    faqs: [
      { q: "Are rules applied in order?", a: "Yes. Each rule transforms the output of the previous one, so you can chain related substitutions deliberately." },
      { q: "What regex flavour does it use?", a: "JavaScript's RegExp, which is ECMAScript-compatible. Lookbehinds, named groups and Unicode property escapes are supported in modern browsers." },
      { q: "Will it break if a regex is invalid?", a: "Invalid regexes show an inline error and that rule is skipped — the rest still apply." },
    ],
  },
  {
    slug: "text-statistics",
    category: "text",
    name: "Text Statistics & Readability",
    tagline: "Analyse text for word count, syllables, lexical diversity and readability scores.",
    summary:
      "Get a deep readability profile of any passage. See word, sentence and syllable counts, lexical diversity, and four readability scores: Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog and Automated Readability Index. Useful for editors, content marketers and accessibility audits.",
    useCases: [
      "Hit a target reading grade for educational or government writing",
      "Compare draft and final article readability after editing",
      "Audit landing-page copy against your brand's reading-level guideline",
      "Spot overly complex sentences in academic abstracts",
    ],
    icon: "📊",
    seo: {
      title: "Free Text Readability Checker — Flesch, Gunning Fog, ARI | BestMint",
      description:
        "Analyse text readability online for free. Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog Index, ARI plus syllable and lexical-diversity stats.",
      keywords: [
        "readability checker",
        "flesch reading ease",
        "flesch kincaid grade",
        "gunning fog index",
        "text readability score",
      ],
    },
    faqs: [
      { q: "How are syllables counted?", a: "We use a vowel-group heuristic: count groups of contiguous vowels, with corrections for silent 'e' and short words. It's about 90% accurate for English prose." },
      { q: "What's a good Flesch Reading Ease?", a: "60–70 is plain English suited to most adults. 50 is fairly difficult, 30 or below is very hard. Most newspapers target 60–70." },
      { q: "Does it work on non-English text?", a: "Word and sentence counts work, but readability formulas are calibrated for English. Use them as rough indicators only for other languages." },
    ],
  },
  {
    slug: "markdown-preview",
    category: "text",
    name: "Markdown Live Preview",
    tagline: "Type Markdown on the left, see rendered HTML on the right — live and offline.",
    summary:
      "A side-by-side Markdown preview that renders as you type. Toggle GitHub Flavored Markdown for tables, task lists and auto-linking URLs. Runs entirely in your browser — perfect for drafting README.md files, docs and blog posts without committing.",
    useCases: [
      "Draft README.md for a GitHub repository before pushing",
      "Preview Hugo, Jekyll or Astro blog posts without running a dev server",
      "Sketch a docs page during a meeting without signing up to Notion",
      "Verify Markdown tables render correctly before publishing",
    ],
    icon: "👁",
    seo: {
      title: "Free Markdown Live Preview Online — Side-by-side Editor | BestMint",
      description:
        "Live Markdown editor with side-by-side HTML preview. GitHub Flavored Markdown supported. Free, runs in your browser, no signup.",
      keywords: [
        "markdown preview",
        "online markdown editor",
        "live markdown",
        "github markdown preview",
        "markdown viewer",
      ],
    },
    faqs: [
      { q: "Is GFM the same as GitHub's renderer?", a: "We use marked with GFM enabled, which matches the CommonMark + GFM spec. Some GitHub extensions like emoji shortcodes are not included." },
      { q: "Is it safe to render arbitrary Markdown?", a: "We render with marked's default safe-mode behaviours. Don't paste untrusted Markdown that contains raw HTML — it could include scripts." },
      { q: "Can I export the rendered HTML?", a: "Use the 'Markdown to HTML' tool — it shows the raw HTML with a copy button." },
    ],
  },
  {
    slug: "markdown-to-html",
    category: "text",
    name: "Markdown to HTML",
    tagline: "Convert Markdown to clean HTML markup you can paste anywhere.",
    summary:
      "Paste Markdown, get HTML. Powered by the same renderer as our live preview but with a copy-ready output panel. Useful for CMS migrations, email templates and any place that wants HTML but you'd rather author in Markdown.",
    useCases: [
      "Convert blog drafts to HTML for WordPress, Ghost or Hubspot CMS",
      "Generate HTML email bodies from Markdown templates",
      "Embed Markdown-authored content into a static-site CMS field",
      "Quickly inspect what marked produces for a given Markdown snippet",
    ],
    icon: "📄",
    seo: {
      title: "Free Markdown to HTML Converter Online | BestMint",
      description:
        "Convert Markdown to HTML online for free. GitHub Flavored Markdown, copy-ready output, runs in your browser. No signup needed.",
      keywords: [
        "markdown to html",
        "md to html converter",
        "markdown converter",
        "github markdown converter",
      ],
    },
    faqs: [
      { q: "Does it handle GFM tables?", a: "Yes — toggle GFM on and pipe-table syntax renders to <table> markup." },
      { q: "Does it sanitise the output?", a: "marked is a renderer, not a sanitiser. The output mirrors your Markdown, so don't paste untrusted Markdown intended for HTML output." },
      { q: "What's the round-trip behaviour?", a: "Markdown → HTML → Markdown via our HTML-to-Markdown tool may not be exactly identical due to formatting choices, but the meaning is preserved." },
    ],
  },
  {
    slug: "html-to-markdown",
    category: "text",
    name: "HTML to Markdown",
    tagline: "Convert HTML to clean Markdown using Turndown — preserve headings, lists and code.",
    summary:
      "Paste HTML and get clean Markdown back. Headings, lists, code blocks, links and images are all preserved with sensible defaults. Useful for migrating from a WYSIWYG CMS to a Markdown-based static site.",
    useCases: [
      "Migrate WordPress or Ghost posts to Hugo, Astro or 11ty",
      "Convert pasted-from-Word HTML emails into Markdown for docs",
      "Strip styling from a rich-text export before publishing on GitHub",
      "Round-trip CMS content through Markdown for version control",
    ],
    icon: "📑",
    seo: {
      title: "Free HTML to Markdown Converter Online | BestMint",
      description:
        "Convert HTML to Markdown online for free. Powered by Turndown — preserves headings, lists, code blocks, links and images. Runs in your browser.",
      keywords: [
        "html to markdown",
        "html to md converter",
        "turndown converter",
        "convert html to markdown",
      ],
    },
    faqs: [
      { q: "Will it preserve nested lists?", a: "Yes — Turndown handles arbitrarily nested ordered and unordered lists." },
      { q: "What about styles or class attributes?", a: "Markdown has no concept of classes or inline styles, so they're dropped. Headings, emphasis and code blocks are preserved." },
      { q: "Does it support fenced code blocks?", a: "Yes — we configure Turndown to use fenced (``` ) code blocks instead of indented." },
    ],
  },
  {
    slug: "nato-phonetic",
    category: "text",
    name: "NATO Phonetic Alphabet Translator",
    tagline: "Spell text using the NATO phonetic alphabet — Alpha, Bravo, Charlie, etc.",
    summary:
      "Convert any text or order number into the NATO/ICAO phonetic alphabet (Alpha, Bravo, Charlie…). Includes letters A–Z and digits 0–9. Useful for reading codes over the phone, radio or video calls without misunderstandings.",
    useCases: [
      "Read order numbers, license plates or confirmation codes over the phone",
      "Communicate clearly on bad-connection video calls",
      "Pilots, aviation enthusiasts, and amateur radio (ham) operators",
      "Spell out passwords or two-factor codes verbally",
    ],
    icon: "📻",
    seo: {
      title: "NATO Phonetic Alphabet Translator — Spell Text Aloud | BestMint",
      description:
        "Translate text to the NATO phonetic alphabet (Alpha, Bravo, Charlie). Includes letters and digits. Free, browser-based, no signup.",
      keywords: [
        "nato phonetic alphabet",
        "nato alphabet translator",
        "alpha bravo charlie",
        "icao phonetic alphabet",
        "phonetic spelling tool",
      ],
    },
    faqs: [
      { q: "What's the difference between NATO and ICAO?", a: "They're the same alphabet — adopted by NATO in 1956 and standardised by the ICAO for aviation. The 26 codewords (Alpha, Bravo…) are identical." },
      { q: "Why is 'Juliett' spelled with two t's?", a: "ICAO standardises 'Juliett' to make the final 't' clearly audible to non-English speakers, especially over weak radio signals." },
      { q: "Are the digits part of NATO phonetic?", a: "Yes — 0–9 use 'Zero, One, Two, Tree, Fower, Five, Six, Seven, Eight, Niner' in strict aviation usage. We use the simpler English forms for clarity." },
    ],
  },
  {
    slug: "morse-code",
    category: "text",
    name: "Morse Code Translator",
    tagline: "Encode text to Morse and decode dots-and-dashes back, with audio playback.",
    summary:
      "Convert text to International Morse Code and back. Hear the result played as a 600 Hz sine tone using the Web Audio API. Supports letters, digits and common punctuation; word breaks use a slash.",
    useCases: [
      "Learn Morse code by typing words and hearing them played",
      "Send hidden messages or quirky birthday greetings",
      "Decode Morse signals from films, video games or escape-room puzzles",
      "Amateur radio (ham) operators practising CW transmissions",
    ],
    icon: "•",
    seo: {
      title: "Free Morse Code Translator with Audio — Encode & Decode | BestMint",
      description:
        "Encode and decode Morse code online for free. Listen to the dots and dashes via Web Audio. Supports letters, digits and punctuation.",
      keywords: [
        "morse code translator",
        "morse encoder",
        "morse decoder",
        "morse audio player",
        "international morse code",
      ],
    },
    faqs: [
      { q: "How are word breaks represented?", a: "We use '/' between words. When decoding, both '/' and '|' are accepted." },
      { q: "What speed is the audio?", a: "Around 15–18 words per minute (dot = 80 ms). The Web Audio API plays it at 600 Hz, the traditional sidetone frequency." },
      { q: "Does it support prosigns?", a: "We support common punctuation but not military prosigns like SOS as a fused symbol — type 'SOS' and it will encode each letter individually." },
    ],
  },
  {
    slug: "binary-text",
    category: "text",
    name: "Binary ↔ Text Converter",
    tagline: "Encode any text to 8-bit binary and decode binary back into UTF-8 text.",
    summary:
      "Convert text to binary (UTF-8 bytes split into 8-bit groups) and back. Handy for explaining how computers store text, decoding puzzle clues and verifying byte-level encodings of multilingual strings.",
    useCases: [
      "Teach binary representation in computer-science classes",
      "Decode binary clues in escape rooms, CTFs and puzzle games",
      "Verify UTF-8 byte sequences for emoji and CJK characters",
      "Generate binary art or 'binary love letter' style messages",
    ],
    icon: "01",
    seo: {
      title: "Free Binary to Text Converter Online | BestMint",
      description:
        "Convert text to binary (8-bit UTF-8) and binary to text online. Free, browser-only, supports emoji and any Unicode character.",
      keywords: [
        "binary to text",
        "text to binary",
        "binary translator",
        "binary converter",
        "utf-8 binary converter",
      ],
    },
    faqs: [
      { q: "Why is each character sometimes more than 8 bits?", a: "We encode text as UTF-8, so emoji and non-ASCII characters take 2–4 bytes (16–32 bits), each shown as an 8-bit group." },
      { q: "What separator should I use when decoding?", a: "Spaces between 8-bit groups. We strip any non-0/1 characters before parsing." },
      { q: "Is binary the same as Base2?", a: "Yes — '01010100' is just Base2 representation. We label it 'binary' since that's the colloquial term." },
    ],
  },
  {
    slug: "rot13",
    category: "text",
    name: "ROT13 Encoder & Decoder",
    tagline: "Apply the symmetric ROT13 cipher to scramble or unscramble text instantly.",
    summary:
      "ROT13 shifts each letter 13 places in the alphabet — applying it twice returns the original. Often used for spoiler tags, lightweight obfuscation in Usenet and Reddit, and as a teaching example of substitution ciphers.",
    useCases: [
      "Hide spoilers in forum posts, Reddit comments and chat messages",
      "Lightly obfuscate puzzle answers or trivia game solutions",
      "Teach simple substitution ciphers in a CS or maths classroom",
      "Decode ROT13 jokes hidden in source-code comments",
    ],
    icon: "🔄",
    seo: {
      title: "Free ROT13 Encoder & Decoder Online | BestMint",
      description:
        "ROT13 encode and decode online for free. Symmetric substitution cipher — paste any text and the same operation reveals or hides the message.",
      keywords: [
        "rot13 encoder",
        "rot13 decoder",
        "rot13 online",
        "rot13 cipher",
        "letter shift cipher",
      ],
    },
    faqs: [
      { q: "Is ROT13 secure?", a: "No. It's a substitution cipher with a fixed shift — anyone can decode it instantly. It's used for fun and obfuscation, not security." },
      { q: "Why is it symmetric?", a: "There are 26 letters and 13 is half of 26, so applying the shift twice cycles back to the original letter." },
      { q: "Does it affect digits or punctuation?", a: "No — only A–Z and a–z are rotated. Numbers, spaces and symbols pass through untouched." },
    ],
  },
  {
    slug: "caesar-cipher",
    category: "text",
    name: "Caesar Cipher Encoder & Decoder",
    tagline: "Encrypt or decrypt text with the classic Caesar shift cipher (any shift -25 to 25).",
    summary:
      "Shift each letter by a fixed number of places — the simplest substitution cipher, named after Julius Caesar's military despatches. Adjust the shift with a slider, toggle decode mode, and the cipher preserves case while passing punctuation through.",
    useCases: [
      "Encode short notes for kids' spy games or party clues",
      "Demonstrate substitution ciphers and modular arithmetic in class",
      "Solve cryptic Caesar puzzles in escape rooms and CTFs",
      "Quickly try all 25 shifts to brute-force-decode an unknown ciphertext",
    ],
    icon: "🔐",
    seo: {
      title: "Free Caesar Cipher Encoder & Decoder | BestMint",
      description:
        "Encrypt or decrypt with a Caesar shift cipher online. Adjustable shift -25 to 25. Free, browser-only, instant results.",
      keywords: [
        "caesar cipher",
        "shift cipher",
        "caesar cipher decoder",
        "caesar cipher encoder",
        "letter shift encryption",
      ],
    },
    faqs: [
      { q: "Is the Caesar cipher secure?", a: "No — there are only 25 possible shifts, so it's trivially brute-forced. It's a teaching tool and party-game cipher only." },
      { q: "What shift should I use?", a: "The classic Caesar uses shift 3. ROT13 is shift 13. Any value -25 to 25 works; positive shifts encode forward, negative shifts decode." },
      { q: "Why preserve case?", a: "It keeps the ciphertext readable and lets you decode 'Hello' back to 'Hello' without losing capital letters." },
    ],
  },
  {
    slug: "vigenere-cipher",
    category: "text",
    name: "Vigenère Cipher Encoder & Decoder",
    tagline: "Polyalphabetic substitution cipher with a keyword — encrypt or decrypt instantly.",
    summary:
      "The Vigenère cipher uses a repeating keyword to shift each letter independently, defeating simple frequency analysis used to crack Caesar. Type your message, choose a keyword, and switch between encrypt and decrypt modes.",
    useCases: [
      "Demonstrate polyalphabetic ciphers in cryptography lessons",
      "Solve Vigenère challenges in CTFs and crypto puzzles",
      "Encode personal notes with a keyword only you and a friend know",
      "Compare Vigenère vs Caesar resistance to frequency analysis",
    ],
    icon: "🗝",
    seo: {
      title: "Free Vigenère Cipher Encoder & Decoder Online | BestMint",
      description:
        "Encrypt and decrypt with the Vigenère cipher using any keyword. Free, browser-only, supports the standard A–Z polyalphabetic substitution.",
      keywords: [
        "vigenere cipher",
        "vigenere encoder",
        "vigenere decoder",
        "polyalphabetic cipher",
        "keyword cipher",
      ],
    },
    faqs: [
      { q: "Is Vigenère unbreakable?", a: "No. Once thought 'le chiffre indéchiffrable', it was broken by Babbage and Kasiski using key-length detection. It's not modern crypto, but stronger than Caesar." },
      { q: "What characters does it operate on?", a: "Only A–Z and a–z. The keyword is normalised to uppercase letters; everything else passes through unchanged." },
      { q: "Does the keyword length matter?", a: "Longer keywords are harder to crack. A keyword as long as the message (one-time pad) is theoretically unbreakable." },
    ],
  },
  {
    slug: "ascii-art-generator",
    category: "text",
    name: "ASCII Art Banner Generator",
    tagline: "Turn short text into chunky ASCII banners — three built-in fonts, ready to copy.",
    summary:
      "Type a short word or phrase and get an ASCII banner you can paste into terminal MOTDs, README files, code comments or chat. Three pre-built fonts (Standard, Block, Banner) with letters, digits and a space. Up to 24 characters.",
    useCases: [
      "Add a banner to your terminal login MOTD or shell prompt",
      "Decorate README files with eye-catching ASCII headings",
      "Create chunky chat-app messages on Slack, Discord and IRC",
      "Generate ASCII titles for retro-style code comments",
    ],
    icon: "🅰",
    seo: {
      title: "Free ASCII Art Generator — Banner Text Online | BestMint",
      description:
        "Generate ASCII art banners from text online for free. Three fonts, supports letters and digits, copy with one click. Browser-only.",
      keywords: [
        "ascii art generator",
        "ascii banner generator",
        "text to ascii art",
        "ascii text generator",
        "figlet alternative",
      ],
    },
    faqs: [
      { q: "Why only short text?", a: "ASCII banners are 5–6 rows tall; long phrases overflow the typical terminal width. We cap at 24 characters to keep output readable." },
      { q: "Are non-Latin letters supported?", a: "Not yet — only A–Z (case-insensitive), 0–9 and space. Missing characters render as blank space." },
      { q: "Where does the font come from?", a: "Built-in pixel maps designed for this tool. They're inspired by figlet's 'standard' font but coded inline so the tool runs offline." },
    ],
  },
  {
    slug: "fancy-text",
    category: "text",
    name: "Fancy Text Generator (Unicode Fonts)",
    tagline: "Convert plain text into 𝓒𝓾𝓻𝓼𝓲𝓿𝓮, 𝙼𝚘𝚗𝚘, 𝔉𝔯𝔞𝔨𝔱𝔲𝔯, Ⓒⓘⓡⓒⓛⓔⓓ and more.",
    summary:
      "Generate decorated text using Unicode mathematical alphabets and combining marks: bold, italic, script, fraktur, double-struck, monospace, circled, squared, strikethrough, underline and small caps. Copy any variant with one click.",
    useCases: [
      "Stylise Instagram, Twitter/X and TikTok bios beyond plain text",
      "Stand out in Discord usernames and Slack message highlights",
      "Add emphasis where Markdown isn't supported (some chat apps)",
      "Create retro or 'aesthetic' text for design mockups",
    ],
    icon: "𝓕",
    seo: {
      title: "Fancy Text Generator — Unicode Fonts for Bios | BestMint",
      description:
        "Free fancy text generator. Convert text to bold, italic, script, fraktur, double-struck, monospace, circled and more Unicode font styles.",
      keywords: [
        "fancy text generator",
        "unicode font converter",
        "instagram font generator",
        "stylish text generator",
        "cool text fonts",
      ],
    },
    faqs: [
      { q: "Why does some text not appear stylised?", a: "Each variant only covers A–Z (and sometimes 0–9). Punctuation passes through unchanged — that's a Unicode limitation, not a bug." },
      { q: "Is it real text or images?", a: "Real Unicode characters. They paste anywhere that supports Unicode, which is most modern apps and websites." },
      { q: "Are these accessible?", a: "Screen readers may pronounce mathematical alphanumeric symbols literally. Don't use them for important content where accessibility matters." },
    ],
  },
  {
    slug: "zalgo-text",
    category: "text",
    name: "Zalgo Text Generator",
    tagline: "Apply chaotic combining diacritics to make text look glitchy and cursed.",
    summary:
      "Add stacked combining diacritics (the 'Zalgo' effect) to any text. Slide intensity from 1 to 5 to control how many marks each character gets. Re-roll for a fresh random distribution. Output is real Unicode, copyable anywhere.",
    useCases: [
      "Create spooky Halloween or horror-themed social posts",
      "Decorate gaming usernames with a chaotic, glitchy aesthetic",
      "Stress-test how an app or font handles combining characters",
      "Generate creepy chat messages for tabletop RPG immersion",
    ],
    icon: "👻",
    seo: {
      title: "Free Zalgo Text Generator — Glitchy Cursed Text | BestMint",
      description:
        "Generate Zalgo text online for free. Slide intensity 1–5, re-roll for new distributions. Real Unicode combining diacritics, paste anywhere.",
      keywords: [
        "zalgo text generator",
        "glitch text",
        "cursed text generator",
        "creepy text generator",
        "scary text effect",
      ],
    },
    faqs: [
      { q: "What's Zalgo?", a: "An internet meme using stacked Unicode combining marks (U+0300–U+036F) to make text appear to bleed or glitch. Often associated with creepypasta." },
      { q: "Does it work everywhere?", a: "Mostly — anywhere Unicode renders. Some apps strip combining marks, and very high intensities may overflow line height." },
      { q: "Is it harmful?", a: "No, but extreme Zalgo can crash older messaging apps that don't handle very long combining sequences. Stick to intensity 1–3 for compatibility." },
    ],
  },
  {
    slug: "word-frequency",
    category: "text",
    name: "Word Frequency Counter",
    tagline: "Tabulate words by occurrence count and density — with stopword filtering.",
    summary:
      "Paste any text and get a sortable table of every word, how many times it appears, and what percentage of the total it represents. Filter common stopwords (the, a, of…) to focus on content words for SEO and editorial review.",
    useCases: [
      "SEO keyword density analysis on landing pages and blog posts",
      "Find overused words in your manuscript before submission",
      "Compare keyword spread across multiple draft versions",
      "Build word clouds and tag clouds from raw text",
    ],
    icon: "📈",
    seo: {
      title: "Free Word Frequency Counter — Density & Stopwords | BestMint",
      description:
        "Count word frequency online for free. See counts, density percentages and filter stopwords. Useful for SEO and editorial review.",
      keywords: [
        "word frequency counter",
        "keyword density tool",
        "word counter online",
        "text frequency analysis",
        "stopword filter",
      ],
    },
    faqs: [
      { q: "How are words split?", a: "We split on non-letter characters and lowercase the result, so 'Apple' and 'apple' count together. Apostrophes are kept ('don't' is one word)." },
      { q: "Which stopwords are filtered?", a: "About 100 of the most common English function words: articles, pronouns, prepositions, common verbs and conjunctions." },
      { q: "Is keyword density still important for SEO?", a: "Less so than in 2010, but extreme density (>5%) can look spammy and over-optimised. Aim for natural usage rather than a magic number." },
    ],
  },
  {
    slug: "text-truncator",
    category: "text",
    name: "Text Truncator",
    tagline: "Trim text to a maximum length with a customisable ellipsis.",
    summary:
      "Cut any text down to a maximum number of characters or words and append your choice of ellipsis ('...', '…', or a custom string). Ideal for meta descriptions, social previews and database VARCHAR columns.",
    useCases: [
      "Generate SEO meta-description previews under the 160-char limit",
      "Trim social media captions to fit Twitter/X's 280 characters",
      "Cap user input before storing in a VARCHAR(N) database column",
      "Create card-style content snippets with consistent length",
    ],
    icon: "✂",
    seo: {
      title: "Free Text Truncator — Trim by Characters or Words | BestMint",
      description:
        "Truncate text online for free. Cut by characters or words, choose your ellipsis, see original vs output length. Browser-only.",
      keywords: [
        "text truncator",
        "trim text online",
        "shorten text",
        "ellipsis tool",
        "string truncator",
      ],
    },
    faqs: [
      { q: "Does it count emoji as one character?", a: "Yes — we count by Unicode grapheme cluster (visual character), so emoji and combining marks count as one." },
      { q: "Will it cut a word in half?", a: "By default, character mode cuts strictly at the limit. Use word mode to cut on word boundaries." },
      { q: "Is the ellipsis included in the limit?", a: "Yes. The output is guaranteed to fit within your specified maximum length, ellipsis included." },
    ],
  },
  {
    slug: "emoji-translator",
    category: "text",
    name: "Emoji Translator",
    tagline: "Replace common words with emoji or sprinkle emoji throughout your text.",
    summary:
      "A built-in dictionary maps ~80 common English words (cat, heart, fire, coffee…) to emoji. Choose 'Replace' to swap words for emoji or 'Add' to keep the word and append the emoji. Great for fun social posts and emoji-rich captions.",
    useCases: [
      "Spice up Instagram or Twitter captions with relevant emoji",
      "Add visual interest to slide deck bullet points",
      "Generate Discord or Slack messages with auto-applied emoji",
      "Translate kids' notes into picture-style messages",
    ],
    icon: "🎉",
    seo: {
      title: "Free Emoji Translator — Words to Emoji | BestMint",
      description:
        "Translate words to emoji online for free. ~80 common words mapped (cat 🐈 heart ❤️ fire 🔥…). Replace or augment text with emoji.",
      keywords: [
        "emoji translator",
        "words to emoji",
        "text to emoji",
        "emoji generator",
        "emoji converter",
      ],
    },
    faqs: [
      { q: "Why these specific words?", a: "We pick the most common nouns and emotions that have an unambiguous emoji equivalent. Open-vocabulary translation is fuzzy and unreliable." },
      { q: "Will it match plurals or verbs?", a: "Only exact lowercase matches. 'cats' won't match 'cat' yet — keep nouns singular for best results." },
      { q: "Can I add my own mappings?", a: "Not in this version, but the dictionary is shown below the output so you know exactly what's available." },
    ],
  },
  {
    slug: "acronym-generator",
    category: "text",
    name: "Acronym Generator",
    tagline: "Turn any phrase into an acronym with optional stopword skipping and periods.",
    summary:
      "Take the first letter of each word in a phrase and produce a clean acronym. Toggle stopword skipping (a, an, the, of, in…) and period insertion (e.g. U.S.A.). Useful for naming projects, product codes and internal tools.",
    useCases: [
      "Coin a name for an internal project or product (KISS, MVP, SaaS)",
      "Generate ticker-style codes for events or campaigns",
      "Teach kids how acronyms are formed in language class",
      "Build cleaner abbreviations for course or department names",
    ],
    icon: "🅰",
    seo: {
      title: "Free Acronym Generator — Phrase to Acronym | BestMint",
      description:
        "Generate acronyms from any phrase online. Optional stopword filtering and period insertion. Free, browser-only, instant.",
      keywords: [
        "acronym generator",
        "phrase to acronym",
        "abbreviation generator",
        "initialism generator",
      ],
    },
    faqs: [
      { q: "Acronym vs initialism?", a: "An acronym is pronounced as a word (NASA, scuba); an initialism is spelled out (FBI, USA). This tool generates the letters — pronunciation is up to you." },
      { q: "Why skip stopwords?", a: "Skipping 'the', 'of' etc. produces tighter acronyms. NASA skips 'and' (National Aeronautics and Space Administration → NASA, not NAASA)." },
      { q: "Does it handle hyphenated words?", a: "Hyphenated words count as one word — only the first letter is taken. Split with a space for separate letters." },
    ],
  },
  {
    slug: "pig-latin",
    category: "text",
    name: "Pig Latin Translator",
    tagline: "Translate English to Pig Latin and back — the classic schoolyard secret language.",
    summary:
      "Convert English to Pig Latin: words starting with a consonant move the cluster to the end and add 'ay' (pig → igpay). Words starting with a vowel get 'way' (apple → appleway). The decoder reverses it heuristically.",
    useCases: [
      "Teach kids about phonetics and morphology playfully",
      "Pass simple secret notes on social media or in the classroom",
      "Decode Pig Latin from cartoons, songs and old radio shows",
      "Practise spoken Pig Latin for parties and games",
    ],
    icon: "🐷",
    seo: {
      title: "Free Pig Latin Translator — English to Pig Latin & Back | BestMint",
      description:
        "Translate English to Pig Latin and decode Pig Latin back to English. Classic schoolyard cipher, free and browser-only.",
      keywords: [
        "pig latin translator",
        "pig latin converter",
        "pig latin decoder",
        "schoolyard secret language",
      ],
    },
    faqs: [
      { q: "Why is decoding only approximate?", a: "Pig Latin loses the exact length of the original consonant cluster — 'igpay' could come from 'pig', 'sip' or others. We assume the simplest case." },
      { q: "Are the rules standardised?", a: "There are several variants. We use the most common: consonant cluster + 'ay', vowel-start + 'way'. Some traditions use just 'ay' for vowel-start." },
      { q: "Does it preserve punctuation?", a: "Yes — only letter sequences are transformed. Punctuation, numbers and spaces pass through." },
    ],
  },
  {
    slug: "whitespace-remover",
    category: "text",
    name: "Whitespace Remover",
    tagline: "Strip all whitespace, collapse spaces or replace whitespace with any character.",
    summary:
      "Five quick whitespace operations in one tool: remove all whitespace, drop only tabs, drop only newlines, collapse multiple whitespace into a single space, or replace any whitespace with a custom character (great for slug-style output).",
    useCases: [
      "Strip whitespace from a copied password before pasting",
      "Compact text for one-line shell snippets",
      "Replace spaces with hyphens to build URL slugs",
      "Remove invisible whitespace before parsing JSON or CSV",
    ],
    icon: "␣",
    seo: {
      title: "Free Whitespace Remover Online — Strip & Collapse Spaces | BestMint",
      description:
        "Remove or collapse whitespace online. Strip all spaces, drop tabs only, replace whitespace with a custom character. Free, browser-only.",
      keywords: [
        "whitespace remover",
        "remove spaces online",
        "strip whitespace",
        "collapse spaces",
        "remove tabs",
      ],
    },
    faqs: [
      { q: "What counts as whitespace?", a: "Any character matched by JavaScript's \\s regex: space, tab, newline, carriage return, form feed, vertical tab, plus various Unicode whitespace like non-breaking space." },
      { q: "Does 'collapse' affect leading whitespace?", a: "Yes — collapse mode replaces all whitespace runs with a single space and trims leading/trailing whitespace from the whole string." },
      { q: "Can I replace with a multi-char string?", a: "Yes — the 'replace with' field takes any string, including emoji or multiple characters." },
    ],
  },
  {
    slug: "text-encoder-suite",
    category: "text",
    name: "Text Encoder Suite (Hex, Base32, Octal, Binary)",
    tagline: "Encode and decode text across Hex, Base32, Octal and Binary in one tool.",
    summary:
      "A unified encoder/decoder for four classic numeric encodings. Pick a format — Base16 (Hex), Base32, Octal or Binary — and toggle encode/decode. Always operates on UTF-8 bytes so it round-trips emoji and CJK accurately.",
    useCases: [
      "Encode small payloads as Hex for SQL BLOB literals or shell scripts",
      "Decode Base32 secrets from TOTP/2FA setup keys",
      "Convert text to Octal for old-school escape sequences",
      "Inspect the byte-level representation of UTF-8 strings",
    ],
    icon: "🔣",
    seo: {
      title: "Free Hex, Base32, Octal & Binary Encoder/Decoder | BestMint",
      description:
        "Encode and decode text in Hex, Base32, Octal and Binary online. UTF-8 safe, free, browser-only — no signup, no limits.",
      keywords: [
        "hex encoder",
        "base32 encoder",
        "octal converter",
        "binary text encoder",
        "text encoding tool",
      ],
    },
    faqs: [
      { q: "Why no Base64?", a: "We have a dedicated Base64 tool in the Developer category — it includes URL-safe variants and file upload." },
      { q: "What Base32 alphabet is used?", a: "RFC 4648 standard alphabet (A-Z and 2-7), with '=' padding. Crockford's variant isn't supported." },
      { q: "How does it handle emoji?", a: "Text is encoded as UTF-8 bytes first, so emoji round-trip correctly. A single emoji can occupy 4 bytes (8 hex chars, 32 binary bits)." },
    ],
  },
  // ─── New: Developer ──────────────────────────────────────────────────
  {
    slug: "yaml-formatter",
    category: "developer",
    name: "YAML Formatter & Validator",
    tagline: "Beautify and validate YAML with selectable indent and helpful error messages.",
    summary:
      "Paste any YAML and instantly get a pretty-printed, validated version. Choose 2- or 4-space indent, see error messages with line numbers when parsing fails, and copy the cleaned output. Everything runs locally in your browser via js-yaml.",
    useCases: [
      "Tidy up Kubernetes manifests, Helm values and Docker Compose files",
      "Validate GitHub Actions and CircleCI workflow files before committing",
      "Re-indent hand-edited Ansible playbooks and OpenAPI specs",
      "Catch YAML syntax errors (mixed tabs/spaces, bad indentation) instantly",
    ],
    icon: "📜",
    seo: {
      title: "Free YAML Formatter & Validator Online — Beautify YAML | BestMint",
      description:
        "Free online YAML formatter and validator. Beautify and validate YAML with line-accurate error messages. Browser-only — your data stays private.",
      keywords: ["yaml formatter", "yaml validator", "yaml beautifier", "yaml lint", "online yaml editor"],
    },
    faqs: [
      { q: "Does my YAML get uploaded?", a: "No — parsing and formatting happen in your browser using js-yaml. Nothing is sent to a server." },
      { q: "Will it preserve comments?", a: "No. Standard YAML libraries (including js-yaml) drop comments because they aren't part of the parsed data model. If you need comment-preserving formatting, edit by hand." },
      { q: "What spec does it follow?", a: "YAML 1.2 via the js-yaml library, which is widely used in Node.js, Webpack, ESLint and many other tools." },
    ],
  },
  {
    slug: "yaml-json-converter",
    category: "developer",
    name: "YAML to JSON Converter",
    tagline: "Convert YAML to JSON and JSON to YAML in one click — fully in the browser.",
    summary:
      "Two-way conversion between YAML and JSON. Paste either format, pick a direction, and get the equivalent output instantly with proper escaping, indentation and validation. Useful when migrating config files between tools that prefer different formats.",
    useCases: [
      "Convert OpenAPI YAML specs to JSON (or vice versa) for tooling compatibility",
      "Migrate Kubernetes manifests between YAML and JSON forms",
      "Generate JSON test fixtures from human-friendly YAML inputs",
      "Translate config samples between docs that use different formats",
    ],
    icon: "🔄",
    seo: {
      title: "Free YAML ↔ JSON Converter Online — Two-Way | BestMint",
      description:
        "Convert YAML to JSON and JSON to YAML online for free. Two-way, browser-only conversion with validation. No upload, no signup.",
      keywords: ["yaml to json", "json to yaml", "yaml json converter", "convert yaml online"],
    },
    faqs: [
      { q: "Is the conversion lossless?", a: "For all common data types (strings, numbers, booleans, arrays, objects, null) yes. YAML-specific features like anchors and tags are resolved during parsing and won't round-trip identically." },
      { q: "Why does my JSON output look different from the YAML?", a: "JSON requires keys to be quoted strings and disallows comments. The data is identical; only formatting differs." },
      { q: "Does it handle multi-document YAML?", a: "Single-document YAML only. For multi-document streams (separated by ---), convert one document at a time." },
    ],
  },
  {
    slug: "xml-formatter",
    category: "developer",
    name: "XML Formatter & Validator",
    tagline: "Pretty-print and validate XML in the browser with selectable indent.",
    summary:
      "Paste any XML and get a clean, indented version. The tool uses your browser's built-in XML parser to validate the structure and reports parse errors. No server round-trip — everything runs locally.",
    useCases: [
      "Beautify SOAP requests, RSS feeds and Atom feeds for inspection",
      "Validate XML config files (pom.xml, web.xml, build.xml) before committing",
      "Inspect raw responses from legacy APIs that still return XML",
      "Re-indent minified XML payloads pulled from network logs",
    ],
    icon: "</>",
    seo: {
      title: "Free XML Formatter & Validator — Beautify XML Online | BestMint",
      description:
        "Free online XML formatter and validator. Beautify and validate XML instantly in your browser. No upload, no signup.",
      keywords: ["xml formatter", "xml beautifier", "xml validator", "pretty print xml", "online xml editor"],
    },
    faqs: [
      { q: "Is namespace XML supported?", a: "Yes. The native DOMParser preserves namespaces and attributes during reformatting." },
      { q: "Will it validate against an XSD or DTD?", a: "No — only well-formedness is checked. For schema validation use a dedicated tool like xmllint." },
      { q: "What happens with CDATA sections and comments?", a: "Both are preserved in the formatted output." },
    ],
  },
  {
    slug: "xml-json-converter",
    category: "developer",
    name: "XML to JSON Converter",
    tagline: "Two-way XML ↔ JSON conversion using your browser's native XML parser.",
    summary:
      "Convert XML to JSON or JSON to XML without leaving your browser. Attributes are preserved with the @ prefix, repeated child elements collapse into arrays, and the inverse direction reconstructs valid XML from a JSON tree.",
    useCases: [
      "Migrate XML responses from a legacy API into a modern JSON pipeline",
      "Generate JSON fixtures from XML samples in vendor docs",
      "Inspect SOAP envelopes as readable JSON during debugging",
      "Round-trip JSON config to XML when integrating with Java/.NET tools",
    ],
    icon: "🔁",
    seo: {
      title: "Free XML ↔ JSON Converter Online — Two-Way | BestMint",
      description:
        "Convert XML to JSON and JSON to XML online for free. Browser-only, no upload, no signup. Preserves attributes and arrays.",
      keywords: ["xml to json", "json to xml", "xml json converter", "convert xml online"],
    },
    faqs: [
      { q: "How are XML attributes represented?", a: "Attributes become JSON keys prefixed with @. For example <a href=\"x\"/> becomes {\"a\": {\"@href\": \"x\"}}." },
      { q: "What about repeated elements?", a: "When the same child element appears more than once, the converter promotes them to a JSON array automatically." },
      { q: "Is the conversion lossless?", a: "For common cases yes. Mixed text-and-element content and processing instructions are best-effort and may not round-trip exactly." },
    ],
  },
  {
    slug: "sql-formatter",
    category: "developer",
    name: "SQL Formatter",
    tagline: "Beautify SQL for MySQL, PostgreSQL, SQLite, T-SQL and BigQuery.",
    summary:
      "Paste any SQL query and get a properly indented, keyword-uppercased version. Select your dialect (MySQL, PostgreSQL, SQLite, T-SQL, BigQuery) and indent width. Powered by sql-formatter; runs entirely in the browser.",
    useCases: [
      "Make minified ORM-generated SQL readable for debugging",
      "Standardise team SQL style with uppercase keywords and consistent indent",
      "Format pasted query plans before sharing in pull request reviews",
      "Tidy up complex JOINs and subqueries before optimising",
    ],
    icon: "🗄️",
    seo: {
      title: "Free SQL Formatter Online — MySQL, PostgreSQL, T-SQL | BestMint",
      description:
        "Free online SQL formatter and beautifier. Pretty-print queries for MySQL, PostgreSQL, SQLite, T-SQL and BigQuery. Browser-only.",
      keywords: ["sql formatter", "sql beautifier", "format sql online", "mysql formatter", "postgresql formatter"],
    },
    faqs: [
      { q: "Does it modify my query?", a: "It only re-indents and adjusts keyword case. The semantics, table names and values stay the same." },
      { q: "Which dialects are supported?", a: "Standard SQL, MySQL, PostgreSQL, SQLite, T-SQL (MSSQL) and BigQuery. Each handles dialect-specific keywords and quoting differently." },
      { q: "Can it format Snowflake or DuckDB?", a: "These dialects share enough syntax with PostgreSQL that the postgresql option produces good results in most cases." },
    ],
  },
  {
    slug: "html-formatter",
    category: "developer",
    name: "HTML Formatter & Beautifier",
    tagline: "Pretty-print HTML with proper indentation and self-closed void elements.",
    summary:
      "Paste any HTML — even minified single-line markup — and get a clean, indented version. Void elements like <img>, <br> and <input> are emitted correctly, attributes are preserved, and indent width is selectable.",
    useCases: [
      "Beautify minified HTML pulled from a deployed site or browser DevTools",
      "Make email-template HTML reviewable before approval",
      "Re-indent HTML snippets pasted from random docs and StackOverflow",
      "Inspect SSR output before debugging hydration mismatches",
    ],
    icon: "📰",
    seo: {
      title: "Free HTML Formatter Online — Beautify HTML | BestMint",
      description:
        "Free online HTML formatter and beautifier. Pretty-print HTML with proper indentation. Browser-only — your markup stays private.",
      keywords: ["html formatter", "html beautifier", "pretty print html", "online html formatter"],
    },
    faqs: [
      { q: "Does it preserve attributes?", a: "Yes — all attributes and their values are preserved exactly. Whitespace between attributes is normalised." },
      { q: "Will it break my Tailwind classes?", a: "No. Class names are kept verbatim; only outer whitespace and indentation change." },
      { q: "Are inline scripts and styles re-indented?", a: "Their content is preserved as a single text node. Use a dedicated JS or CSS formatter if you need their bodies reformatted." },
    ],
  },
  {
    slug: "css-formatter",
    category: "developer",
    name: "CSS Formatter & Beautifier",
    tagline: "Pretty-print CSS with consistent indentation, including media queries.",
    summary:
      "Paste any CSS — minified or messy — and get a properly indented version. Selectors, declarations and nested at-rules like @media are placed on their own lines with consistent spacing. Runs entirely in your browser.",
    useCases: [
      "Format minified CSS dumped from production for inspection",
      "Standardise indentation in legacy stylesheets without running Prettier",
      "Re-indent Tailwind or component-library overrides for clarity",
      "Make hand-written keyframes and media queries easier to read",
    ],
    icon: "🎨",
    seo: {
      title: "Free CSS Formatter Online — Beautify CSS | BestMint",
      description:
        "Free online CSS formatter and beautifier. Pretty-print CSS with consistent indentation. Works with @media and nested at-rules. Browser-only.",
      keywords: ["css formatter", "css beautifier", "pretty print css", "online css formatter"],
    },
    faqs: [
      { q: "Does it handle @media and @keyframes?", a: "Yes — nested at-rules are indented inside their parent block." },
      { q: "Is it a full Prettier replacement?", a: "No. It only reformats whitespace; it doesn't merge selectors, sort properties or transform values. For comprehensive CSS formatting, use Prettier in your build." },
      { q: "Does it strip comments?", a: "Comments are removed for clean output. If you need them preserved, edit by hand." },
    ],
  },
  {
    slug: "js-formatter",
    category: "developer",
    name: "JavaScript Beautifier",
    tagline: "Quickly re-indent and prettify JavaScript and TypeScript.",
    summary:
      "Paste minified or single-line JavaScript / TypeScript and get a readable version with proper indentation. Not a full Prettier replacement — but perfect for making one-off snippets, copied bookmarklets or bundled output skimmable.",
    useCases: [
      "Make minified library output readable for a quick sanity check",
      "Re-indent code pasted from random web tutorials and gists",
      "Format bookmarklet or one-liner code before saving",
      "Inspect bundled JS chunks to find a function during debugging",
    ],
    icon: "𝙅𝙎",
    seo: {
      title: "Free JavaScript Beautifier Online — Format JS / TS | BestMint",
      description:
        "Free online JavaScript and TypeScript beautifier. Re-indent minified code in your browser. No upload, no signup.",
      keywords: ["javascript beautifier", "js formatter", "typescript beautifier", "format javascript online"],
    },
    faqs: [
      { q: "How does this compare to Prettier?", a: "It's a lightweight whitespace-only beautifier. Prettier rewrites code following a strict style guide and respects language semantics; this tool just adds indentation and newlines for readability." },
      { q: "Will it break minified code with single-letter variables?", a: "No — variable names are unchanged. Only whitespace, newlines and indentation are added." },
      { q: "Does it support TypeScript and JSX?", a: "Yes for TS — the formatting rules are the same. JSX may not always indent perfectly because angle-bracket syntax differs from plain JS expressions." },
    ],
  },
  {
    slug: "csv-formatter",
    category: "developer",
    name: "CSV Formatter & Validator",
    tagline: "Auto-detect delimiter, validate quoting, and align CSV columns.",
    summary:
      "Paste a CSV (or TSV / pipe-separated) file and the tool auto-detects the delimiter, validates quoting, and shows row and column counts. Get a normalised, well-quoted CSV plus a monospace-aligned preview to spot ragged columns at a glance.",
    useCases: [
      "Validate exports from spreadsheets before importing into a database",
      "Spot ragged rows or unescaped commas in vendor data feeds",
      "Re-emit semicolon-separated EU CSV as comma-separated for US tools",
      "Generate a tidy aligned preview to share in tickets or reviews",
    ],
    icon: "📊",
    seo: {
      title: "Free CSV Formatter & Validator Online — Auto-Detect Delimiter | BestMint",
      description:
        "Free online CSV formatter and validator. Auto-detects delimiter, validates quoting, aligns columns. Browser-only — your data stays private.",
      keywords: ["csv formatter", "csv validator", "csv beautifier", "csv align columns", "csv check"],
    },
    faqs: [
      { q: "Which delimiters are detected?", a: "Comma, semicolon, tab and pipe — chosen by which appears most often in the first row." },
      { q: "Does it handle quoted fields with commas?", a: "Yes — it follows RFC 4180 quoting rules: double-quoted fields can contain commas, and a literal quote is escaped as two quotes (\"\")." },
      { q: "Can I download the cleaned CSV?", a: "Use the Copy button and paste into a new .csv file. Browser-only by design — nothing is uploaded." },
    ],
  },
  {
    slug: "tsv-csv-converter",
    category: "developer",
    name: "TSV to CSV Converter",
    tagline: "Convert tab-separated values to CSV and back, preserving quoted fields.",
    summary:
      "Two-way conversion between TSV (tab-separated) and CSV (comma-separated). Quoted fields with commas, tabs or newlines are preserved correctly using RFC 4180 quoting. Useful for moving spreadsheet exports between tools that prefer different delimiters.",
    useCases: [
      "Convert tab-separated paste from Excel/Google Sheets into proper CSV",
      "Translate database exports between TSV and CSV pipelines",
      "Strip unwanted quoting introduced by a particular export tool",
      "Re-emit data feeds using whichever delimiter your downstream tool expects",
    ],
    icon: "🗂️",
    seo: {
      title: "Free TSV ↔ CSV Converter Online — Two-Way | BestMint",
      description:
        "Convert TSV to CSV and CSV to TSV online for free. Handles quoted fields and special characters correctly. Browser-only.",
      keywords: ["tsv to csv", "csv to tsv", "tsv csv converter", "convert tab separated"],
    },
    faqs: [
      { q: "Why convert between TSV and CSV?", a: "Most spreadsheet tools paste as TSV but many APIs and import dialogs expect CSV. The converter handles edge-case quoting so you don't lose data." },
      { q: "Does it preserve unicode and emoji?", a: "Yes — text is processed as Unicode strings end-to-end." },
      { q: "Will it auto-detect the input format?", a: "Pick the direction explicitly. Auto-detection is in the dedicated CSV Formatter tool." },
    ],
  },
  {
    slug: "markdown-table-generator",
    category: "developer",
    name: "Markdown Table Generator",
    tagline: "Build GitHub-flavoured Markdown tables visually with per-column alignment.",
    summary:
      "Skip hand-typing pipes and dashes. Add and remove rows and columns, edit cells inline, choose left / center / right alignment per column, and copy the resulting GFM Markdown table when you're done.",
    useCases: [
      "Author Markdown tables for README files and GitHub issues",
      "Build comparison grids for blog posts and documentation",
      "Generate static feature-matrix tables for marketing pages",
      "Quickly format spreadsheet-style data for chat or PRs",
    ],
    icon: "▦",
    seo: {
      title: "Free Markdown Table Generator — Visual Editor | BestMint",
      description:
        "Free online Markdown table generator. Edit rows, columns and alignment visually, then copy the GitHub-flavoured Markdown table. Browser-only.",
      keywords: ["markdown table generator", "github markdown table", "gfm table generator", "md table builder"],
    },
    faqs: [
      { q: "Does it support Markdown links inside cells?", a: "Yes — type Markdown link syntax in any cell and it'll be passed through to the output verbatim." },
      { q: "Will the column alignment render in GitHub?", a: "Yes — GitHub-flavoured Markdown respects the colon syntax in the separator row (:--- / :--: / ---:)." },
      { q: "Can I import an existing Markdown table?", a: "Not yet. Start fresh; copy the output when finished." },
    ],
  },
  {
    slug: "cron-parser",
    category: "developer",
    name: "Cron Expression Parser",
    tagline: "Parse a cron expression and preview the next 10 fire times.",
    summary:
      "Paste a 5-field cron expression and get a plain-English description plus the next 10 times it will fire in your local timezone. Supports *, comma lists, ranges, and step (*/N) syntax across all five fields.",
    useCases: [
      "Sanity-check a cron schedule before deploying to production",
      "Visualise when a Kubernetes CronJob or GitHub Actions schedule will run",
      "Compare two schedules to find overlap or gaps",
      "Translate complex cron syntax to English for stakeholders",
    ],
    icon: "⏱️",
    seo: {
      title: "Free Cron Expression Parser Online — Next Run Times | BestMint",
      description:
        "Parse cron expressions online for free. Get a plain-English description plus the next 10 fire times in your timezone. Browser-only.",
      keywords: ["cron parser", "cron expression", "cron next run", "explain cron", "cron tester"],
    },
    faqs: [
      { q: "What cron format does it use?", a: "Standard 5-field cron: minute hour day-of-month month day-of-week. Both 0 and 7 mean Sunday." },
      { q: "Does it support special strings like @daily?", a: "Not directly. Use the equivalent 5-field form (e.g. 0 0 * * * for @daily)." },
      { q: "What timezone are the fire times in?", a: "Your browser's local timezone. The ISO column also shows UTC for cross-checking." },
    ],
  },
  {
    slug: "crontab-builder",
    category: "developer",
    name: "Crontab Schedule Builder",
    tagline: "Build a cron expression visually using dropdowns for each field.",
    summary:
      "Pick when to run via dropdowns — every minute, at a specific hour, in a range of weekdays, every N days — and the tool writes the matching 5-field cron expression for you. Great for first-time cron users who'd rather click than memorise syntax.",
    useCases: [
      "Build a Kubernetes CronJob schedule without checking docs each time",
      "Generate a GitHub Actions on.schedule.cron expression visually",
      "Learn cron syntax by tweaking dropdowns and seeing the result update",
      "Author multiple schedules for ETL or maintenance windows quickly",
    ],
    icon: "🛠️",
    seo: {
      title: "Free Crontab Builder Online — Visual Cron Generator | BestMint",
      description:
        "Build cron expressions online with a visual editor. Pick minute, hour, day, month and weekday from dropdowns. Browser-only.",
      keywords: ["crontab builder", "cron generator", "build cron expression", "cron schedule builder"],
    },
    faqs: [
      { q: "Which cron syntax does it produce?", a: "Standard 5-field cron, compatible with Linux crontab, Kubernetes CronJob, GitHub Actions schedules and most cloud schedulers." },
      { q: "Can I combine ranges and steps?", a: "Each field supports one mode: every / specific value / range / every N. For more complex combinations, edit the result by hand or use the Cron Parser to validate." },
      { q: "Why doesn't it use AWS-style 6-field cron?", a: "AWS EventBridge uses a slightly different format (with year, ? wildcards). For AWS, write the expression manually following their docs." },
    ],
  },
  {
    slug: "number-base-converter",
    category: "developer",
    name: "Number Base Converter",
    tagline: "Convert numbers between binary, octal, decimal, hex and base32.",
    summary:
      "Type a number in any base (2, 8, 10, 16, 32) and instantly see its representation in all other bases. Input is validated against the source base so you can't accidentally enter invalid digits. Useful for low-level debugging and bit-twiddling.",
    useCases: [
      "Convert hex colour values to decimal RGB components",
      "Translate file permission bits between octal (chmod) and binary",
      "Inspect bitmasks while debugging embedded firmware",
      "Convert decimal IPs to binary for subnet planning",
    ],
    icon: "🔢",
    seo: {
      title: "Free Number Base Converter — Binary, Hex, Octal, Decimal | BestMint",
      description:
        "Free online number base converter. Switch numbers between binary, octal, decimal, hex and base32 instantly. Input validated against source base.",
      keywords: ["base converter", "binary to decimal", "decimal to hex", "hex to binary", "number base converter"],
    },
    faqs: [
      { q: "Does it handle very large numbers?", a: "Yes for decimal input we use BigInt, so numbers larger than 2^53 are exact. For non-decimal input we use parseInt which is limited to 32-bit values." },
      { q: "Why is base 32 included?", a: "Base 32 is used for short, case-insensitive identifiers (Crockford base32 is similar). It's not as common as base 64 but useful when you need a denser representation than hex." },
      { q: "Are negative numbers supported?", a: "For decimal input only. Two's-complement representations across bases would be ambiguous without specifying a width." },
    ],
  },
  {
    slug: "text-binary-hex",
    category: "developer",
    name: "Text to Binary, Hex, Octal Converter",
    tagline: "Encode text as binary, hex or octal bytes — and decode back.",
    summary:
      "Two-way conversion between plain text and its binary, hexadecimal or octal byte representation. UTF-8 bytes are produced for non-ASCII characters. Useful for low-level encoding work, debugging, or just exploring how text becomes bytes.",
    useCases: [
      "Encode a UTF-8 string as raw hex for a binary protocol payload",
      "Decode a hex dump back to readable text during debugging",
      "Demonstrate text-to-bits encoding for a class or workshop",
      "Convert binary byte sequences pasted from documentation back to text",
    ],
    icon: "🔡",
    seo: {
      title: "Free Text to Binary, Hex, Octal Converter | BestMint",
      description:
        "Free online text encoder/decoder. Convert text to binary, hex or octal bytes (UTF-8) and back. Browser-only.",
      keywords: ["text to binary", "text to hex", "text to octal", "binary to text", "hex to text"],
    },
    faqs: [
      { q: "Is it ASCII or UTF-8?", a: "UTF-8. Multi-byte characters (é, 日, 🎉) become multiple bytes when encoded, and recombine correctly when decoding." },
      { q: "Why are hex bytes shown space-separated?", a: "For readability. The decoder accepts any whitespace or runs them together — it strips non-hex characters before parsing." },
      { q: "Will it handle very long input?", a: "Yes — performance scales linearly. Tens of kilobytes of text decode in under a second." },
    ],
  },
  {
    slug: "ascii-table",
    category: "developer",
    name: "ASCII Table",
    tagline: "Searchable ASCII table with decimal, hex, octal and binary codes.",
    summary:
      "Browse all 128 ASCII codes (0-127) with their decimal, hex, octal and binary representations and a friendly name for control characters. Search by character, code or name to jump straight to the row you need.",
    useCases: [
      "Look up the hex code for a control character like CR (13) or ESC (27)",
      "Reference the difference between LF (10) and CRLF when debugging line endings",
      "Find ASCII codes for printable punctuation when editing escape strings",
      "Teach character encoding fundamentals with a printable cheat-sheet",
    ],
    icon: "🔠",
    seo: {
      title: "Free ASCII Table — Decimal, Hex, Octal, Binary Codes | BestMint",
      description:
        "Free interactive ASCII table. Look up any character (0-127) by decimal, hex, octal or binary code. Search by name or symbol.",
      keywords: ["ascii table", "ascii codes", "ascii chart", "ascii reference", "ascii lookup"],
    },
    faqs: [
      { q: "What about extended ASCII (128-255)?", a: "Codes 128-255 are not standard ASCII — they depend on the code page (Latin-1, Windows-1252, etc.) or, in Unicode/UTF-8, encode the start of multi-byte sequences. The Unicode Lookup tool handles those." },
      { q: "Why are some characters blank?", a: "Codes 0-31 and 127 are control characters (NUL, BEL, BS, ESC, DEL, etc.) that don't have a printable glyph." },
      { q: "Is the table case-sensitive when searching?", a: "Searches are case-insensitive across decimal, hex, octal, the character itself and the name." },
    ],
  },
  {
    slug: "unicode-lookup",
    category: "developer",
    name: "Unicode Character Lookup",
    tagline: "Inspect any character: codepoint, HTML entities, JS escape, UTF-8 bytes.",
    summary:
      "Paste a character or a codepoint (U+20AC, 0x20AC, 8364, \\u20AC) and get its codepoint, HTML decimal/hex entity, JavaScript escape, URL-encoded form, UTF-8 byte sequence and Unicode block. Useful when wrangling encoding, escaping or i18n bugs.",
    useCases: [
      "Find the HTML entity or JS escape for a special character",
      "Identify a mystery glyph copy-pasted from a document",
      "Look up which Unicode block an emoji or symbol belongs to",
      "Generate URL-safe or HTML-safe forms of a single character",
    ],
    icon: "𝓤",
    seo: {
      title: "Free Unicode Character Lookup — Codepoint, HTML Entity, UTF-8 | BestMint",
      description:
        "Look up any Unicode character. See its codepoint, HTML entity, JS escape, URL encoding and UTF-8 bytes. Free, browser-only.",
      keywords: ["unicode lookup", "unicode character", "html entity lookup", "codepoint lookup", "utf-8 bytes"],
    },
    faqs: [
      { q: "How do I enter a codepoint?", a: "Any of these work: type the character itself, U+20AC, 0x20AC, the decimal 8364, or the JS escape \\u20AC." },
      { q: "Are emoji supported?", a: "Yes — including emoji above U+FFFF. JS escapes for these use the \\u{XXXX} form rather than two surrogate halves." },
      { q: "Where does the character name come from?", a: "We bundle a small lookup of common Latin, punctuation, currency and symbol characters. For arbitrary characters the block name is shown instead." },
    ],
  },
  {
    slug: "mime-types",
    category: "developer",
    name: "MIME Type Lookup",
    tagline: "Look up the MIME type for a file extension — or the extensions for a MIME.",
    summary:
      "Search 150+ common file extensions and their MIME types. Find the type for a given extension, or work backwards from a MIME like image/png to see which extensions use it. Helpful when configuring servers, content negotiation and file uploads.",
    useCases: [
      "Set the correct Content-Type header when serving uploaded files",
      "Configure Nginx / Apache mime.types entries for new file formats",
      "Validate that a file's extension matches its declared MIME type",
      "Build a file-upload allowlist with the right MIME values",
    ],
    icon: "📎",
    seo: {
      title: "Free MIME Type Lookup — File Extension to Content-Type | BestMint",
      description:
        "Look up MIME types by file extension or extensions by MIME. 150+ common types covered. Free, browser-only, no signup.",
      keywords: ["mime type lookup", "content type lookup", "file extension to mime", "mime database"],
    },
    faqs: [
      { q: "Is the list comprehensive?", a: "It covers ~150 of the most commonly used types. For exhaustive coverage, see the IANA media types registry." },
      { q: "Why are some file types listed as application/octet-stream?", a: "That's the generic 'arbitrary binary data' type used when no more-specific type applies — common for executables and unknown files." },
      { q: "Does the lookup detect a file's actual type?", a: "No — it maps extensions to their conventional MIME. Real type detection requires reading magic bytes, which the browser sandbox restricts." },
    ],
  },
  {
    slug: "http-status-codes",
    category: "developer",
    name: "HTTP Status Code Reference",
    tagline: "All standard HTTP status codes (1xx-5xx) with name and description.",
    summary:
      "Searchable list of every standard HTTP status code from 100 Continue to 511 Network Authentication Required. Filter by class (1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error) or search by code, name or description.",
    useCases: [
      "Decide between 401 Unauthorized vs 403 Forbidden in your API",
      "Look up the meaning of an unusual code your monitoring just paged you about",
      "Pick the right redirect code (301 vs 302 vs 307 vs 308)",
      "Reference the difference between 422 Unprocessable Entity and 400 Bad Request",
    ],
    icon: "🌐",
    seo: {
      title: "HTTP Status Code Reference — All Codes Explained | BestMint",
      description:
        "Searchable HTTP status code reference. All 1xx-5xx codes with names and descriptions. Filter by class.",
      keywords: ["http status codes", "http status code list", "404 meaning", "http response codes"],
    },
    faqs: [
      { q: "Is 418 I'm a teapot a real status code?", a: "It's defined by RFC 2324 (Hyper Text Coffee Pot Control Protocol) as an April Fool's joke and is widely supported by HTTP libraries — but real servers should not use it." },
      { q: "When should I return 422 vs 400?", a: "400 Bad Request means the request was malformed at the protocol level (invalid JSON, etc.). 422 Unprocessable Entity means the syntax was fine but the data failed validation." },
      { q: "Is 308 Permanent Redirect different from 301?", a: "Yes — 301 traditionally allowed clients to change the method to GET on redirect; 308 explicitly forbids that. Use 308 for permanent redirects of POST/PUT requests." },
    ],
  },
  {
    slug: "user-agent-parser",
    category: "developer",
    name: "User Agent Parser",
    tagline: "Parse a UA string into browser, OS, engine and device type.",
    summary:
      "Paste any User-Agent string and the tool extracts the browser name and version, rendering engine, operating system and version, and device type (desktop, mobile, tablet). It also flags common bot UAs.",
    useCases: [
      "Identify what browser left a particular log entry",
      "Test that your analytics correctly classifies a UA you saw in the wild",
      "Spot bot or crawler UAs in your access logs",
      "Demo UA-based feature detection for a workshop or talk",
    ],
    icon: "🕵️",
    seo: {
      title: "Free User Agent Parser — Browser, OS, Device Detection | BestMint",
      description:
        "Free online User Agent parser. Extract browser, version, engine, OS and device type from any UA string. Browser-only.",
      keywords: ["user agent parser", "ua parser", "user agent detection", "browser detector"],
    },
    faqs: [
      { q: "Is UA detection reliable?", a: "It's a best-effort heuristic. Modern UA strings are increasingly frozen for privacy reasons (UA-CH is replacing them on Chromium). Always treat detection as approximate." },
      { q: "Why does Chrome on iOS show as Safari?", a: "On iOS, all browsers must use WebKit, so they share Safari's engine and present a UA derived from it. The parser surfaces the underlying engine." },
      { q: "Can it parse mobile-app UAs?", a: "It catches some patterns (Mobile, Tablet) but won't reliably extract individual app names like Instagram or Facebook in-app browsers." },
    ],
  },
  {
    slug: "url-parser",
    category: "developer",
    name: "URL Parser & Inspector",
    tagline: "Break a URL into scheme, host, port, path, query and hash.",
    summary:
      "Paste any URL and see each component separately: scheme, username, password, hostname, port, path, hash, origin, plus a parsed table of query parameters. Useful when debugging routing, redirects and OAuth callback flows.",
    useCases: [
      "Inspect every part of an OAuth redirect URL during debugging",
      "Pick out a specific query parameter from a long share URL",
      "Verify a URL's origin matches an allowed list",
      "Decode percent-encoded path segments quickly",
    ],
    icon: "🔗",
    seo: {
      title: "Free URL Parser Online — Scheme, Host, Path, Query | BestMint",
      description:
        "Parse any URL into its parts: scheme, host, port, path, query parameters, hash and origin. Browser-only, free.",
      keywords: ["url parser", "url inspector", "url breakdown", "parse query string"],
    },
    faqs: [
      { q: "Does it use the browser's native URL parser?", a: "Yes — the WHATWG URL API. So results match exactly what window.location and fetch() see." },
      { q: "Will it decode encoded query parameters?", a: "Yes — search-param values are returned decoded. The 'search' field is the raw encoded query string for reference." },
      { q: "What's the difference between origin and host?", a: "Origin includes the scheme (https://example.com:443). Host is just hostname:port (example.com:443) or hostname when the default port is used." },
    ],
  },
  {
    slug: "query-string-builder",
    category: "developer",
    name: "Query String Builder",
    tagline: "Build a URL query string from key/value rows — or parse one into rows.",
    summary:
      "Edit a list of (key, value) pairs and the tool emits a properly URL-encoded query string. Or paste an existing query string to populate the rows for editing. No more wrestling with manual percent-encoding.",
    useCases: [
      "Build the right ?utm_source=...&utm_campaign=... string for a campaign URL",
      "Compose a complex API query without escaping by hand",
      "Edit an existing share URL by parsing it into rows",
      "Test how a server handles repeated keys or empty values",
    ],
    icon: "❓",
    seo: {
      title: "Free Query String Builder — URL Parameter Editor | BestMint",
      description:
        "Build URL query strings visually. Add/remove parameters, edit values, and copy the encoded string. Browser-only.",
      keywords: ["query string builder", "url parameter builder", "url query encoder", "build query string"],
    },
    faqs: [
      { q: "Does it handle special characters?", a: "Yes — values are URL-encoded with URLSearchParams, so spaces, &, = and unicode are escaped correctly." },
      { q: "Can I have repeated keys?", a: "Yes. Multiple rows with the same key produce ?k=a&k=b, which is how arrays are typically passed in query strings." },
      { q: "What's the leading ??", a: "We include the leading ? for convenience when copying. Strip it if you're appending to a URL that already has one." },
    ],
  },
  {
    slug: "ip-subnet-calculator",
    category: "developer",
    name: "IP Subnet Calculator",
    tagline: "Compute network, broadcast, mask and host range from a CIDR.",
    summary:
      "Enter an IPv4 CIDR (e.g. 192.168.1.0/24) and get the network address, broadcast address, subnet mask, wildcard mask, first and last usable hosts, total addresses, usable host count, and binary representations.",
    useCases: [
      "Plan an IP allocation for a new VLAN or VPC subnet",
      "Verify that two CIDRs don't overlap before configuring a VPN",
      "Convert between dotted-quad masks and prefix lengths",
      "Teach networking fundamentals with a worked CIDR example",
    ],
    icon: "🧮",
    seo: {
      title: "Free IP Subnet Calculator — CIDR to Network, Mask, Hosts | BestMint",
      description:
        "Free CIDR / IPv4 subnet calculator. Compute network, broadcast, mask, wildcard, host range and address count. Browser-only.",
      keywords: ["ip subnet calculator", "cidr calculator", "subnet mask calculator", "ipv4 subnet"],
    },
    faqs: [
      { q: "Is IPv6 supported?", a: "Not yet — this calculator is IPv4 only. For IPv6 prefix math, use a dedicated tool like ipv6-calculator." },
      { q: "What does 'usable hosts' mean?", a: "Total addresses in the subnet minus the network and broadcast addresses. /31 and /32 prefixes are special cases where all addresses are usable (point-to-point links / single hosts)." },
      { q: "Why does my /30 only have 2 usable hosts?", a: "A /30 has 4 addresses total: network, two hosts and broadcast. So only 2 are assignable to devices." },
    ],
  },
  {
    slug: "ipv4-to-ipv6",
    category: "developer",
    name: "IPv4 to IPv6 Converter",
    tagline: "Convert IPv4 addresses to IPv6-mapped or 6to4 — and extract IPv4 from IPv6.",
    summary:
      "Convert any IPv4 address to its IPv4-mapped IPv6 form (::ffff:a.b.c.d), the fully expanded form, and the 6to4 prefix (2002::/16). The reverse direction extracts the embedded IPv4 from a mapped or 6to4 IPv6 address.",
    useCases: [
      "Map IPv4 server addresses into IPv6 logging or audit pipelines",
      "Generate a 6to4 prefix when bootstrapping IPv6 connectivity over IPv4",
      "Recognise an IPv4-mapped address in dual-stack server logs",
      "Educate yourself on IPv4/IPv6 transition mechanisms with concrete examples",
    ],
    icon: "🌍",
    seo: {
      title: "Free IPv4 to IPv6 Converter — Mapped & 6to4 | BestMint",
      description:
        "Convert IPv4 addresses to IPv6-mapped (::ffff:) and 6to4 form. Extract IPv4 from IPv6. Browser-only, free.",
      keywords: ["ipv4 to ipv6", "ipv6 to ipv4", "ipv4 mapped ipv6", "6to4 prefix"],
    },
    faqs: [
      { q: "What's the difference between mapped and 6to4?", a: "IPv4-mapped (::ffff:a.b.c.d) is used inside dual-stack hosts to represent IPv4 connections in an IPv6 socket API. 6to4 (2002::/16) is a transition mechanism for tunnelling IPv6 over IPv4." },
      { q: "Why does the expanded form have 0000s?", a: "IPv6 addresses are 128 bits / 8 hextets. The first 80 bits are zero in the IPv4-mapped scheme, then ffff, then the IPv4 packed into the last 32 bits." },
      { q: "Can I extract IPv4 from any IPv6?", a: "Only from IPv4-mapped (::ffff:) or 6to4 (2002:) addresses. Native IPv6 addresses do not embed an IPv4." },
    ],
  },
  {
    slug: "mac-vendor-lookup",
    category: "developer",
    name: "MAC Address Vendor Lookup",
    tagline: "Find the vendor for a MAC address from its OUI prefix.",
    summary:
      "Paste a MAC address in any format and look up the OUI (first 3 bytes) in our built-in database of ~100 popular vendors (Apple, Cisco, Dell, HP, Intel, Microsoft, Samsung, TP-Link, VMware, …). Returns the vendor name when known, or 'Unknown' otherwise.",
    useCases: [
      "Identify the manufacturer of an unknown device on your LAN",
      "Spot likely VM-generated MACs (VMware 00:50:56, VirtualBox 08:00:27)",
      "Recognise Raspberry Pi devices on a network (B8:27:EB)",
      "Quickly answer 'whose laptop is this?' from an ARP table dump",
    ],
    icon: "🪪",
    seo: {
      title: "Free MAC Address Vendor Lookup — OUI Database | BestMint",
      description:
        "Look up MAC address vendor by OUI (first 3 bytes). Built-in database of common vendors. Browser-only, free.",
      keywords: ["mac vendor lookup", "oui lookup", "mac address vendor", "ieee oui"],
    },
    faqs: [
      { q: "Is the OUI database complete?", a: "No — we ship a curated mini-table of about 100 popular vendors for instant offline lookup. The full IEEE OUI registry has tens of thousands of entries; consult standards-oui.ieee.org for unknown vendors." },
      { q: "Are randomised MACs detectable?", a: "Modern phones randomise their MAC per network for privacy. Locally administered addresses (second hex digit is 2, 6, A or E) are typically randomised and won't have an OUI vendor." },
      { q: "Can I look up only the OUI prefix?", a: "Yes — paste just the first 3 bytes (00:1B:63 or 001B63) and you'll get the vendor." },
    ],
  },
  {
    slug: "mac-address-generator",
    category: "developer",
    name: "MAC Address Generator",
    tagline: "Generate random MAC addresses with optional vendor prefix.",
    summary:
      "Create one or many random MAC addresses, optionally prefixed with a known vendor's OUI (Apple, Cisco, VMware, VirtualBox, Raspberry Pi, …). Choose colon, dash or no separator, upper or lower case, and copy individually or all at once.",
    useCases: [
      "Generate test MACs for unit tests or fixture data",
      "Get a VMware-shaped MAC for a custom VM template",
      "Bulk-generate MACs for a lab simulation",
      "Avoid collisions by using locally-administered random MACs",
    ],
    icon: "🎲",
    seo: {
      title: "Free Random MAC Address Generator — With Vendor Prefix | BestMint",
      description:
        "Generate random MAC addresses online. Pick vendor prefix, separator and case. Browser-only, no signup.",
      keywords: ["mac address generator", "random mac", "vendor mac generator", "fake mac address"],
    },
    faqs: [
      { q: "Are the addresses guaranteed unique?", a: "Within one batch, no — they're random. Collisions across 2^46 random bits are astronomically unlikely in practice." },
      { q: "Why is the second hex digit often 2, 6, A or E?", a: "When no vendor prefix is selected, we set the locally-administered bit so the address won't collide with any real vendor's space." },
      { q: "Can I use these in production?", a: "Random locally-administered MACs are safe for VMs, test environments and short-lived devices. For shipping hardware you should obtain a real OUI from the IEEE." },
    ],
  },
  {
    slug: "bcrypt-tester",
    category: "developer",
    name: "bcrypt Hash & Verify",
    tagline: "Generate bcrypt hashes or verify a password against a hash, fully in-browser.",
    summary:
      "Two modes: hash a password with chosen cost rounds (4-12) to produce a $2a$… bcrypt hash, or verify a password against an existing hash. Powered by bcryptjs entirely in your browser — your password never leaves the page.",
    useCases: [
      "Generate seed bcrypt hashes for development databases",
      "Verify your application's auth flow with a hand-crafted hash",
      "Demo bcrypt cost-vs-time trade-offs by varying the rounds",
      "Sanity-check that a stored hash matches an expected password",
    ],
    icon: "🔐",
    seo: {
      title: "Free bcrypt Hash & Verify Online — In-Browser | BestMint",
      description:
        "Generate bcrypt hashes or verify passwords in your browser. Adjustable cost rounds. Free, no upload, no signup.",
      keywords: ["bcrypt generator", "bcrypt verify", "bcrypt online", "password hash generator"],
    },
    faqs: [
      { q: "Is it safe to test real passwords here?", a: "Hashing happens locally via JavaScript and bcryptjs — no network request is made. That said, treat any password you've typed into a webpage with caution." },
      { q: "What cost rounds should I use?", a: "10-12 is currently a reasonable default. Higher slows down both legitimate verification and brute-force attacks; lower speeds both up." },
      { q: "Why are bcrypt hashes ~60 chars long?", a: "They include the algorithm version, cost, salt and 23-byte hash, all base64-encoded. The leading $2a$ tells verifiers it's bcrypt." },
    ],
  },
  {
    slug: "htpasswd-generator",
    category: "developer",
    name: ".htpasswd Generator",
    tagline: "Build Apache .htpasswd lines with bcrypt or SHA-1, locally in your browser.",
    summary:
      "Generate a username:hash entry suitable for Apache or Nginx Basic-Auth. Choose bcrypt (recommended) or SHA-1 (legacy). Output is a single line you can append to your .htpasswd file.",
    useCases: [
      "Add or rotate credentials for a password-protected staging area",
      "Generate test fixtures that mimic Apache Basic-Auth setups",
      "Migrate plain-text shared credentials into a hashed file",
      "Quickly create one-off Basic-Auth credentials without installing htpasswd",
    ],
    icon: "🛡️",
    seo: {
      title: "Free .htpasswd Generator — bcrypt & SHA-1 | BestMint",
      description:
        "Generate Apache / Nginx .htpasswd lines online with bcrypt or SHA-1. Browser-only — passwords never leave the page.",
      keywords: ["htpasswd generator", "apache password", "basic auth password", "htpasswd online"],
    },
    faqs: [
      { q: "Which algorithm should I pick?", a: "bcrypt. SHA-1 is included for compatibility with very old Apache configs but is no longer considered secure for password storage." },
      { q: "Where do I put the output?", a: "Append the line to a .htpasswd file referenced from your server config (AuthUserFile in Apache, auth_basic_user_file in Nginx)." },
      { q: "Is the password sent anywhere?", a: "No. Hashing runs in JavaScript in your browser." },
    ],
  },
  {
    slug: "jwt-builder",
    category: "developer",
    name: "JWT Builder & Signer",
    tagline: "Build and HS256/HS384/HS512-sign a JWT entirely in your browser.",
    summary:
      "Edit the header and payload as JSON, supply your HMAC secret, and the tool produces a signed JWT (header.payload.signature). Signing uses Web Crypto's HMAC-SHA implementations — your secret never leaves the page.",
    useCases: [
      "Hand-craft a JWT for testing an authentication endpoint",
      "Generate test tokens with custom claims for integration tests",
      "Reproduce a tricky token bug by signing a known payload",
      "Demo JWT structure (header.payload.signature) in a workshop",
    ],
    icon: "🪪",
    seo: {
      title: "Free JWT Builder & Signer — HS256, HS384, HS512 | BestMint",
      description:
        "Build and sign JWTs online with HS256/HS384/HS512. Edit header and payload, supply your secret, get the token. Browser-only.",
      keywords: ["jwt builder", "jwt signer", "create jwt", "jwt generator", "hs256 token"],
    },
    faqs: [
      { q: "Which signing algorithms are supported?", a: "HMAC variants HS256, HS384 and HS512. RSA and EC signing requires importing keys and is best done with a dedicated library." },
      { q: "Is the secret sent over the network?", a: "No — signing runs entirely in your browser via Web Crypto." },
      { q: "Can I round-trip with the JWT Decoder tool?", a: "Yes. Sign here, then paste into the JWT Decoder to verify the structure and inspect the claims." },
    ],
  },
  {
    slug: "rsa-keypair-generator",
    category: "developer",
    name: "RSA Keypair Generator",
    tagline: "Generate a 2048/3072/4096-bit RSA keypair as PEM, fully in-browser.",
    summary:
      "Generate an RSA keypair (RSA-OAEP with SHA-256) at 2048, 3072 or 4096 bits using your browser's Web Crypto API. The public key is exported as SubjectPublicKeyInfo PEM and the private key as PKCS#8 PEM, ready to paste into a config file.",
    useCases: [
      "Bootstrap a new keypair for development or testing",
      "Generate disposable keys for a one-off encryption demo",
      "Demonstrate RSA in a workshop without installing OpenSSL",
      "Replace an aging dev keypair before sharing a project",
    ],
    icon: "🔑",
    seo: {
      title: "Free RSA Keypair Generator — 2048 / 3072 / 4096-bit PEM | BestMint",
      description:
        "Generate RSA keypairs (2048/3072/4096-bit) in your browser via Web Crypto. PEM output. No upload, no signup.",
      keywords: ["rsa keypair generator", "rsa key generator", "generate rsa key", "pem keypair"],
    },
    faqs: [
      { q: "Is it safe to generate production keys here?", a: "Web Crypto uses your browser's secure random source, so the keys are cryptographically strong. That said, for production we recommend generating keys on the host that will use them and never copy-pasting private keys through clipboards." },
      { q: "Why RSA-OAEP and not signing?", a: "Web Crypto exposes both, but a single key is bound to one usage. We chose OAEP (encryption) for this tool. For signing keys, generate via a dedicated library or OpenSSL." },
      { q: "How big are the keys?", a: "2048 bits is currently the minimum recommended size. 3072 matches a 128-bit security level. 4096 is more conservative but slower and longer." },
    ],
  },
  {
    slug: "mock-data-generator",
    category: "developer",
    name: "Mock Data Generator",
    tagline: "Generate fake JSON data from a schema of fields and types.",
    summary:
      "Define a schema as a list of (field name, type) rows — choose from string, int, float, boolean, name, email, address, phone, uuid, date, ipv4, color and url — set how many records you want, and the tool generates a JSON array of fake objects you can copy or paste straight into your tests.",
    useCases: [
      "Seed a local database with realistic-looking dev data",
      "Generate fixtures for unit tests and Storybook stories",
      "Stub API responses while building a frontend before the backend exists",
      "Bulk-generate records for a presentation or load-test scenario",
    ],
    icon: "🧪",
    seo: {
      title: "Free Mock Data Generator — Schema-Based Fake JSON | BestMint",
      description:
        "Generate fake JSON data from a custom schema. 13 field types: name, email, uuid, ipv4, color, date, etc. Browser-only.",
      keywords: ["mock data generator", "fake data generator", "json fixture generator", "test data generator"],
    },
    faqs: [
      { q: "Is the data realistic?", a: "It's realistic-shaped (proper email format, valid IPv4, valid UUIDs, real-sounding names) but obviously not real people. Safe to publish in demos and tests." },
      { q: "Can I generate nested objects?", a: "Not yet — only flat objects. For nested or relational fixtures, run the generator multiple times and combine the results." },
      { q: "How many records can I generate?", a: "Up to 1,000 per click. For larger datasets, run multiple batches and concatenate." },
    ],
  },
  {
    slug: "placeholder-image-url",
    category: "developer",
    name: "Placeholder Image URL Builder",
    tagline: "Build placeholder image URLs for placehold.co, picsum and dummyimage.",
    summary:
      "Pick a service (placehold.co, picsum.photos, dummyimage.com), set width/height, choose colors and label text, and the tool builds the matching URL plus a live preview. Drop the URL into <img src> or src=\"\" attributes during prototyping.",
    useCases: [
      "Quickly stub <img> tags during early HTML/CSS prototyping",
      "Generate hero/avatar placeholders for design mockups",
      "Build random-photo URLs (picsum) for varied demo content",
      "Embed branded placeholder boxes with custom colors and text",
    ],
    icon: "🖼️",
    seo: {
      title: "Free Placeholder Image URL Builder — placehold.co / picsum | BestMint",
      description:
        "Build placeholder image URLs for placehold.co, picsum.photos and dummyimage.com. Set size, color and text. Live preview.",
      keywords: ["placeholder image", "placehold.co", "picsum photos", "dummy image", "placeholder image url"],
    },
    faqs: [
      { q: "Why three services?", a: "placehold.co and dummyimage.com generate solid-color labelled rectangles; picsum.photos returns a real random photo at the requested size. Different prototyping moods." },
      { q: "Will it work offline?", a: "Building the URL is offline; loading the preview requires a network because the image is hosted on the third-party service." },
      { q: "Can I bake colors as hex?", a: "Yes — drop the # and enter 6-digit hex. Same convention as the underlying services." },
    ],
  },
  {
    slug: "regex-cheatsheet-tool",
    category: "developer",
    name: "Regex Cheatsheet & Tester",
    tagline: "Reference table of regex syntax with an inline live tester.",
    summary:
      "A printable-style reference for regex anchors, character classes, quantifiers, groups, alternation, lookarounds and flags — paired with a live tester that highlights matches as you type. Great as a learning aid or a quick reminder.",
    useCases: [
      "Look up an unfamiliar regex token without leaving the page",
      "Test a one-liner pattern alongside the syntax reference",
      "Onboard a teammate to regex with a single self-contained page",
      "Review JavaScript regex flags before debugging a tricky match",
    ],
    icon: "📚",
    seo: {
      title: "Free Regex Cheatsheet & Tester | BestMint",
      description:
        "Free regex reference table (anchors, classes, quantifiers, groups, lookarounds) plus a live tester. Browser-only.",
      keywords: ["regex cheatsheet", "regex reference", "regex syntax", "regex tester"],
    },
    faqs: [
      { q: "Which regex flavour does it cover?", a: "JavaScript regex (the same engine your browser uses). Most syntax overlaps with Python, Java and Go regex but lookbehinds, named groups and \\p{...} have minor differences." },
      { q: "Can it explain a regex?", a: "Not yet — for full expression breakdowns try a tool like regex101. The cheatsheet helps you read individual tokens." },
      { q: "Are flags listed?", a: "Yes — gimsuy in the Flags section, with a short description of each." },
    ],
  },
  {
    slug: "string-escaper",
    category: "developer",
    name: "String Escaper & Unescaper",
    tagline: "Escape strings for JS, JSON, HTML, SQL, shell or regex — and reverse.",
    summary:
      "Six escaping schemes in one tool. Pick a target — JavaScript string, JSON string, HTML, SQL literal, shell single-quote or regex literal — and toggle escape vs unescape. Useful when wrangling embedded strings across different layers of a stack.",
    useCases: [
      "Embed a string with quotes safely into a JS source file",
      "Escape user input for a SQL string literal during quick debugging",
      "Generate the regex-safe form of a literal string to use in a pattern",
      "Quote arbitrary data for a shell command without command-injection",
    ],
    icon: "🪢",
    seo: {
      title: "Free String Escaper — JS, JSON, HTML, SQL, Shell, Regex | BestMint",
      description:
        "Escape and unescape strings for JS, JSON, HTML, SQL, shell or regex. Two-way, browser-only.",
      keywords: ["string escaper", "string unescaper", "escape javascript string", "escape sql string", "regex escape"],
    },
    faqs: [
      { q: "Why is shell escape always wrapping in single quotes?", a: "Single-quoted shell strings are the safest way to pass arbitrary text — nothing inside is interpreted, except a literal ' which we encode as the 4-char sequence '\\''." },
      { q: "Does SQL escaping prevent injection?", a: "It only escapes the apostrophe. For real safety, use parameterised queries — escaping is a fallback for ad-hoc tooling." },
      { q: "Is HTML escaping XSS-safe?", a: "It covers &, <, >, \" and '. Sufficient for inserting text into HTML or attributes; it doesn't sanitise URL contexts (use the URL Encoder for those)." },
    ],
  },
  // ─── New: Image ──────────────────────────────────────────────────────
  {
    slug: "image-cropper",
    category: "image",
    name: "Image Cropper",
    tagline: "Crop images visually with a draggable rectangle, output PNG or JPG.",
    summary:
      "Upload any image, drag the crop rectangle and corner handles to frame your subject, and export the result as PNG or JPG. The cropping happens entirely in your browser using the Canvas API — your image never leaves your device.",
    useCases: [
      "Crop product photos to a uniform aspect for an e-commerce store",
      "Trim screenshots before pasting into docs, tickets or Slack",
      "Cut out the subject of a photo for use as an avatar",
      "Remove unwanted edges from scans and phone snapshots",
    ],
    icon: "✂️",
    seo: {
      title: "Free Image Cropper Online — Crop PNG, JPG, WebP | BestMint",
      description:
        "Free online image cropper. Drag a rectangle to crop your photo and download as PNG or JPG. Browser-only — your image never leaves your device.",
      keywords: [
        "image cropper",
        "crop image online",
        "photo cropper",
        "crop png",
        "crop jpg",
      ],
    },
    faqs: [
      { q: "Is my image uploaded anywhere?", a: "No. Cropping happens entirely in your browser via the Canvas API — nothing is sent to a server." },
      { q: "Can I crop to a fixed aspect ratio?", a: "Yes — drag the corner handles freely, then check the dimensions readout below the canvas. Resize the rectangle to your target ratio before exporting." },
      { q: "Does it work with transparent PNGs?", a: "Yes. Choose PNG output to keep the alpha channel; JPG output flattens transparency onto a white background." },
    ],
  },
  {
    slug: "image-rotator",
    category: "image",
    name: "Image Rotator & Flipper",
    tagline: "Rotate by 90° and flip images horizontally or vertically, then download.",
    summary:
      "Rotate any image by 90° increments and flip it horizontally or vertically. The transform is rendered to a canvas and downloaded as PNG with a single click — no server upload, no quality loss for your source dimensions.",
    useCases: [
      "Fix sideways phone photos that came in with the wrong orientation",
      "Mirror selfies to read the way you actually look in real life",
      "Rotate scanned documents that came in upside-down",
      "Generate flipped versions of icons and assets for symmetric layouts",
    ],
    icon: "🔄",
    seo: {
      title: "Free Image Rotator — Rotate, Flip Photos Online | BestMint",
      description:
        "Rotate images by 90° and flip horizontally or vertically. Free online image rotator and flipper that runs in your browser. Download as PNG.",
      keywords: [
        "rotate image",
        "flip image",
        "image rotator",
        "image flipper",
        "rotate photo online",
      ],
    },
    faqs: [
      { q: "Will rotating reduce quality?", a: "Rotations of 90°, 180° and 270° are lossless because they only swap pixels. The output is a freshly encoded PNG, so there's no JPEG-style recompression." },
      { q: "Can I rotate by arbitrary angles?", a: "This tool sticks to 90° increments and axis flips, which cover almost every real-world need. Arbitrary angles introduce transparent corners and require resampling." },
      { q: "Why does flipping look different from rotating?", a: "Flipping reflects the image across an axis (mirror image); rotating spins it. A horizontal flip and a 180° rotate look the same only on perfectly symmetric content." },
    ],
  },
  {
    slug: "image-watermark",
    category: "image",
    name: "Image Watermark",
    tagline: "Add a text watermark in any of 9 positions with custom color and opacity.",
    summary:
      "Drop a text watermark onto your image with full control over position (one of nine anchors), font size, color and opacity. The composite is rendered to canvas and downloaded as PNG. Everything runs locally — your photos stay on your device.",
    useCases: [
      "Stamp © + your name on portfolio shots before posting them online",
      "Add a 'DRAFT' or 'CONFIDENTIAL' overlay to pre-release marketing assets",
      "Watermark client proofs so they can't be used without payment",
      "Brand product screenshots before sharing on Twitter or LinkedIn",
    ],
    icon: "💧",
    seo: {
      title: "Free Image Watermark Tool — Add Text Watermark Online | BestMint",
      description:
        "Add a text watermark to any image online. Pick position, color, opacity and size, then download. 100% browser-based — your photos stay private.",
      keywords: [
        "image watermark",
        "watermark photo online",
        "add watermark",
        "text watermark",
        "photo watermark tool",
      ],
    },
    faqs: [
      { q: "Will the watermark be embedded in the image file?", a: "Yes — it's drawn into the pixel data, so it stays with the image when shared, downloaded, or screenshotted." },
      { q: "Can I use a transparent watermark?", a: "Drop the opacity slider below 100%. Lower values produce a subtle watermark that's hard to remove without leaving artifacts." },
      { q: "Can I use my logo image as a watermark?", a: "This tool is text-only. For image watermarks, paste a base64 logo into a separate compositing tool — text is the most universally requested case." },
    ],
  },
  {
    slug: "image-grayscale",
    category: "image",
    name: "Image Filter (Grayscale, Sepia, Invert, Saturate)",
    tagline: "Apply grayscale, sepia, invert, or saturation filters to any image.",
    summary:
      "Quick canvas filters for any image: grayscale, sepia (vintage tone), color invert, and a saturation slider from 0 to 2×. The processed image is downloaded as PNG. All filtering happens in your browser using ctx.filter — no upload, no signup.",
    useCases: [
      "Convert color photos to black & white for a clean editorial look",
      "Add a sepia tone to give modern shots a vintage 1900s feel",
      "Invert colors for accessibility or artistic effects",
      "Boost or kill saturation to make a photo pop or look muted",
    ],
    icon: "🎨",
    seo: {
      title: "Free Image Filter — Grayscale, Sepia, Invert, Saturation | BestMint",
      description:
        "Apply grayscale, sepia, invert and saturation filters to any image online. Free, browser-only image filter tool — download the result as PNG.",
      keywords: [
        "image grayscale",
        "image sepia",
        "image invert",
        "saturation filter",
        "online image filter",
      ],
    },
    faqs: [
      { q: "Why grayscale instead of just desaturate?", a: "Pure grayscale uses luminance weighting (Rec. 709) for natural-looking conversions. Setting saturation to 0 in the saturate slider achieves a similar effect via a different math path." },
      { q: "Are these the same as CSS filters?", a: "Yes — they use the same ctx.filter strings as CSS, so the look matches what you'd see with a `filter:` rule in the browser." },
      { q: "Can I combine filters?", a: "This tool applies one filter at a time for predictable output. To stack effects, run the result through the tool a second time." },
    ],
  },
  {
    slug: "image-blur",
    category: "image",
    name: "Image Blur",
    tagline: "Apply a Gaussian-style blur with adjustable radius up to 20px.",
    summary:
      "Blur an image with a sliding radius from 0 to 20 pixels. Useful for hero backgrounds, censoring sensitive content, or producing soft variants of UI screenshots. The blur is applied via ctx.filter and saved as PNG, all locally in your browser.",
    useCases: [
      "Blur backgrounds for hero banners and login splash screens",
      "Censor faces, license plates or sensitive info before sharing screenshots",
      "Create soft, frosted-glass variants of photos for design mockups",
      "Generate placeholder images while a higher-res asset loads",
    ],
    icon: "💨",
    seo: {
      title: "Free Image Blur Tool — Blur Photos Online | BestMint",
      description:
        "Blur any image with adjustable radius up to 20px. Free online image blur tool that runs in your browser. Download the result as PNG.",
      keywords: [
        "image blur",
        "blur photo",
        "online blur tool",
        "gaussian blur image",
        "blur background",
      ],
    },
    faqs: [
      { q: "What kind of blur is this?", a: "It uses the browser's native ctx.filter blur(), which is a Gaussian blur. The radius is in CSS pixels — at the source resolution, not viewport resolution." },
      { q: "Can I blur only part of an image?", a: "Not in this tool — for that, crop the area first and re-composite. This tool blurs the whole image." },
      { q: "Does the blur preserve transparency?", a: "Yes. PNG output keeps the alpha channel intact, with the blur applied to RGBA pixels." },
    ],
  },
  {
    slug: "image-pixelate",
    category: "image",
    name: "Image Pixelator",
    tagline: "Pixelate any image with adjustable block size for retro or censoring effects.",
    summary:
      "Pixelate images by downscaling to a small canvas and re-upscaling with image smoothing disabled, producing crisp Minecraft-style blocks. Block size adjusts from 4 to 64 pixels. Great for retro art and quick censoring of faces or text.",
    useCases: [
      "Censor faces and license plates with a chunky pixel mosaic",
      "Create retro 8-bit-style versions of icons and avatars",
      "Generate low-fi placeholder thumbnails for image grids",
      "Pixelate logos for chiptune-themed marketing material",
    ],
    icon: "🟦",
    seo: {
      title: "Free Image Pixelator — Pixelate Photos Online | BestMint",
      description:
        "Pixelate any image online. Adjustable block size from 4 to 64 pixels. Free, browser-only image pixelator — your photo never leaves your device.",
      keywords: [
        "image pixelator",
        "pixelate image",
        "8-bit image",
        "censor with pixels",
        "mosaic effect",
      ],
    },
    faqs: [
      { q: "Is pixelation reversible?", a: "No — once you've thrown away the high-frequency detail by downsampling, it's gone. Pixelation is a destructive censor." },
      { q: "Why does the output look pixel-sharp?", a: "We disable canvas smoothing during the upscale step (imageSmoothingEnabled = false) so the blocks stay crisp instead of bleeding into one another." },
      { q: "What block size hides faces best?", a: "16–32 px on a 1080p image typically renders facial features unrecognizable while keeping the rest of the photo readable." },
    ],
  },
  {
    slug: "image-color-extractor",
    category: "image",
    name: "Image Color Palette Extractor",
    tagline: "Pull the dominant colors from any image and copy each as HEX.",
    summary:
      "Upload an image and the tool samples its pixels, quantizes them into a small palette, and shows the dominant colors with their HEX codes. Adjust the number of colors from 3 to 12 — perfect for design moodboards and brand-color discovery.",
    useCases: [
      "Build a moodboard palette from a hero photo or brand asset",
      "Match UI colors to a product photo for a coordinated landing page",
      "Pull the dominant colors of an album cover for fan art",
      "Analyze user-uploaded images to recommend complementary themes",
    ],
    icon: "🎨",
    seo: {
      title: "Free Image Color Palette Extractor Online | BestMint",
      description:
        "Extract the dominant colors from any image online. See HEX codes for the top colors and copy with one click. Browser-only — your image stays private.",
      keywords: [
        "image color extractor",
        "dominant colors",
        "color palette from image",
        "extract colors from photo",
        "hex from image",
      ],
    },
    faqs: [
      { q: "How does it pick colors?", a: "We downscale the image and group pixels into 16-step RGB buckets, then sort buckets by frequency. It's a fast histogram quantization that gives a faithful palette in milliseconds." },
      { q: "Why not k-means?", a: "Histogram quantization is good enough for a 5–10 color palette and runs in a few ms even on large images. K-means costs orders of magnitude more compute for a barely-perceptible difference." },
      { q: "Is the percentage exact?", a: "It's the share of pixels each averaged bucket covers in the downscaled sample — accurate within 1–2% of the full-resolution image." },
    ],
  },
  {
    slug: "image-color-picker",
    category: "image",
    name: "Image Color Picker",
    tagline: "Click any pixel of an image to see its HEX and RGB color value.",
    summary:
      "Pick a color from anywhere on an image: click a pixel and the tool shows its HEX code and RGB values. A live hover preview updates as you move the cursor. Useful for matching brand colors, sampling photos, or extracting palette spots.",
    useCases: [
      "Match a UI color to an exact pixel of a brand reference image",
      "Sample skin tones, sky colors, or fabric swatches for design work",
      "Pull HEX codes from screenshots without leaving the browser",
      "Identify the precise color of a pixel in a competitor's site screenshot",
    ],
    icon: "💧",
    seo: {
      title: "Free Image Color Picker — Pick HEX from Any Image | BestMint",
      description:
        "Click any pixel on your image to copy its HEX or RGB color. Free online image color picker — your photo never leaves the browser.",
      keywords: [
        "image color picker",
        "pixel color picker",
        "hex from image",
        "rgb from image",
        "online color picker",
      ],
    },
    faqs: [
      { q: "Is the pixel color exact?", a: "Yes — we read the exact pixel under the cursor from the canvas, untouched by any filter or zoom. What you see is the source RGB." },
      { q: "Why might colors look different from the original file?", a: "If the source has an embedded color profile (e.g. P3), the canvas reads sRGB-converted pixels. The HEX you see is the sRGB value most monitors and CSS use." },
      { q: "Can I pick from a screenshot?", a: "Yes — paste any PNG/JPG screenshot. The tool doesn't care about source." },
    ],
  },
  {
    slug: "svg-optimizer",
    category: "image",
    name: "SVG Optimizer",
    tagline: "Strip comments, defaults and excess whitespace from SVG markup.",
    summary:
      "Paste any SVG and the optimizer removes comments, XML declarations, doctypes, redundant whitespace, and default-valued attributes (like fill-opacity=\"1\"). Numeric values are rounded to two decimals for smaller files. Live size comparison shows you the savings.",
    useCases: [
      "Trim icon files exported from Figma or Illustrator before shipping",
      "Reduce critical CSS / inline SVG payload for above-the-fold pages",
      "Clean up icons before pasting them into React components",
      "Slim down hero illustrations on landing pages for better Lighthouse scores",
    ],
    icon: "📐",
    seo: {
      title: "Free SVG Optimizer Online — Minify and Clean SVG | BestMint",
      description:
        "Free online SVG optimizer. Strip comments, defaults and whitespace, round numbers, and shrink your SVG. Runs in your browser — paste and copy.",
      keywords: [
        "svg optimizer",
        "svg minifier",
        "minify svg",
        "clean svg",
        "svg compressor",
      ],
    },
    faqs: [
      { q: "Does it preserve animations and CSS?", a: "Yes — `<style>`, `<animate>`, `<animateTransform>` and other dynamic elements are kept. Only redundant attributes and whitespace are removed." },
      { q: "Is this as aggressive as SVGO?", a: "It's a focused subset that handles the most impactful wins (whitespace, defaults, number rounding) without breaking complex SVGs. For maximum compression, use SVGO with a custom config." },
      { q: "Will rounding break my icon?", a: "Two-decimal precision is well within the tolerance of any practical SVG icon. If you need pixel-perfect path data, skip the rounding." },
    ],
  },
  {
    slug: "svg-to-png",
    category: "image",
    name: "SVG to PNG Converter",
    tagline: "Render any SVG to a PNG at the resolution you choose.",
    summary:
      "Paste SVG markup, set a target width and height, and download a rasterized PNG. The tool renders the SVG via a data URL onto a canvas — useful for OG images, social previews, and any platform that won't accept SVG input.",
    useCases: [
      "Generate PNG variants of icon SVGs for legacy email clients",
      "Render social-card thumbnails from SVG templates at 1200×630",
      "Convert logo SVGs to high-resolution PNGs for slide decks",
      "Export favicons from a single SVG source at multiple sizes",
    ],
    icon: "🖼️",
    seo: {
      title: "Free SVG to PNG Converter Online | BestMint",
      description:
        "Convert SVG to PNG online at any resolution. Free, browser-only SVG to PNG converter — paste SVG and download a high-res PNG.",
      keywords: [
        "svg to png",
        "convert svg to png",
        "svg png converter",
        "rasterize svg",
        "svg to png online",
      ],
    },
    faqs: [
      { q: "Can I export at any resolution?", a: "Yes — set the width and height in pixels. Larger values produce sharper output, with a practical limit of about 8K per side imposed by browser canvas memory." },
      { q: "Will external fonts render?", a: "Only fonts available in your browser. Embed text as paths, or use system fonts and `<style>` blocks for guaranteed rendering." },
      { q: "Why does my output look blurry?", a: "If the SVG has no viewBox, sizes won't scale predictably. Add `viewBox=\"0 0 W H\"` to the root `<svg>` element for crisp rasterization." },
    ],
  },
  {
    slug: "png-to-ico",
    category: "image",
    name: "PNG to ICO Converter",
    tagline: "Build a multi-resolution favicon.ico from any PNG.",
    summary:
      "Upload a PNG and download a proper Windows-style favicon.ico containing 16, 32, 48 and 64-pixel embedded PNG frames. The ICO is built byte-by-byte with a DataView — no server, no upload, no third-party API call.",
    useCases: [
      "Generate favicon.ico for older browsers that prefer the .ico format",
      "Create a multi-size icon for desktop shortcuts on Windows",
      "Bundle multiple icon sizes into a single file for IIS or Apache deployments",
      "Build an .ico for an Electron or Tauri desktop app icon",
    ],
    icon: "🪟",
    seo: {
      title: "Free PNG to ICO Converter — Build Favicon.ico Online | BestMint",
      description:
        "Convert a PNG to a multi-resolution ICO favicon online. 16/32/48/64-pixel frames packed in one .ico — free, browser-only, no upload.",
      keywords: [
        "png to ico",
        "favicon converter",
        "ico generator",
        "make favicon",
        "favicon.ico online",
      ],
    },
    faqs: [
      { q: "What sizes are included?", a: "16×16, 32×32, 48×48 and 64×64 — the standard set Windows and most browsers expect from a favicon.ico." },
      { q: "Will this work as a favicon?", a: "Yes. Save it as `favicon.ico` and place it at your site's root, or reference it via `<link rel=\"icon\" href=\"/favicon.ico\">`." },
      { q: "Why PNG-encoded ICO instead of BMP?", a: "PNG-in-ICO is supported on every modern OS and produces dramatically smaller files than legacy BMP encoding." },
    ],
  },
  {
    slug: "image-metadata-viewer",
    category: "image",
    name: "Image Metadata (EXIF) Viewer",
    tagline: "View EXIF tags from JPEG photos: camera model, exposure, GPS, ISO and more.",
    summary:
      "Reads the EXIF block embedded in JPEG files and shows the most useful tags: Make, Model, DateTimeOriginal, ExposureTime, FNumber, ISO, Orientation, focal length and GPS-info offset. Parsing happens entirely in your browser via DataView.",
    useCases: [
      "See exactly which camera / lens / settings were used to capture a photo",
      "Confirm the timestamp on a photo before submitting it as evidence",
      "Audit photos for accidentally-leaking GPS data before publishing",
      "Verify a JPEG's orientation tag when an image looks rotated unexpectedly",
    ],
    icon: "📷",
    seo: {
      title: "Free EXIF Viewer Online — Read Image Metadata | BestMint",
      description:
        "View EXIF metadata from JPEG photos: camera, lens, exposure, ISO, GPS and more. Free online EXIF viewer that runs entirely in your browser.",
      keywords: [
        "exif viewer",
        "image metadata",
        "jpeg exif",
        "photo metadata viewer",
        "read exif online",
      ],
    },
    faqs: [
      { q: "Why no EXIF on my PNG/WebP?", a: "PNG and most WebP files don't embed EXIF — only JPEGs (and a few HEIC/TIFF variants) do. Try a photo straight from a phone or DSLR." },
      { q: "Is my photo uploaded?", a: "No. The EXIF block is parsed locally as an ArrayBuffer — your photo never leaves the browser tab." },
      { q: "Why don't I see GPS coordinates?", a: "GPS lives in a sub-IFD. We surface its offset (GPSInfoIFD) so you can drill in; many phones strip GPS automatically when photos are shared." },
    ],
  },
  {
    slug: "image-exif-stripper",
    category: "image",
    name: "Image EXIF Stripper",
    tagline: "Remove all metadata from a photo by re-encoding through canvas.",
    summary:
      "Re-encodes any image through HTMLCanvasElement.toBlob(), which has the side-effect of dropping every metadata block: EXIF, GPS coordinates, IPTC, XMP, and color profiles. The result is a clean JPEG or PNG that's safe to share publicly.",
    useCases: [
      "Strip GPS coordinates from photos before posting on social media",
      "Remove camera-identifying EXIF before sharing whistleblower evidence",
      "Clean up product shots before uploading to a marketplace",
      "Sanitize photos shared in support tickets to protect customer privacy",
    ],
    icon: "🧹",
    seo: {
      title: "Free EXIF Remover — Strip Metadata From Photos | BestMint",
      description:
        "Remove EXIF, GPS, and other metadata from any image online. Free browser-based EXIF stripper — your photo is re-encoded locally and downloaded clean.",
      keywords: [
        "exif remover",
        "strip metadata",
        "remove gps from photo",
        "image metadata cleaner",
        "exif stripper",
      ],
    },
    faqs: [
      { q: "Does this remove GPS too?", a: "Yes. Every metadata block — EXIF, GPS, IPTC, XMP, ICC color profiles — is dropped during canvas re-encoding." },
      { q: "Will my image quality drop?", a: "JPEG output is re-encoded at quality 0.95, so visual loss is negligible. Pick PNG output for fully lossless re-encoding." },
      { q: "Will the resolution change?", a: "No. The output keeps the source's pixel dimensions exactly." },
    ],
  },
  {
    slug: "image-to-ascii-art",
    category: "image",
    name: "Image to ASCII Art",
    tagline: "Convert any image into ASCII art with adjustable width.",
    summary:
      "Sample image brightness on a grid and map each cell to a character from a 10-step ramp ` .:-=+*#%@`. Adjustable width from 40 to 200 characters. Output is plain text, ready to paste into READMEs, terminal banners or Discord chats.",
    useCases: [
      "Generate ASCII banners for terminal CLI tools and READMEs",
      "Add a retro ASCII portrait to your dotfiles MOTD",
      "Make ASCII art for forum signatures or text-only emails",
      "Convert logos to ASCII for Slack messages and code comments",
    ],
    icon: "🔤",
    seo: {
      title: "Free Image to ASCII Art Converter Online | BestMint",
      description:
        "Convert any image to ASCII art online. Adjustable width up to 200 characters, copy with one click. Free, browser-only image to text art tool.",
      keywords: [
        "image to ascii",
        "ascii art generator",
        "photo to ascii",
        "ascii from image",
        "text art converter",
      ],
    },
    faqs: [
      { q: "Why does my output look squashed?", a: "Characters are taller than they are wide. We compensate by sampling at a 0.5 vertical ratio, but very tall images may still look compressed — try inverting if backgrounds are light." },
      { q: "What ramp does it use?", a: "A ten-step ramp from space (lightest) to @ (darkest): ` .:-=+*#%@`. The 'invert' option flips this for use on white-on-black terminals vs dark-on-light docs." },
      { q: "Can I paste this into a tweet?", a: "ASCII output is plain text but each line is the chosen width — so a 100-char wide image is too wide for X's preview. Use width 40–60 for compact output." },
    ],
  },
  {
    slug: "image-mirror",
    category: "image",
    name: "Image Mirror",
    tagline: "Mirror any image horizontally or vertically and download as PNG.",
    summary:
      "Reflect an image across the horizontal or vertical axis using canvas scale(-1, 1) or scale(1, -1). Useful for mirror-image variants, symmetric design assets, and quick layout experiments. Lossless and fast.",
    useCases: [
      "Mirror selfies so they read the way you see yourself in a mirror",
      "Generate flipped variants of icons for symmetric layouts",
      "Create reflection effects for hero images and product shots",
      "Quickly produce 'before / after' mirrors for design experiments",
    ],
    icon: "🪞",
    seo: {
      title: "Free Image Mirror Tool — Flip Image Online | BestMint",
      description:
        "Mirror any image horizontally or vertically online. Free, browser-only image flipper — download the mirrored result as PNG.",
      keywords: [
        "mirror image",
        "flip image online",
        "image mirror tool",
        "horizontal flip",
        "vertical flip",
      ],
    },
    faqs: [
      { q: "What's the difference between mirroring and rotating?", a: "Mirroring reflects across an axis (left↔right or top↔bottom). Rotating spins the image. Mirror is what you see in a real mirror — rotation is what happens when you turn a printed photo." },
      { q: "Will text in the photo become readable?", a: "No — mirroring reverses any text or signage in the image. That's the giveaway that something is mirrored." },
      { q: "Is mirroring lossless?", a: "Yes. Reflection is a pixel swap with no resampling, so output quality matches the source." },
    ],
  },
  {
    slug: "image-noise",
    category: "image",
    name: "Image Noise Generator",
    tagline: "Add grain or color noise to any photo for a film or analog look.",
    summary:
      "Adds per-pixel random offsets to RGB values, producing a grain or noise texture. Toggle monochrome for an authentic film-grain feel, or keep color noise for digital sensor look. Adjustable intensity from 0 to 120.",
    useCases: [
      "Add film grain to photos for an analog 35mm aesthetic",
      "Roughen up sterile UI screenshots for editorial spreads",
      "Mask compression artifacts in low-bandwidth images",
      "Generate noise textures for design overlays and backgrounds",
    ],
    icon: "📺",
    seo: {
      title: "Free Image Noise Generator — Add Grain to Photos | BestMint",
      description:
        "Add grain or color noise to images for film or analog effects. Free online image noise tool, runs in your browser. Download as PNG.",
      keywords: [
        "image noise",
        "add grain to photo",
        "film grain effect",
        "image noise generator",
        "noise filter",
      ],
    },
    faqs: [
      { q: "What's the difference between mono and color noise?", a: "Monochrome adds the same random offset to R, G and B per pixel — that's classic film grain. Color noise picks independent offsets per channel, which looks like digital sensor noise." },
      { q: "Will it work on transparent PNGs?", a: "Yes. The alpha channel is preserved untouched; only RGB pixels get noise." },
      { q: "Why is my output much larger than the original?", a: "Random pixel variation defeats compression. Noisy PNGs are big — re-export as JPEG quality 0.85 with our image compressor for a smaller file." },
    ],
  },
  {
    slug: "gif-frame-extractor",
    category: "image",
    name: "GIF Frame Extractor",
    tagline: "Extract frames from animated GIFs as individual PNG downloads.",
    summary:
      "Decodes animated GIFs frame-by-frame using the modern ImageDecoder API and renders each frame to a downloadable PNG. Falls back to first-frame extraction on browsers without ImageDecoder. Frame count is detected by scanning GIF blocks directly.",
    useCases: [
      "Pull individual frames from a meme GIF for use as static images",
      "Extract all frames of an animation to edit them in another tool",
      "Sample reaction GIFs for screenshots, slides or thumbnails",
      "Convert short GIF animations into a sequence of PNG keyframes",
    ],
    icon: "🎞️",
    seo: {
      title: "Free GIF Frame Extractor — Pull Frames From GIF | BestMint",
      description:
        "Extract frames from animated GIFs as PNG files. Free, browser-only GIF frame extractor — your file never leaves the device.",
      keywords: [
        "gif frame extractor",
        "extract gif frames",
        "gif to png",
        "split gif",
        "gif frame splitter",
      ],
    },
    faqs: [
      { q: "Why do I only see the first frame?", a: "Your browser doesn't support the ImageDecoder API. Chrome and Edge expose it; Safari does not as of 2026. The detected frame count is still shown via direct GIF block parsing." },
      { q: "Does it preserve frame timing?", a: "PNG output is timeless. We extract the visual frames; reassembling timing requires a video tool. Frame order is preserved in the index suffix of the file name." },
      { q: "What's the frame limit?", a: "We extract up to 60 frames to keep memory bounded. For longer GIFs, split or use a desktop tool." },
    ],
  },
  {
    slug: "webcam-photo-booth",
    category: "image",
    name: "Webcam Photo Booth",
    tagline: "Snap photos from your webcam with grayscale, sepia and invert filters.",
    summary:
      "Accesses your webcam via getUserMedia and renders a live preview. Pick a filter (none / grayscale / sepia / invert), hit capture, and the frame is drawn to canvas and saved as PNG. Up to 12 captures kept in memory — pure browser, no upload.",
    useCases: [
      "Take a quick profile photo without launching a separate camera app",
      "Capture proof-of-life or screen-share photos for support tickets",
      "Make playful filtered selfies without installing software",
      "Snap reference shots for design work directly in your browser",
    ],
    icon: "📸",
    seo: {
      title: "Free Webcam Photo Booth Online — Snap Filtered Selfies | BestMint",
      description:
        "Take photos from your webcam with grayscale, sepia and invert filters. Free, browser-only photo booth — captures stay on your device.",
      keywords: [
        "webcam photo",
        "online photo booth",
        "browser camera",
        "webcam selfie",
        "browser photo booth",
      ],
    },
    faqs: [
      { q: "Where do my photos go?", a: "Captures live only in your browser tab. They are not uploaded — close the tab and they are gone." },
      { q: "Why does the camera need permission?", a: "Browsers require explicit permission for getUserMedia(). You can revoke camera access at any time from your browser's site settings." },
      { q: "Why is my preview black?", a: "Some browsers block camera access on insecure origins (HTTP). On a public site, this works automatically over HTTPS. Also check that no other app is currently using the webcam." },
    ],
  },
  // ─── New: Color ──────────────────────────────────────────────────────
  {
    slug: "color-converter",
    category: "color",
    name: "Color Converter",
    tagline: "Convert HEX, RGB, HSL, HSV, CMYK and LAB instantly with auto-detection.",
    summary:
      "Paste a color in any common format — HEX, rgb(), hsl(), hsv(), cmyk() or lab() — and instantly see it expressed in every other format with copy-to-clipboard buttons. The tool auto-detects your input format so there is nothing to configure.",
    useCases: [
      "Convert a HEX brand color to CMYK for print materials",
      "Translate Figma HSL values into CSS rgb() for code review",
      "Round-trip a LAB measurement from a color sensor into RGB",
      "Verify how a color renders across HSV and HSL color models",
    ],
    icon: "🎨",
    seo: {
      title: "Free Color Converter — HEX, RGB, HSL, HSV, CMYK, LAB | BestMint",
      description:
        "Convert colors between HEX, RGB, HSL, HSV, CMYK and LAB online. Auto-detects input format and shows every conversion at once. Browser-only.",
      keywords: [
        "color converter",
        "hex to rgb",
        "rgb to cmyk",
        "rgb to lab",
        "hsl converter",
        "color format converter",
      ],
    },
    faqs: [
      { q: "What color spaces are supported?", a: "HEX, RGB, HSL, HSV, CMYK and CIE LAB. CMYK uses a simple uncalibrated transform suitable for screen previews — confirm with your printer for production." },
      { q: "Why does my LAB conversion look slightly off?", a: "We use the standard sRGB / D65 reference white. Different tools may use D50 or other illuminants which shift the L*a*b* numbers a few units." },
      { q: "Can I convert with alpha?", a: "Alpha is preserved in the input but not part of the conversion — convert opaque values, then add the alpha channel back manually." },
    ],
  },
  {
    slug: "color-blindness-simulator",
    category: "color",
    name: "Color Blindness Simulator",
    tagline: "Preview how a color appears with protanopia, deuteranopia, tritanopia and achromatopsia.",
    summary:
      "Enter a color and see four side-by-side simulations covering the most common types of color vision deficiency. Useful for verifying that brand colors, charts and UI states remain distinguishable for users with color blindness.",
    useCases: [
      "Audit data-visualization palettes for color-blind accessibility",
      "Pick UI status colors (success/error) that remain distinguishable",
      "Preview brand swatches against deuteranopia (the most common type)",
      "Check chart legends, badges and badges for protan/tritan safety",
    ],
    icon: "👁",
    seo: {
      title: "Free Color Blindness Simulator — Protanopia, Deuteranopia, Tritanopia | BestMint",
      description:
        "Simulate how colors appear with color vision deficiencies online for free. Preview protanopia, deuteranopia, tritanopia and achromatopsia side-by-side.",
      keywords: [
        "color blindness simulator",
        "deuteranopia simulator",
        "protanopia simulator",
        "tritanopia simulator",
        "accessible color",
      ],
    },
    faqs: [
      { q: "How accurate are the simulations?", a: "We apply the standard color deficiency matrices used by most simulators (Machado / Viénot et al.). They are good visual approximations but real perception varies between individuals." },
      { q: "Should I use this instead of WCAG contrast checks?", a: "No, use both. Color blindness simulation checks if hues stay distinguishable; WCAG contrast ensures luminance contrast for low-vision users. They complement each other." },
      { q: "What is achromatopsia?", a: "Total color blindness — vision is monochromatic. Our simulation uses the luminance channel (BT.601 weights) to render a grayscale equivalent." },
    ],
  },
  {
    slug: "color-mixer",
    category: "color",
    name: "Color Mixer",
    tagline: "Blend two colors at any ratio in both RGB and HSL color space.",
    summary:
      "Pick two colors and a mix ratio to produce a blended color. The tool shows the result computed in both RGB (linear interpolation in screen space) and HSL (interpolation along the shortest hue path) so you can compare how each model behaves.",
    useCases: [
      "Generate accent colors halfway between brand primary and secondary",
      "Build hover states by mixing a button color with white or black",
      "Create palette transitions between two existing tokens",
      "Compare RGB vs HSL mixing to choose the better-looking result",
    ],
    icon: "🥣",
    seo: {
      title: "Free Color Mixer — Blend Two Colors in RGB or HSL | BestMint",
      description:
        "Mix two colors online for free. Adjust ratio with a slider and compare blended output in RGB and HSL color spaces. Copy hex with one click.",
      keywords: [
        "color mixer",
        "blend colors",
        "rgb mix",
        "hsl mix",
        "color blender",
      ],
    },
    faqs: [
      { q: "Why do RGB and HSL mixes look different?", a: "RGB mixing interpolates each channel linearly which often passes through grey. HSL interpolates hue, saturation and lightness independently and usually keeps colors more vivid." },
      { q: "Which mix should I use?", a: "HSL is usually better for design palettes because it preserves perceived saturation. RGB is better when you need an exact average of two specific screen pixels." },
      { q: "Does it support alpha mixing?", a: "Not directly — both inputs are treated as opaque. To mix transparency, layer the result with an alpha value in your CSS." },
    ],
  },
  {
    slug: "color-shades-tints",
    category: "color",
    name: "Shades & Tints Generator",
    tagline: "Generate 10-step shade and tint ramps from any base color.",
    summary:
      "Pick a base color and instantly get a 10-step shade ramp (mixed toward black) and a 10-step tint ramp (mixed toward white). Useful for building Tailwind-style color scales, design tokens or hover/active states.",
    useCases: [
      "Build a custom 10-step color scale for design tokens",
      "Pick darker hover and pressed states from a base brand color",
      "Generate background tints from an accent color for cards and chips",
      "Create a print-ready shade ladder for backgrounds and borders",
    ],
    icon: "🪜",
    seo: {
      title: "Free Shades & Tints Generator — 10-Step Color Ramps | BestMint",
      description:
        "Generate shades and tints of any color online for free. Get 10 steps toward black and 10 toward white with one click. Browser-only.",
      keywords: [
        "shades generator",
        "tints generator",
        "color ramp",
        "color scale generator",
        "shade tint maker",
      ],
    },
    faqs: [
      { q: "How are shades and tints computed?", a: "Each step linearly mixes the base RGB toward pure black (shades) or pure white (tints) at fixed 10% intervals." },
      { q: "Is this the same as Tailwind's 50–950 scale?", a: "Similar idea but Tailwind tunes saturation and lightness perceptually for each family — straight tinting is a fast starting point you may want to adjust." },
      { q: "Can I export to CSS variables?", a: "Click any swatch to copy its hex; paste into your token file as needed." },
    ],
  },
  {
    slug: "color-name-finder",
    category: "color",
    name: "Color Name Finder",
    tagline: "Find the closest CSS named color for any HEX value.",
    summary:
      "Enter a HEX color and the tool finds the closest CSS3 / X11 named color (the ~140 names browsers accept like 'crimson' or 'cornflowerblue'), plus a few alternatives ranked by perceptual distance.",
    useCases: [
      "Find a memorable English name for a brand HEX value",
      "Pick a web-safe named color when readability of code matters",
      "Identify a third-party design's named color from a screenshot HEX",
      "Compare visually similar named colors before committing to one",
    ],
    icon: "🏷",
    seo: {
      title: "Free Color Name Finder — Closest CSS Named Color | BestMint",
      description:
        "Find the closest CSS named color (X11 / CSS3) for any HEX online. Free, browser-only, with perceptual distance ranking and alternatives.",
      keywords: [
        "color name finder",
        "hex to name",
        "css named color",
        "x11 color name",
        "what color is this hex",
      ],
    },
    faqs: [
      { q: "How is closeness measured?", a: "We use the redmean approximation — a fast perceptually weighted RGB distance that's a good middle ground between cheap Euclidean RGB and full CIEDE2000." },
      { q: "How many names are matched?", a: "All ~140 CSS3 / X11 named colors that browsers natively support — the same list you can use directly in CSS like color: rebeccapurple." },
      { q: "Why are 'aqua' and 'cyan' identical?", a: "They are. CSS keeps both names for legacy reasons; the matcher returns whichever scores first." },
    ],
  },
  {
    slug: "tailwind-palette",
    category: "color",
    name: "Tailwind CSS Palette",
    tagline: "Browse and copy every Tailwind v3 color step (50 to 950).",
    summary:
      "A complete reference of Tailwind CSS v3's default palette — 22 color families (slate through rose) across 11 steps each. Click a swatch to copy its hex; click the label to copy the Tailwind class like bg-blue-500.",
    useCases: [
      "Look up the hex for a Tailwind class without leaving the browser",
      "Compare related families (blue vs sky vs cyan) at a glance",
      "Copy the Tailwind class name directly into JSX or HTML",
      "Build a custom design palette by sampling from official tokens",
    ],
    icon: "🌬",
    seo: {
      title: "Tailwind CSS Color Palette — 50 to 950 with HEX | BestMint",
      description:
        "Browse Tailwind CSS v3 default colors online for free. Copy hex values or class names like bg-blue-500 with one click. Slate through rose, 50 to 950.",
      keywords: [
        "tailwind colors",
        "tailwind palette",
        "tailwind hex codes",
        "tailwind css colors",
        "tailwind color names",
      ],
    },
    faqs: [
      { q: "Which Tailwind version is this?", a: "Tailwind CSS v3's default palette, including the 950 step added in 3.3." },
      { q: "Can I copy the Tailwind class instead of hex?", a: "Yes — click the bottom row to copy the class name like bg-blue-500. Click the swatch above to copy the hex." },
      { q: "Are these colors customizable in my project?", a: "These are the defaults. Your project's tailwind.config.js may override them — always check your local theme." },
    ],
  },
  {
    slug: "material-palette",
    category: "color",
    name: "Material Design Palette",
    tagline: "Browse Google's 2014 Material Design color palette with accent colors.",
    summary:
      "The full Material Design 2014 palette — 19 color families with shades 50 through 900 plus the A100/A200/A400/A700 accent colors. Click any swatch to copy the hex. A go-to reference for Android, Material Web and any retro Material UI work.",
    useCases: [
      "Pick swatches for an Android Material 2 theme.xml",
      "Match an existing Material UI color token in code",
      "Reference accent A100–A700 colors for FABs and chips",
      "Compare Material families against custom branding",
    ],
    icon: "🧱",
    seo: {
      title: "Material Design Color Palette — Google 2014 Spec | BestMint",
      description:
        "Browse Google's Material Design 2014 color palette online for free. 19 families with full 50–900 shades plus A100–A700 accents. Click to copy hex.",
      keywords: [
        "material design colors",
        "material palette",
        "material color codes",
        "android color palette",
        "material design 2",
      ],
    },
    faqs: [
      { q: "Is this Material 2 or Material 3?", a: "It's the original Material Design 2014 palette (Material 2). Material 3 uses dynamic, generated palettes per device — not a fixed swatch set." },
      { q: "Why don't brown, grey and blue-grey have accents?", a: "Google's spec only defined accent A-series for the colorful families. Neutrals only have 50–900 steps." },
      { q: "What's the difference between 500 and A200?", a: "500 is the family's standard tone. A-series accents are bright, saturated variants meant for emphasis like floating action buttons." },
    ],
  },
  {
    slug: "box-shadow-generator",
    category: "color",
    name: "CSS Box Shadow Generator",
    tagline: "Build single or stacked CSS box shadows with live preview.",
    summary:
      "Design realistic CSS box shadows visually. Adjust offset, blur, spread, color and alpha; toggle inset; stack multiple shadows for soft, layered material-style effects, then copy the ready-to-paste box-shadow CSS.",
    useCases: [
      "Design a soft layered card shadow for a hero section",
      "Build inset shadows for pressed-button states",
      "Create neon glow effects by stacking colored shadows",
      "Match a Figma drop shadow exactly for cross-tool parity",
    ],
    icon: "🪟",
    seo: {
      title: "Free CSS Box Shadow Generator — Stacked Shadows | BestMint",
      description:
        "Generate CSS box-shadow online for free. Stack multiple shadows, control offset, blur, spread, color, alpha and inset. Live preview, copy CSS.",
      keywords: [
        "box shadow generator",
        "css box shadow",
        "shadow generator",
        "drop shadow css",
        "neumorphism shadow",
      ],
    },
    faqs: [
      { q: "Can I stack multiple shadows?", a: "Yes — add as many layers as you like. The output joins them with commas, exactly as the CSS spec expects." },
      { q: "What's the difference between blur and spread?", a: "Blur softens the edges; spread expands or contracts the shadow's solid size before blurring. Use spread for tight halos and blur for soft penumbras." },
      { q: "How do I get a Figma-like 'elevation' shadow?", a: "Stack two shadows: a small tight one (e.g. 0 1px 2px rgba(0,0,0,0.1)) plus a larger softer one (0 4px 8px rgba(0,0,0,0.05))." },
    ],
  },
  {
    slug: "text-shadow-generator",
    category: "color",
    name: "CSS Text Shadow Generator",
    tagline: "Create CSS text-shadow effects with live preview and copyable CSS.",
    summary:
      "Design CSS text-shadow effects visually. Tune offset, blur and color with sliders, type your own preview text, and copy the CSS text-shadow declaration ready to paste.",
    useCases: [
      "Add legibility to text overlaid on busy hero images",
      "Build retro chrome and neon text effects for headlines",
      "Match an existing typographic shadow exactly during a redesign",
      "Soften white-on-light text with a subtle dark shadow",
    ],
    icon: "🅰",
    seo: {
      title: "Free CSS Text Shadow Generator — Live Preview | BestMint",
      description:
        "Generate CSS text-shadow online for free. Tune offset, blur, color and alpha with sliders. Live preview, copy ready CSS. Browser-only.",
      keywords: [
        "text shadow generator",
        "css text shadow",
        "text effect generator",
        "neon text css",
        "shadow text",
      ],
    },
    faqs: [
      { q: "Can I add multiple text shadows?", a: "This generator focuses on a single shadow for clarity — combine multiple manually by separating them with commas in the output." },
      { q: "Why does my shadow look fuzzy?", a: "Increase blur for a softer effect or decrease for a sharp edge. Pair tiny offsets with low blur for crisp letterpress effects." },
      { q: "Is text-shadow widely supported?", a: "Yes — text-shadow has near-universal browser support since 2010." },
    ],
  },
  {
    slug: "border-radius-generator",
    category: "color",
    name: "CSS Border Radius Generator",
    tagline: "Visually craft circular and elliptical CSS border-radius for any corner.",
    summary:
      "Design custom border-radius shapes by tweaking each corner independently. Optionally enable elliptical mode for separate horizontal and vertical radii, producing organic blob and squircle shapes.",
    useCases: [
      "Design organic blob backgrounds for marketing pages",
      "Create asymmetric chat bubbles and cards",
      "Produce squircle button shapes (iOS-like)",
      "Generate elliptical avatar and image masks",
    ],
    icon: "▢",
    seo: {
      title: "Free CSS Border Radius Generator — Elliptical Corners | BestMint",
      description:
        "Generate CSS border-radius online for free. Independent control for each corner plus elliptical mode for organic blob shapes. Live preview.",
      keywords: [
        "border radius generator",
        "css border radius",
        "rounded corners css",
        "blob shape generator",
        "squircle generator",
      ],
    },
    faqs: [
      { q: "What does elliptical border-radius mean?", a: "Each corner takes two values — horizontal and vertical radii — separated by a slash, producing an oval rather than circular curve." },
      { q: "Why do my asymmetric corners look weird?", a: "When two adjacent corners overlap, browsers shrink them proportionally. Use smaller values or larger box dimensions to avoid clipping." },
      { q: "Can I animate border-radius?", a: "Yes — border-radius is animatable in CSS, which is how blob morphing animations are usually built." },
    ],
  },
  {
    slug: "clip-path-generator",
    category: "color",
    name: "CSS Clip-Path Generator",
    tagline: "Pick from common shape presets or write a custom clip-path with live preview.",
    summary:
      "Choose from common shape presets — circle, ellipse, triangle, arrow, rhombus, pentagon, hexagon, star — or write your own polygon() value. The preview updates instantly and the output is ready to paste into your CSS.",
    useCases: [
      "Cut hero images into hexagons or angled shapes",
      "Build arrow-shaped breadcrumbs and chevron banners",
      "Mask cards into diamonds for feature highlights",
      "Create star badges for promo callouts",
    ],
    icon: "✂",
    seo: {
      title: "Free CSS Clip-Path Generator — Polygon, Circle, Star | BestMint",
      description:
        "Generate CSS clip-path online for free. Presets for triangle, hexagon, star and more, or write a custom polygon. Live preview, copy CSS.",
      keywords: [
        "clip path generator",
        "css clip path",
        "polygon generator",
        "shape generator css",
        "css mask shape",
      ],
    },
    faqs: [
      { q: "What's the browser support for clip-path?", a: "All modern browsers support clip-path: polygon() / circle() / ellipse(). For SVG-based clipping, use clip-path: url(#id)." },
      { q: "Can I animate clip-path?", a: "Yes, but only between clip-paths with the same number of points — animating a triangle to a square requires both to be defined as 4-point polygons." },
      { q: "How do I make a custom shape?", a: "Click 'custom' and edit the polygon() value directly — each pair is x% y% from the top-left." },
    ],
  },
  {
    slug: "css-filter-generator",
    category: "color",
    name: "CSS Filter Generator",
    tagline: "Combine blur, brightness, contrast, hue-rotate and more with live preview.",
    summary:
      "Apply CSS filter functions visually — blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate and sepia — and see them composed on a sample image in real time. Copy the resulting filter CSS string.",
    useCases: [
      "Tint user-uploaded thumbnails with a brand hue-rotate",
      "Build dimmed-image hover states for galleries",
      "Create a grayscale-on-load effect that animates to color",
      "Apply Instagram-style sepia and contrast tweaks",
    ],
    icon: "🎚",
    seo: {
      title: "Free CSS Filter Generator — Blur, Brightness, Hue-Rotate | BestMint",
      description:
        "Generate CSS filter online for free. Stack blur, brightness, contrast, grayscale, hue-rotate, invert, sepia and more with live preview.",
      keywords: [
        "css filter generator",
        "css filter",
        "image filter css",
        "hue rotate css",
        "blur generator",
      ],
    },
    faqs: [
      { q: "Is the order of filter functions important?", a: "Yes — filters apply left to right. Blur followed by brightness produces a different result than brightness followed by blur." },
      { q: "Can I apply this to text?", a: "Yes, the filter property works on any element. Blur on text is a common loading-skeleton trick." },
      { q: "Are filters GPU-accelerated?", a: "On most browsers yes — filter is composited on the GPU. Heavy blur on large elements can still cost frame rate, so test on mobile." },
    ],
  },
  // ─── New: Generators ─────────────────────────────────────────────────
  {
    slug: "lorem-image",
    category: "generators",
    name: "Lorem Picsum Image URL Builder",
    tagline: "Build placeholder image URLs with seed, size, blur and grayscale options.",
    summary:
      "Compose placeholder image URLs powered by Lorem Picsum. Pick a width, height and seed for reproducible images, optionally enable grayscale or blur, and copy the URL or open the rendered preview straight in your browser.",
    useCases: [
      "Stub product, avatar and hero images in Figma or coded mockups",
      "Generate consistent placeholder photos for Storybook stories using a seed",
      "Add blurred backdrop hero images to landing-page demos",
      "Populate empty-state cards while real photography is still in production",
    ],
    icon: "🖼️",
    seo: {
      title: "Lorem Picsum URL Builder — Free Placeholder Image Generator | BestMint",
      description:
        "Free Lorem Picsum URL builder. Generate placeholder image URLs with custom width, height, seed, blur and grayscale options for mockups and prototypes.",
      keywords: [
        "lorem picsum",
        "placeholder image generator",
        "dummy image url",
        "random image url",
        "image placeholder builder",
      ],
    },
    faqs: [
      { q: "Does this fetch the image through your server?", a: "No. We just construct the picsum.photos URL — your browser loads the image directly from Lorem Picsum." },
      { q: "Why use a seed?", a: "Seeds make the picked image reproducible: the same seed always returns the same photo, so layouts stay stable across reloads and screenshots." },
      { q: "Can I use these images in production?", a: "Lorem Picsum is fine for prototypes and demos. For production, source properly licensed photography (Unsplash, Pexels, your own) so you don't depend on a free placeholder service." },
    ],
  },
  {
    slug: "avatar-generator",
    category: "generators",
    name: "Initials Avatar Generator",
    tagline: "Make colorful SVG avatars from names with deterministic colors.",
    summary:
      "Turn a list of names into colorful initial avatars. Each name produces a deterministic background color from a hash of the text, so the same name always renders the same avatar — perfect for chat apps, comment threads and CMS user lists.",
    useCases: [
      "Generate fallback avatars for users without a profile photo",
      "Build a default avatar set for a chat or forum app",
      "Create branded contributor portraits for blog posts and case studies",
      "Mock realistic team rosters in design files and prototypes",
    ],
    icon: "🅰️",
    seo: {
      title: "Initials Avatar Generator — Free SVG Avatars from Names | BestMint",
      description:
        "Generate colorful SVG initial avatars from any list of names. Deterministic colors per name, downloadable SVG, and runs entirely in your browser.",
      keywords: [
        "initials avatar generator",
        "name avatar generator",
        "svg avatar generator",
        "default avatar generator",
        "letter avatar",
      ],
    },
    faqs: [
      { q: "Are the colors random?", a: "They look random but they're deterministic — derived from a hash of the name — so the same name always produces the same color." },
      { q: "Why SVG instead of PNG?", a: "SVGs scale to any size without blur and are tiny (under a kilobyte), which is ideal for inline avatars in lists and tables." },
      { q: "How are the initials chosen?", a: "We take the first letter of the first name and the first letter of the last name. Single-word names use the first two letters." },
    ],
  },
  {
    slug: "gravatar-url",
    category: "generators",
    name: "Gravatar URL Generator",
    tagline: "Build a Gravatar profile image URL from any email address.",
    summary:
      "Compute the MD5 hash of an email address right in your browser and turn it into a Gravatar URL. Pick a size and a fallback identicon style for users without a Gravatar account, then preview the result instantly.",
    useCases: [
      "Show profile photos for commenters and forum users",
      "Display author images on blog posts and editorial pages",
      "Add user avatars to admin dashboards without hosting your own images",
      "Generate consistent identicons for internal team tools",
    ],
    icon: "👤",
    seo: {
      title: "Gravatar URL Generator — Email to Gravatar Image URL | BestMint",
      description:
        "Free Gravatar URL generator. Hash an email address with MD5 in your browser to build a Gravatar avatar URL with custom size and fallback style.",
      keywords: [
        "gravatar url",
        "gravatar generator",
        "email avatar",
        "md5 email hash",
        "gravatar image",
      ],
    },
    faqs: [
      { q: "Why does Gravatar require MD5?", a: "Gravatar uses lowercase-trimmed-email + MD5 as its identifier scheme. We compute it locally in JavaScript so no email leaves your browser." },
      { q: "What does the fallback do?", a: "If a user has no Gravatar account, the fallback (identicon, monsterid, retro, etc.) generates a placeholder image instead of returning a 404." },
      { q: "Is MD5 still safe to use?", a: "MD5 is broken cryptographically, but Gravatar uses it as a non-secret identifier — there is no security implication for this use case." },
    ],
  },
  {
    slug: "barcode-generator",
    category: "generators",
    name: "Barcode Generator",
    tagline: "Generate CODE128, EAN, UPC, CODE39 and ITF14 barcodes as SVG.",
    summary:
      "Encode any text or number as a printable barcode in your browser. Supports the most common retail and logistics formats: CODE128, EAN-13, EAN-8, UPC, CODE39, ITF14 and more, with a downloadable SVG you can paste into print or web layouts.",
    useCases: [
      "Print product barcodes for small-business inventory",
      "Generate ticket and admission codes for events",
      "Build asset-tracking labels for office equipment",
      "Add barcodes to PDF invoices and shipping documents",
    ],
    icon: "▮▮",
    seo: {
      title: "Free Barcode Generator — CODE128, EAN, UPC, CODE39 SVG | BestMint",
      description:
        "Free online barcode generator. Encode CODE128, EAN-13, UPC, CODE39, ITF14 and more as scalable SVG. Downloadable, no signup, runs in your browser.",
      keywords: [
        "barcode generator",
        "code128 generator",
        "ean barcode generator",
        "upc generator",
        "code39 barcode",
      ],
    },
    faqs: [
      { q: "Which format should I use?", a: "CODE128 handles the most characters and is the safest default. Use EAN-13/UPC for retail products that need a registered GTIN, and CODE39 for older industrial scanners." },
      { q: "Why SVG?", a: "SVG barcodes stay sharp at any size, including print. Most label printers and design tools accept SVG directly." },
      { q: "Is the value validated?", a: "Yes. Each format has its own length and character rules (EAN-13 needs 12-13 digits, UPC needs 11-12, etc.); invalid input shows an inline error message." },
    ],
  },
  {
    slug: "qr-wifi",
    category: "generators",
    name: "WiFi QR Code Generator",
    tagline: "Print a QR code that auto-joins guests to your WiFi network.",
    summary:
      "Build a QR code your guests can scan to instantly join your WiFi without typing the password. Choose WPA, WEP or open security, mark hidden networks, and download a printable PNG for cafes, conference rooms and Airbnbs.",
    useCases: [
      "Print a guest WiFi card for cafes, restaurants and waiting rooms",
      "Add WiFi QR to Airbnb welcome guides and rental house manuals",
      "Make conference and event WiFi access friction-free",
      "Onboard new employees and visitors to your office network",
    ],
    icon: "📶",
    seo: {
      title: "WiFi QR Code Generator — Free Network QR Code | BestMint",
      description:
        "Free WiFi QR code generator. Encode SSID, password and encryption (WPA/WEP/open) into a printable QR code that joins your network on scan.",
      keywords: [
        "wifi qr code",
        "wifi qr generator",
        "wifi password qr",
        "guest wifi qr",
        "network qr code",
      ],
    },
    faqs: [
      { q: "Does this work on iPhone?", a: "Yes. iOS 11 and later auto-detect WiFi QR codes from the camera app and prompt to join the network." },
      { q: "Is my password sent anywhere?", a: "No. The QR is generated entirely in your browser; the SSID and password are encoded into the image bytes locally." },
      { q: "What's the WiFi string format?", a: "It follows the WPA Wi-Fi Easy Connect convention: WIFI:T:&lt;auth&gt;;S:&lt;ssid&gt;;P:&lt;password&gt;;H:&lt;hidden&gt;;; — supported by iOS, Android and most camera apps." },
    ],
  },
  {
    slug: "qr-vcard",
    category: "generators",
    name: "vCard QR Code Generator",
    tagline: "Make a QR code that adds your contact info on scan.",
    summary:
      "Encode a complete vCard 3.0 contact (name, organization, title, phone, email, website, address) into a QR code. Anyone scanning it gets a one-tap “Add to Contacts” prompt — perfect for business cards, badges and email signatures.",
    useCases: [
      "Print on business cards so anyone can save your details with one scan",
      "Add to email signatures and PDF resumes for recruiters",
      "Use on conference badges and trade-show materials",
      "Embed in storefront windows or table-tents for direct contact",
    ],
    icon: "📇",
    seo: {
      title: "vCard QR Code Generator — Contact QR for Business Cards | BestMint",
      description:
        "Free vCard QR code generator. Encode name, phone, email, organization and address as a scannable QR that adds your contact instantly. Browser-only.",
      keywords: [
        "vcard qr code",
        "contact qr code",
        "business card qr",
        "vcard generator",
        "contact card qr",
      ],
    },
    faqs: [
      { q: "Which vCard version does it use?", a: "vCard 3.0, which is the most widely supported across iOS, Android and desktop address books." },
      { q: "How big should I print this?", a: "At least 2 cm × 2 cm for reliable scanning from a phone at arm's length. Larger is always safer if there will be glare or print imperfections." },
      { q: "Can I include a photo?", a: "Embedding a base64 photo balloons the QR code size, often making it unreadable when printed small. We keep it text-only on purpose." },
    ],
  },
  {
    slug: "nanoid-generator",
    category: "generators",
    name: "Nano ID Generator",
    tagline: "Generate URL-safe, collision-resistant IDs with custom size and alphabet.",
    summary:
      "Generate Nano IDs — short, URL-friendly, cryptographically random identifiers used by databases like Prisma and Postgres adopters as a UUID alternative. Choose your size, count and an optional custom alphabet, then copy the lot.",
    useCases: [
      "Generate primary keys for new database tables",
      "Mint short-lived invite tokens for SaaS apps",
      "Create slug-style IDs for URLs and short links",
      "Replace UUID v4 where smaller IDs are preferred",
    ],
    icon: "🆔",
    seo: {
      title: "Nano ID Generator — Free Online with Custom Alphabet | BestMint",
      description:
        "Free Nano ID generator. Create batches of URL-safe random IDs with custom size and alphabet. Cryptographically secure, runs entirely in the browser.",
      keywords: [
        "nanoid generator",
        "nano id generator",
        "short id generator",
        "url safe id",
        "random id generator",
      ],
    },
    faqs: [
      { q: "How is Nano ID different from UUID?", a: "Nano ID's default alphabet is URL-safe (no dashes), and 21 characters give roughly the same collision probability as UUID v4 — but only 21 chars instead of 36." },
      { q: "Is it secure?", a: "Yes. Random bytes come from crypto.getRandomValues, the same source used for UUID v4 and security tokens." },
      { q: "What size should I pick?", a: "21 (the default) is collision-safe up to ~2 trillion IDs. Use larger sizes for very high volumes; smaller sizes only when an existing system constrains length." },
    ],
  },
  {
    slug: "ulid-generator",
    category: "generators",
    name: "ULID Generator",
    tagline: "Generate sortable, time-prefixed unique identifiers.",
    summary:
      "Generate ULIDs — Universally Unique Lexicographically Sortable Identifiers — that combine a millisecond timestamp prefix with random suffix for collision-resistance. ULIDs sort naturally by creation time, which makes them great for event logs and Postgres B-tree indexes.",
    useCases: [
      "Use as primary keys when you want time-ordered inserts",
      "Replace UUID v4 in event-sourcing and audit-log tables",
      "Create human-friendlier IDs that fit in 26 base32 chars",
      "Generate sort-stable IDs for Firestore or DynamoDB documents",
    ],
    icon: "🆔",
    seo: {
      title: "ULID Generator — Free Sortable Unique IDs Online | BestMint",
      description:
        "Free ULID generator. Create batches of Universally Unique Lexicographically Sortable Identifiers — time-ordered, 26-character, URL-safe IDs.",
      keywords: [
        "ulid generator",
        "ulid online",
        "sortable id generator",
        "uuid alternative",
        "lexicographic id",
      ],
    },
    faqs: [
      { q: "Why ULID instead of UUID?", a: "ULIDs sort by creation time naturally because the first 48 bits are a millisecond timestamp. UUID v4 is fully random, which fragments database indexes." },
      { q: "How long are they?", a: "26 characters in Crockford's base32 — slightly shorter than UUID's 36 characters and case-insensitive." },
      { q: "Are they unique?", a: "Yes — 80 bits of randomness on top of the timestamp gives a vanishingly small collision probability even at millions of IDs per millisecond." },
    ],
  },
  {
    slug: "cuid-generator",
    category: "generators",
    name: "CUID Generator",
    tagline: "Generate collision-resistant, lowercase IDs for distributed systems.",
    summary:
      "Generate CUID-style identifiers — short, lowercase alphanumeric strings designed to avoid collisions across distributed servers and clients. Use them as primary keys, public IDs, or anywhere you need an opaque, copy-friendly token.",
    useCases: [
      "Primary keys for Prisma, MongoDB and SQL tables",
      "Public IDs in URLs (e.g. /products/cl9hu2kxd000)",
      "Client-side IDs that won't clash with server-side ones",
      "Token IDs for distributed event streams",
    ],
    icon: "🆔",
    seo: {
      title: "CUID Generator — Free Collision-Resistant ID Online | BestMint",
      description:
        "Free CUID generator. Create lowercase alphanumeric collision-resistant IDs in batches. Browser-only, cryptographically random suffixes.",
      keywords: [
        "cuid generator",
        "cuid2 generator",
        "collision resistant id",
        "prisma id generator",
        "online id generator",
      ],
    },
    faqs: [
      { q: "What is CUID?", a: "CUID is a family of collision-resistant ID formats popular with the Prisma ORM and Node.js community. They're shorter than UUIDs and start with a letter." },
      { q: "Are these v1 or v2?", a: "We generate CUID2-style IDs: lowercase letter prefix plus base36 timestamp + random tail. They're URL-safe and case-insensitive." },
      { q: "Are they really collision-free?", a: "Practically yes for any single application. With 24-character defaults you'd need to generate billions per second across the planet to hit a collision." },
    ],
  },
  {
    slug: "pin-generator",
    category: "generators",
    name: "PIN Generator",
    tagline: "Generate cryptographically random numeric PINs from 4-12 digits.",
    summary:
      "Generate batches of numeric PIN codes from 4 to 12 digits using crypto.getRandomValues. Useful for generating one-time codes, locker codes, vault PINs and bulk activation codes that won't be guessable.",
    useCases: [
      "Generate locker, safe and door-keypad PINs",
      "Mint bulk activation codes for products and giveaways",
      "Create one-time-use access PINs for guests",
      "Replace easy-to-guess PINs like 1234 or birthdays",
    ],
    icon: "🔢",
    seo: {
      title: "PIN Generator — Free Random Numeric PIN Codes | BestMint",
      description:
        "Free random PIN generator. Create batches of 4-12 digit numeric PINs using cryptographically secure randomness. Browser-only, no signup.",
      keywords: [
        "pin generator",
        "random pin generator",
        "numeric code generator",
        "secure pin generator",
        "digit code generator",
      ],
    },
    faqs: [
      { q: "Are these PINs secure?", a: "Yes — they come from crypto.getRandomValues, the same source browsers use for cryptographic keys." },
      { q: "How long should my PIN be?", a: "4 digits gives 10,000 combinations (fine for low-stakes locks), 6 digits gives a million, and 8+ digits is appropriate for anything sensitive." },
      { q: "Can I get the same PIN twice?", a: "Generated PINs are independent, so duplicates within a single large batch are possible. For unique-only batches, generate a few extra and de-duplicate." },
    ],
  },
  {
    slug: "wifi-password-generator",
    category: "generators",
    name: "WiFi Password Generator",
    tagline: "Generate strong, easy-to-read-aloud WiFi passwords.",
    summary:
      "Generate strong WiFi passwords that are easy to read aloud — toggle off look-alike characters (0/O, 1/l/I, S/5) and unwanted symbols, then print on a guest card or pair with our WiFi QR generator for a frictionless setup.",
    useCases: [
      "Set up a strong guest network password without ambiguous characters",
      "Pair with the WiFi QR generator for printable guest cards",
      "Rotate office WiFi credentials on a regular schedule",
      "Generate router admin passwords during initial provisioning",
    ],
    icon: "📡",
    seo: {
      title: "WiFi Password Generator — Strong Easy-to-Read Passwords | BestMint",
      description:
        "Free WiFi password generator. Create strong WPA/WPA2 passwords without confusing characters like 0/O, 1/l/I or 5/S. Cryptographically secure and browser-only.",
      keywords: [
        "wifi password generator",
        "router password generator",
        "wpa password generator",
        "strong wifi password",
        "guest wifi password",
      ],
    },
    faqs: [
      { q: "How long should a WiFi password be?", a: "16+ characters for home networks, 20+ for businesses. WPA2 supports up to 63 characters." },
      { q: "Why exclude 0/O and 1/l/I?", a: "When guests type the password from a printed card, look-alike characters cause typos. Excluding them trades a few bits of entropy for a far better experience." },
      { q: "Is the password ever sent over the network?", a: "No. Generation happens entirely in your browser using the Web Crypto API." },
    ],
  },
  {
    slug: "passphrase-generator",
    category: "generators",
    name: "Passphrase Generator",
    tagline: "Generate memorable Diceware-style passphrases from real words.",
    summary:
      "Generate strong, memorable passphrases from a list of common English words — the approach popularised by xkcd's “correct horse battery staple”. Choose word count, separator, capitalization and an optional appended digit/symbol for sites that require them.",
    useCases: [
      "Memorable master passwords for password managers",
      "Strong but typeable passphrases for laptop login",
      "Recovery phrases for personal vaults and seed backups",
      "Replace cryptic passwords with phrases you can actually remember",
    ],
    icon: "🔑",
    seo: {
      title: "Passphrase Generator — Free Diceware-Style Passwords | BestMint",
      description:
        "Free passphrase generator. Build strong, memorable Diceware-style passphrases from common English words with crypto-secure randomness. Browser-only.",
      keywords: [
        "passphrase generator",
        "diceware passphrase",
        "xkcd password generator",
        "memorable password generator",
        "word password generator",
      ],
    },
    faqs: [
      { q: "Are passphrases really stronger than passwords?", a: "Length wins: a four-word passphrase from a 1000-word list has ~40 bits of entropy and is easier to remember than a random 8-char string with similar entropy." },
      { q: "Can I use these for crypto seed phrases?", a: "No. BIP-39 seed phrases must come from the official 2048-word list with checksum bits. Use a hardware wallet for those." },
      { q: "Why capitalization and digits?", a: "Many websites still demand mixed case and a digit to satisfy outdated complexity rules. The toggles let you meet those rules without weakening the phrase." },
    ],
  },
  {
    slug: "fake-name-generator",
    category: "generators",
    name: "Fake Name Generator",
    tagline: "Generate realistic placeholder names by gender and locale.",
    summary:
      "Generate realistic placeholder names for testing and design work. Pick a gender and locale (English, Spanish, French) and get any number of first + last name combinations to fill mockups, seed databases or stress-test signup flows.",
    useCases: [
      "Seed user tables in development and staging databases",
      "Populate Figma user-list and avatar mockups with realistic names",
      "Generate test data for QA and load-testing scripts",
      "Stub directory listings, member rosters and team pages",
    ],
    icon: "🧑",
    seo: {
      title: "Fake Name Generator — Free Random Names by Locale | BestMint",
      description:
        "Free fake name generator. Generate realistic random first + last names by gender and locale (en/es/fr) for testing, mockups and design work.",
      keywords: [
        "fake name generator",
        "random name generator",
        "test name data",
        "placeholder name generator",
        "seed names",
      ],
    },
    faqs: [
      { q: "Are these real people?", a: "No. Names are drawn from common-name lists, but combinations are random — any resemblance to a real person is coincidental." },
      { q: "Can I use these for fraud?", a: "No. They're for software testing and design only; using them to deceive companies or individuals is misuse." },
      { q: "How accurate are the locales?", a: "We use short curated lists of the most common given and family names per locale. Good enough for design and test data, not for sociolinguistic research." },
    ],
  },
  {
    slug: "fake-address-generator",
    category: "generators",
    name: "Fake Address Generator",
    tagline: "Generate realistic-looking placeholder addresses for US, UK and Canada.",
    summary:
      "Generate realistic-looking placeholder addresses for US, UK and Canada — complete with street, city, region and postal code in the local format. Use them to populate forms, seed test databases and stress-test address validators.",
    useCases: [
      "Seed shipping-address tables in development databases",
      "Test checkout and address-validation flows in staging",
      "Populate CRM and customer-list mockups with believable data",
      "Generate placeholder addresses for design wireframes",
    ],
    icon: "📍",
    seo: {
      title: "Fake Address Generator — Random US/UK/CA Addresses | BestMint",
      description:
        "Free fake address generator. Build realistic random street + city + postal-code addresses for US, UK and Canada to populate test data and mockups.",
      keywords: [
        "fake address generator",
        "random address generator",
        "test address data",
        "placeholder address",
        "us uk canada address",
      ],
    },
    faqs: [
      { q: "Are these real addresses?", a: "Cities and postal codes are real, but the street name and number are randomized — combinations almost certainly don't correspond to any actual residence." },
      { q: "Will postal codes pass validation?", a: "Format-wise yes (US 5-digit, UK alphanumeric, CA A1A 1A1). Strict APIs that geocode the full address will reject them, which is the point." },
      { q: "Can I use these for forms or fraud?", a: "Use them only for software testing and design. Submitting fake addresses to real businesses is misuse." },
    ],
  },
  {
    slug: "fake-credit-card",
    category: "generators",
    name: "Test Credit Card Number Generator",
    tagline: "Generate Luhn-valid placeholder card numbers for QA and form testing.",
    summary:
      "Generate placeholder credit-card numbers with the right brand prefix (Visa, MasterCard, Amex, Discover) and a valid Luhn checksum. They look real to a checkout form's client-side validator but they have no issuer, no funds and won't actually charge — perfect for QA.",
    useCases: [
      "Test client-side card validators in checkout flows",
      "Stress-test Luhn-checking forms and analytics events",
      "Create placeholder data for finance dashboard mockups",
      "Verify error states on invalid CVV or expiry handling",
    ],
    icon: "💳",
    seo: {
      title: "Test Credit Card Number Generator — Luhn-Valid Fake Cards | BestMint",
      description:
        "Free test credit card generator. Make Luhn-valid fake card numbers for Visa, MasterCard, Amex and Discover to test checkout forms. Not real cards — for QA only.",
      keywords: [
        "fake credit card generator",
        "test credit card number",
        "luhn valid card",
        "qa card number",
        "dummy credit card",
      ],
    },
    faqs: [
      { q: "Will these cards actually charge?", a: "No. They pass the client-side Luhn check but have no real issuer or funds — any payment processor will reject them." },
      { q: "Can I use these in Stripe test mode?", a: "Use Stripe's documented test cards (4242 4242 4242 4242, etc.) for sandbox payments. These generic Luhn-valid numbers test only client-side validation." },
      { q: "Is generating these legal?", a: "Generating Luhn-valid numbers is legal and a normal QA practice. Attempting to use them for real fraud is not." },
    ],
  },
  {
    slug: "fake-iban",
    category: "generators",
    name: "Test IBAN Generator",
    tagline: "Generate IBANs with valid mod-97 checksums for DE, GB, FR, ES, IT, NL.",
    summary:
      "Generate placeholder IBANs (International Bank Account Numbers) with the correct length and a valid mod-97 checksum for six common European countries. They pass format validators but aren't tied to any real bank account, so they're safe for testing.",
    useCases: [
      "Test SEPA payment forms in staging environments",
      "Validate IBAN-format checks in your accounting integrations",
      "Populate finance dashboard mockups with realistic IBANs",
      "Stress-test client-side mod-97 validation",
    ],
    icon: "🏦",
    seo: {
      title: "Test IBAN Generator — Valid Mod-97 Checksum Online | BestMint",
      description:
        "Free test IBAN generator. Create placeholder IBANs for DE, GB, FR, ES, IT, NL with the correct length and mod-97 checksum. For testing, not real banking.",
      keywords: [
        "fake iban generator",
        "test iban generator",
        "iban mod 97",
        "valid iban generator",
        "european iban test",
      ],
    },
    faqs: [
      { q: "Will banks accept these IBANs?", a: "No. They have valid format and checksum but the bank/account portion is random and doesn't correspond to any real account — your bank's lookup will fail." },
      { q: "What's the mod-97 check?", a: "Every IBAN's last digits are computed so the rearranged number mod 97 equals 1. We compute it correctly so client-side validators accept the IBAN." },
      { q: "Can I use these for SEPA testing?", a: "For client-side and unit-test purposes, yes. For end-to-end transaction tests, use sandbox IBANs from your payment provider." },
    ],
  },
  {
    slug: "mock-json-builder",
    category: "generators",
    name: "Mock JSON Generator",
    tagline: "Build a custom JSON schema and generate fake data records.",
    summary:
      "Define a custom record shape — fields with types like string, integer, email, name, address, uuid, date, IPv4 — and generate any number of fake JSON records to seed databases, mock APIs or populate Figma component variants.",
    useCases: [
      "Mock API responses while a backend is still in development",
      "Seed JSON files for local development and testing",
      "Generate dataset fixtures for unit and integration tests",
      "Populate prototype apps with believable list data",
    ],
    icon: "{ }",
    seo: {
      title: "Mock JSON Generator — Free Custom-Schema Fake Data | BestMint",
      description:
        "Free mock JSON generator. Define a custom schema with strings, integers, emails, names, addresses, UUIDs and dates, then generate fake JSON records.",
      keywords: [
        "mock json generator",
        "fake json generator",
        "test data generator",
        "json schema generator",
        "api mock data",
      ],
    },
    faqs: [
      { q: "Can I save my schema?", a: "Schemas live in the page state for now. You can copy the JSON output to disk and rebuild the same schema next time — saved schemas are on the roadmap." },
      { q: "How realistic is the data?", a: "Names, emails, addresses and IPv4s come from short curated word and city lists — convincing in mockups but not statistically representative." },
      { q: "How many records can I generate?", a: "Up to 1,000 per click. For larger datasets, run multiple batches or use a script — the heavy lifting is fast either way because it all runs in the browser." },
    ],
  },
  {
    slug: "username-generator",
    category: "generators",
    name: "Username Generator",
    tagline: "Generate creative usernames from adjective + noun combos.",
    summary:
      "Generate batches of fun, memorable usernames from a curated list of ~100 adjectives and ~100 nouns. Choose a separator, optionally append a number and pick CamelCase or lowercase to fit the platform you're signing up for.",
    useCases: [
      "Brainstorm a unique handle for a new social media account",
      "Generate placeholder usernames for design mockups and avatars",
      "Mint default usernames for new user signups",
      "Find playful gamertags and Discord handles",
    ],
    icon: "👋",
    seo: {
      title: "Username Generator — Free Creative Username Ideas | BestMint",
      description:
        "Free username generator. Create batches of memorable adjective+noun usernames with optional numbers and separators. Browser-only, instant results.",
      keywords: [
        "username generator",
        "random username",
        "gamertag generator",
        "handle generator",
        "username ideas",
      ],
    },
    faqs: [
      { q: "Are these usernames available?", a: "We don't check availability — that varies by platform. Generate a few and try them on the site you want to sign up for." },
      { q: "Can I make them all lowercase?", a: "Yes. Leave the “CamelCase” option off and they'll be lowercase, perfect for Twitter, GitHub and most chat platforms." },
      { q: "How many combinations are there?", a: "About 10,000 base combinations from the word lists, multiplied further by separators and the optional appended number." },
    ],
  },
  {
    slug: "business-name-generator",
    category: "generators",
    name: "Business Name Generator",
    tagline: "Generate company name ideas in modern, classic, playful or tech style.",
    summary:
      "Brainstorm potential business names from a keyword and a style — modern, classic, playful or tech. Combines your keyword with curated prefixes and suffixes typical of each aesthetic and produces 10 fresh ideas every spin.",
    useCases: [
      "Brainstorm names for a new startup or side project",
      "Find a fresh name for a rebrand or product line",
      "Generate placeholder brand names for pitch decks",
      "Spark ideas for store names, podcasts and YouTube channels",
    ],
    icon: "🏷️",
    seo: {
      title: "Business Name Generator — Free Startup & Brand Names | BestMint",
      description:
        "Free business name generator. Brainstorm modern, classic, playful or tech-style company names from a keyword. Instant ideas, browser-only.",
      keywords: [
        "business name generator",
        "startup name generator",
        "brand name generator",
        "company name ideas",
        "name brainstorming tool",
      ],
    },
    faqs: [
      { q: "Are these names trademark-free?", a: "We don't check trademarks — always run a name search at your country's IP office and Google before committing." },
      { q: "Will domains be available?", a: "Sometimes. Pair this with our domain name generator to test variations and TLDs in one click." },
      { q: "What makes the styles different?", a: "Each style draws from a different prefix/suffix vocabulary — “Lumen”, “Nova” for modern; “Heritage”, “& Co” for classic; “Quantum”, “Labs” for tech, etc." },
    ],
  },
  {
    slug: "domain-name-generator",
    category: "generators",
    name: "Domain Name Generator",
    tagline: "Generate domain ideas from a keyword across multiple TLDs.",
    summary:
      "Generate creative domain name ideas by combining your keyword with curated startup prefixes and suffixes (get-, try-, -hq, -labs, -ly, -app) across the TLDs you select. Brainstorm faster than scrolling a registrar's suggestion list.",
    useCases: [
      "Brainstorm domains for a new product or landing page",
      "Find available alternatives when your first-choice .com is taken",
      "Test prefix/suffix combinations across .io, .ai and .dev",
      "Spark ideas for redirect domains and short-link bases",
    ],
    icon: "🌐",
    seo: {
      title: "Domain Name Generator — Free Startup Domain Ideas | BestMint",
      description:
        "Free domain name generator. Combine your keyword with startup-friendly prefixes/suffixes across .com, .io, .ai, .dev, .app and more. Instant ideas in the browser.",
      keywords: [
        "domain name generator",
        "startup domain ideas",
        "domain brainstorm tool",
        "tld generator",
        "domain ideas",
      ],
    },
    faqs: [
      { q: "Does this check availability?", a: "No. We only generate ideas — confirm availability at your favourite registrar (Namecheap, Cloudflare, Porkbun, etc.) before buying." },
      { q: "Why so many TLDs?", a: "Different TLDs read very differently — .ai for AI tools, .dev for devtools, .co for short and global, .app for mobile-feel — so we let you spin combinations across all of them at once." },
      { q: "Can I use longer keywords?", a: "Yes, but keep in mind shorter is usually better for a domain. The generator strips non-alphanumeric characters automatically." },
    ],
  },
  {
    slug: "dice-roller",
    category: "generators",
    name: "Online Dice Roller",
    tagline: "Roll d4, d6, d8, d10, d12, d20 or d100 dice with crypto randomness.",
    summary:
      "Roll any combination of polyhedral dice in your browser using cryptographic randomness — the same source used for security tokens. Pick a die size and count, see each individual roll plus the total, and review the last 20 rolls in a history panel.",
    useCases: [
      "Roll dice for D&D, Pathfinder and other tabletop RPGs",
      "Settle group decisions when no physical dice are around",
      "Generate random numbers for board games and giveaways",
      "Use d20s and d100s for percentage rolls and probabilities",
    ],
    icon: "🎲",
    seo: {
      title: "Online Dice Roller — Free d4/d6/d8/d10/d12/d20/d100 | BestMint",
      description:
        "Free online dice roller. Roll d4, d6, d8, d10, d12, d20 or d100 dice with cryptographically secure randomness. See each roll, total and last 20 history.",
      keywords: [
        "online dice roller",
        "d20 roller",
        "dnd dice roller",
        "rpg dice",
        "virtual dice",
      ],
    },
    faqs: [
      { q: "Is the randomness fair?", a: "Yes. We use crypto.getRandomValues, the browser's cryptographic random source. Distribution is uniform within each die's range." },
      { q: "Can I roll modifiers like 2d6+3?", a: "We handle the dice; add the modifier yourself or use a calculator. We may add expression input in a future update." },
      { q: "Why d100 and not d10?", a: "d100 is included for percentile rolls common in tabletop RPGs. Pick d10 if that's what your game wants." },
    ],
  },
  {
    slug: "coin-flip",
    category: "generators",
    name: "Coin Flip Simulator",
    tagline: "Flip a virtual coin with animation and running heads/tails count.",
    summary:
      "Flip a virtual coin in the browser with a smooth 3D-spin animation and cryptographic randomness. Track the last 20 flips in a history strip and watch your heads-vs-tails counts converge as you flip more — a live demonstration of probability.",
    useCases: [
      "Settle a quick decision when you don't have a physical coin",
      "Choose teams or who goes first in a game",
      "Demonstrate probability and the law of large numbers in class",
      "Generate fair binary outcomes for raffles and tie-breakers",
    ],
    icon: "🪙",
    seo: {
      title: "Coin Flip Online — Free Virtual Coin Toss | BestMint",
      description:
        "Free online coin flip. Animated virtual coin toss with cryptographic randomness, last-20 history and heads/tails count. Browser-only.",
      keywords: [
        "coin flip online",
        "virtual coin toss",
        "online coin flipper",
        "heads or tails",
        "random coin flip",
      ],
    },
    faqs: [
      { q: "Is the coin really 50/50?", a: "Yes — perfectly so. Each flip pulls a random byte from crypto.getRandomValues and maps even/odd to heads/tails." },
      { q: "Why does my history feel streaky?", a: "Truly random sequences contain runs of 5+ in a row more often than people expect. The counter on the right shows long-run convergence to 50/50." },
      { q: "Does it sync between devices?", a: "No — the history is in-memory only and clears when you reload the page." },
    ],
  },
  {
    slug: "decision-wheel",
    category: "generators",
    name: "Decision Wheel Spinner",
    tagline: "Add options, spin a colorful wheel, let randomness pick.",
    summary:
      "Add as many options as you want, then spin a colorful wheel that lands on a random one with a smooth deceleration. Great for picking what to eat for dinner, drawing winners, or letting a class pick the next activity without bias.",
    useCases: [
      "Pick what to eat for dinner among a few restaurant options",
      "Draw a giveaway winner from a small list of names",
      "Choose a random topic, exercise or warm-up in class",
      "Settle group decisions when no one wants to commit",
    ],
    icon: "🎡",
    seo: {
      title: "Decision Wheel Spinner — Free Random Picker Wheel | BestMint",
      description:
        "Free online decision wheel. Add options, spin a colorful wheel and let cryptographic randomness pick for you. Great for giveaways and quick decisions.",
      keywords: [
        "decision wheel",
        "spinner wheel",
        "random picker wheel",
        "online wheel of names",
        "yes no spinner",
      ],
    },
    faqs: [
      { q: "Is each option equally likely?", a: "Yes — slices are drawn equal-sized and the chosen option comes from a uniform random index." },
      { q: "How many options can I add?", a: "Practically up to a few dozen. Beyond that the slices get hard to read; for big lists use the random number tool to pick an index instead." },
      { q: "Does it save my options?", a: "Not yet — they reset on page reload. If you have a regular wheel you reuse, copying a list to a notes app is the fastest workaround for now." },
    ],
  },
  {
    slug: "random-letter",
    category: "generators",
    name: "Random Letter Generator",
    tagline: "Generate random letters with vowel, consonant or case filters.",
    summary:
      "Generate random letters from the English alphabet with optional filters for vowels, consonants, or a single case. Useful for word games, classroom activities, brainstorming prompts and anything that needs a quick alphabetic pick.",
    useCases: [
      "Pick a starting letter for word games like Scattergories",
      "Run alphabet warm-ups and prompts in classrooms",
      "Generate random initials for placeholder data",
      "Spark brainstorming sessions with a fresh letter prompt",
    ],
    icon: "🔤",
    seo: {
      title: "Random Letter Generator — Free Online Alphabet Picker | BestMint",
      description:
        "Free random letter generator. Pick random letters from A-Z with optional vowel/consonant or case filters. Cryptographically random, browser-only.",
      keywords: [
        "random letter generator",
        "random alphabet picker",
        "random vowel generator",
        "scattergories letter",
        "random consonant generator",
      ],
    },
    faqs: [
      { q: "Is each letter equally likely?", a: "Yes — every letter in the chosen pool has equal probability. With no filter, that's 1 in 52 (uppercase + lowercase)." },
      { q: "Can I pick a custom alphabet?", a: "Not yet — A-Z (with vowel/consonant/case filters) is supported now. Custom alphabets are on the roadmap." },
      { q: "Why use crypto randomness for letters?", a: "Overkill, technically — but it's the most defensible default. There's no observable bias even at huge sample sizes." },
    ],
  },
  // ─── New: Calculators ────────────────────────────────────────────────
  {
    slug: "loan-calculator",
    category: "calculators",
    name: "Loan Calculator",
    tagline: "Calculate monthly loan payments, total interest and a 12-month amortization.",
    summary:
      "Enter loan amount, interest rate and term to see your monthly payment, total interest paid and how each of the first twelve payments splits between principal and interest.",
    useCases: [
      "Estimate monthly payments before applying for a personal or auto loan",
      "Compare lenders by total interest paid over the life of the loan",
      "See how much of an early payment goes to principal vs interest",
      "Check the impact of a shorter or longer term on the monthly amount",
    ],
    icon: "💰",
    seo: {
      title: "Free Loan Calculator — Monthly Payment & Amortization | BestMint",
      description:
        "Free online loan calculator. Compute monthly payment, total interest, and an amortization schedule. Browser-only, no signup.",
      keywords: [
        "loan calculator",
        "monthly payment calculator",
        "amortization calculator",
        "personal loan calculator",
        "auto loan calculator",
      ],
    },
    faqs: [
      { q: "What formula is used?", a: "M = P · r · (1+r)^n / ((1+r)^n − 1), where r is the monthly rate and n the number of months." },
      { q: "Does it include taxes or fees?", a: "No — this is a pure principal & interest payment. Use the mortgage calculator for taxes, insurance and HOA." },
      { q: "Why does early interest dominate?", a: "Each payment is split based on remaining balance × monthly rate, so early payments are mostly interest." },
    ],
  },
  {
    slug: "mortgage-calculator",
    category: "calculators",
    name: "Mortgage Calculator",
    tagline: "Estimate monthly mortgage payments including taxes, insurance and HOA.",
    summary:
      "Compute your total monthly mortgage cost — principal & interest plus property tax, homeowners insurance and HOA. Adjust home price, down payment, rate and term to see how each affects your payment.",
    useCases: [
      "Decide how much house you can afford within a target monthly budget",
      "Compare 15-year vs 30-year terms by lifetime interest cost",
      "See the effect of a larger down payment on monthly payments",
      "Add tax and insurance escrow to estimate true PITI",
    ],
    icon: "🏠",
    seo: {
      title: "Free Mortgage Calculator — PITI Monthly Payment Estimator | BestMint",
      description:
        "Estimate monthly mortgage payments with principal, interest, taxes, insurance and HOA. Free, fast, browser-only.",
      keywords: [
        "mortgage calculator",
        "PITI calculator",
        "home loan calculator",
        "house payment calculator",
        "mortgage payment estimator",
      ],
    },
    faqs: [
      { q: "What is PITI?", a: "Principal, Interest, Taxes and Insurance — the four parts of a typical monthly mortgage payment." },
      { q: "Does it include PMI?", a: "Not directly — add an estimated PMI to the insurance field if your down payment is under 20%." },
      { q: "Are these numbers exact?", a: "Principal & interest are exact for the inputs given; taxes/insurance vary by jurisdiction and provider — get a real quote before closing." },
    ],
  },
  {
    slug: "compound-interest-calculator",
    category: "calculators",
    name: "Compound Interest Calculator",
    tagline: "See how investments grow with compounding and monthly contributions.",
    summary:
      "Project the future value of an investment with compound interest and optional monthly contributions. Choose annual, monthly, daily or continuous compounding and see a year-by-year balance breakdown.",
    useCases: [
      "Project retirement savings growth over decades",
      "Compare daily vs monthly compounding for high-yield savings accounts",
      "See the impact of adding a monthly contribution",
      "Demonstrate the power of compounding for financial education",
    ],
    icon: "📈",
    seo: {
      title: "Compound Interest Calculator — Free with Monthly Contributions | BestMint",
      description:
        "Free compound interest calculator. Project investment growth with annual, monthly, daily or continuous compounding plus monthly contributions.",
      keywords: [
        "compound interest calculator",
        "investment growth calculator",
        "savings calculator",
        "future value calculator",
        "retirement projection",
      ],
    },
    faqs: [
      { q: "What's continuous compounding?", a: "The mathematical limit as compounding frequency approaches infinity, computed via A = Pe^(rt)." },
      { q: "How are contributions handled?", a: "Monthly contributions are added at each compounding period — exact for monthly compounding, approximated for other frequencies." },
      { q: "Is interest taxed in the projection?", a: "No — this is pre-tax growth. Subtract your effective tax rate for after-tax estimates." },
    ],
  },
  {
    slug: "simple-interest-calculator",
    category: "calculators",
    name: "Simple Interest Calculator",
    tagline: "Compute simple interest with the formula I = P × r × t.",
    summary:
      "A quick simple-interest calculator. Enter principal, annual rate and time in years to see the interest accrued and the total amount.",
    useCases: [
      "Calculate interest on short-term personal loans",
      "Compute basic bond coupon payments",
      "Estimate interest on a fixed-deposit before tax",
      "Compare simple vs compound interest for math homework",
    ],
    icon: "🧮",
    seo: {
      title: "Free Simple Interest Calculator — I = P × r × t | BestMint",
      description:
        "Free simple interest calculator. Enter principal, rate and time to compute interest and total amount instantly.",
      keywords: [
        "simple interest calculator",
        "interest formula",
        "principal interest calculator",
        "loan interest calculator",
      ],
    },
    faqs: [
      { q: "Simple vs compound interest?", a: "Simple interest accrues only on the principal; compound interest accrues on principal + previously earned interest." },
      { q: "What's the formula?", a: "I = P × r × t, where r is the annual decimal rate and t the time in years." },
      { q: "Can t be a fraction?", a: "Yes — enter 0.5 for six months or 0.25 for three months." },
    ],
  },
  {
    slug: "salary-calculator",
    category: "calculators",
    name: "Salary Calculator",
    tagline: "Convert hourly to annual salary, with overtime support.",
    summary:
      "Convert hourly wage to annual, monthly, weekly and daily pay. Optionally apply 1.5× overtime for hours beyond 40 per week.",
    useCases: [
      "Compare a contract hourly rate to a salaried offer",
      "Estimate annual income for a part-time job",
      "Compute weekly take-home before tax",
      "See the value of overtime hours per week",
    ],
    icon: "💵",
    seo: {
      title: "Free Salary Calculator — Hourly to Annual with Overtime | BestMint",
      description:
        "Convert hourly wage to annual, monthly and weekly pay. Includes overtime at 1.5× over 40 hrs/week. Free and browser-only.",
      keywords: [
        "salary calculator",
        "hourly to annual",
        "wage calculator",
        "paycheck calculator",
        "overtime calculator",
      ],
    },
    faqs: [
      { q: "Is this gross or net?", a: "Gross — before taxes and deductions. Subtract your effective tax rate for take-home estimates." },
      { q: "How many weeks should I use?", a: "Use 52 for full-time; subtract paid time off (e.g. 50 for two weeks unpaid) if relevant." },
      { q: "How is overtime handled?", a: "Hours over 40 per week are paid at 1.5× the base hourly rate (US FLSA standard). Toggle off if your role is exempt." },
    ],
  },
  {
    slug: "discount-calculator",
    category: "calculators",
    name: "Discount Calculator",
    tagline: "Compute sale price from a discount % or work backwards from prices.",
    summary:
      "Two-way discount calculator. Enter original price + discount % to see the sale price, or enter both prices to compute the discount percentage and amount saved.",
    useCases: [
      "Verify retail sale prices match advertised discount",
      "Compare 20% off vs $20 off on different price points",
      "Convert a coupon code's discount to a final price",
      "Reverse-engineer the discount % a competitor is offering",
    ],
    icon: "🏷️",
    seo: {
      title: "Free Discount Calculator — Sale Price & % Off | BestMint",
      description:
        "Free discount calculator. Enter original price and percentage, or both prices, to compute sale price and savings. Browser-only.",
      keywords: [
        "discount calculator",
        "sale price calculator",
        "percent off calculator",
        "savings calculator",
      ],
    },
    faqs: [
      { q: "How is sale price computed?", a: "sale = original × (1 − discount/100)." },
      { q: "Does it handle stacked discounts?", a: "No — for stacked offers (e.g. 20% off + extra 10%), apply sequentially: chain two discount calculations." },
      { q: "Includes tax?", a: "No — use the sales tax calculator after computing the discounted price." },
    ],
  },
  {
    slug: "sales-tax-calculator",
    category: "calculators",
    name: "Sales Tax Calculator",
    tagline: "Add sales tax to a price or back out the pre-tax amount from a total.",
    summary:
      "Compute sales tax both ways: amount + rate → total with tax, and total + rate → pre-tax amount and tax portion. Useful for invoicing, expense reports and shopping comparisons.",
    useCases: [
      "Compute the total cost including local sales tax before checkout",
      "Back out the pre-tax amount from a receipt for expense reports",
      "Compare two cities' total cost with different tax rates",
      "Verify a vendor's tax line on an invoice",
    ],
    icon: "🧾",
    seo: {
      title: "Free Sales Tax Calculator — Forward & Reverse | BestMint",
      description:
        "Free sales tax calculator: add tax to a price or back out pre-tax from a total. Works for any rate. Browser-only, no signup.",
      keywords: [
        "sales tax calculator",
        "tax calculator",
        "vat calculator",
        "reverse sales tax",
        "pre-tax calculator",
      ],
    },
    faqs: [
      { q: "Does it work for VAT?", a: "Yes — the math is the same. Use your country's VAT rate (e.g. 20% UK, 19% Germany)." },
      { q: "Reverse formula?", a: "pre-tax = total / (1 + rate/100); tax = total − pre-tax." },
      { q: "Are rates exact?", a: "Yes — input rate is used directly. Look up your jurisdiction's combined rate (state + local) for accurate US calculations." },
    ],
  },
  {
    slug: "roi-calculator",
    category: "calculators",
    name: "ROI Calculator",
    tagline: "Calculate return on investment and annualized ROI.",
    summary:
      "Enter the initial investment and final value (and optional holding period) to compute profit, ROI percentage and annualized return.",
    useCases: [
      "Compare returns between stocks, real estate and other investments",
      "Evaluate a marketing campaign's return on ad spend",
      "Annualize a multi-year investment for comparison with annual benchmarks",
      "Decide whether to hold or sell based on annualized performance",
    ],
    icon: "📊",
    seo: {
      title: "Free ROI Calculator — Return on Investment & Annualized | BestMint",
      description:
        "Free ROI calculator. Compute profit, ROI percentage and annualized ROI from initial and final values. Browser-only.",
      keywords: [
        "roi calculator",
        "return on investment",
        "annualized roi",
        "investment return calculator",
      ],
    },
    faqs: [
      { q: "What's annualized ROI?", a: "The constant annual return that, compounded over the holding period, reaches the final value: (final/initial)^(1/years) − 1." },
      { q: "Why is annualized lower than total ROI?", a: "Because returns compound. A 100% return over 4 years is roughly 19% per year compounded, not 25%." },
      { q: "Includes fees?", a: "Subtract fees from the final value (or add to initial) for an after-fee ROI." },
    ],
  },
  {
    slug: "markup-margin-calculator",
    category: "calculators",
    name: "Markup & Margin Calculator",
    tagline: "Convert between cost, price, markup % and margin %.",
    summary:
      "Enter cost plus any one of markup %, margin % or selling price — see all four values. Handy for retail pricing and freelance quotes.",
    useCases: [
      "Set retail price from a target gross margin",
      "Convert a supplier's markup to your effective margin",
      "Quote a freelance project hitting a desired margin",
      "Verify a competitor's price against your cost basis",
    ],
    icon: "💹",
    seo: {
      title: "Free Markup & Margin Calculator — Cost, Price, % | BestMint",
      description:
        "Free markup and margin calculator. Convert between cost, selling price, markup % and gross margin %. Browser-only.",
      keywords: [
        "markup calculator",
        "margin calculator",
        "gross margin calculator",
        "retail pricing calculator",
      ],
    },
    faqs: [
      { q: "Markup vs margin?", a: "Markup = profit ÷ cost; margin = profit ÷ price. A 50% markup is a 33% margin — they're not the same." },
      { q: "Why is margin capped at 99.99%?", a: "Margin = (price − cost) / price approaches 100% only when cost → 0; a 100% margin is impossible at any positive cost." },
      { q: "Does it include sales tax?", a: "No — these are pre-tax pricing calculations. Add sales tax after." },
    ],
  },
  {
    slug: "gpa-calculator",
    category: "calculators",
    name: "GPA Calculator",
    tagline: "Compute weighted GPA on the standard 4.0 scale.",
    summary:
      "Add courses with credits and letter grades to compute your weighted grade point average on the US 4.0 scale. Supports plus/minus grading.",
    useCases: [
      "Calculate semester or cumulative GPA before official transcripts post",
      "Plan future grades needed to hit a target cumulative GPA",
      "Compare semesters to spot trends in academic performance",
      "Convert international grades to a 4.0 scale for US applications",
    ],
    icon: "🎓",
    seo: {
      title: "Free GPA Calculator — 4.0 Scale with Plus/Minus | BestMint",
      description:
        "Free GPA calculator on the 4.0 scale. Add courses with credits and letter grades. Supports A+, A, A- through F.",
      keywords: [
        "gpa calculator",
        "grade point average calculator",
        "college gpa",
        "high school gpa",
        "cumulative gpa",
      ],
    },
    faqs: [
      { q: "What scale is used?", a: "Standard US 4.0 scale: A/A+ = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, … F = 0.0." },
      { q: "How are credits weighted?", a: "GPA = Σ(grade × credits) / Σ(credits). A 4-credit A is worth more than a 1-credit A." },
      { q: "Does it support 5.0 weighted GPA?", a: "Not yet — for AP/IB weighted GPAs, treat A in an AP class as 5.0 manually before entry." },
    ],
  },
  {
    slug: "grade-calculator",
    category: "calculators",
    name: "Grade Calculator",
    tagline: "Compute the grade you need on the final to hit a target.",
    summary:
      "Enter your current course grade, the weight of the final exam and your target grade — get the score you need on the final to reach it.",
    useCases: [
      "Plan study effort by knowing exactly what you need on the final",
      "Decide whether a target grade is realistic before exam week",
      "Compute the floor grade needed to keep a scholarship",
      "Estimate the impact of weighted vs unweighted grading schemes",
    ],
    icon: "📚",
    seo: {
      title: "Final Grade Calculator — What You Need to Pass | BestMint",
      description:
        "Free final grade calculator. Enter current grade, weight and target to compute the score you need on the final exam.",
      keywords: [
        "final grade calculator",
        "grade needed calculator",
        "exam score calculator",
        "target grade calculator",
      ],
    },
    faqs: [
      { q: "What if it shows >100%?", a: "It means your target isn't achievable without extra credit. Lower your target or talk to your instructor." },
      { q: "What does negative mean?", a: "You can hit your target even with 0% on the final — congrats, you've already secured it." },
      { q: "Does it work for any grading scheme?", a: "Any percentage-weighted scheme. For category-weighted (homework 30%, tests 70%), reduce them to a current grade first." },
    ],
  },
  {
    slug: "body-fat-calculator",
    category: "calculators",
    name: "Body Fat Calculator",
    tagline: "Estimate body fat % using the US Navy circumference method.",
    summary:
      "Estimate body fat percentage using the US Navy formula based on neck, waist and (for women) hip circumferences plus height. Shows fat mass and lean mass too.",
    useCases: [
      "Track body composition changes during cutting or bulking phases",
      "Compare to BMI for a more nuanced fitness assessment",
      "Set realistic body composition goals based on athletic targets",
      "Re-measure quarterly without lab equipment",
    ],
    icon: "🏋️",
    seo: {
      title: "Free Body Fat Calculator — US Navy Method | BestMint",
      description:
        "Estimate body fat percentage using the US Navy circumference method. Free, browser-only, supports cm and inches.",
      keywords: [
        "body fat calculator",
        "us navy body fat",
        "body fat percentage",
        "body composition calculator",
      ],
    },
    faqs: [
      { q: "How accurate is the US Navy method?", a: "Within roughly ±3% for most adults. DEXA and hydrostatic weighing are more accurate but expensive." },
      { q: "Why are women's measurements different?", a: "The formula adds hip circumference because women carry more body fat in the lower body, which the neck and waist alone don't capture." },
      { q: "Does it work for athletes?", a: "Less reliable for very muscular or very lean individuals — bodybuilders may show falsely low or skewed values." },
    ],
  },
  {
    slug: "calorie-calculator",
    category: "calculators",
    name: "Calorie Calculator",
    tagline: "BMR and TDEE via Mifflin-St Jeor with cut/maintain/bulk targets.",
    summary:
      "Compute basal metabolic rate (BMR) and total daily energy expenditure (TDEE) using the Mifflin-St Jeor equation. Pick an activity level and see calorie targets for cutting, maintaining or bulking.",
    useCases: [
      "Set a daily calorie target for fat loss or muscle gain",
      "Estimate energy needs for a sedentary office job vs active lifestyle",
      "Plan macronutrient splits using TDEE as the calorie base",
      "Re-estimate calories after losing or gaining weight",
    ],
    icon: "🍎",
    seo: {
      title: "Free Calorie Calculator — BMR & TDEE | BestMint",
      description:
        "Free calorie calculator using Mifflin-St Jeor. Compute BMR and TDEE plus cutting, maintaining and bulking targets.",
      keywords: [
        "calorie calculator",
        "tdee calculator",
        "bmr calculator",
        "daily calorie needs",
        "mifflin st jeor",
      ],
    },
    faqs: [
      { q: "Why Mifflin-St Jeor?", a: "It's more accurate than the older Harris-Benedict for modern populations. Used by most clinicians and apps." },
      { q: "Activity multiplier definitions?", a: "Sedentary = desk job; lightly active = light exercise 1-3 days; moderate = exercise 3-5 days; very = hard exercise 6-7 days; extra = physical job + daily training." },
      { q: "How fast will I lose weight at -500?", a: "Roughly 1 lb (0.45 kg) per week. Larger deficits risk muscle loss; consult a clinician for medical weight loss." },
    ],
  },
  {
    slug: "macro-calculator",
    category: "calculators",
    name: "Macro Calculator",
    tagline: "Convert daily calories into protein, carb and fat grams.",
    summary:
      "Enter daily calories and choose a macronutrient split (balanced, low-carb, keto, high-protein or custom) to see grams of protein, carbs and fat per day.",
    useCases: [
      "Plan daily meals for a balanced or keto diet",
      "Switch between cutting and bulking macro splits",
      "Convert a calorie target into actionable food quantities",
      "Compare presets to find the diet style that fits your goals",
    ],
    icon: "🥑",
    seo: {
      title: "Free Macro Calculator — Protein/Carbs/Fat from Calories | BestMint",
      description:
        "Free macro calculator. Convert daily calories into grams of protein, carbs and fat using preset or custom ratios.",
      keywords: [
        "macro calculator",
        "macros calculator",
        "protein carbs fat calculator",
        "keto macros",
        "iifym calculator",
      ],
    },
    faqs: [
      { q: "Calories per gram?", a: "Protein 4 kcal/g, carbs 4 kcal/g, fat 9 kcal/g. (Alcohol = 7 kcal/g, not included.)" },
      { q: "Best ratio for fat loss?", a: "Higher protein (30-40%) helps preserve muscle. Carbs and fat split depends on personal preference and training type." },
      { q: "Does it adjust for body weight?", a: "No — input your TDEE-based calories first. Use the calorie calculator to set them." },
    ],
  },
  {
    slug: "pace-calculator",
    category: "calculators",
    name: "Pace Calculator",
    tagline: "Solve for running pace, time or distance — in km or miles.",
    summary:
      "Three calculators in one: enter distance and time to find pace, pace and distance to find time, or pace and time to find distance. Switch freely between km and miles.",
    useCases: [
      "Plan target paces for a 5k, 10k, half marathon or marathon",
      "Convert treadmill pace from min/mi to min/km",
      "Estimate finish time for a race based on training pace",
      "Plan distance covered in a fixed-time tempo run",
    ],
    icon: "🏃",
    seo: {
      title: "Free Running Pace Calculator — Pace, Time, Distance | BestMint",
      description:
        "Free pace calculator for runners. Solve for pace, time or distance in km or miles. Browser-only.",
      keywords: [
        "pace calculator",
        "running pace calculator",
        "marathon pace calculator",
        "min per mile calculator",
        "min per km calculator",
      ],
    },
    faqs: [
      { q: "How is pace different from speed?", a: "Pace is time per unit distance (min/km); speed is distance per unit time (km/h). They're inverses." },
      { q: "Convert mph to min/mile?", a: "min/mile = 60 / mph. So 6 mph = 10 min/mile." },
      { q: "Does it work for cycling/swimming?", a: "Yes — though cyclists usually prefer speed (mph or km/h). The math is the same." },
    ],
  },
  {
    slug: "pregnancy-due-date",
    category: "calculators",
    name: "Pregnancy Due Date Calculator",
    tagline: "Estimate your due date from the last menstrual period (LMP).",
    summary:
      "Enter the date of your last menstrual period to estimate the due date (LMP + 280 days) and see current week, trimester and days remaining. Always confirm with a clinician.",
    useCases: [
      "Estimate the due date early in pregnancy",
      "Track week-by-week progress and trimester transitions",
      "Plan parental leave around the expected delivery date",
      "Count down days remaining until the due date",
    ],
    icon: "👶",
    seo: {
      title: "Pregnancy Due Date Calculator — LMP Method | BestMint",
      description:
        "Free pregnancy due date calculator using the LMP method. See current week, trimester and days remaining.",
      keywords: [
        "pregnancy due date calculator",
        "due date calculator",
        "lmp calculator",
        "pregnancy week calculator",
      ],
    },
    faqs: [
      { q: "How accurate is the LMP method?", a: "Roughly ±2 weeks for most pregnancies. First-trimester ultrasound is more accurate and is used to refine the date." },
      { q: "What's Naegele's rule?", a: "LMP + 280 days (or LMP + 9 months + 7 days). Assumes a 28-day cycle with ovulation on day 14." },
      { q: "Should I rely on this?", a: "No — this is an estimate only. Use it as a starting point and confirm with prenatal care." },
    ],
  },
  {
    slug: "fuel-economy-calculator",
    category: "calculators",
    name: "Fuel Economy Calculator",
    tagline: "Convert distance and fuel into MPG, L/100km and km/L.",
    summary:
      "Enter distance and fuel used to compute fuel economy in US MPG, UK MPG, L/100km and km/L. Mix and match input units freely.",
    useCases: [
      "Track real-world fuel economy from tank-to-tank",
      "Compare US and UK MPG ratings (UK gallons are bigger)",
      "Convert manufacturer L/100km specs to MPG before buying",
      "Estimate trip cost from distance and known economy",
    ],
    icon: "⛽",
    seo: {
      title: "Free Fuel Economy Calculator — MPG, L/100km, km/L | BestMint",
      description:
        "Free fuel economy calculator. Compute MPG (US/UK), L/100km and km/L from distance and fuel used. Browser-only.",
      keywords: [
        "fuel economy calculator",
        "mpg calculator",
        "l/100km calculator",
        "gas mileage calculator",
        "fuel consumption calculator",
      ],
    },
    faqs: [
      { q: "Why is UK MPG higher than US MPG?", a: "UK gallons are 4.546 L vs US 3.785 L — about 20% larger. Same car shows higher MPG in UK terms." },
      { q: "L/100km lower is better?", a: "Yes — it's consumption (lower = uses less fuel per distance). MPG is the inverse: higher = better." },
      { q: "Convert MPG to L/100km?", a: "L/100km = 235.215 / MPG (US). So 30 MPG ≈ 7.84 L/100km." },
    ],
  },
  {
    slug: "ratio-calculator",
    category: "calculators",
    name: "Ratio Calculator",
    tagline: "Solve A:B = C:D for any single missing value.",
    summary:
      "Enter three of the four values in the proportion A:B = C:D and the calculator solves for the fourth. Useful for scaling recipes, blueprints and conversions.",
    useCases: [
      "Scale a recipe by computing the new ingredient amount",
      "Resize an image proportionally given target width or height",
      "Compute a missing dimension on a scaled blueprint",
      "Solve unit-conversion proportions in homework",
    ],
    icon: "⚖️",
    seo: {
      title: "Free Ratio Calculator — Solve A:B = C:D | BestMint",
      description:
        "Free ratio calculator. Solve any proportion A:B = C:D for the missing value. Browser-only, no signup.",
      keywords: [
        "ratio calculator",
        "proportion calculator",
        "ratio solver",
        "scale calculator",
      ],
    },
    faqs: [
      { q: "What's a proportion?", a: "An equation showing two ratios are equal: A/B = C/D. Cross-multiply to solve: AD = BC." },
      { q: "Can I leave more than one blank?", a: "No — the proportion has one degree of freedom. With two unknowns, infinite solutions exist." },
      { q: "Does it simplify ratios?", a: "Not currently — it solves for missing values. For simplification, divide both sides by the GCD." },
    ],
  },
  {
    slug: "average-mean-median-mode",
    category: "calculators",
    name: "Mean, Median, Mode Calculator",
    tagline: "Compute mean, median, mode, range, variance and standard deviation.",
    summary:
      "Paste a list of numbers (separated by commas, spaces or newlines) to instantly see count, sum, mean, median, mode(s), min, max, range, variance and standard deviation.",
    useCases: [
      "Summarize a small dataset for a report or presentation",
      "Verify spreadsheet stats without opening Excel or Sheets",
      "Compute standard deviation for a quick variance check",
      "Identify mode(s) in survey responses or test scores",
    ],
    icon: "📐",
    seo: {
      title: "Free Mean Median Mode Calculator — Plus Std Dev | BestMint",
      description:
        "Free statistics calculator. Compute mean, median, mode, range, variance and standard deviation from any list of numbers.",
      keywords: [
        "mean calculator",
        "median calculator",
        "mode calculator",
        "standard deviation calculator",
        "variance calculator",
        "average calculator",
      ],
    },
    faqs: [
      { q: "What if there's no mode?", a: "If every value appears once, there's no mode — we display a dash. With ties, we show all tied values." },
      { q: "Population or sample variance?", a: "Population variance (divides by n). For sample variance (divides by n − 1), multiply by n / (n − 1)." },
      { q: "How are inputs parsed?", a: "Split on any combination of commas, spaces, semicolons or newlines. Non-numeric tokens are ignored." },
    ],
  },
  {
    slug: "permutation-combination",
    category: "calculators",
    name: "Permutation & Combination Calculator",
    tagline: "Compute nPr and nCr with arbitrary-precision BigInt.",
    summary:
      "Enter n and r to compute nPr (permutations, order matters) and nCr (combinations, order ignored). Uses BigInt so large factorials don't overflow.",
    useCases: [
      "Count poker hands and lottery combinations",
      "Solve probability and combinatorics homework",
      "Estimate the number of password permutations for security analysis",
      "Compute team selections from a roster",
    ],
    icon: "🔢",
    seo: {
      title: "Free Permutation & Combination Calculator — nPr nCr | BestMint",
      description:
        "Free nPr and nCr calculator with BigInt precision. Compute permutations and combinations of any size.",
      keywords: [
        "permutation calculator",
        "combination calculator",
        "nPr calculator",
        "nCr calculator",
        "factorial calculator",
      ],
    },
    faqs: [
      { q: "Permutation vs combination?", a: "Permutations consider order (ABC ≠ BCA); combinations don't (ABC = BCA). nCr = nPr / r!." },
      { q: "Why BigInt?", a: "20! already exceeds JavaScript's safe-integer range. BigInt gives exact results for arbitrarily large n." },
      { q: "Constraints on n and r?", a: "Both must be non-negative integers with r ≤ n. The calculator validates this before computing." },
    ],
  },
  {
    slug: "quadratic-solver",
    category: "calculators",
    name: "Quadratic Equation Solver",
    tagline: "Solve ax² + bx + c = 0 with discriminant and complex roots.",
    summary:
      "Enter a, b and c to solve any quadratic equation. The solver shows the discriminant, real or complex roots and indicates the root type.",
    useCases: [
      "Solve quadratic equations in algebra homework",
      "Find roots for physics motion problems",
      "Identify complex roots when the discriminant is negative",
      "Verify factoring or completing-the-square answers",
    ],
    icon: "✖",
    seo: {
      title: "Free Quadratic Equation Solver — Real & Complex Roots | BestMint",
      description:
        "Free quadratic solver. Enter a, b, c — get discriminant and both roots, real or complex. Browser-only.",
      keywords: [
        "quadratic solver",
        "quadratic equation calculator",
        "quadratic formula calculator",
        "discriminant calculator",
      ],
    },
    faqs: [
      { q: "What if a = 0?", a: "Then it's linear, not quadratic. The solver flags this and won't divide by zero." },
      { q: "Discriminant interpretation?", a: "Positive: two distinct real roots. Zero: one repeated real root. Negative: two complex conjugate roots." },
      { q: "Why does it show roots as decimals?", a: "Numerical accuracy is limited to ~6 significant figures. For exact symbolic roots, use a CAS like SymPy." },
    ],
  },
  {
    slug: "fraction-calculator",
    category: "calculators",
    name: "Fraction Calculator",
    tagline: "Add, subtract, multiply or divide fractions and simplify.",
    summary:
      "Enter two fractions and an operator (+, −, ×, ÷). The calculator computes the result, simplifies via GCD and shows the decimal equivalent.",
    useCases: [
      "Help kids with fraction homework, step by step",
      "Combine measurements in cooking and woodworking",
      "Simplify a complicated fraction quickly",
      "Convert between fraction and decimal forms",
    ],
    icon: "½",
    seo: {
      title: "Free Fraction Calculator — Add, Subtract, Multiply, Divide | BestMint",
      description:
        "Free fraction calculator with simplification. Add, subtract, multiply or divide fractions and see the simplified result.",
      keywords: [
        "fraction calculator",
        "add fractions",
        "subtract fractions",
        "multiply fractions",
        "divide fractions",
      ],
    },
    faqs: [
      { q: "How is the result simplified?", a: "We compute the GCD of numerator and denominator using Euclid's algorithm and divide both." },
      { q: "Does it handle mixed numbers?", a: "Convert mixed numbers to improper fractions first (e.g., 1¾ = 7/4)." },
      { q: "What about negatives?", a: "Yes — negative numerators or denominators work. The simplified result keeps the sign on the numerator." },
    ],
  },
  {
    slug: "data-storage-converter",
    category: "calculators",
    name: "Data Storage Converter",
    tagline: "Convert between bits, bytes, KB/MB/GB and KiB/MiB/GiB.",
    summary:
      "Convert any amount of digital storage between decimal units (KB, MB, GB based on 1000) and binary units (KiB, MiB, GiB based on 1024). Live grid shows all units.",
    useCases: [
      "Compare hard drive marketing GB to OS GiB",
      "Convert Mbps download speeds to MB/s file transfer time",
      "Size a database or backup against a disk quota",
      "Demystify the difference between 1 MB and 1 MiB",
    ],
    icon: "💾",
    seo: {
      title: "Free Data Storage Converter — KB, MB, GB, KiB, MiB | BestMint",
      description:
        "Free data storage unit converter. Convert between bits, bytes and decimal/binary units (KB vs KiB, MB vs MiB).",
      keywords: [
        "data storage converter",
        "byte converter",
        "kb to mb",
        "gb to gib",
        "binary prefix converter",
      ],
    },
    faqs: [
      { q: "KB vs KiB?", a: "KB (decimal) = 1000 bytes; KiB (binary) = 1024 bytes. Drive vendors use decimal; operating systems usually display binary." },
      { q: "Why does my 1 TB drive show as 931 GB?", a: "1 TB (decimal) = 10^12 bytes ≈ 0.909 TiB. Windows shows 'GB' but means GiB, hence the smaller number." },
      { q: "Bits vs bytes?", a: "1 byte = 8 bits. Network speeds use bits (Mbps); file sizes use bytes (MB). Divide Mbps by 8 to get MB/s." },
    ],
  },
  {
    slug: "bandwidth-converter",
    category: "calculators",
    name: "Bandwidth Converter",
    tagline: "Convert between bps, Kbps, Mbps, Gbps and bytes-per-second variants.",
    summary:
      "Convert any network speed between bits-per-second (bps, Kbps, Mbps, Gbps, Tbps) and bytes-per-second (Bps, KBps, MBps, GBps). Live grid shows all units side-by-side.",
    useCases: [
      "Convert your ISP's advertised Mbps to MB/s download speed",
      "Compare two hosting plans listed in different bandwidth units",
      "Estimate streaming bandwidth for video conferencing or 4K streams",
      "Size a network link against expected throughput",
    ],
    icon: "📡",
    seo: {
      title: "Free Bandwidth Converter — Mbps to MB/s, Kbps, Gbps | BestMint",
      description:
        "Free bandwidth unit converter. Convert between bps, Kbps, Mbps, Gbps and byte-rate variants (MB/s).",
      keywords: [
        "bandwidth converter",
        "mbps to mbps",
        "mbps to mb/s",
        "network speed converter",
        "bandwidth calculator",
      ],
    },
    faqs: [
      { q: "Mbps vs MBps?", a: "Mbps is megabits per second (lowercase b); MBps is megabytes per second (uppercase B). 1 byte = 8 bits, so 100 Mbps = 12.5 MBps." },
      { q: "Decimal or binary?", a: "Network speeds use decimal prefixes (1 Mbps = 10^6 bps). Storage uses binary (MiB = 2^20)." },
      { q: "Why does my download show ~12.5 MB/s on 100 Mbps?", a: "Because Mbps ÷ 8 ≈ MB/s. Real speeds are slightly lower after protocol overhead." },
    ],
  },
  {
    slug: "cooking-converter",
    category: "calculators",
    name: "Cooking Measurement Converter",
    tagline: "Convert cups, tbsp, tsp, ml, oz, grams and pounds for cooking.",
    summary:
      "Two side-by-side converters: volume (cups, tbsp, tsp, ml, fl oz) and weight (g, kg, oz, lb). Type any value and see all other units instantly.",
    useCases: [
      "Convert a US recipe to metric for international cooking",
      "Scale a recipe up or down with mixed units",
      "Convert tablespoons to grams for precise baking",
      "Translate UK recipe imperial units to US cup measurements",
    ],
    icon: "🍳",
    seo: {
      title: "Free Cooking Measurement Converter — Cups, Tbsp, ML, G | BestMint",
      description:
        "Free cooking unit converter. Convert volume (cups, tbsp, tsp, ml) and weight (g, oz, lb) for recipes.",
      keywords: [
        "cooking converter",
        "recipe converter",
        "cups to grams",
        "tbsp to ml",
        "kitchen unit converter",
      ],
    },
    faqs: [
      { q: "Why doesn't 1 cup of flour weigh the same as 1 cup of sugar?", a: "Volume-to-weight depends on the ingredient's density. We don't include ingredient-specific weights — use a kitchen scale for precision." },
      { q: "US or UK cups?", a: "We use the US cup (236.588 ml). UK and metric cups differ slightly (250 ml metric, 284 ml UK)." },
      { q: "Are oz here weight or fluid?", a: "We show both: weight oz under Weight (28.35 g) and fluid oz under Volume (29.57 ml)." },
    ],
  },
  {
    slug: "shoe-size-converter",
    category: "calculators",
    name: "Shoe Size Converter",
    tagline: "Convert shoe sizes between US, UK, EU and JP for men, women and kids.",
    summary:
      "Pick gender (men, women, kids) and an input system (US, UK, EU, JP cm) — the converter finds the closest match and shows equivalents in all systems plus a full reference table.",
    useCases: [
      "Order shoes from international retailers without sizing surprises",
      "Convert European shoe sizes to US for online shopping",
      "Find Japanese (cm) sizes when buying from Japanese brands",
      "Reference men's vs women's vs kids' size mappings",
    ],
    icon: "👟",
    seo: {
      title: "Free Shoe Size Converter — US, UK, EU, JP for Men, Women, Kids | BestMint",
      description:
        "Free international shoe size converter. Convert between US, UK, EU and JP sizes for men, women and kids.",
      keywords: [
        "shoe size converter",
        "shoe size chart",
        "us to eu shoe size",
        "uk shoe size converter",
        "japan shoe size",
      ],
    },
    faqs: [
      { q: "Are conversions exact?", a: "No — sizing varies by brand. Treat conversions as a starting point and check the brand's own chart when possible." },
      { q: "Why is JP in cm?", a: "Japanese sizing uses foot length in centimeters directly, which is actually the most precise system." },
      { q: "How do men's and women's sizes relate?", a: "Roughly: women's US = men's US + 1.5. But brand-specific charts vary; always check before buying." },
    ],
  },
  {
    slug: "clothing-size-converter",
    category: "calculators",
    name: "Clothing Size Converter",
    tagline: "Convert clothing sizes between US, UK, EU and numeric for men and women.",
    summary:
      "Choose a garment (men/women shirt or pants), an input system and a size — see all equivalent sizes and a full reference table. Approximate conversions for brand-independent sizing.",
    useCases: [
      "Order clothing from international brands with confidence",
      "Convert UK/EU sizes to US labels for online shopping",
      "Compare a designer's numeric sizing with letter-based equivalents",
      "Translate menswear suit sizing across markets",
    ],
    icon: "👕",
    seo: {
      title: "Free Clothing Size Converter — US, UK, EU for Men and Women | BestMint",
      description:
        "Free clothing size converter. Convert between US, UK, EU and numeric sizes for men's and women's shirts and pants.",
      keywords: [
        "clothing size converter",
        "clothes size chart",
        "us to eu clothing",
        "shirt size converter",
        "pants size converter",
      ],
    },
    faqs: [
      { q: "Are sizes brand-consistent?", a: "Not really — vanity sizing means a US 8 today can be a 1990s 12. Always check a brand's chart for body measurements." },
      { q: "Why is women's sizing so varied?", a: "Multiple competing standards exist (US misses, US juniors, EU, UK), and most brands don't conform precisely. Trying on still beats charts." },
      { q: "What about plus sizes and tall/short?", a: "Not currently included — these need brand-specific charts to be accurate." },
    ],
  },
  {
    slug: "wind-chill-calculator",
    category: "calculators",
    name: "Wind Chill Calculator",
    tagline: "Compute apparent temperature from cold air + wind via the NWS formula.",
    summary:
      "Enter temperature and wind speed to compute the wind chill — the apparent temperature when cold air is moved by wind across exposed skin. Uses the official US NWS 2001 formula.",
    useCases: [
      "Decide what to wear before going out in cold, windy weather",
      "Assess frostbite risk for outdoor activities",
      "Compare wind chill across cities for trip planning",
      "Convert wind chill values between °F and °C",
    ],
    icon: "🥶",
    seo: {
      title: "Free Wind Chill Calculator — NWS Formula | BestMint",
      description:
        "Free wind chill calculator using the official US NWS formula. Enter temperature and wind speed; see apparent temp in °F and °C.",
      keywords: [
        "wind chill calculator",
        "feels like temperature",
        "nws wind chill",
        "apparent temperature",
      ],
    },
    faqs: [
      { q: "When is the formula valid?", a: "Temperature ≤ 50 °F (10 °C) and wind speed ≥ 3 mph (5 km/h). Outside that range, wind chill is undefined." },
      { q: "Why doesn't wind chill apply to objects?", a: "Wind chill quantifies heat loss from human skin (37 °C surface). An object can't be cooled below the actual air temperature by wind alone." },
      { q: "What's the formula?", a: "WC = 35.74 + 0.6215T − 35.75V^0.16 + 0.4275T·V^0.16, with T in °F and V in mph." },
    ],
  },
  {
    slug: "heat-index-calculator",
    category: "calculators",
    name: "Heat Index Calculator",
    tagline: "Compute apparent temperature from heat + humidity (NWS Rothfusz).",
    summary:
      "Enter air temperature and relative humidity to compute the heat index — how hot it actually feels. Uses the NWS Rothfusz regression with caution-level warnings.",
    useCases: [
      "Assess heat-stroke risk before outdoor exercise on humid days",
      "Decide whether to schedule outdoor events during a heat wave",
      "Understand why 90 °F at 80% humidity feels like 105 °F",
      "Verify weather app heat index numbers",
    ],
    icon: "🥵",
    seo: {
      title: "Free Heat Index Calculator — NWS Rothfusz Formula | BestMint",
      description:
        "Free heat index calculator using the NWS Rothfusz regression. Enter temperature and humidity; see apparent temp and warning level.",
      keywords: [
        "heat index calculator",
        "feels like calculator",
        "humidity calculator",
        "nws heat index",
        "apparent temperature",
      ],
    },
    faqs: [
      { q: "When does heat index apply?", a: "Most accurate for T ≥ 80 °F and RH ≥ 40%. Below that, the formula falls back to a simpler average." },
      { q: "What do the warning levels mean?", a: "<80 safe; 80-90 caution; 90-103 extreme caution; 103-125 danger; >125 extreme danger (heat stroke imminent)." },
      { q: "Why does humidity matter?", a: "High humidity slows sweat evaporation, the body's main cooling mechanism. Hot + dry air feels cooler than hot + humid." },
    ],
  },
  {
    slug: "ohms-law-calculator",
    category: "calculators",
    name: "Ohm's Law Calculator",
    tagline: "Compute voltage, current, resistance and power from any two values.",
    summary:
      "Enter any two of voltage (V), current (I), resistance (R) or power (P) — the calculator solves for the other two using Ohm's law and the power formulas.",
    useCases: [
      "Size a resistor for an LED based on supply voltage and target current",
      "Compute power dissipation in a resistor for thermal margin",
      "Verify a multimeter reading against expected values",
      "Solve electrical homework problems quickly",
    ],
    icon: "⚡",
    seo: {
      title: "Free Ohm's Law Calculator — V, I, R, P | BestMint",
      description:
        "Free Ohm's law calculator. Enter any two of voltage, current, resistance or power — get the other two instantly.",
      keywords: [
        "ohms law calculator",
        "voltage current resistance",
        "power calculator",
        "electrical calculator",
        "watts calculator",
      ],
    },
    faqs: [
      { q: "What are the formulas?", a: "V = IR · P = VI · P = I²R · P = V²/R. Any two values uniquely determine the others." },
      { q: "What if I enter 3 values?", a: "We use the first two valid inputs we find. For consistency, leave two blank to be explicit about which to solve for." },
      { q: "Does it work for AC?", a: "These formulas are for DC circuits. AC requires impedance, phase and RMS — beyond the scope of basic Ohm's law." },
    ],
  },
  // ─── New: Date & Time ────────────────────────────────────────────────
  {
    slug: "countdown-timer",
    category: "datetime",
    name: "Countdown Timer",
    tagline: "Live countdown to any future date and time, ticking second by second.",
    summary:
      "Pick a target date and time and watch a live countdown of days, hours, minutes and seconds. After the moment passes, it switches to a count-up showing how much time has elapsed. Runs entirely in your browser.",
    useCases: [
      "Build anticipation for product launches, weddings or birthdays",
      "Track time remaining until a deadline or exam",
      "Show how long until a conference, flight or vacation",
      "Count up since an anniversary or sober date once it has passed",
    ],
    icon: "⏳",
    seo: {
      title: "Free Countdown Timer Online — Countdown to Any Date | BestMint",
      description:
        "Free online countdown timer. Set a target date and time and watch a live countdown of days, hours, minutes and seconds. Runs in your browser, no signup.",
      keywords: [
        "countdown timer",
        "countdown to date",
        "online countdown",
        "days until calculator",
        "event countdown",
      ],
    },
    faqs: [
      { q: "Does the countdown keep running if I close the tab?", a: "No — the countdown is recalculated from your target each second while the page is open. Reopen the page and it will pick up where it should be." },
      { q: "What happens after the target time passes?", a: "The display switches to a count-up showing how long ago the moment occurred (\"Time elapsed\")." },
      { q: "What timezone does it use?", a: "Your local timezone, taken from your browser. The target you pick is interpreted as local time." },
    ],
  },
  {
    slug: "world-clock",
    category: "datetime",
    name: "World Clock",
    tagline: "Live clocks across multiple timezones with offsets and dates.",
    summary:
      "See current time in any combination of cities and timezones, updating live every second. Includes the local date and the UTC offset for each zone. Add or remove zones as needed.",
    useCases: [
      "Coordinate calls across global teams (NYC, London, Tokyo, Sydney)",
      "Plan livestreams that hit a friendly hour in each region",
      "Track market open/close times in different financial centers",
      "See what time it is for friends and family abroad before calling",
    ],
    icon: "🌍",
    seo: {
      title: "World Clock — Free Multi-Timezone Clock Online | BestMint",
      description:
        "Free online world clock. View current time in any city or IANA timezone with live-updating clocks, dates and UTC offsets. Browser-only, no signup.",
      keywords: [
        "world clock",
        "timezone clock",
        "current time in cities",
        "multi timezone clock",
        "live world clock",
      ],
    },
    faqs: [
      { q: "Where does the timezone list come from?", a: "We use IANA timezone identifiers (like \"America/New_York\") through your browser's Intl APIs, so daylight saving rules are always current." },
      { q: "How accurate are the clocks?", a: "Clocks tick once per second from your device's local time. Accuracy depends on your system clock — sync via NTP for best results." },
      { q: "Can I add a city not in the list?", a: "We seed the most common IANA zones. If your city isn't shown, pick the nearest one in the same zone — they share the same time." },
    ],
  },
  {
    slug: "workday-calculator",
    category: "datetime",
    name: "Workday Calculator",
    tagline: "Add or subtract business days, optionally skipping weekends and US federal holidays.",
    summary:
      "Calculate a target date by adding or subtracting business days from a start date. Optionally skip weekends and a built-in list of US federal holidays for the surrounding years. Useful for SLA, payroll and project deadlines.",
    useCases: [
      "Determine an SLA due date that excludes weekends and holidays",
      "Calculate net-30 invoice payment dates in business days",
      "Project end dates for short tasks measured in workdays",
      "Schedule onboarding milestones that should fall on a weekday",
    ],
    icon: "📅",
    seo: {
      title: "Free Workday / Business Day Calculator | BestMint",
      description:
        "Free workday calculator. Add or subtract business days from any date, skipping weekends and US federal holidays. Browser-only, instant results.",
      keywords: [
        "workday calculator",
        "business day calculator",
        "add business days",
        "subtract business days",
        "workday counter",
      ],
    },
    faqs: [
      { q: "Which holidays are included?", a: "Common US federal holidays (New Year's, MLK, Presidents' Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas) for the surrounding years." },
      { q: "Are observed holidays handled correctly?", a: "Mostly — the embedded list uses the actual fixed/observed dates as published. For region-specific or company holidays, do a manual adjustment." },
      { q: "Can I subtract instead of add?", a: "Yes — switch direction to \"subtract\" and the calculator counts backwards while still skipping weekends and holidays if selected." },
    ],
  },
  {
    slug: "week-number-calculator",
    category: "datetime",
    name: "Week Number Calculator",
    tagline: "ISO 8601 and US week numbers, day of year and days remaining.",
    summary:
      "Pick a date and instantly see its ISO 8601 week, US week number, day of year, days in the month and days remaining in the year. Handy for project tracking and reporting.",
    useCases: [
      "Reference ISO week numbers in project trackers and Gantt charts",
      "File weekly reports tagged with the correct week",
      "Plan annual budgets or campaigns by day of year",
      "Confirm whether a year contains 52 or 53 ISO weeks",
    ],
    icon: "🗓️",
    seo: {
      title: "Week Number Calculator — ISO 8601 & US Week Numbers | BestMint",
      description:
        "Find the ISO 8601 week number, US week number, day of year and days-remaining-in-year for any date. Free, browser-based, instant.",
      keywords: [
        "week number calculator",
        "iso 8601 week number",
        "what week is it",
        "day of year",
        "us week number",
      ],
    },
    faqs: [
      { q: "What is the ISO 8601 week number?", a: "ISO 8601 numbers weeks starting on Monday and assigns week 1 to the week containing the year's first Thursday. Most of Europe and many software libraries use this convention." },
      { q: "How does the US week number differ?", a: "The US convention treats week 1 as the week containing January 1, with weeks starting on Sunday. So the same calendar date can have different numbers in each system." },
      { q: "Why does my year sometimes have 53 weeks?", a: "ISO years with 53 weeks happen when January 1 is a Thursday or, in a leap year, a Wednesday." },
    ],
  },
  {
    slug: "weekday-finder",
    category: "datetime",
    name: "Weekday Finder",
    tagline: "Look up the day of the week for any date, in multiple languages.",
    summary:
      "Pick any date past or future and see what day of the week it falls on. The result is shown in English, Spanish, French and Chinese using your browser's Intl APIs.",
    useCases: [
      "Confirm the day of the week for a historical event or birthday",
      "Plan future dates without a paper calendar",
      "Translate weekdays for multilingual scheduling",
      "Settle bets about \"what day was it?\"",
    ],
    icon: "📆",
    seo: {
      title: "Weekday Finder — What Day of the Week Was It? | BestMint",
      description:
        "Find the day of the week for any past or future date. Shows the weekday in English, Spanish, French and Chinese. Free and instant.",
      keywords: [
        "weekday finder",
        "what day of the week",
        "day of the week calculator",
        "what day was i born",
        "day name lookup",
      ],
    },
    faqs: [
      { q: "How far back or forward can it go?", a: "Anywhere your browser's Date can represent — roughly ±271,820 years from 1970." },
      { q: "Is it accurate for historical dates?", a: "It uses the proleptic Gregorian calendar, so dates before the Gregorian switchover (1582 in Catholic countries, later elsewhere) won't match local historical calendars." },
      { q: "Why these four languages?", a: "We picked widely-spoken languages with distinct weekday names; you can copy-and-paste the date into any locale-aware tool for others." },
    ],
  },
  {
    slug: "leap-year-checker",
    category: "datetime",
    name: "Leap Year Checker",
    tagline: "Tells you if a year is a leap year and lists the next 5 leap years.",
    summary:
      "Type any year (Gregorian) and see whether it is a leap year, with February having 29 days. The tool also lists the next 5 leap years from your input. Useful for planning multi-year schedules.",
    useCases: [
      "Verify a year before scheduling a Feb 29 event",
      "Teach the leap-year rule (4/100/400) to students",
      "Plan recurring leaplings birthdays",
      "Confirm leap-year financial-year considerations",
    ],
    icon: "🦘",
    seo: {
      title: "Leap Year Checker — Is It a Leap Year? | BestMint",
      description:
        "Free leap year checker. Find out instantly if any year is a leap year and see the next five upcoming leap years. Gregorian rules.",
      keywords: [
        "leap year checker",
        "is it a leap year",
        "leap year calculator",
        "next leap year",
        "february 29",
      ],
    },
    faqs: [
      { q: "What's the leap year rule?", a: "A Gregorian year is a leap year if it's divisible by 4, except years divisible by 100 unless they're also divisible by 400. So 2000 was a leap year, but 1900 was not." },
      { q: "Why does the rule have the 100/400 exception?", a: "The plain \"every 4 years\" rule slightly overcompensates the calendar year. Skipping centurial years (except every 400th) brings the average year length closer to the true tropical year." },
      { q: "How many leap years are there in 400 years?", a: "Exactly 97 leap years per 400 years under the Gregorian rules." },
    ],
  },
  {
    slug: "cron-next-run",
    category: "datetime",
    name: "Cron Expression Parser",
    tagline: "Describe any 5-field cron expression and preview the next 10 fire times.",
    summary:
      "Paste a 5-field cron expression (minute hour day-of-month month day-of-week) and instantly see a plain-English description and the next 10 times it would run. Supports *, comma lists, ranges and step values.",
    useCases: [
      "Sanity-check a cron line before adding it to crontab or a Kubernetes CronJob",
      "Preview when a CI scheduled job will fire",
      "Translate cryptic cron syntax into human-readable language",
      "Verify a step expression like */15 actually runs four times an hour",
    ],
    icon: "⏰",
    seo: {
      title: "Cron Expression Parser — Next Run Times Online | BestMint",
      description:
        "Free online cron expression parser. Paste a 5-field cron string, get a plain-English description and the next 10 run times. Supports *, ranges, lists and steps.",
      keywords: [
        "cron parser",
        "cron expression",
        "cron next run",
        "crontab tester",
        "cron schedule preview",
      ],
    },
    faqs: [
      { q: "Which cron syntax does it support?", a: "Standard 5-field cron: minute (0-59), hour (0-23), day-of-month (1-31), month (1-12), day-of-week (0-6, Sunday=0). Supports *, lists (1,5,10), ranges (1-5) and steps (*/15)." },
      { q: "Are seconds or named days supported?", a: "Not yet — this parser is intentionally minimal. Use numeric weekday (0-6) and minute precision." },
      { q: "Does it understand timezones?", a: "Times are computed in your local timezone, just like a typical Linux crontab on the same machine." },
    ],
  },
  {
    slug: "meeting-planner",
    category: "datetime",
    name: "Meeting Planner Across Timezones",
    tagline: "Find overlapping work hours for participants in different timezones.",
    summary:
      "Add participants in different timezones with their working hours. The grid highlights every UTC hour where each person is within their work day, making the best meeting times obvious.",
    useCases: [
      "Schedule global team meetings without a calendar tool",
      "Find overlap between US, EU and APAC offices",
      "Plan client calls that respect everyone's working day",
      "Check whether a candidate timeslot works for all interviewers",
    ],
    icon: "🤝",
    seo: {
      title: "Meeting Planner — Find a Meeting Time Across Timezones | BestMint",
      description:
        "Free timezone meeting planner. Add participants and work hours, then see a 24-hour grid highlighting every overlap. Browser-only, no signup.",
      keywords: [
        "meeting planner",
        "timezone meeting planner",
        "meeting across timezones",
        "world meeting planner",
        "find meeting time",
      ],
    },
    faqs: [
      { q: "How does the grid work?", a: "Rows are UTC hours, columns are participants. Each cell shows that participant's local hour, and is highlighted if it falls inside their work-hours window." },
      { q: "Does it handle daylight saving time?", a: "Yes — IANA timezones automatically apply DST rules through your browser's Intl APIs." },
      { q: "Can I export the chosen slot?", a: "Not directly — note the highlighted UTC hour and copy/paste it into your calendar tool of choice." },
    ],
  },
  {
    slug: "date-formatter",
    category: "datetime",
    name: "Date Formatter",
    tagline: "Format any date with day.js-style tokens like YYYY-MM-DD HH:mm:ss.",
    summary:
      "Pick a date and time and a format string with familiar tokens (YYYY, MM, DD, HH, mm, ss, dddd, MMM, A and so on). The output updates as you type. Includes a token reference for quick lookup.",
    useCases: [
      "Generate filenames with timestamps (YYYYMMDD-HHmmss)",
      "Pretty-print dates for blog posts (\"Friday, May 8, 2026\")",
      "Build logs or reports with consistent date formatting",
      "Test format strings before wiring them into code",
    ],
    icon: "📐",
    seo: {
      title: "Date Formatter Online — YYYY-MM-DD, HH:mm:ss & More | BestMint",
      description:
        "Free online date formatter using day.js-style tokens. Format dates as YYYY-MM-DD HH:mm:ss, dddd MMMM D, or any custom string. Browser-only, instant.",
      keywords: [
        "date formatter",
        "date format string",
        "yyyy mm dd",
        "format date online",
        "dayjs format tokens",
      ],
    },
    faqs: [
      { q: "Which tokens are supported?", a: "The common day.js / moment.js tokens: YYYY, YY, MMMM, MMM, MM, M, DD, D, dddd, ddd, HH, H, hh, h, mm, ss, A, a. See the token table in the tool for examples." },
      { q: "How do I include literal text?", a: "Wrap literal text in square brackets, e.g. [at] becomes \"at\" in the output." },
      { q: "Why don't I get day.js-exact behaviour?", a: "We re-implement the most popular tokens to keep this tool zero-dependency. Edge cases (escaping, week tokens) may differ from full day.js." },
    ],
  },
  {
    slug: "roman-numeral-date",
    category: "datetime",
    name: "Roman Numeral Date Converter",
    tagline: "Convert dates to Roman numerals (e.g. VIII·V·MMXXVI) and back.",
    summary:
      "Two-way converter between Gregorian dates and Roman numeral dates. Useful for tattoos, monuments, plaques and stylised credits. Validates Roman numeral form on the reverse direction.",
    useCases: [
      "Pick a Roman-numeral date for a tattoo or wedding band engraving",
      "Decode the date stamp on a building or monument",
      "Style movie credits or book copyrights in Roman numerals",
      "Teach Roman numerals using familiar dates",
    ],
    icon: "Ⅷ",
    seo: {
      title: "Roman Numeral Date Converter — Date to Roman Numerals | BestMint",
      description:
        "Convert any date to Roman numerals (e.g. VIII·V·MMXXVI) and back. Free, browser-based and supports years up to 3999.",
      keywords: [
        "roman numeral date",
        "date to roman numerals",
        "roman date converter",
        "tattoo date generator",
        "roman numeral converter",
      ],
    },
    faqs: [
      { q: "What's the format used?", a: "Day · Month · Year, with each component as a Roman numeral (e.g. VIII·V·MMXXVI for 8 May 2026). You can use ·, dots, dashes, slashes or spaces as separators on input." },
      { q: "What's the maximum year supported?", a: "Up to MMMCMXCIX (3999) — standard Roman numerals don't go higher without overlines." },
      { q: "Is the validation strict?", a: "Yes — we use a strict regex (no \"IIII\" for 4) so only well-formed Roman numerals are accepted on input." },
    ],
  },
  {
    slug: "add-subtract-days",
    category: "datetime",
    name: "Add or Subtract Days",
    tagline: "Add or subtract days, weeks, months or years from any date.",
    summary:
      "Pick a start date, an amount, a unit (days, weeks, months or years) and a direction. Get the resulting date plus the difference expressed in days, weeks, months and years.",
    useCases: [
      "Find the date 90 days after a contract signing",
      "Calculate when a 6-month trial ends",
      "Plan a 21-day habit challenge end date",
      "Determine the date 18 years from a child's birthday",
    ],
    icon: "➕",
    seo: {
      title: "Add or Subtract Days From a Date | BestMint",
      description:
        "Free date calculator. Add or subtract days, weeks, months or years from any date and see the result plus the difference in multiple units.",
      keywords: [
        "add days to date",
        "subtract days",
        "date calculator",
        "add weeks to date",
        "add months to date",
      ],
    },
    faqs: [
      { q: "How are months handled?", a: "Months are added by incrementing the JavaScript month component, so adding one month to Jan 31 gives Mar 3 (the standard \"clamp/overflow\" behaviour)." },
      { q: "Are leap years respected?", a: "Yes. Adding one year to Feb 29, 2024 gives Mar 1, 2025 due to month overflow; subtracting one year from Mar 1, 2025 gives Mar 1, 2024." },
      { q: "Does it count business days?", a: "No — for that, see the Workday Calculator which lets you skip weekends and holidays." },
    ],
  },
  {
    slug: "quarter-calculator",
    category: "datetime",
    name: "Quarter Calculator",
    tagline: "Find the fiscal or calendar quarter for any date, with start, end and progress.",
    summary:
      "Pick a date and a fiscal-year start month. The calculator tells you which quarter (Q1-Q4) the date falls in, the quarter's start and end dates, days into the quarter and days remaining.",
    useCases: [
      "Plan deliverables against fiscal-year quarters",
      "Forecast revenue against the rest of Q3",
      "Check that a contract milestone lands in the right quarter",
      "Convert between calendar quarters and a non-January fiscal year",
    ],
    icon: "📊",
    seo: {
      title: "Quarter Calculator — Calendar & Fiscal Year Quarters | BestMint",
      description:
        "Find which quarter a date falls in, with quarter start/end dates and progress. Supports custom fiscal-year start months. Free and browser-based.",
      keywords: [
        "quarter calculator",
        "fiscal quarter",
        "what quarter is it",
        "q1 q2 q3 q4 dates",
        "fiscal year quarter",
      ],
    },
    faqs: [
      { q: "What if my fiscal year starts in April?", a: "Set fiscal-year start to April. Q1 will then run April–June, Q2 July–September, and so on." },
      { q: "Is FY2026 the year that starts or ends in 2026?", a: "Different organisations differ. We label fiscal year by the calendar year that contains the FY start date; the result panel also shows the alternate label so you can match your accounting team." },
      { q: "Are quarters always 91 days?", a: "No — calendar quarters are 90 to 92 days because months differ in length. The tool shows the exact day count for the chosen quarter." },
    ],
  },
  {
    slug: "iso-week-calculator",
    category: "datetime",
    name: "ISO Week Calculator",
    tagline: "Convert ISO year + week to start (Monday) and end (Sunday) dates.",
    summary:
      "Enter a year and an ISO 8601 week number (1-53) and instantly see the Monday-to-Sunday range of that week, plus a mini calendar of all seven days. Validates that the week exists in that ISO year.",
    useCases: [
      "Decode a label like \"2026-W19\" into actual calendar dates",
      "Schedule sprints that run on ISO week boundaries",
      "Coordinate with European partners using ISO weeks",
      "Verify whether a year has a week 53",
    ],
    icon: "📋",
    seo: {
      title: "ISO Week to Date Calculator — Year + Week → Dates | BestMint",
      description:
        "Convert any ISO 8601 year and week number to start and end dates. Free, instant, with leap-week awareness for years with 53 weeks.",
      keywords: [
        "iso week calculator",
        "iso 8601 week",
        "week to date",
        "iso week to date",
        "year week converter",
      ],
    },
    faqs: [
      { q: "Why is week 1 sometimes in late December?", a: "ISO 8601 anchors week 1 on the year's first Thursday. If Jan 1 falls late in the week, it can belong to week 52 or 53 of the previous year, and the new year's week 1 starts the following Monday." },
      { q: "Does my year have 53 weeks?", a: "ISO years have 53 weeks if Jan 1 is a Thursday, or it's a leap year and Jan 1 is a Wednesday. The tool tells you the maximum valid week for the chosen year." },
      { q: "Are weeks Monday-Sunday or Sunday-Saturday?", a: "ISO 8601 weeks always run Monday to Sunday, regardless of locale." },
    ],
  },
  {
    slug: "duration-calculator",
    category: "datetime",
    name: "Duration Calculator",
    tagline: "Add up multiple HH:MM:SS durations and see the total, average and breakdown.",
    summary:
      "Paste a list of durations (HH:MM:SS or HH:MM, one per line) and the calculator sums them, shows an average and lists each line's parsed value. Hours can exceed 24 — useful for tracking total project time.",
    useCases: [
      "Sum daily timesheet entries into weekly totals",
      "Add up movie or playlist runtimes",
      "Total race split times or workout durations",
      "Compute time spent across multiple meetings",
    ],
    icon: "🧮",
    seo: {
      title: "Duration Calculator — Add HH:MM:SS Times Online | BestMint",
      description:
        "Free duration calculator. Paste HH:MM:SS or HH:MM durations one per line and get a total, average and per-line breakdown. Hours can exceed 24.",
      keywords: [
        "duration calculator",
        "add times calculator",
        "hh mm ss calculator",
        "time addition calculator",
        "total duration",
      ],
    },
    faqs: [
      { q: "Which input formats are accepted?", a: "Two-part HH:MM (e.g. 1:30) and three-part HH:MM:SS (e.g. 1:30:45). Decimal seconds are accepted but rounded in the totals display." },
      { q: "Can hours be more than 24?", a: "Yes — totals can be hundreds of hours, useful for cumulative project time." },
      { q: "Why is one of my lines marked invalid?", a: "Lines must contain only digits and colons in the right pattern. Stray text, extra colons or empty fields are flagged so the rest of the total stays correct." },
    ],
  },
  // ─── New: SEO ────────────────────────────────────────────────────────
  {
    slug: "keyword-density",
    category: "seo",
    name: "Keyword Density Checker",
    tagline: "Analyze single-word, 2-gram and 3-gram frequency in any text.",
    summary:
      "Paste your page copy or article and see which terms (and 2-3 word phrases) you use most often. Switch tabs between single words, bigrams and trigrams, with optional stopword filtering and a top-50 ranking by count and density.",
    useCases: [
      "Audit blog posts for over-stuffed keywords before publishing",
      "Spot phrases competitors emphasise when reverse-engineering content",
      "Find natural 2-3 word topic clusters for SEO subheads",
      "Check whether your target keyword appears with reasonable density",
    ],
    icon: "🔍",
    seo: {
      title: "Free Keyword Density Checker — 1/2/3-gram Analyzer | BestMint",
      description:
        "Free keyword density tool. Analyze single words, bigrams and trigrams with stopword filtering. Top 50 by count and density. Browser-only.",
      keywords: [
        "keyword density",
        "keyword density checker",
        "ngram analyzer",
        "seo keyword tool",
        "bigram trigram counter",
      ],
    },
    faqs: [
      { q: "What's a good keyword density?", a: "Most modern SEO guides suggest 0.5–2% for a target keyword. Anything higher reads as stuffed and can hurt rankings." },
      { q: "Why filter stopwords?", a: "Words like 'the', 'and', 'of' dominate any text. Filtering them surfaces the meaningful keywords and phrases that actually describe the topic." },
      { q: "Are 2-grams and 3-grams useful?", a: "Yes — modern search engines weight phrases heavily. 2-3 word ngrams reveal the topical clusters you're really targeting." },
    ],
  },
  {
    slug: "xml-sitemap-generator",
    category: "seo",
    name: "XML Sitemap Generator",
    tagline: "Build a valid sitemap.xml from a list of URLs with lastmod, changefreq and priority.",
    summary:
      "Paste a list of URLs (one per line), pick a global lastmod date, change frequency and priority, and get a valid sitemap.xml using the standard sitemaps.org schema. Copy and deploy at /sitemap.xml.",
    useCases: [
      "Generate a sitemap for a small static site or marketing landing pages",
      "Quickly produce a sitemap from URLs exported from a CMS or spreadsheet",
      "Submit a fresh sitemap to Google Search Console after a site rebuild",
      "Test sitemap structure before automating generation in CI",
    ],
    icon: "🗺",
    seo: {
      title: "Free XML Sitemap Generator Online — sitemap.xml Builder | BestMint",
      description:
        "Generate a valid sitemap.xml from a list of URLs. Lastmod, changefreq and priority included. Copy and deploy.",
      keywords: [
        "xml sitemap generator",
        "sitemap.xml builder",
        "free sitemap generator",
        "seo sitemap tool",
      ],
    },
    faqs: [
      { q: "Where do I host the sitemap?", a: "At the root of your domain — usually /sitemap.xml. Then add a Sitemap: line to robots.txt and submit it in Google Search Console." },
      { q: "Do I need lastmod, changefreq and priority?", a: "Only <loc> is required; the others are hints. Google largely ignores priority and changefreq, but lastmod is still useful for crawl scheduling." },
    ],
  },
  {
    slug: "sitemap-validator",
    category: "seo",
    name: "Sitemap Validator",
    tagline: "Check sitemap.xml for well-formed XML, urlset, loc, changefreq and priority.",
    summary:
      "Paste your sitemap.xml and get a pass/fail report: well-formed XML, correct urlset namespace, every <url> has <loc>, valid changefreq, priority in 0–1, and ISO-formatted lastmod. Plus a total URL count.",
    useCases: [
      "Sanity-check a sitemap before submitting to Search Console",
      "Diagnose 'sitemap could not be read' errors from Google or Bing",
      "Verify your CMS or generator is producing spec-compliant output",
      "Spot common typos in changefreq values or out-of-range priorities",
    ],
    icon: "✅",
    seo: {
      title: "Free Sitemap.xml Validator Online — Pass/Fail Checks | BestMint",
      description:
        "Validate sitemap.xml online for free. Checks XML well-formedness, urlset namespace, loc, changefreq, priority and lastmod.",
      keywords: [
        "sitemap validator",
        "sitemap.xml checker",
        "validate sitemap",
        "seo sitemap test",
      ],
    },
    faqs: [
      { q: "What sitemap format does this support?", a: "The standard sitemaps.org/0.9 protocol (the urlset format). Sitemap index files and image/video extensions aren't deeply validated, but they won't crash the parser." },
      { q: "Why does Google say my sitemap is invalid even though this passes?", a: "Google also checks that URLs return 200 and aren't blocked by robots.txt — neither of which we can test in your browser. Use this as a structural pre-flight check." },
    ],
  },
  {
    slug: "schema-markup-generator",
    category: "seo",
    name: "Schema Markup Generator",
    tagline: "Generate JSON-LD for FAQ, HowTo, Recipe, Product, Article, Event, Org, LocalBusiness.",
    summary:
      "Pick a schema.org type, fill in the relevant fields, and get a ready-to-paste <script type=\"application/ld+json\"> block. Supports FAQPage, HowTo, Recipe, Product, Article, Event, Organization and LocalBusiness.",
    useCases: [
      "Add FAQ rich results to a help or pricing page",
      "Mark up recipes with cook time, ingredients and yield for Google",
      "Generate Product schema for ecommerce category pages",
      "Build Event schema for ticketed listings and meetups",
    ],
    icon: "🧩",
    seo: {
      title: "Free Schema Markup Generator — JSON-LD for SEO | BestMint",
      description:
        "Generate schema.org JSON-LD for FAQPage, HowTo, Recipe, Product, Article, Event, Organization and LocalBusiness. Copy and paste.",
      keywords: [
        "schema markup generator",
        "json-ld generator",
        "structured data tool",
        "schema.org generator",
        "seo rich results",
      ],
    },
    faqs: [
      { q: "JSON-LD vs Microdata vs RDFa?", a: "Google recommends JSON-LD — it's separate from your HTML, easier to maintain, and renders inside <head> or <body> as a script tag." },
      { q: "Will adding schema improve my rankings?", a: "Schema doesn't directly boost rankings, but it unlocks rich-result eligibility (stars, FAQ accordions, recipe cards) which can dramatically improve click-through." },
      { q: "How do I test the output?", a: "Paste the generated JSON-LD into Google's Rich Results Test or schema.org's Schema Markup Validator to confirm it parses cleanly." },
    ],
  },
  {
    slug: "canonical-tag-generator",
    category: "seo",
    name: "Canonical Tag Generator",
    tagline: "Generate a <link rel=\"canonical\"> tag from any URL.",
    summary:
      "Paste a URL and get the canonical link tag for your <head>. Helpful for deduplicating tracking parameters, mobile vs desktop URLs, or content syndicated across multiple domains.",
    useCases: [
      "Consolidate ranking signals when the same content is reachable via multiple URLs",
      "Avoid duplicate-content issues from UTM-tagged or session-id URLs",
      "Point syndicated articles back to the original source",
      "Specify the preferred URL on paginated archive pages",
    ],
    icon: "🔗",
    seo: {
      title: "Free Canonical Tag Generator — rel=canonical Builder | BestMint",
      description:
        "Generate a canonical link tag from any URL. Helps consolidate duplicate content for SEO. Copy-paste ready.",
      keywords: [
        "canonical tag generator",
        "rel canonical builder",
        "seo canonical url",
        "duplicate content tag",
      ],
    },
    faqs: [
      { q: "Should canonical URLs be absolute?", a: "Yes — always include the full https://example.com/path form. Relative canonicals work but are more error-prone." },
      { q: "Can a page canonical to itself?", a: "Yes — and it's recommended. A self-referential canonical clearly tells Google this URL is the preferred version." },
    ],
  },
  {
    slug: "hreflang-generator",
    category: "seo",
    name: "Hreflang Tag Generator",
    tagline: "Build hreflang tags for multilingual and multi-region sites.",
    summary:
      "Add a row per language/region with its target URL and get a clean set of <link rel=\"alternate\" hreflang> tags. Includes optional x-default for fallback.",
    useCases: [
      "Map English, French and German variants of the same page",
      "Differentiate en-US, en-GB and en-AU storefronts",
      "Add x-default for a global landing page that auto-redirects",
      "Generate the hreflang block for a CMS field or template",
    ],
    icon: "🌐",
    seo: {
      title: "Free Hreflang Tag Generator — Multilingual SEO | BestMint",
      description:
        "Generate hreflang link tags for multilingual sites. Includes x-default support. Free and browser-only.",
      keywords: [
        "hreflang generator",
        "multilingual seo",
        "hreflang tag",
        "international seo tool",
      ],
    },
    faqs: [
      { q: "Do hreflang tags need to be reciprocal?", a: "Yes — every page that lists alternates must also be listed by those alternates, or Google may ignore the cluster." },
      { q: "What's x-default?", a: "It tells search engines which URL to show when no listed language matches the user's locale — typically your global English page or a country selector." },
    ],
  },
  {
    slug: "utm-builder",
    category: "seo",
    name: "UTM Link Builder",
    tagline: "Tag a URL with utm_source, utm_medium, utm_campaign, utm_term and utm_content.",
    summary:
      "Paste any URL, fill in your UTM parameters, and get a properly-encoded tagged link for analytics tools like Google Analytics, Plausible or Fathom. Validates the base URL.",
    useCases: [
      "Tag email-newsletter links so opens are attributed correctly",
      "Distinguish paid-social campaigns by source, medium and creative variant",
      "Track A/B test variants with utm_content",
      "Build trackable links for influencer and partner placements",
    ],
    icon: "🏷",
    seo: {
      title: "Free UTM Builder — UTM Link & Campaign URL Generator | BestMint",
      description:
        "Build campaign URLs with utm_source, utm_medium, utm_campaign, utm_term and utm_content. Properly encoded. Free and browser-only.",
      keywords: [
        "utm builder",
        "utm link generator",
        "campaign url builder",
        "google analytics utm",
        "url tracking tool",
      ],
    },
    faqs: [
      { q: "What are the required UTM parameters?", a: "utm_source, utm_medium and utm_campaign are the conventional minimum. utm_term and utm_content are optional and used for paid keywords or A/B variants." },
      { q: "Does case matter?", a: "Yes — 'Email' and 'email' are treated as different sources in most analytics tools. Pick a convention (lowercase is common) and stick to it." },
    ],
  },
  {
    slug: "serp-snippet-preview",
    category: "seo",
    name: "SERP Snippet Preview",
    tagline: "Preview how your title and meta description appear in Google search results.",
    summary:
      "See a Google-style preview of your page in light and dark mode, with character-count badges that show whether your title and description fit the optimal 50-60 / 140-160 ranges.",
    useCases: [
      "QA meta titles and descriptions before publishing",
      "Make sure SEO copy isn't truncated on Google",
      "Compare different title variants visually",
      "Spot accidentally-empty or duplicate descriptions",
    ],
    icon: "🔎",
    seo: {
      title: "Free SERP Snippet Preview — Google Search Mockup | BestMint",
      description:
        "Preview Google search snippets with title and meta-description character counts. Light and dark modes. Free and browser-only.",
      keywords: [
        "serp preview",
        "google snippet preview",
        "meta description tester",
        "seo title preview",
      ],
    },
    faqs: [
      { q: "Why 50-60 and 140-160?", a: "Google truncates titles around 580 px (~50-60 chars) and descriptions around 920 px (~140-160 chars). These ranges keep your snippet from being cut off." },
      { q: "Does Google always use my meta description?", a: "No. Google often rewrites descriptions based on the query. But supplying a strong custom description meaningfully increases the odds it's used verbatim." },
    ],
  },
  {
    slug: "twitter-card-generator",
    category: "seo",
    name: "Twitter Card Generator",
    tagline: "Build twitter:* meta tags with a live preview of summary and large-image cards.",
    summary:
      "Pick a card type (summary, summary_large_image, app, player), fill in title, description, image and handles, and get a clean block of twitter:* meta tags plus a Twitter-style preview.",
    useCases: [
      "Add Twitter Card tags to a page that only has Open Graph",
      "Switch a page from summary to summary_large_image for richer share visuals",
      "QA the @site and @creator handle attribution",
      "Preview the share card before scheduling a tweet",
    ],
    icon: "🐦",
    seo: {
      title: "Free Twitter Card Generator with Preview | BestMint",
      description:
        "Generate twitter:* meta tags and preview summary or summary_large_image cards. Free, browser-only.",
      keywords: [
        "twitter card generator",
        "twitter meta tags",
        "x card preview",
        "summary large image",
      ],
    },
    faqs: [
      { q: "Do I need Twitter Card tags if I have Open Graph?", a: "Twitter falls back to OG tags, so it works either way. Adding twitter:* tags lets you customise the share view specifically (e.g. different title length or @creator attribution)." },
      { q: "What image size for summary_large_image?", a: "Twitter recommends at least 600×314, with a 2:1 aspect ratio. 1200×630 (the same size as Facebook OG) works well across all platforms." },
    ],
  },
  {
    slug: "open-graph-image-generator",
    category: "seo",
    name: "Open Graph Image Generator",
    tagline: "Generate a 1200×630 OG image with title, subtitle and theme — download as PNG.",
    summary:
      "Type a title and subtitle, pick a theme (light, dark, gradient, brand), choose an accent colour and download a 1200×630 PNG ready for og:image. Word-wraps automatically — no design tool required.",
    useCases: [
      "Create a per-post share image without opening Figma",
      "Generate a quick social card for a launch announcement",
      "Stub out OG images during design before final art is ready",
      "Make consistent share images across an entire blog",
    ],
    icon: "🖼",
    seo: {
      title: "Free Open Graph Image Generator — 1200×630 PNG | BestMint",
      description:
        "Make 1200×630 OG share images in your browser. Choose theme, accent and text — download as PNG. Free, no signup.",
      keywords: [
        "open graph image generator",
        "og image maker",
        "social share image",
        "1200x630 image",
      ],
    },
    faqs: [
      { q: "What size should an OG image be?", a: "1200×630 px (1.91:1) is the safe default for Facebook, LinkedIn and Twitter summary_large_image. We render at exactly that size." },
      { q: "Can I use a custom font?", a: "The canvas uses your browser's system sans-serif so the output works without external font loading. For brand fonts, render the page in a browser with that font installed and the canvas will pick it up." },
    ],
  },
  {
    slug: "breadcrumb-jsonld",
    category: "seo",
    name: "Breadcrumb JSON-LD Generator",
    tagline: "Generate BreadcrumbList JSON-LD with positions, names and URLs.",
    summary:
      "Add breadcrumb items in order and get a valid BreadcrumbList JSON-LD block. Pastes into <head> to enable Google's breadcrumb display in search results.",
    useCases: [
      "Add breadcrumbs to category and product pages for richer SERPs",
      "Replace hardcoded breadcrumb HTML with structured data",
      "Generate the JSON-LD field for a CMS template",
      "QA breadcrumb position numbers when building a site nav",
    ],
    icon: "🧭",
    seo: {
      title: "Free Breadcrumb JSON-LD Generator — BreadcrumbList Schema | BestMint",
      description:
        "Generate BreadcrumbList JSON-LD with positions, names and URLs. Free and browser-only. Copy-paste ready.",
      keywords: [
        "breadcrumb json-ld",
        "breadcrumblist generator",
        "breadcrumb schema",
        "seo breadcrumb",
      ],
    },
    faqs: [
      { q: "Do I still need visible breadcrumbs on the page?", a: "Best practice is to have both — visible breadcrumbs for users plus matching JSON-LD for search engines. Google's guidelines effectively require this." },
      { q: "What's the position field?", a: "It's the 1-based ordinal of each crumb, from the site root to the current page. Home is 1, the section is 2, the page is 3, and so on." },
    ],
  },
  {
    slug: "faq-jsonld",
    category: "seo",
    name: "FAQ JSON-LD Generator",
    tagline: "Generate FAQPage JSON-LD from question/answer rows.",
    summary:
      "Type each Q and A and get a valid FAQPage schema.org JSON-LD block. Once added to your page, Google can show an expandable FAQ rich result under your search snippet.",
    useCases: [
      "Add FAQ rich results to product, support or pricing pages",
      "Bulk-generate JSON-LD for multiple FAQ blocks at once",
      "Migrate static FAQ content into structured data without writing it by hand",
      "QA FAQ schema before pasting into a CMS",
    ],
    icon: "❓",
    seo: {
      title: "Free FAQ JSON-LD Generator — FAQPage Schema | BestMint",
      description:
        "Build FAQPage JSON-LD from question/answer rows. Copy-paste ready. Browser-only and free.",
      keywords: [
        "faq json-ld",
        "faqpage schema",
        "faq schema generator",
        "google faq rich result",
      ],
    },
    faqs: [
      { q: "Will FAQ rich results show on every search?", a: "No — Google decides based on intent and content quality. The schema makes you eligible; whether the FAQ appears depends on the query." },
      { q: "Should the visible page show the same FAQs?", a: "Yes. Google requires the FAQ content in the JSON-LD to also be visible to users on the page. Hidden-only FAQ schema can trigger a manual action." },
    ],
  },
  {
    slug: "organization-jsonld",
    category: "seo",
    name: "Organization JSON-LD Generator",
    tagline: "Build Organization schema with name, logo, description, sameAs and contact info.",
    summary:
      "Generate Organization JSON-LD for your homepage or about page: name, URL, logo, description, social profile sameAs links and a ContactPoint with email or phone.",
    useCases: [
      "Help Google's Knowledge Panel pick up your brand name and logo",
      "Connect your social profiles via sameAs for entity disambiguation",
      "Add structured contact info to a public-facing about page",
      "Stub Organization schema while a designer finalises the brand assets",
    ],
    icon: "🏢",
    seo: {
      title: "Free Organization JSON-LD Generator — schema.org Org | BestMint",
      description:
        "Generate Organization JSON-LD with name, logo, sameAs and contact details. Free, browser-only.",
      keywords: [
        "organization json-ld",
        "organization schema",
        "company structured data",
        "knowledge panel schema",
      ],
    },
    faqs: [
      { q: "Where do I add Organization schema?", a: "Typically once on the homepage or about page — not on every page. Google uses it to associate the rest of your site with one consolidated entity." },
      { q: "What goes in sameAs?", a: "Authoritative profiles for the same entity — usually social profiles (Twitter/X, LinkedIn, GitHub, Facebook) and Wikipedia or Crunchbase if applicable." },
    ],
  },
  {
    slug: "article-jsonld",
    category: "seo",
    name: "Article JSON-LD Generator",
    tagline: "Generate Article, NewsArticle or BlogPosting JSON-LD for any post.",
    summary:
      "Pick Article, NewsArticle or BlogPosting, fill in headline, image, dates, author and publisher, and get a clean JSON-LD <script> block. Helps Google understand who published a story and when.",
    useCases: [
      "Add structured data to blog posts and editorial articles",
      "Mark up news content with NewsArticle for Google News eligibility",
      "Stub Article schema while editorial polish is finalising",
      "QA datePublished and dateModified before pushing a CMS template change",
    ],
    icon: "📰",
    seo: {
      title: "Free Article JSON-LD Generator — Article, NewsArticle, BlogPosting | BestMint",
      description:
        "Build Article, NewsArticle or BlogPosting JSON-LD with headline, dates, author and publisher. Copy-paste ready.",
      keywords: [
        "article json-ld",
        "newsarticle schema",
        "blogposting structured data",
        "seo article schema",
      ],
    },
    faqs: [
      { q: "Article vs NewsArticle vs BlogPosting?", a: "All three are subtypes of CreativeWork. NewsArticle is for journalism/reporting, BlogPosting is for blog entries, and Article is the generic catch-all when neither fits." },
      { q: "Are dateModified and dateModified required?", a: "datePublished is strongly recommended; dateModified is optional but useful — it signals freshness when content is re-edited." },
    ],
  },
  // ─── New: AI ─────────────────────────────────────────────────────────
  {
    slug: "ai-grammar-checker",
    category: "ai",
    name: "AI Grammar Checker",
    tagline: "Fix grammar, spelling and punctuation, with a quick summary of changes.",
    summary:
      "Paste any text and Gemma returns a corrected version plus a brief list of what it changed. Useful for emails, essays, blog drafts and anything you want clean before sending.",
    useCases: [
      "Proofread emails and Slack messages before hitting send",
      "Clean up blog drafts, essays and reports",
      "Spot-check ESL or second-language writing",
      "Catch missed typos a spell-checker glosses over",
    ],
    icon: "✅",
    ai: true,
    seo: {
      title: "Free AI Grammar Checker — Fix Grammar & Spelling | BestMint",
      description:
        "Free online AI grammar checker. Paste text, get a corrected version plus a quick summary of changes. Powered by Google Gemma.",
      keywords: [
        "ai grammar checker",
        "free grammar checker",
        "spell checker",
        "punctuation checker",
        "proofreading tool",
      ],
    },
    faqs: [
      { q: "Does it explain the changes?", a: "Yes — after the corrected text, you get a short list of the main edits so you can learn from them." },
      { q: "Will it rewrite my style?", a: "No. The prompt asks the model to fix grammar, spelling and punctuation only, preserving your voice." },
      { q: "Is the input stored?", a: "No — your text is sent to Google's Gemma API for the request and is not logged here." },
    ],
  },
  {
    slug: "ai-tone-changer",
    category: "ai",
    name: "AI Tone Changer",
    tagline: "Rewrite text in a formal, casual, friendly, professional, playful or persuasive tone.",
    summary:
      "Paste text and pick a tone — formal, casual, friendly, professional, playful or persuasive — and Gemma rewrites it while preserving the meaning. Great for matching the right voice across channels.",
    useCases: [
      "Soften a blunt message into a friendly version",
      "Turn casual notes into a professional update for stakeholders",
      "Make marketing copy more persuasive",
      "Swap a stiff intro for a playful one without losing facts",
    ],
    icon: "🎭",
    ai: true,
    seo: {
      title: "Free AI Tone Changer — Rewrite Text in Any Tone | BestMint",
      description:
        "Change the tone of any text instantly. Pick formal, casual, friendly, professional, playful or persuasive. Powered by Google Gemma.",
      keywords: [
        "ai tone changer",
        "tone rewriter",
        "change tone of text",
        "rewrite tone",
        "formal to casual converter",
      ],
    },
    faqs: [
      { q: "Does it keep the original meaning?", a: "Yes — the prompt explicitly asks the model to preserve meaning while shifting tone." },
      { q: "How is this different from the AI Paraphraser?", a: "The paraphraser focuses on rephrasing for variety; the tone changer is dedicated to switching voice across six common business tones." },
      { q: "Best tone for cold emails?", a: "Try persuasive for sales-style outreach, professional for B2B intros, and friendly for warmer follow-ups." },
    ],
  },
  {
    slug: "ai-email-writer",
    category: "ai",
    name: "AI Email Writer",
    tagline: "Turn bullet points into a polished email draft with subject line.",
    summary:
      "Drop in a few bullets, choose the email type and tone, and Gemma drafts a complete email — subject line, greeting, body and sign-off. Built for requests, follow-ups, thank-you notes, intros and complaints.",
    useCases: [
      "Draft a follow-up after a meeting in seconds",
      "Write a polite request with a clear ask",
      "Fire off a professional thank-you note",
      "Compose a calm but firm complaint email",
    ],
    icon: "✉️",
    ai: true,
    seo: {
      title: "Free AI Email Writer — Generate Email Drafts | BestMint",
      description:
        "Free AI email writer. Bullet points in, polished email out — request, follow-up, thank-you, intro or complaint. Powered by Google Gemma.",
      keywords: [
        "ai email writer",
        "email generator",
        "professional email draft",
        "follow up email generator",
        "thank you email writer",
      ],
    },
    faqs: [
      { q: "Does it include a subject line?", a: "Yes — every draft starts with a Subject: line, followed by a blank line and the body." },
      { q: "Can I tweak the tone?", a: "Pick formal, casual or friendly. The same brief produces different drafts depending on the tone you choose." },
      { q: "Will it invent details?", a: "It can fill plausible gaps to make the email sound complete. Always read the draft and replace any made-up specifics before sending." },
    ],
  },
  {
    slug: "ai-blog-title",
    category: "ai",
    name: "AI Blog Title Generator",
    tagline: "Get 5 catchy blog post title ideas from a topic and audience.",
    summary:
      "Type a topic (and optionally a target audience), and Gemma returns 5 numbered, click-worthy blog title ideas — a mix of how-to, listicle and benefit angles to help you pick the right hook.",
    useCases: [
      "Brainstorm blog titles before you write the post",
      "Find a stronger headline for a draft you've already written",
      "Pull A/B variants for newsletter subject lines",
      "Spin up content ideas around a single topic",
    ],
    icon: "📝",
    ai: true,
    seo: {
      title: "Free AI Blog Title Generator — 5 Catchy Ideas | BestMint",
      description:
        "Generate 5 catchy blog post titles from a topic in seconds. Optional target audience for sharper hooks. Powered by Google Gemma.",
      keywords: [
        "ai blog title generator",
        "blog post title ideas",
        "headline generator",
        "blog name generator",
        "content title ideas",
      ],
    },
    faqs: [
      { q: "How many titles do I get?", a: "Five per generation — enough variety to compare without being overwhelming." },
      { q: "Does the audience field matter?", a: "It sharpens the hook. Telling it 'busy parents' produces very different titles from 'senior engineers'." },
      { q: "Can I run it again for more?", a: "Yes — each request returns a fresh batch of 5." },
    ],
  },
  {
    slug: "ai-meta-description",
    category: "ai",
    name: "AI Meta Description Generator",
    tagline: "3 SEO-friendly meta descriptions in the 140–160 character sweet spot.",
    summary:
      "Provide a page topic and primary keyword, and Gemma writes 3 meta description options each between 140 and 160 characters, with the keyword woven in naturally and a soft call to action at the end.",
    useCases: [
      "Write meta descriptions for new blog posts",
      "Refresh tags on underperforming pages",
      "Generate SERP-friendly descriptions for landing pages",
      "Test multiple meta variations for click-through optimisation",
    ],
    icon: "🔎",
    ai: true,
    seo: {
      title: "Free AI Meta Description Generator — 140–160 Chars | BestMint",
      description:
        "Generate 3 SEO meta descriptions per request. Each in the 140–160 character window with your primary keyword. Powered by Google Gemma.",
      keywords: [
        "meta description generator",
        "ai meta description",
        "seo description generator",
        "meta tag writer",
        "serp description tool",
      ],
    },
    faqs: [
      { q: "Why 140–160 characters?", a: "That's the typical width Google shows in SERPs before truncating. Sticking to that range avoids cut-offs." },
      { q: "Does it use my keyword?", a: "Yes — the prompt instructs the model to include your primary keyword once, naturally, in each description." },
      { q: "Will Google accept these directly?", a: "They're written to be drop-in ready, but always review for brand voice and accuracy before publishing." },
    ],
  },
  {
    slug: "ai-product-description",
    category: "ai",
    name: "AI Product Description Generator",
    tagline: "Turn product features into a polished e-commerce description.",
    summary:
      "Enter a product name, list its key features one per line, pick a tone, and Gemma writes a 2–3 paragraph e-commerce description that leads with a hook, frames features as benefits, and ends with a buying nudge.",
    useCases: [
      "Write Shopify, Etsy or Amazon listings faster",
      "Refresh tired product pages with new copy",
      "Generate variations for A/B testing on PDPs",
      "Produce launch copy for new SKUs in minutes",
    ],
    icon: "🛍️",
    ai: true,
    seo: {
      title: "Free AI Product Description Generator | BestMint",
      description:
        "Turn product features into a 2–3 paragraph e-commerce description. Pick a tone. Powered by Google Gemma.",
      keywords: [
        "ai product description generator",
        "ecommerce copywriter",
        "shopify description generator",
        "amazon listing writer",
        "product copy ai",
      ],
    },
    faqs: [
      { q: "What format is the output?", a: "Two to three short paragraphs: hook, benefit-driven feature coverage, and a closing nudge — ready to paste into a PDP." },
      { q: "Should I list every feature?", a: "Stick to the 4–8 most important ones. Too many and the copy turns into a spec sheet." },
      { q: "Which tone sells best?", a: "Persuasive and friendly tend to convert well; professional fits B2B and high-ticket items." },
    ],
  },
  {
    slug: "ai-headline-generator",
    category: "ai",
    name: "AI Headline Generator",
    tagline: "5 headline options in the style you choose — curiosity, listicle, how-to, urgency or benefit.",
    summary:
      "Pick a topic and a headline style — curiosity, listicle, how-to, urgency or benefit — and Gemma returns 5 numbered headline options tuned to that angle. Built for blog posts, ads, landing pages and emails.",
    useCases: [
      "Brainstorm landing page headlines around one promise",
      "Generate ad copy variants for testing",
      "Spin email subject lines from one campaign concept",
      "Write punchier blog hooks in a chosen style",
    ],
    icon: "📣",
    ai: true,
    seo: {
      title: "Free AI Headline Generator — Curiosity, Listicle, How-to | BestMint",
      description:
        "Generate 5 headlines per request in the style you choose: curiosity, listicle, how-to, urgency or benefit. Powered by Google Gemma.",
      keywords: [
        "ai headline generator",
        "headline writer",
        "ad headline generator",
        "click worthy headlines",
        "title generator",
      ],
    },
    faqs: [
      { q: "How is this different from the blog title generator?", a: "The blog title tool is tuned for blog posts and mixes angles. The headline generator lets you lock to a single style — useful for ads and landing pages." },
      { q: "Best style for ads?", a: "Curiosity and benefit usually pull strongest CTRs; urgency works for time-bound offers." },
      { q: "Can I provide an audience?", a: "This tool keeps it to topic + style. For audience-aware ideas use the AI Blog Title Generator." },
    ],
  },
  {
    slug: "ai-explainer",
    category: "ai",
    name: "AI Concept Explainer",
    tagline: "Explain anything for a 5-year-old, teenager, college student or expert.",
    summary:
      "Paste a concept or paragraph and pick the audience level. Gemma rewrites the explanation to match — simple analogies for kids, precise terminology for experts, with two levels in between.",
    useCases: [
      "Translate a research paper into plain English",
      "Help a kid with homework using a 5-year-old explanation",
      "Generate study notes at a college-student level",
      "Brief an expert colleague without dumbing it down",
    ],
    icon: "💡",
    ai: true,
    seo: {
      title: "Free AI Explainer — Explain Anything by Audience Level | BestMint",
      description:
        "Explain any concept for a 5-year-old, teenager, college student or expert. Free AI tool powered by Google Gemma.",
      keywords: [
        "ai explainer",
        "explain like im 5",
        "eli5 generator",
        "concept explainer",
        "audience-level explanation",
      ],
    },
    faqs: [
      { q: "How is the 5-year-old level different from the teenager level?", a: "The 5-year-old version uses very small words and an everyday analogy; the teenager version drops the analogies but stays jargon-light." },
      { q: "Does the expert level skip basics?", a: "Yes — it assumes domain knowledge and focuses on mechanism, nuance and edge cases." },
      { q: "Can I paste long source material?", a: "Up to about 30,000 characters per request. For longer documents, summarise first then explain." },
    ],
  },
  {
    slug: "ai-code-explainer",
    category: "ai",
    name: "AI Code Explainer",
    tagline: "Plain-English explanation of any code snippet, line by line for short snippets.",
    summary:
      "Paste a code snippet (and optionally the language), and Gemma explains what it does in plain English. Short snippets get a line-by-line walkthrough; longer code gets a high-level summary plus callouts on the important parts.",
    useCases: [
      "Understand an unfamiliar regex or one-liner",
      "Onboard onto a new codebase faster",
      "Document legacy code for the team",
      "Help students decode textbook examples",
    ],
    icon: "🧠",
    ai: true,
    seo: {
      title: "Free AI Code Explainer — Plain-English Code Walkthrough | BestMint",
      description:
        "Paste code, get a plain-English explanation. Line-by-line for short snippets, high-level for longer code. Powered by Google Gemma.",
      keywords: [
        "ai code explainer",
        "explain code online",
        "code to english",
        "regex explainer",
        "code walkthrough ai",
      ],
    },
    faqs: [
      { q: "Which languages does it support?", a: "Any mainstream language Gemma can read — Python, JavaScript/TypeScript, Java, C/C++, Rust, Go, SQL, shell, regex and more." },
      { q: "Do I have to specify the language?", a: "No, but providing it usually sharpens the explanation, especially for languages with similar syntax." },
      { q: "How long can the snippet be?", a: "Up to about 30,000 characters. Past that, paste the most relevant section." },
    ],
  },
  {
    slug: "ai-text-expander",
    category: "ai",
    name: "AI Text Expander",
    tagline: "Expand bullets or an outline into 2–3x prose paragraphs.",
    summary:
      "Drop in an outline or bullet list and Gemma expands it into well-structured prose, roughly 2x to 3x the original length. The order and intent of every point are preserved — natural transitions, no filler.",
    useCases: [
      "Turn meeting notes into a written recap",
      "Expand an outline into a draft blog post",
      "Flesh out a slide-deck bullet into paragraph copy",
      "Convert speaker notes into a publishable article",
    ],
    icon: "📖",
    ai: true,
    seo: {
      title: "Free AI Text Expander — Bullets to Prose | BestMint",
      description:
        "Expand bullets or an outline into 2–3x prose paragraphs while preserving order and intent. Powered by Google Gemma.",
      keywords: [
        "ai text expander",
        "bullets to prose",
        "outline to article",
        "text expansion ai",
        "expand writing ai",
      ],
    },
    faqs: [
      { q: "Does it add new facts?", a: "It can add framing and transitions but is instructed to preserve every original point in order. Always check for invented specifics before publishing." },
      { q: "How much longer is the output?", a: "Roughly 2x to 3x the input length, depending on how dense the original bullets are." },
      { q: "Can I use this for blog drafts?", a: "Yes — pair it with the Blog Title Generator and Tone Changer for a fast outline-to-draft pipeline." },
    ],
  },
];

export const TOOL_BY_SLUG: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
);

export function toolsByCategory(category: string): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function relatedTools(tool: Tool, count = 4): Tool[] {
  // Same category first, then fall back to anything else.
  const sameCat = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug);
  const others = TOOLS.filter((t) => t.category !== tool.category);
  return [...sameCat, ...others].slice(0, count);
}
