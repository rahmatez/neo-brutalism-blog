import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRssFeed() {
  const posts = getAllPosts().slice(0, 50);
  const updatedAt = posts[0]?.meta.date ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/posts/${post.slug}`);
      return `
    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.meta.description)}</description>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.meta.category)}</category>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>id</language>
    <lastBuildDate>${new Date(updatedAt).toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}
