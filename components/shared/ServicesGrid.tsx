"use client";

import { motion } from "motion/react";
import { Aperture, Clapperboard, Fingerprint, LayoutTemplate, type LucideIcon } from "lucide-react";

type Service = {
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  Branding: Fingerprint,
  "Product Design": LayoutTemplate,
  "Art Direction": Aperture,
  "Motion Design": Clapperboard,
};

/* Index list: icon, big title, detail. Rows fill with the accent tint on hover. */
export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <ul className="border-t border-border">
      {services.map((service, i) => {
        const Icon = ICONS[service.title] ?? Aperture;
        return (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative grid items-center gap-4 border-b border-border py-7 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <span
              aria-hidden
              className="absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-bottom scale-y-0 rounded-2xl bg-accent-soft transition-transform duration-500 ease-out group-hover:scale-y-100"
            />
            <div className="flex items-center gap-5 md:col-span-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-soft transition-transform duration-500 group-hover:-rotate-6 md:h-14 md:w-14">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                {service.title}
              </h3>
            </div>
            <p className="max-w-[44ch] text-base leading-relaxed text-muted md:col-span-6 md:text-lg">
              {service.description}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}
