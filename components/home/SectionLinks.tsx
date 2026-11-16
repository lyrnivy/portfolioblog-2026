import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DevIllustration from "@/components/development/DevIllustration";

function Arrow() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <ArrowUpRight size={18} aria-hidden />
    </span>
  );
}

/* Asymmetric bento: one tall photo tile, two stacked tiles beside it. */
export default function SectionLinks() {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
      <Reveal className="md:col-span-7 md:row-span-2">
        <Link
          href="/blogs"
          className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-foreground p-7 text-white md:min-h-[560px] md:p-9"
        >
          <Image
            src="/photos/blog/cebu.png"
            alt="Canyoneering in Cebu, jumping into a turquoise pool"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="relative flex items-end justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl font-semibold md:text-5xl">Blogs</h3>
              <p className="mt-2 max-w-[38ch] text-white/80 md:text-lg">
                Travel stories and diary entries, written along the way.
              </p>
            </div>
            <Arrow />
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.08} className="md:col-span-5">
        <Link
          href="/development"
          className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-accent-soft p-7"
        >
          <DevIllustration className="pointer-events-none absolute -bottom-6 -right-6 w-[62%] text-accent opacity-90 transition-transform duration-500 group-hover:-translate-y-1 [&_svg]:h-auto [&_svg]:w-full" />
          <div className="relative max-w-[60%]">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">Development</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              React builds, design systems, and case studies from the day job.
            </p>
          </div>
          <div className="relative">
            <Arrow />
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.16} className="md:col-span-5">
        <Link
          href="/ugc"
          className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-foreground p-7 text-white"
        >
          <Image
            src="/photos/blog/seoul-april.jpeg"
            alt="Spring in Seoul"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="relative flex items-end justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-semibold md:text-3xl">UGC</h3>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/80">
                Short-form content across travel, food, beauty, and lifestyle.
              </p>
            </div>
            <Arrow />
          </div>
        </Link>
      </Reveal>
    </div>
  );
}
