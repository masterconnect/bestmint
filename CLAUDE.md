# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BestMint is a Next.js 15 / React 19 / Tailwind CSS v4 collection of free online utilities (text, developer, image, color, generators, calculators, datetime, SEO, AI). Most tools run entirely in the browser; AI tools call Google's Gemma model via the Gemini API.

## Commands

```bash
npm run dev      # Next dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

There is no test runner configured.

## Required env vars

Copy `.env.local.example` to `.env.local`:

- `GEMINI_API_KEY` — required for `/api/ai/*` routes (Google AI Studio key).
- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap, OpenGraph; defaults to `https://bestmint.com`.

## Architecture

### The registry is the source of truth

Every tool is declared in `lib/tools/registry.ts` (slug, category, name, copy, SEO, FAQs, optional `ai: true`). Categories are declared in `lib/tools/categories.ts`. These two files drive:

- Static route generation in `app/tools/[category]/[slug]/page.tsx` via `generateStaticParams`.
- The category index at `app/tools/[category]/page.tsx`.
- Metadata + JSON-LD via `lib/seo/metadata.ts` and `lib/seo/jsonld.ts`.
- Sitemap (`app/sitemap.ts`) and homepage tool grid.
- Related-tools section in `components/tool-shell.tsx`.

**Adding a tool requires three coordinated edits:**

1. Append a `Tool` entry to `TOOLS` in `lib/tools/registry.ts` with the right `category` slug from `categories.ts`.
2. Create the widget at `components/tools/<slug>.tsx` as a default-exported `"use client"` component.
3. Register the dynamic import in `components/tools/tool-widget.tsx` keyed by slug.

If step 3 is missed, the page renders a "not implemented yet" placeholder.

### Page → shell → widget composition

`app/tools/[category]/[slug]/page.tsx` looks up the tool from `TOOL_BY_SLUG`, validates the category matches, then renders `<ToolShell tool={tool}><ToolWidget slug={tool.slug} /></ToolShell>`. The shell handles breadcrumbs, header, summary, FAQs, related-tools grid, and per-page JSON-LD. Widgets only render the interactive UI — they don't repeat title/description/SEO scaffolding.

### Widgets are client-only and self-contained

All tool widgets are `"use client"` and use shared primitives from `components/ui/panel.tsx` (`Panel`, `inputCls`, `textareaCls`, `btnPrimary`, `btnGhost`) and `components/ui/copy-button.tsx`. The visual language uses CSS custom properties (`--color-surface`, `--color-border`, `--color-accent`, etc.) defined in `app/globals.css` via the Tailwind v4 `@theme` block — prefer these over hard-coded colors.

Browser-only tools should never round-trip to the server; many copy decks ("your data never leaves your device") promise this. Use Web Crypto, Canvas, `Intl`, etc.

### AI tools

AI-flagged tools (`ai: true` in the registry) are paired with API routes under `app/api/ai/<name>/route.ts`. Routes share `lib/gemini.ts`:

- `geminiText(prompt, system?)` — single-turn completion using `LLM_MODEL` (currently `gemma-4-31b-it`). Gemma instruct models reject `systemInstruction`, so any `system` arg is folded into the prompt.
- `rateLimit(key, max=20, windowMs=60_000)` — per-IP in-memory bucket.

Routes set `runtime = "nodejs"` and `dynamic = "force-dynamic"`, validate input length, rate-limit by `x-forwarded-for`, and return `{ error }` JSON on failure. The in-memory rate limiter does not persist across instances — fine for this single-region deploy, but be aware before scaling out.

### SEO

Metadata is built centrally: `metadataForTool(tool)` and `metadataForCategory(category)` in `lib/seo/metadata.ts` produce Next `Metadata` objects with canonical URL, OpenGraph, Twitter Card, and category-specific OG image at `/og/<category>.png`. JSON-LD helpers in `lib/seo/jsonld.ts` (`toolJsonLd`, `breadcrumbsJsonLd`, `organizationJsonLd`, `websiteJsonLd`) are injected via `<script type="application/ld+json">` in the layout and tool shell. The site URL comes from `SITE.url` in `lib/site.ts`.

## Conventions

- Path alias `@/*` maps to repo root (see `tsconfig.json`).
- TypeScript `strict` is on; Next 15 page params are `Promise<...>` and must be awaited.
- Dark theme only (`color-scheme: dark` in `globals.css`).
- The category `accent` hex from `categories.ts` is consumed in JSX via inline `style` with `color-mix(in srgb, ...)` — keep that pattern when theming new category UI.
