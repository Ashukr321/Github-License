import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...getContent().docs.map((d) => ({
      url: `${site.url}/docs/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
