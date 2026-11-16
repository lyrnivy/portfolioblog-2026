import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, PenLine } from "lucide-react";
import { getPostSlugs, PostMetadata } from "@/lib/posts";
import Comments from "@/components/blogs/Comments";
import { site, socials } from "@/data/site";

const authorSameAs = socials
  .map((s) => s.href)
  .filter((href) => href.startsWith("http"));

const authorInstagram = socials.find((s) => s.label === "Instagram")?.href;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

async function loadPost(slug: string) {
  try {
    return (await import(`@/content/blog/${slug}.mdx`)) as {
      default: ComponentType;
      metadata: PostMetadata;
    };
  } catch {
    return null;
  }
}

export async function generateMetadata(props: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await loadPost(slug);
  if (!post) return {};

  const { title, excerpt, cover, date } = post.metadata;
  const url = `${site.url}/blogs/${slug}`;
  const images = cover ? [cover] : undefined;

  return {
    title: `${title} — Ivy Ocampo`,
    description: excerpt,
    authors: [{ name: site.name, url: site.url }],
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description: excerpt,
      publishedTime: date,
      authors: [site.name],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(dateStr: string) {
  return dateFormat.format(new Date(dateStr));
}

export default async function BlogPostPage(props: PageProps<"/blogs/[slug]">) {
  const { slug } = await props.params;
  const post = await loadPost(slug);

  if (!post) notFound();

  const { default: Post, metadata } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.excerpt,
    datePublished: metadata.date,
    dateModified: metadata.date,
    ...(metadata.cover ? { image: `${site.url}${metadata.cover}` } : {}),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
      ...(authorSameAs.length ? { sameAs: authorSameAs } : {}),
    },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blogs/${slug}`,
    ...(metadata.location ? { contentLocation: { "@type": "Place", name: metadata.location } } : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blogs"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        All blogs
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-1">
          <PenLine size={13} aria-hidden />
          By{" "}
          {authorInstagram ? (
            <a
              href={authorInstagram}
              target="_blank"
              rel="noopener noreferrer author"
              className="transition-colors hover:text-accent"
            >
              {site.name}
            </a>
          ) : (
            site.name
          )}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={13} aria-hidden />
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
        </span>
        {metadata.location && (
          <span className="flex items-center gap-1">
            <MapPin size={13} aria-hidden />
            {metadata.location}
          </span>
        )}
        {metadata.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-6xl">
        {metadata.title}
      </h1>

      {metadata.cover && (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-accent-soft shadow-lift md:aspect-[16/8]">
          <Image
            src={metadata.cover}
            alt={metadata.location ? `${metadata.title}, ${metadata.location}` : metadata.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 text-base md:text-[1.1rem]">
        <Post />
      </div>

      <Comments slug={slug} />
    </article>
  );
}
