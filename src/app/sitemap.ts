import type { MetadataRoute } from "next";
import { drugProductSectionRecords } from "@/data/ctd/sections";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";
import { absoluteUrl, CONTENT_LAST_UPDATED } from "@/lib/site";

const staticRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/applications", changeFrequency: "monthly", priority: 0.8 },
  { path: "/corrections", changeFrequency: "monthly", priority: 0.4 },
  { path: "/editorial-policy", changeFrequency: "monthly", priority: 0.6 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/regulatory-updates", changeFrequency: "weekly", priority: 0.85 },
  { path: "/submission-navigator/ctd", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/submission-navigator/ctd/module-2/quality-overall-summary",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/submission-navigator/ctd/module-3",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/submission-navigator/ctd/source-matrix",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_LAST_UPDATED}T00:00:00.000Z`);
  const sectionRoutes = drugProductSectionRecords.map((section) => ({
    url: absoluteUrl(`/submission-navigator/ctd/module-3/drug-product/${section.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const updateRoutes = regulatoryUpdates.map((record) => ({
    url: absoluteUrl(`/regulatory-updates/${record.slug}`),
    lastModified: new Date(`${record.lastVerifiedDate}T00:00:00.000Z`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...sectionRoutes,
    ...updateRoutes,
  ];
}
