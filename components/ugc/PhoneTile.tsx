"use client";

import { motion } from "motion/react";
import InstagramEmbed from "./InstagramEmbed";


export default function PhoneTile({
  title,
  description,
  index,
  url,
}: {
  title: string;
  description: string;
  index: number;
  url?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center"
    >
      {url ? (
        <InstagramEmbed url={url} />
      ) : (
        <div className="relative w-full max-w-[190px] rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-lift dark:border-neutral-700">
          <div className="absolute left-1/2 top-0 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-neutral-900 dark:bg-neutral-700" />
          <div
            className={`relative flex aspect-[9/19.5] w-full flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-accent p-4 text-center`}
          >
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className="mt-2 text-[11px] leading-snug text-white/80">{description}</span>
          </div>
        </div>
      )}
      <span className="mt-4 font-display text-lg font-semibold tracking-tight">{title}</span>
    </motion.div>
  );
}
