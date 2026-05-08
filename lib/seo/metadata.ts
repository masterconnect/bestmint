import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import type { Tool } from "@/lib/tools/registry";
import type { Category } from "@/lib/tools/categories";

interface BuildOptions {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // path beginning with "/"
}

/**
 * OpenGraph and Twitter `images` are intentionally omitted: Next.js auto-merges
 * the per-route `opengraph-image.tsx` files instead, generating dynamic 1200x630
 * images at build time. Setting `images` here would override that.
 */
export function buildMetadata({ title, description, keywords, path }: BuildOptions): Metadata {
  const url = SITE.url + path;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SITE.twitter,
    },
    robots: { index: true, follow: true },
  };
}

export function metadataForTool(tool: Tool): Metadata {
  return buildMetadata({
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    path: `/tools/${tool.category}/${tool.slug}`,
  });
}

export function metadataForCategory(category: Category): Metadata {
  return buildMetadata({
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
    path: `/tools/${category.slug}`,
  });
}
