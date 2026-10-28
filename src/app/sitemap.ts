import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...SERVICES.map((s) => `/${s.slug}`), "/portfolio", "/get-a-quote", "/privacy-policy"];
  return paths.map((p) => ({ url: absoluteUrl(p) }));
}
