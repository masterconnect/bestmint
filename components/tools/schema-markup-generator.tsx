"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

type SchemaType = "FAQPage" | "HowTo" | "Recipe" | "Product" | "Article" | "Event" | "Organization" | "LocalBusiness";

const TYPES: SchemaType[] = ["FAQPage", "HowTo", "Recipe", "Product", "Article", "Event", "Organization", "LocalBusiness"];

export default function SchemaMarkupGenerator() {
  const [type, setType] = useState<SchemaType>("Article");
  const [fields, setFields] = useState<Record<string, string>>({
    name: "How to brew pour-over coffee",
    description: "Step-by-step pour-over guide",
    image: "https://example.com/cover.jpg",
    author: "Jane Doe",
    datePublished: "2025-01-15",
    url: "https://example.com/post",
    price: "19.99",
    currency: "USD",
    sku: "SKU-001",
    brand: "Acme",
    cookTime: "PT15M",
    yield: "2 servings",
    ingredients: "200ml water\n15g coffee",
    steps: "Boil water\nGrind beans\nPour slowly",
    faqQ: "Is this free?\nDo you ship?",
    faqA: "Yes, completely free.\nYes, worldwide.",
    startDate: "2025-06-01T19:00",
    endDate: "2025-06-01T22:00",
    location: "Acme HQ",
    address: "1 Market St, San Francisco, CA",
    phone: "+1-555-1234",
    logo: "https://example.com/logo.png",
  });

  function f(k: string, v: string) { setFields((p) => ({ ...p, [k]: v })); }
  function lines(s: string) { return s.split("\n").map((x) => x.trim()).filter(Boolean); }

  const json = useMemo(() => {
    const base: Record<string, unknown> = { "@context": "https://schema.org", "@type": type };
    switch (type) {
      case "FAQPage": {
        const qs = lines(fields.faqQ); const as = lines(fields.faqA);
        base.mainEntity = qs.map((q, i) => ({
          "@type": "Question", name: q,
          acceptedAnswer: { "@type": "Answer", text: as[i] || "" },
        }));
        break;
      }
      case "HowTo":
        base.name = fields.name; base.description = fields.description;
        base.step = lines(fields.steps).map((t, i) => ({ "@type": "HowToStep", position: i + 1, text: t }));
        break;
      case "Recipe":
        base.name = fields.name; base.image = fields.image; base.author = { "@type": "Person", name: fields.author };
        base.recipeIngredient = lines(fields.ingredients);
        base.recipeInstructions = lines(fields.steps).map((t) => ({ "@type": "HowToStep", text: t }));
        base.cookTime = fields.cookTime; base.recipeYield = fields.yield;
        break;
      case "Product":
        base.name = fields.name; base.image = fields.image; base.description = fields.description;
        base.sku = fields.sku; base.brand = { "@type": "Brand", name: fields.brand };
        base.offers = { "@type": "Offer", price: fields.price, priceCurrency: fields.currency, url: fields.url };
        break;
      case "Article":
        base.headline = fields.name; base.image = fields.image; base.description = fields.description;
        base.datePublished = fields.datePublished;
        base.author = { "@type": "Person", name: fields.author };
        base.url = fields.url;
        break;
      case "Event":
        base.name = fields.name; base.startDate = fields.startDate; base.endDate = fields.endDate;
        base.location = { "@type": "Place", name: fields.location, address: fields.address };
        base.description = fields.description; base.image = fields.image;
        break;
      case "Organization":
        base.name = fields.name; base.url = fields.url; base.logo = fields.logo;
        base.description = fields.description;
        break;
      case "LocalBusiness":
        base.name = fields.name; base.url = fields.url; base.image = fields.image;
        base.address = { "@type": "PostalAddress", streetAddress: fields.address };
        base.telephone = fields.phone;
        break;
    }
    return JSON.stringify(base, null, 2);
  }, [type, fields]);

  const out = `<script type="application/ld+json">\n${json}\n</script>`;

  const formByType: Record<SchemaType, { key: string; label: string; ta?: boolean }[]> = {
    FAQPage: [{ key: "faqQ", label: "Questions (one per line)", ta: true }, { key: "faqA", label: "Answers (one per line, paired)", ta: true }],
    HowTo: [{ key: "name", label: "Name" }, { key: "description", label: "Description" }, { key: "steps", label: "Steps (one per line)", ta: true }],
    Recipe: [{ key: "name", label: "Name" }, { key: "image", label: "Image URL" }, { key: "author", label: "Author" }, { key: "ingredients", label: "Ingredients (one per line)", ta: true }, { key: "steps", label: "Steps (one per line)", ta: true }, { key: "cookTime", label: "Cook time (ISO 8601, e.g. PT15M)" }, { key: "yield", label: "Yield" }],
    Product: [{ key: "name", label: "Name" }, { key: "image", label: "Image URL" }, { key: "description", label: "Description" }, { key: "sku", label: "SKU" }, { key: "brand", label: "Brand" }, { key: "price", label: "Price" }, { key: "currency", label: "Currency" }, { key: "url", label: "Product URL" }],
    Article: [{ key: "name", label: "Headline" }, { key: "image", label: "Image URL" }, { key: "description", label: "Description" }, { key: "datePublished", label: "Date published (ISO)" }, { key: "author", label: "Author" }, { key: "url", label: "URL" }],
    Event: [{ key: "name", label: "Event name" }, { key: "startDate", label: "Start (ISO)" }, { key: "endDate", label: "End (ISO)" }, { key: "location", label: "Location name" }, { key: "address", label: "Address" }, { key: "description", label: "Description" }, { key: "image", label: "Image URL" }],
    Organization: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }, { key: "logo", label: "Logo URL" }, { key: "description", label: "Description" }],
    LocalBusiness: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }, { key: "image", label: "Image URL" }, { key: "address", label: "Address" }, { key: "phone", label: "Phone" }],
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Schema type & fields">
        <Lbl label="Type">
          <select value={type} onChange={(e) => setType(e.target.value as SchemaType)} className={inputCls()}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Lbl>
        <div className="mt-3 space-y-3">
          {formByType[type].map((row) => (
            <Lbl key={row.key} label={row.label}>
              {row.ta ? (
                <textarea value={fields[row.key] || ""} onChange={(e) => f(row.key, e.target.value)} className={textareaCls("min-h-[80px]")} />
              ) : (
                <input value={fields[row.key] || ""} onChange={(e) => f(row.key, e.target.value)} className={inputCls()} />
              )}
            </Lbl>
          ))}
        </div>
      </Panel>
      <Panel title="JSON-LD" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[560px] overflow-auto">{out}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
