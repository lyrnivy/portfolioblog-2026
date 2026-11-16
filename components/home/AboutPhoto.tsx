"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

const PHOTO_SRC = "/photos/IMG_4478.jpeg";

export default function AboutPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl bg-accent-soft md:block"
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-accent shadow-lift">
        {!failed ? (
          <Image
            src={PHOTO_SRC}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl font-semibold text-white/90">{site.monogram}</span>
          </div>
        )}
      </div>
    </div>
  );
}
