import Link from "next/link";
import { Music2 } from "lucide-react";
import { navItems, site, socials } from "@/data/site";
import SocialIcon from "@/components/shared/SocialIcon";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display max-w-[16ch] text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
              Let&apos;s make something worth looking at.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-lg font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-sm text-muted">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-sm text-muted">Connect</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-foreground/80 transition-colors hover:text-accent"
                  >
                    <SocialIcon label={social.label} size={16} className="shrink-0" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="font-display mt-16 select-none whitespace-nowrap bg-gradient-to-b from-foreground to-foreground/10 bg-clip-text text-[19vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent lg:text-[13.5rem]"
        >
          {site.name}
        </p>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {site.name}, {site.location}
          </p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Music2 size={14} aria-hidden className="animate-spin-slow text-accent" />
            <span>
              Now playing <span className="font-medium text-foreground">{site.nowPlaying.artist}</span>,{" "}
              {site.nowPlaying.note.charAt(0).toLowerCase() + site.nowPlaying.note.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
