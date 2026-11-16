import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMetadata = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  location: string | null;
  cover?: string;
};

export type PostSummary = PostMetadata & { slug: string };

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`@/content/blog/${slug}.mdx`)) as {
        metadata: PostMetadata;
      };
      return { slug, ...metadata };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
