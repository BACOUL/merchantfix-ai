import type { MetadataRoute } from "next";
import { canonical, publicRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: canonical(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
