import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/seo";

export const dynamic = "force-static";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ethiopian-coffee", changeFrequency: "monthly", priority: 0.9 },
  { path: "/coffee-origins", changeFrequency: "monthly", priority: 0.8 },
  { path: "/coffee-origins/sidama-coffee", changeFrequency: "monthly", priority: 0.9 },
  { path: "/coffee-processing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/quality-and-traceability", changeFrequency: "monthly", priority: 0.8 },
  { path: "/export-services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sites", changeFrequency: "monthly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
 ] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-25");

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
