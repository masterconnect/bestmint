import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import type { Tool } from "@/lib/tools/registry";
import type { Category } from "@/lib/tools/categories";

interface BuildOptions {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // path beginning with "/"
  ogImage?: string;
}

export function buildMetadata({ title, description, keywords, path, ogImage }: BuildOptions): Metadata {
  const url = SITE.url + path;
  const image = ogImage ?? `${SITE.url}/og/default.png`;
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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
    ogImage: `${SITE.url}/og/${tool.category}.png`,
  });
}

export function metadataForCategory(category: Category): Metadata {
  return buildMetadata({
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
    path: `/tools/${category.slug}`,
    ogImage: `${SITE.url}/og/${category.slug}.png`,
  });
}
