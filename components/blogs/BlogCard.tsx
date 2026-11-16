import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PostSummary } from "@/lib/posts";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(dateStr: string) {
  return dateFormat.format(new Date(dateStr));
}

export default function BlogCard({
  post,
  featured = false,
}: {
  post: PostSummary;
  index?: number;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group grid h-full gap-5 ${featured ? "md:grid-cols-12 md:items-center md:gap-10" : ""}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-3xl bg-accent-soft ${
          featured ? "aspect-[16/10] md:col-span-7 md:aspect-[4/3]" : "aspect-[16/11]"
        }`}
      >
        {post.cover && (
          <Image
            src={post.cover}
            alt={post.location ? `${post.title}, ${post.location}` : post.title}
            fill
            sizes={
              featured
                ? "(min-width: 768px) 58vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className={featured ? "md:col-span-5" : ""}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {post.tags[0] && <span className="font-medium text-accent">{post.tags[0]}</span>}
          {post.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} aria-hidden />
              {post.location}
            </span>
          )}
        </div>
        <h3
          className={`font-display mt-2 font-semibold leading-snug transition-colors duration-300 group-hover:text-accent ${
            featured ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-3 text-muted ${featured ? "text-base leading-relaxed md:text-lg" : "line-clamp-2 text-sm leading-relaxed"}`}>
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <time dateTime={post.date} className="tabular text-muted">
            {formatDate(post.date)}
          </time>
          <ArrowUpRight
            size={15}
            aria-hidden
            className="text-accent opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
}
