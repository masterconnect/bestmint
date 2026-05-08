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

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
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
