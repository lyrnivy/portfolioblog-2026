import fs from "node:fs";
import path from "node:path";

// Read once at module load. The SVG's fills are `currentColor`, so it inherits
// whatever text color the wrapper sets (here: the theme accent).
const svg = fs
  .readFileSync(
    path.join(process.cwd(), "public/illustrations/developer.svg"),
    "utf8"
  )
  .replace(/<title>[\s\S]*?<\/title>/, "");

export default function DevIllustration({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
