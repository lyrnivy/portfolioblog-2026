import { travelDeals } from "@/data/site";
import SocialIcon from "@/components/shared/SocialIcon";

export default function TravelDeals() {
  return (
    <aside className="my-12 rounded-3xl bg-accent-soft/60 p-6 md:p-8">
      <p className="text-sm italic text-muted">
        This post contains affiliate links. If you book through them I may earn a small
        commission at no extra cost to you. It helps keep these guides free.
      </p>

      <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">My discount codes</h3>
      <ul className="mt-4 space-y-3.5 text-sm text-foreground/85">
        {travelDeals.map((deal) => (
          <li key={deal.code} className="flex items-start gap-3">
            <img
              src={`https://www.google.com/s2/favicons?domain=${deal.iconDomain}&sz=64`}
              alt=""
              width={28}
              height={28}
              className="mt-0.5 h-7 w-7 shrink-0 rounded-lg border border-border bg-white"
            />
            <span className="leading-relaxed">
              <a
                href={deal.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="font-medium text-accent hover:underline"
              >
                {deal.label}
              </a>
              {", code "}
              <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.8em] text-accent">
                {deal.code}
              </code>
              {"note" in deal && deal.note ? (
                <span className="text-muted"> · {deal.note}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-muted">Follow along:</span>
        <a
          href="https://www.tiktok.com/@ivyocampo7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
        >
          <SocialIcon label="TikTok" size={16} />
          TikTok
        </a>
        <a
          href="https://www.instagram.com/lyrnivy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
        >
          <SocialIcon label="Instagram" size={16} />
          Instagram
        </a>
      </div>
    </aside>
  );
}
