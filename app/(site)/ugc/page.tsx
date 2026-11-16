import type { Metadata } from "next";
import { Check, Film, Hotel, MapPin, Plane } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import BrandLogo from "@/components/shared/BrandLogo";
import SocialIcon from "@/components/shared/SocialIcon";
import PhoneTile from "@/components/ugc/PhoneTile";
import InstagramEmbed from "@/components/ugc/InstagramEmbed";
import {
  InstagramMetricsCard,
  TiktokMetricsCard,
  WeeklyHighlightCard,
  instagramUpdated,
} from "@/components/ugc/AnalyticsCards";
import {
  ambassadorships,
  collabTypes,
  contentPillars,
  featuredCollab,
  hotelPartners,
  instagramMetrics,
  partnerBrands,
  partnershipNote,
  pricingNote,
  ugcIntro,
  videography,
  weeklyHighlight,
} from "@/data/ugc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "UGC — Ivy Ocampo",
  description: ugcIntro.description,
};

export default function UgcPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_24%,transparent),transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                {ugcIntro.eyebrow}
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl">
                {ugcIntro.title}
              </h1>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">{ugcIntro.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex items-start gap-4 rounded-3xl bg-surface p-5 shadow-soft md:max-w-xl">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                <Film size={18} aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight">{videography.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{videography.description}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 h-full w-full rotate-[-3deg] rounded-[2rem] bg-accent"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/photos/IMG_4478.jpeg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-6 top-10 rounded-2xl bg-surface px-4 py-3 shadow-lift md:-left-10">
              <div className="flex items-center gap-2 text-xs text-muted">
                <SocialIcon label="Instagram" size={13} />
                Last {instagramMetrics.range}
              </div>
              <div className="tabular font-display mt-1 text-2xl font-semibold tracking-tight">
                {instagramMetrics.views} <span className="text-sm font-medium text-muted">views</span>
              </div>
            </div>
            <div className="absolute -right-4 bottom-12 rounded-2xl bg-foreground px-4 py-3 text-background shadow-lift md:-right-8">
              <div className="flex items-center gap-2 text-xs text-background/70">
                <SocialIcon label="TikTok" size={13} />
                This week
              </div>
              <div className="tabular font-display mt-1 text-2xl font-semibold tracking-tight">
                {weeklyHighlight.views} <span className="text-sm font-medium text-background/70">views</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground pb-24 pt-20 text-background md:pb-32 md:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_40%,transparent),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-white">
              <Plane size={14} aria-hidden />
              Recent collaboration
            </div>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-6xl">
              {featuredCollab.brand}
            </h2>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-background/70 md:text-lg">
              {featuredCollab.description}
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6">
            {featuredCollab.posts.map((post, i) => (
              <li key={post.url}>
                <Reveal delay={i * 0.08} className="mx-auto flex max-w-[400px] flex-col gap-4">
                  <div className="flex items-baseline justify-between border-b border-background/15 pb-3">
                    <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{post.place}</h3>
                    <span className="flex items-center gap-1.5 text-sm text-background/60">
                      <MapPin size={14} aria-hidden />
                      South Korea
                    </span>
                  </div>
                  <InstagramEmbed url={post.url} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeading title="What I create." highlight="create." />
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {contentPillars.map((pillar, i) => (
              <PhoneTile
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                index={i}
                url={pillar.url}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <SectionHeading
          title="Right now, I'm living it up on TikTok and Instagram."
          highlight="TikTok and Instagram."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <InstagramMetricsCard />
          <TiktokMetricsCard />
          <WeeklyHighlightCard />
        </div>
        <p className="mt-5 text-xs text-muted">
          Figures from native TikTok and Instagram analytics. Instagram updated {instagramUpdated}.
        </p>
      </section>

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeading eyebrow="Ambassador & partnership" title="Brands I work with." highlight="Brands" />
          <Reveal delay={0.1} className="mt-6 max-w-3xl">
            <p className="max-w-[65ch] text-base leading-relaxed text-muted md:text-lg">{partnershipNote}</p>
            <a
              href="https://ivyocampougc.my.canva.site/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              View my full brand portfolio
            </a>
          </Reveal>

          <div className="mt-14 grid gap-12">
            <Reveal delay={0.1}>
              <h3 className="text-sm font-medium text-muted">Ambassador</h3>
              <ul className="mt-4 grid gap-5 sm:grid-cols-2">
                {ambassadorships.map((brand) => (
                  <li key={brand.name}>
                    <BrandLogo brand={brand} variant="feature" role="Brand ambassador" />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="text-sm font-medium text-muted">Brand partners</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {partnerBrands.map((brand) => (
                  <li key={brand.name}>
                    <BrandLogo brand={brand} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-sm font-medium text-muted">Hotel partners</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {hotelPartners.map((brand) => (
                  <li key={brand.name}>
                    <BrandLogo
                      brand={brand}
                      fallbackIcon={<Hotel size={20} aria-hidden className="text-accent" />}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <p className="mt-10 text-xs text-muted">{pricingNote}</p>
        </div>
      </section>

      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-6">
              <SectionHeading title="Ways we can work together." highlight="work together." size="md" />
              <ul className="mt-8 border-t border-border">
                {collabTypes.map((type) => (
                  <li
                    key={type}
                    className="flex items-center gap-3 border-b border-border py-3.5 text-base text-foreground/85"
                  >
                    <Check size={16} aria-hidden className="shrink-0 text-accent" />
                    {type}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-6">
              <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-1/4 -top-1/2 h-full w-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_65%)]"
                />
                <h3 className="font-display relative text-3xl font-semibold tracking-tight">Let&apos;s collaborate</h3>
                <p className="relative mt-3 text-background/70">
                  Reach out for rate cards, media kits, or brand collab pitches.
                </p>
                <a
                  href={`mailto:${site.ugcEmail}`}
                  className="press relative mt-8 inline-flex max-w-full items-center gap-2 break-all rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white"
                >
                  {site.ugcEmail}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center md:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/bir-registration-seal.png"
            alt="BIR Registration Seal Badge, verify at bir.gov.ph"
            className="h-24 w-auto"
          />
          <p className="max-w-md text-xs text-muted">
            Registered with the Philippine Bureau of Internal Revenue. Scan the badge or
            verify at{" "}
            <a
              href="https://www.bir.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              bir.gov.ph
            </a>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}
