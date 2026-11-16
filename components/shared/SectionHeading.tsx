import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** A phrase inside `title` to set in the accent colour. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "md" | "lg";
};

function renderTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-accent">{highlight}</span>
      {after}
    </>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  as: Tag = "h2",
  size = "lg",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
          {eyebrow}
        </div>
      )}
      <Tag
        className={`font-display font-semibold leading-[1.02] tracking-[-0.04em] ${
          size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl"
        }`}
      >
        {renderTitle(title, highlight)}
      </Tag>
      {description && (
        <p
          className={`mt-6 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
