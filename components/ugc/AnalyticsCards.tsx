import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SocialIcon from "@/components/shared/SocialIcon";
import { instagramMetrics, tiktokMetrics, weeklyHighlight } from "@/data/ugc";

function Delta({ value, className = "" }: { value: string; className?: string }) {
  const positive = !value.trim().startsWith("-");
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`tabular inline-flex items-center gap-0.5 font-medium ${
        positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
      } ${className}`}
    >
      <Icon size={13} aria-hidden />
      <span className="sr-only">{positive ? "Up" : "Down"} </span>
      {value.replace(/^[+-]/, "")}
    </span>
  );
}

function CardHeader({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="font-display flex items-center gap-2.5 text-base font-semibold tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground">
          {icon}
        </span>
        {title}
      </h3>
      <span className="text-xs text-muted">{meta}</span>
    </div>
  );
}

/* Featured card. One big number, three supporting stats, one callout. */
export function InstagramMetricsCard() {
  const m = instagramMetrics;
  const stats: { label: string; value: string; delta?: string }[] = [
    { label: "New followers", value: m.newFollowers },
    { label: "Interactions", value: m.interactions },
    { label: "Interactions per view", value: `~${m.interactionRate}` },
  ];

  return (
    <Reveal className="h-full lg:col-span-7 lg:row-span-2">
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-accent-soft p-7 md:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_70%)]"
        />
        <div className="relative">
          <CardHeader icon={<SocialIcon label="Instagram" size={16} />} title="Instagram" meta={`Last ${m.range}`} />
        </div>

        <div className="relative mt-10 md:mt-14">
          <p className="tabular font-display text-7xl font-semibold leading-none tracking-[-0.05em] md:text-8xl">
            {m.views}
          </p>
          <p className="mt-3 text-muted">views in the last {m.range}</p>
        </div>

        <dl className="relative mt-10 grid grid-cols-1 gap-6 border-t border-[color-mix(in_srgb,var(--accent)_25%,transparent)] pt-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="tabular mt-1 flex items-baseline gap-2 text-2xl font-semibold tracking-tight">
                {s.value}
                {s.delta && <Delta value={s.delta} className="text-sm" />}
              </dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-auto pt-8">
          <div className="flex items-start gap-3 rounded-2xl bg-surface/80 p-4 shadow-soft backdrop-blur">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Sparkles size={16} aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-foreground/85">
              <span className="font-semibold text-foreground">Peak day: {m.peak.date}.</span>{" "}
              {m.peak.views} views in a single day, driven by {m.peak.source}.
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* Headline metric plus a tidy ledger of the rest. */
export function TiktokMetricsCard() {
  const m = tiktokMetrics;
  const rows: [string, { value: string; delta: string; pct: string }][] = [
    ["Profile views", m.profileViews],
    ["Likes", m.likes],
    ["Comments", m.comments],
    ["Shares", m.shares],
    ["Est. rewards", m.estRewards],
  ];

  return (
    <Reveal delay={0.08} className="h-full lg:col-span-5">
      <article className="flex h-full flex-col rounded-3xl bg-surface p-7 shadow-soft">
        <CardHeader icon={<SocialIcon label="TikTok" size={15} />} title="TikTok" meta={`Last ${m.range}`} />

        <div className="mt-6 flex items-baseline gap-3">
          <p className="tabular font-display text-5xl font-semibold tracking-[-0.04em]">{m.postViews.value}</p>
          <Delta value={m.postViews.pct} className="text-sm" />
        </div>
        <p className="mt-1 text-sm text-muted">post views</p>

        <dl className="mt-6 divide-y divide-border border-t border-border text-sm">
          {rows.map(([label, stat]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-muted">{label}</dt>
              <dd className="flex items-center gap-3">
                <span className="tabular font-semibold">{stat.value}</span>
                <Delta value={stat.pct} className="w-[4.75rem] justify-end text-xs" />
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </Reveal>
  );
}

export function WeeklyHighlightCard() {
  const w = weeklyHighlight;
  const stats = [
    { label: "Views", value: w.views },
    { label: "Followers", value: w.followers },
    { label: "Likes", value: w.likes },
  ];

  return (
    <Reveal delay={0.16} className="h-full lg:col-span-5">
      <article className="flex h-full flex-col rounded-3xl bg-surface p-7 shadow-soft">
        <CardHeader icon={<SocialIcon label="TikTok" size={15} />} title="TikTok this week" meta="Last 7 days" />

        <dl className="mt-6 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="tabular font-display mt-1 text-3xl font-semibold tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto border-t border-border pt-5 text-sm leading-relaxed text-foreground/80">
          {w.note}
        </p>
      </article>
    </Reveal>
  );
}

export const instagramUpdated = instagramMetrics.updated;
