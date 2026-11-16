"use client";

import { motion } from "motion/react";
import CompanyLogo from "@/components/shared/CompanyLogo";

type Role = {
  role: string;
  company: string;
  period: string;
  domain: string;
};

export default function Timeline({ experience }: { experience: Role[] }) {
  return (
    <ol className="border-t border-border">
      {experience.map((item, i) => (
        <motion.li
          key={`${item.company}-${item.period}`}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex items-center gap-4 border-b border-border py-5"
        >
          <CompanyLogo domain={item.domain} name={item.company} />
          <div className="min-w-0 flex-1">
            <div className="font-display truncate text-lg font-semibold tracking-tight">{item.role}</div>
            <div className="truncate text-sm text-muted">{item.company}</div>
          </div>
          <div className="tabular shrink-0 text-right text-sm text-muted">{item.period}</div>
        </motion.li>
      ))}
    </ol>
  );
}
