export const siteConfig = {
  name: "rahmatez blog",
  description:
    "Blog MDX dengan gaya neo-brutalism dan UX yang nyaman untuk membaca artikel teknis.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com",
  author: "rahmatez"
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
