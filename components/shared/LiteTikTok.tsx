"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function LiteTikTok({
  videoId,
  caption,
}: {
  videoId: string;
  caption: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[360px]">
      {playing ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title={caption}
          allow="encrypted-media; fullscreen"
          allowFullScreen
          className="h-[740px] w-full rounded-3xl border border-border bg-foreground"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group relative flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-center"
          aria-label={`Play ${caption}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={24} className="ml-1 fill-current" />
          </span>
          <span className="text-sm font-medium text-white">{caption}</span>
          <span className="text-xs text-white/60">Watch on TikTok</span>
        </button>
      )}
    </div>
  );
}
