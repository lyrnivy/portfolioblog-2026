import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/development";
import { ambassadorships, hotelPartners, instagramMetrics, partnerBrands, weeklyHighlight } from "@/data/ugc";

// Years since the earliest role in the experience list.
const firstYear = Math.min(...experience.map((e) => Number(e.period.slice(0, 4))));
const years = new Date().getFullYear() - firstYear;
const brandCount = ambassadorships.length + partnerBrands.length + hotelPartners.length;

const STATS = [
  { value: instagramMetrics.views, label: "Instagram views in the last 30 days" },
  { value: weeklyHighlight.views, label: "TikTok views this week" },
  { value: `${years}+`, label: "Years building for the web" },
  { value: String(brandCount), label: "Brand and hotel partners" },
];

export default function StatsBand() {
  return (
    <section aria-label="Highlights" className="relative overflow-hidden bg-accent text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_40%_80%_at_0%_0%,rgba(255,255,255,0.18),transparent_70%),radial-gradient(ellipse_40%_80%_at_100%_100%,rgba(0,0,0,0.18),transparent_70%)]"
      />
      <dl className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-6 py-16 md:grid-cols-4 md:px-10 md:py-20">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="md:border-l md:border-white/25 md:pl-6 md:first:border-l-0 md:first:pl-0">
            <dd className="tabular font-display text-5xl font-semibold leading-none tracking-[-0.045em] md:text-6xl">
              {s.value}
            </dd>
            <dt className="mt-3 max-w-[18ch] text-sm leading-snug text-white/80">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
