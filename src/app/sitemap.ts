import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/blog";
import { locales } from "@/lib/i18n-config";
import { getAllStaticRoutes, getLocalizedPath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = getAllStaticRoutes().map((route) => ({
    url: absoluteUrl(siteConfig.url, getLocalizedPath(route.locale, route.page)),
    lastModified: new Date(),
  }));

  const postEntries = (
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getPosts(locale);
        return posts.map((post) => ({
          url: absoluteUrl(siteConfig.url, getLocalizedPath(locale, "blog", { slug: post.slug })),
          lastModified: new Date(post.publishedAt),
        }));
      }),
    )
  ).flat();

  return [...staticEntries, ...postEntries];
}
