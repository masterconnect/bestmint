import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, TOOL_BY_SLUG } from "@/lib/tools/registry";
import { metadataForTool } from "@/lib/seo/metadata";
import { ToolShell } from "@/components/tool-shell";
import { ToolWidget } from "@/components/tools/tool-widget";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ category: t.category, slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, category } = await params;
  const tool = TOOL_BY_SLUG[slug];
  if (!tool || tool.category !== category) return {};
  return metadataForTool(tool);
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const tool = TOOL_BY_SLUG[slug];
  if (!tool || tool.category !== category) notFound();

  return (
    <ToolShell tool={tool}>
      <ToolWidget slug={tool.slug} />
    </ToolShell>
  );
}
