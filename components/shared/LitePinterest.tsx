"use client";

import { useState } from "react";
import Image from "next/image";
import SocialIcon from "@/components/shared/SocialIcon";

function pinIdFrom(url: string) {
  const match = url.match(/pinterest\.[a-z.]+\/pin\/(?:[^/]*--)?(\d+)\/?/);
  return match?.[1] ?? url;
}

export default function LitePinterest({
  url,
  thumbnailUrl,
  caption,
}: {
  url: string;
  thumbnailUrl: string;
  caption: string;
}) {
  const [playing, setPlaying] = useState(false);
  const pinId = pinIdFrom(url);

  return (
    <div className="mx-auto w-full max-w-[345px]">
      {playing ? (
        <iframe
          src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
          title={caption}
          loading="lazy"
          className="h-[620px] w-full rounded-3xl border border-border bg-surface"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group relative flex aspect-[3/4] w-full flex-col items-center justify-end overflow-hidden rounded-3xl border border-border bg-foreground text-left"
          aria-label={`View ${caption} on Pinterest`}
        >
          <Image
            src={thumbnailUrl}
            alt={caption}
            fill
            sizes="345px"
            className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <SocialIcon label="Pinterest" size={24} />
            </span>
          </div>
          <div className="relative z-10 w-full bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="text-sm font-medium text-white">{caption}</p>
            <p className="text-xs text-white/60">View on Pinterest</p>
          </div>
        </button>
      )}
    </div>
  );
}
