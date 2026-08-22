import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // В sitemap только индексируемые страницы — Impressum/Datenschutz с noindex
  return [{ url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1 }];
}
