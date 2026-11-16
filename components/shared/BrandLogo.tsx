import type { ReactNode } from "react";
import Image from "next/image";
import { Brand } from "@/data/ugc";

type Variant = "wall" | "feature";

/* Logos sit on white in both themes, like a printed logo sheet, so dark
   wordmarks (Torriden, Round Lab) stay legible in dark mode. */
function Logo({ brand, className, fallbackIcon }: { brand: Brand; className: string; fallbackIcon?: ReactNode }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo.src}
        alt={brand.name}
        width={brand.logo.width}
        height={brand.logo.height}
        className={`w-auto rounded-md object-contain ${className}`}
      />
    );
  }
  return (
    <span className="flex items-center gap-2 text-center font-display text-xl font-semibold tracking-tight text-neutral-800 md:text-2xl">
      {fallbackIcon}
      {brand.name}
    </span>
  );
}

export default function BrandLogo({
  brand,
  variant = "wall",
  role,
  fallbackIcon,
}: {
  brand: Brand;
  variant?: Variant;
  role?: string;
  fallbackIcon?: ReactNode;
}) {
  if (variant === "feature") {
    return (
      <div className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-lift ring-2 ring-accent transition-transform duration-500 hover:-translate-y-1 md:h-56">
        <Logo
          brand={brand}
          className="max-h-20 max-w-[78%] transition-transform duration-500 group-hover:scale-[1.04] md:max-h-24"
        />
        {role && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
            {role}
          </span>
        )}
      </div>
    );
  }

  // Square-ish marks (d'Alba, Sunsilk, Vands) get more height so they carry
  // the same visual weight as the wide wordmarks.
  const squarish = brand.logo ? brand.logo.width / brand.logo.height < 1.6 : false;

  return (
    <div className="group flex h-28 items-center justify-center rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift md:h-32">
      <Logo
        brand={brand}
        fallbackIcon={fallbackIcon}
        className={`max-w-[82%] transition-transform duration-300 group-hover:scale-[1.05] ${
          squarish ? "max-h-20 md:max-h-24" : "max-h-14 md:max-h-16"
        }`}
      />
    </div>
  );
}
