"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

export default function CompanyLogo({
  domain,
  name,
}: {
  domain: string | null;
  name: string;
}) {
  const [failed, setFailed] = useState(!domain);

  if (failed) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted">
        <Building2 size={18} />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={`${name} logo`}
        width={44}
        height={44}
        className="h-full w-full object-contain p-2"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
