# rahmatez blog

A fast, MDX-powered technical blog built with **Next.js** and styled with **neo-brutalism** UI. Content lives in the repository as `.mdx` files — no CMS required.

## Features

- **MDX articles** with GitHub Flavored Markdown, syntax highlighting (One Dark Pro), and custom components
- **Neo-brutalist design** via [`neobrutalism-ui-react`](https://www.npmjs.com/package/neobrutalism-ui-react)
- **Global search** with `⌘K` / `Ctrl+K` command palette
- **Category pages** with pagination
- **Article explorer** with search, category filter, and sort options
- **Sticky table of contents** on article pages (collapsible on mobile)
- **Prev/next navigation** and related posts
- **SEO-ready**: per-article metadata, Open Graph, `sitemap.xml`, `robots.txt`, and RSS feed
- **Mobile-friendly** layout with responsive navigation

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | neobrutalism-ui-react, Radix UI |
| Content | MDX (`next-mdx-remote`, `gray-matter`) |
| Markdown | remark-gfm, rehype-slug, rehype-pretty-code, rehype-autolink-headings |
| Highlighting | Shiki |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for production:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username/your-repo
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (SEO, sitemap, RSS, Open Graph) |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub repository or profile link shown in the footer |

## Content

Articles are stored in:

```
content/posts/**/*.mdx
```

Nested folders become part of the URL slug. For example:

```
content/posts/terminal/perintah-docker-command-line-lengkap.mdx
→ /posts/terminal/perintah-docker-command-line-lengkap
```

### Frontmatter

```yaml
---
title: "Article Title"
description: "Short summary for SEO and cards"
date: "2025-06-26"
category: "terminal"
tags: ["docker", "cli", "devops"]
featured: true # optional
---
```

| Field | Required | Description |
| --- | --- | --- |
| `title` | Yes | Article title |
| `description` | Yes | Summary used in metadata and previews |
| `date` | Yes | Publication date (`YYYY-MM-DD`) |
| `category` | Yes | Category name |
| `tags` | Yes | Array of tags |
| `featured` | No | Show on the homepage featured section |

### MDX components

Built-in shortcodes available in articles:

- `<Callout type="tip|info|warning">` — highlighted callout box
- `<CounterDemo />` — interactive counter demo
- Tables, code blocks, and headings are styled automatically

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── artikel/            # All articles + filters
│   ├── kategori/           # Category index & pages
│   ├── posts/[...slug]/    # Article detail
│   ├── feed.xml/           # RSS feed
│   ├── sitemap.ts
│   └── robots.ts
├── components/             # React components
├── content/posts/          # MDX article files
├── lib/                    # Posts, search, pagination, SEO helpers
└── public/                 # Static assets
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Homepage with featured posts and latest articles |
| `/artikel` | All articles with search, filter, and sort |
| `/kategori` | Category index |
| `/kategori/[slug]` | Articles in a category |
| `/posts/[...slug]` | Article detail page |
| `/feed.xml` | RSS feed |
| `/sitemap.xml` | XML sitemap |
| `/robots.txt` | Robots file |

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm start      # Start production server
npm run lint   # Run ESLint
```

## Deployment

This project works well on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any platform that supports Next.js.

Before deploying, set `NEXT_PUBLIC_SITE_URL` to your production domain so metadata, canonical URLs, and the RSS feed resolve correctly.

## License

Private project. All rights reserved unless otherwise specified.
