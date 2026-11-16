import type { Metadata } from "next";
import Image from "next/image";
import BlogCard from "@/components/blogs/BlogCard";
import SectionHeading from "@/components/shared/SectionHeading";
import LiteYoutube from "@/components/shared/LiteYoutube";
import Reveal from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/posts";
import { latestVideo } from "@/data/site";

export const metadata: Metadata = {
  title: "Blogs — Ivy Ocampo",
  description: "Travel stories, diary entries, and the latest vlog upload.",
};

export default async function BlogsPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const collage = posts.filter((p) => p.cover).slice(1, 4);

  return (
    <div>
      <section className="bg-surface pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Latest upload"
            title="Fresh off the channel."
            highlight="channel."
            description="Vlogging alongside everything else. Catch the newest one straight from YouTube."
            align="center"
          />
          <Reveal delay={0.1} className="mt-10">
            <LiteYoutube videoId={latestVideo.id} title={latestVideo.title} />
          </Reveal>
          <div className="mt-6 text-center">
            <a
              href="https://www.youtube.com/@lyrnivy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Watch more on YouTube
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              title="Stories from the road."
              highlight="the road."
              description="Travel diaries and everyday stories, all living here now. New ones get added as I write them."
            />
          </div>
          {/* Tilted cover collage from the three newest posts with photos. */}
          <div aria-hidden className="relative hidden h-[300px] lg:col-span-5 lg:block">
            {collage.map((post, i) => (
              <div
                key={post.slug}
                className={`absolute w-[52%] overflow-hidden rounded-2xl border-4 border-surface bg-accent-soft shadow-lift ${
                  ["left-0 top-6 -rotate-6", "left-[26%] top-0 z-10 rotate-2", "right-0 top-12 rotate-[8deg]"][i]
                }`}
              >
                <div className="relative aspect-[4/5]">
                  <Image src={post.cover!} alt="" fill sizes="240px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {featured && (
          <Reveal className="mt-14">
            <BlogCard post={featured} featured />
          </Reveal>
        )}

        <div className="mt-16 grid gap-x-6 gap-y-14 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
