import Reveal from "@/components/ui/Reveal";
import AboutPhoto from "@/components/home/AboutPhoto";
import { site } from "@/data/site";

export default function About() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
      <Reveal className="md:col-span-5">
        <AboutPhoto />
      </Reveal>

      <Reveal delay={0.1} className="md:col-span-7 md:pl-6">
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-6xl">
          Precision on screen, <span className="text-accent">curiosity</span> everywhere else.
        </h2>
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
          {site.bio}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Interests">
          {site.interests.map((interest) => (
            <li
              key={interest}
              className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"
            >
              {interest}
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Based in</dt>
            <dd className="mt-1 font-medium">{site.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Focus</dt>
            <dd className="mt-1 font-medium">React &amp; UI</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-sm text-muted">Say hi</dt>
            <dd className="mt-1 font-medium">
              <a
                href={`mailto:${site.email}`}
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </Reveal>
    </div>
  );
}
