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
    ],
  },
  {
    slug: "character-counter",
    category: "text",
    name: "Character Counter",
    tagline: "Count characters with and without spaces, ideal for tweets and SEO meta tags.",
    summary:
      "A precise character counter for any text. See the live count with and without spaces, the byte size in UTF-8, and progress against common limits like Twitter (280), meta titles (60) and meta descriptions (160).",
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
    ],
  },
  {
    slug: "case-converter",
    category: "text",
    name: "Case Converter",
    tagline: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and kebab-case.",
    summary:
      "Convert text between common letter-case styles in one click: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, CONSTANT_CASE and kebab-case. Useful for renaming variables, tidying headlines and normalising data.",
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
    ],
  },
  {
    slug: "lorem-ipsum",
    category: "text",
    name: "Lorem Ipsum Generator",
    tagline: "Generate placeholder text by words, sentences or paragraphs.",
    summary:
      "Generate Lorem Ipsum placeholder text on demand. Choose how many paragraphs, sentences or words you need, optionally start with the classic \"Lorem ipsum dolor sit amet…\" opener, and copy with a click.",
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
    ],
  },
  {
    slug: "text-reverser",
    category: "text",
    name: "Text Reverser",
    tagline: "Reverse text by characters, words or lines.",
    summary:
      "Flip your text in three ways: reverse the order of characters, words, or lines. Useful for puzzles, palindromes, log file inspection and creative writing.",
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
    ],
  },
  {
    slug: "text-diff",
    category: "text",
    name: "Text Diff Checker",
    tagline: "Compare two blocks of text and highlight differences line by line.",
    summary:
      "Paste two blocks of text and see exactly what changed. The diff highlights added, removed and unchanged lines side-by-side, similar to git diff but in your browser. Useful for proofreading, contract reviews and code comparisons.",
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
    ],
  },
  {
    slug: "json-csv",
    category: "developer",
    name: "JSON ↔ CSV Converter",
    tagline: "Convert JSON arrays to CSV and CSV back to JSON.",
    summary:
      "Convert between JSON and CSV in either direction. Auto-detects column headers, handles nested objects via dot-paths, and quotes values containing commas, newlines or quote characters per RFC 4180.",
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
    ],
  },
  {
    slug: "base64",
    category: "developer",
    name: "Base64 Encoder & Decoder",
    tagline: "Encode and decode Base64 strings, including UTF-8 and binary.",
    summary:
      "Encode any text or file to Base64 and decode Base64 back to text. Handles full Unicode (UTF-8) correctly and supports URL-safe Base64 used in JWTs.",
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
    ],
  },
  {
    slug: "url-encoder",
    category: "developer",
    name: "URL Encoder & Decoder",
    tagline: "Percent-encode and decode URL components safely.",
    summary:
      "Encode any string for safe use in a URL, or decode percent-encoded URLs back to readable text. Choose between full-string encoding and component encoding (the difference between encodeURI and encodeURIComponent).",
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
    ],
  },
  {
    slug: "html-entities",
    category: "developer",
    name: "HTML Entity Encoder & Decoder",
    tagline: "Escape and unescape HTML entities like &amp;, &lt;, &gt;.",
    summary:
      "Convert characters to their HTML entity equivalents and back. Useful for safely embedding user content in HTML, displaying code on a webpage, or de-escaping copied source.",
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
    ],
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    name: "JWT Decoder",
    tagline: "Decode JWT header and payload, view claims and expiry at a glance.",
    summary:
      "Paste a JSON Web Token and instantly inspect the header, payload and signature. Standard claims (iss, sub, exp, iat) are highlighted with human-readable timestamps. The decoder runs in your browser; tokens are never sent anywhere.",
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
    ],
  },
  {
    slug: "hash-generator",
    category: "developer",
    name: "Hash Generator (MD5, SHA-1, SHA-256, SHA-512)",
    tagline: "Compute cryptographic hashes from any text.",
    summary:
      "Compute MD5, SHA-1, SHA-256 and SHA-512 hashes of any input string. Hashes are computed locally using the Web Crypto API (and a tiny pure-JS MD5 fallback) — your input never leaves the browser.",
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
    ],
  },
  {
    slug: "uuid-generator",
    category: "developer",
    name: "UUID Generator",
    tagline: "Generate v4 UUIDs in bulk, with copy-all support.",
    summary:
      "Generate one or many version-4 UUIDs (random universally unique identifiers). UUIDs come from your browser's cryptographic random source, suitable for use as primary keys and request IDs.",
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
    ],
  },
  {
    slug: "regex-tester",
    category: "developer",
    name: "Regex Tester",
    tagline: "Test JavaScript regular expressions against a string with live highlighting.",
    summary:
      "Write a regular expression, set flags, and see matches highlighted in your test string in real time. Captured groups are shown beside each match. Uses the JavaScript regex engine for parity with browsers and Node.js.",
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
    ],
  },
  {
    slug: "minifier",
    category: "developer",
    name: "HTML / CSS / JS Minifier",
    tagline: "Strip whitespace and comments from HTML, CSS or JavaScript.",
    summary:
      "Paste HTML, CSS or JavaScript and get a minified version with comments and unnecessary whitespace removed. Useful for inline-script blocks, email templates and quick size checks. Heavy production builds should still use a dedicated build tool.",
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
    ],
  },
  {
    slug: "image-compressor",
    category: "image",
    name: "Image Compressor",
    tagline: "Reduce image file size with adjustable quality, preview before saving.",
    summary:
      "Shrink JPG, PNG or WEBP images to a target file size or quality. Compare original and compressed side-by-side, then download. Compression runs locally in your browser.",
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
    ],
  },
  {
    slug: "image-resizer",
    category: "image",
    name: "Image Resizer",
    tagline: "Resize images to exact pixel dimensions or by percentage.",
    summary:
      "Resize any image to a specific width and height (with optional aspect-ratio lock) or by percentage. Choose the output format and download. Everything runs in your browser.",
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
    ],
  },
  {
    slug: "image-to-base64",
    category: "image",
    name: "Image to Base64",
    tagline: "Encode an image as a Base64 data URI for inline embedding.",
    summary:
      "Convert any image to a Base64 data URI suitable for embedding directly in HTML, CSS or JSON. Useful for icons in emails, single-file demos and tiny inline assets.",
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
    ],
  },
  {
    slug: "favicon-generator",
    category: "image",
    name: "Favicon Generator",
    tagline: "Generate favicon ICO and PNG sizes from any image.",
    summary:
      "Drop in a square image and download a complete favicon set: 16x16, 32x32, 48x48, 180x180 (Apple touch icon) and 512x512 PNGs, ready to drop into your site.",
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
    ],
  },
  {
    slug: "gradient-generator",
    category: "color",
    name: "CSS Gradient Generator",
    tagline: "Build linear and radial CSS gradients with live preview.",
    summary:
      "Design linear or radial CSS gradients with multiple color stops, adjust angle and direction, then copy the ready-to-paste CSS.",
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
    ],
  },
  {
    slug: "color-palette",
    category: "color",
    name: "Color Palette Generator",
    tagline: "Generate harmonious color schemes from a base color.",
    summary:
      "Pick a base color and generate complementary, analogous, triadic, tetradic and split-complementary palettes. Copy any swatch as HEX or export the whole palette as CSS variables.",
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
    ],
  },
  {
    slug: "contrast-checker",
    category: "color",
    name: "WCAG Contrast Checker",
    tagline: "Check color contrast ratios against WCAG AA/AAA accessibility levels.",
    summary:
      "Enter a foreground and background color and instantly see the contrast ratio along with WCAG AA and AAA pass/fail flags for normal and large text.",
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
    ],
  },
  {
    slug: "qr-generator",
    category: "generators",
    name: "QR Code Generator",
    tagline: "Generate a QR code for any URL or text and download as PNG or SVG.",
    summary:
      "Type a URL, contact card, Wi-Fi credentials or any text and get a scannable QR code. Adjust error correction and size, then download as PNG or SVG.",
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
    ],
  },
  {
    slug: "random-number",
    category: "generators",
    name: "Random Number Generator",
    tagline: "Generate random integers or decimals within a range.",
    summary:
      "Generate one or many random numbers within a chosen range. Choose integers or decimals, set how many to generate, and optionally allow duplicates.",
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
    ],
  },
  {
    slug: "slug-generator",
    category: "generators",
    name: "Slug Generator",
    tagline: "Convert any title into a clean, URL-safe slug.",
    summary:
      "Turn a page title into a URL-friendly slug: lowercase, hyphenated, ASCII-only with diacritics stripped. Useful for blog posts, e-commerce URLs and SEO-friendly paths.",
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
    ],
  },
  {
    slug: "percentage-calculator",
    category: "calculators",
    name: "Percentage Calculator",
    tagline: "Compute percent of a number, percent change, and inverse percent.",
    summary:
      "Three calculators in one: what is X% of Y; X is what percent of Y; and percent increase/decrease between two numbers. Useful for tips, tax, discounts and analytics.",
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
    ],
  },
  {
    slug: "age-calculator",
    category: "calculators",
    name: "Age Calculator",
    tagline: "Calculate exact age in years, months and days from a birthdate.",
    summary:
      "Enter a birthdate (and optional reference date) to get the exact age in years, months and days, plus total days, hours and minutes lived.",
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
    ],
  },
  {
    slug: "bmi-calculator",
    category: "calculators",
    name: "BMI Calculator",
    tagline: "Calculate body mass index in metric or imperial units.",
    summary:
      "Enter your height and weight (metric or imperial) to compute Body Mass Index along with the WHO classification. Educational only — not medical advice.",
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
    ],
  },
  {
    slug: "tip-calculator",
    category: "calculators",
    name: "Tip & Bill Splitter",
    tagline: "Calculate tip and split a bill across any number of people.",
    summary:
      "Enter the bill, choose a tip percentage, and the number of people. The calculator shows the tip total, the bill total and the per-person amount.",
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
    ],
  },
  {
    slug: "timezone-converter",
    category: "datetime",
    name: "Timezone Converter",
    tagline: "Convert a time between any two time zones.",
    summary:
      "Pick a date/time, source timezone and one or more target zones to see the equivalent local time everywhere. Daylight-saving transitions handled correctly via the browser's Intl API.",
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
    ],
  },
  {
    slug: "date-diff",
    category: "datetime",
    name: "Date Difference Calculator",
    tagline: "Calculate days, weeks, months and years between two dates.",
    summary:
      "Pick a start and end date and get the exact difference in days, weeks, months and years. Optionally exclude weekends to count business days.",
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
    ],
  },
  {
    slug: "og-preview",
    category: "seo",
    name: "Open Graph Preview",
    tagline: "Preview how a URL will look when shared on social media.",
    summary:
      "Paste a URL and see how it would appear shared on Facebook, LinkedIn, Twitter/X and Slack — including the OG image, title and description. Useful for verifying meta tags before launch.",
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
    ],
  },
  {
    slug: "robots-generator",
    category: "seo",
    name: "Robots.txt Generator",
    tagline: "Build a robots.txt with allow/disallow rules and sitemap pointer.",
    summary:
      "Build a valid robots.txt by adding allow/disallow rules per user agent, plus a sitemap URL. Copy the output to /robots.txt at your site root.",
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
    ],
  },
  {
    slug: "ai-paraphraser",
    category: "ai",
    name: "AI Paraphraser",
    tagline: "Rewrite text in a chosen tone — formal, casual, concise, or playful.",
    summary:
      "Paste text and choose a tone — formal, casual, concise, friendly or playful — and Gemma will rewrite while preserving meaning. Useful for emails, marketing copy and tightening prose.",
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
    ],
  },
  {
    slug: "ai-translator",
    category: "ai",
    name: "AI Translator",
    tagline: "Translate text between major world languages, powered by Gemma.",
    summary:
      "Translate text between English, Spanish, French, German, Chinese, Japanese, Arabic and 30+ other languages. Gemma handles idioms and context better than dictionary-style translators.",
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
