"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function LiteYoutube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-3xl"
      />
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-border bg-foreground text-left"
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/${thumbFailed ? "hqdefault" : "maxresdefault"}.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        onError={() => setThumbFailed(true)}
      />
      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play size={24} className="ml-1 fill-current" />
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
    </button>
  );
}
