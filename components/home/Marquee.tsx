const ITEMS = [
  "React Developer",
  "Photography",
  "IU Enthusiast",
  "UI/UX Design",
  "Travel Content",
  "Motion Design",
  "Street Photography",
  "Design Systems",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-2xl font-semibold tracking-tight text-background md:text-4xl">
            {item}
          </span>
          <span aria-hidden className="text-2xl text-accent md:text-4xl">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/* Two ribbons crossing at a slight angle: scrolling ink ribbon over a plain accent band. */
export default function Marquee() {
  return (
    <div className="relative -my-2 overflow-hidden py-10 md:py-14">
      <div
        aria-hidden
        className="absolute inset-x-[-5%] top-1/2 h-16 -translate-y-1/2 rotate-[2.5deg] bg-accent md:h-20"
      />
      <div className="relative -mx-[5%] -rotate-[2deg] bg-foreground py-4 shadow-lift md:py-5">
        <div className="flex w-max animate-marquee">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
