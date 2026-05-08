import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/tools/categories";
import { TOOLS } from "@/lib/tools/registry";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const root: MetadataRoute.Sitemap[number] = {
    url: SITE.url,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };
  const cats = CATEGORIES.map((c) => ({
    url: `${SITE.url}/tools/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const tools = TOOLS.map((t) => ({
    url: `${SITE.url}/tools/${t.category}/${t.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [root, ...cats, ...tools];
}
