import type { MetadataRoute } from "next";
import { getAllPosts, getCategorySummaries } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getCategorySummaries();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/artikel"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/kategori"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    }
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.meta.date),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/kategori/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
