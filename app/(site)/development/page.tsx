import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ServicesGrid from "@/components/shared/ServicesGrid";
import Timeline from "@/components/development/Timeline";
import DevIllustration from "@/components/development/DevIllustration";
import Reveal from "@/components/ui/Reveal";
import {
  developmentIntro,
  experience,
  projects,
  services,
  skills,
  whyChooseMe,
} from "@/data/development";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Development — Ivy Ocampo",
  description: developmentIntro.description,
};

// Bento rhythm for the 6 projects: 7+5, then three 4s, then a full-width row.
const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-12",
];
const WIDE = new Set([0, 5]);

export default function DevelopmentPage() {
  return (
    <div>
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="mb-4 text-sm font-medium text-accent">{developmentIntro.eyebrow}</div>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl">
              {developmentIntro.title.split("feel as good")[0]}
              <span className="text-accent">feel as good</span>
              {developmentIntro.title.split("feel as good")[1]}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">{developmentIntro.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="relative hidden lg:block">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-[90px]"
            />
            <DevIllustration className="mx-auto w-full max-w-lg text-accent [&_svg]:h-auto [&_svg]:w-full" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 grid gap-8 border-t border-border pt-8 md:grid-cols-12">
          <ul className="flex flex-wrap gap-2 md:col-span-7" aria-label="Skills">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"
              >
                {skill}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:col-span-5" aria-label="Why work with me">
            {whyChooseMe.map((reason) => (
              <li key={reason} className="flex items-center gap-2.5 text-sm font-medium">
                <Check size={16} aria-hidden className="shrink-0 text-accent" />
                {reason}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeading title="What I bring to a project." highlight="a project." />
          <div className="mt-12">
            <ServicesGrid services={services} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <SectionHeading title="Real, shipped things." highlight="shipped" />
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {projects.map((project, i) => {
            const wide = WIDE.has(i % SPANS.length);
            const lead = i === 0;
            const content = (
              <>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={`font-display font-semibold tracking-tight ${
                        wide ? "text-3xl" : "text-2xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.href && (
                      <ArrowUpRight
                        size={20}
                        aria-hidden
                        className={`mt-1 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          lead ? "text-white/70 group-hover:text-white" : "text-muted group-hover:text-accent"
                        }`}
                      />
                    )}
                  </div>
                  <p className={`mt-3 max-w-[62ch] text-sm leading-relaxed ${lead ? "text-white/80" : "text-muted"}`}>
                    {project.description}
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className={`rounded-full px-2.5 py-1 ${
                        lead ? "bg-white/15 text-white" : "bg-accent-soft text-accent"
                      }`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </>
            );

            return (
              <Reveal key={project.title} delay={(i % 3) * 0.08} className={SPANS[i % SPANS.length]}>
                {project.href ? (
                  <Link
                    href={project.href}
                    target={project.external ? "_blank" : undefined}
                    rel={project.external ? "noopener noreferrer" : undefined}
                    className={`group flex h-full flex-col justify-between rounded-3xl p-7 transition-[transform,box-shadow,background-color] duration-300 md:p-8 ${
                      lead ? "bg-accent text-white shadow-lift" : "bg-surface shadow-soft hover:-translate-y-1 hover:shadow-lift"
                    }`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col justify-between rounded-3xl bg-surface p-7 shadow-soft md:p-8">
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Experience" title="Where I've worked." highlight="worked." size="md" />
          </div>
          <div className="md:col-span-7">
            <Timeline experience={experience} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Reveal className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center text-background md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_70%)]"
          />
          <h2 className="font-display relative text-3xl font-semibold tracking-tight md:text-5xl">
            Have any project idea in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-background/70">
            Send a line about it. I&apos;m open to freelance builds, design systems, and full
            product work.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="press relative mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white"
          >
            {site.email}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
