import type { MetadataRoute } from "next";
import { getProjectsWithPages } from "@/content/projects";

const siteUrl = "https://www.graymarshall.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getProjectsWithPages().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    priority: 0.7 as const,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...projectPages,
  ];
}
