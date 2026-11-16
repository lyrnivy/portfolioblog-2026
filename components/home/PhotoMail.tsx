"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { photoMailPieces, PhotoMailPiece } from "@/data/photoMail";

function extractUrl(cssUrl?: string) {
  return cssUrl?.match(/url\(['"]?(.*?)['"]?\)/)?.[1];
}

function PhotoMailCard({ piece, index }: { piece: PhotoMailPiece; index: number }) {
  const imageUrl = extractUrl(piece.backgroundImage);
  const [failed, setFailed] = useState(!imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`relative flex aspect-[4/3] items-center gap-4 overflow-hidden rounded-3xl p-5 ${piece.cardBg}`}
    >
      <span
        aria-hidden
        className={`font-script pointer-events-none relative z-10 select-none whitespace-nowrap text-4xl leading-none opacity-80 ${piece.scriptColor}`}
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {piece.title}
      </span>

      <div
        className={`relative h-full flex-1 overflow-hidden rounded-xl shadow-lg ${
          failed ? `bg-gradient-to-br ${piece.photoGradient ?? ""}` : "bg-black/10"
        }`}
      >
        {!failed && imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={piece.caption}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <span
        className={`absolute bottom-4 right-5 z-10 text-right font-display text-xs italic ${piece.captionColor}`}
      >
        {piece.caption}
        <br />
        <span className="tracking-wider">IVY OCAMPO</span>
      </span>
    </motion.div>
  );
}

export default function PhotoMail() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {photoMailPieces.map((piece, i) => (
        <PhotoMailCard key={piece.title} piece={piece} index={i} />
      ))}
    </div>
  );
}
