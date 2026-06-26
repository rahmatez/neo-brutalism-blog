import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, toCategorySlug } from "@/lib/posts";
import { getAdjacentPosts, getRelatedPosts } from "@/lib/post-navigation";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { mdxComponents } from "@/components/mdx-components";
import { PostNavigation } from "@/components/post-navigation";
import { PostToc } from "@/components/post-toc";
import { RelatedPosts } from "@/components/related-posts";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { extractTocFromMdx } from "@/lib/toc";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slugParts
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artikel tidak ditemukan" };
  }

  const url = absoluteUrl(`/posts/${post.slug}`);

  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      url,
      siteName: siteConfig.name,
      tags: post.meta.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description
    },
    alternates: {
      canonical: url
    }
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const tocItems = extractTocFromMdx(post.content);
  const { prev, next } = getAdjacentPosts(post.slug);
  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <article>
      <SiteBreadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kategori", href: "/kategori" },
          {
            label: post.meta.category,
            href: `/kategori/${toCategorySlug(post.meta.category)}`
          },
          { label: post.meta.title }
        ]}
      />

      <div className="article-page-grid">
        <header className="article-page-header neo-shell min-w-0 max-w-full p-4 md:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-bold">
            <Link
              href={`/kategori/${toCategorySlug(post.meta.category)}`}
              className="rounded-full border-2 border-black px-3 py-1 uppercase"
              style={{ background: "var(--nb-main)" }}
            >
              {post.meta.category}
            </Link>
            <span>{format(new Date(post.meta.date), "dd MMMM yyyy", { locale: id })}</span>
            <span>· {post.readingMinutes} min baca</span>
          </div>

          <h1 className="text-2xl font-black leading-tight sm:text-3xl md:text-5xl">{post.meta.title}</h1>
          <p className="mt-3 text-base text-zinc-700 md:text-lg">{post.meta.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border-2 border-black px-2 py-1 text-xs font-bold"
                style={{ background: "var(--nb-secondary)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="article-page-body">
          <section className="article-page-content neo-shell min-w-0 max-w-full overflow-x-hidden p-4 md:p-8">
            <div className="prose-neo">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: "one-dark-pro",
                        keepBackground: false
                      }
                    ],
                    [rehypeAutolinkHeadings, { behavior: "append" }]
                  ]
                }
              }}
            />
            </div>

            <div className="mt-10 border-t-2 border-black pt-8">
              <PostNavigation prev={prev} next={next} />
              <RelatedPosts posts={relatedPosts} />
            </div>
          </section>

          <PostToc items={tocItems} />
        </div>
      </div>
    </article>
  );
}
