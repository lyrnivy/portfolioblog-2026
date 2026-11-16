"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadInstagramEmbedScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      if (window.instgrm) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref} className="flex w-full justify-center overflow-hidden rounded-2xl">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "1rem",
          margin: 0,
          maxWidth: 400,
          minWidth: 326,
          width: "100%",
        }}
      />
    </div>
  );
}
