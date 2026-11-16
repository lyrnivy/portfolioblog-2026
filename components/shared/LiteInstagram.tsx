"use client";

import { useState } from "react";
import SocialIcon from "@/components/shared/SocialIcon";

function shortcodeFrom(url: string) {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match?.[1] ?? url;
}

export default function LiteInstagram({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const code = shortcodeFrom(url);
  const label = caption ?? "Instagram post";

  return (
    <div className="mx-auto w-full max-w-[400px]">
      {playing ? (
        <iframe
          src={`https://www.instagram.com/p/${code}/embed/`}
          title={label}
          loading="lazy"
          allowFullScreen
          className="h-[560px] w-full rounded-3xl border border-border bg-surface"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group relative flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-center"
          aria-label={`Open ${label}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <SocialIcon label="Instagram" size={22} />
          </span>
          <span className="text-sm font-medium text-white">{label}</span>
          <span className="text-xs text-white/60">View on Instagram</span>
        </button>
      )}
    </div>
  );
}
