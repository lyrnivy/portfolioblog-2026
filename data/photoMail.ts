export type PhotoMailPiece = {
  title: string;
  caption: string;
  cardBg: string;
  scriptColor: string;
  captionColor: string;
  photoGradient?: string;
  backgroundImage?: string;
};

export const photoMailPieces: PhotoMailPiece[] = [
  {
    title: "Suwon",
    caption: "Suwon, Seoul",
    cardBg: "bg-neutral-950",
    scriptColor: "text-blue-400",
    captionColor: "text-white/70",
    photoGradient: "from-sky-600 via-blue-500 to-blue-900",
    backgroundImage: "url('/photos/suwon.jpeg')",
  },
  {
    title: "Yellow",
    caption: "Yellow",
    cardBg: "bg-[#e9e4cf]",
    scriptColor: "text-neutral-800",
    captionColor: "text-neutral-600",
    photoGradient: "from-amber-200 via-amber-400 to-blue-900",
    backgroundImage: "url('/photos/yellow.jpeg')",
  },
  {
    title: "Lost + City",
    caption: "Lost in the City",
    cardBg: "bg-neutral-950",
    scriptColor: "text-neutral-400",
    captionColor: "text-white/70",
    photoGradient: "from-rose-600 via-neutral-700 to-neutral-900",
    backgroundImage: "url('/photos/lost-city.jpeg')",
  },
  {
    title: "Starfield",
    caption: "Starfield Library",
    cardBg: "bg-[#1b1310]",
    scriptColor: "text-amber-200/80",
    captionColor: "text-amber-100/60",
    photoGradient: "from-amber-500 via-amber-800 to-neutral-950",
    backgroundImage: "url('/photos/starfield.jpeg')",
  },
];
