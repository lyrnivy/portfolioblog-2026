export const site = {
  url: "https://www.lyrnivy.com",
  name: "Ivy Ocampo",
  shortName: "Ivy",
  monogram: "IO",
  role: "Web Developer · Content Creator · Photographer",
  location: "Auckland, New Zealand",
  email: "lyrnivy@gmail.com",
  tagline:
    "I build clean, fast web experiences by day and chase good light and good songs by night.",
  bio: "A web developer specializing in React, building digital experiences that merge design and function, from single-page sites to full-scale platforms. Off-screen, I'm usually behind a camera or making content, chasing the same eye for composition in photography that I bring to interfaces.",
  interests: ["Photography", "Music", "Travel", "Street Style", "UI Design"],
  nowPlaying: {
    artist: "IU",
    note: "Currently on repeat while I code.",
  },
  ugcEmail: "ivyocampougc@gmail.com",
} as const;

export const latestVideo = {
  id: "X597i1baH-Q",
  title: "Kyoto Culture & Food Adventure: Chopsticks Making, Gion Food Tour & Mochi Experience!",
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Development", href: "/development" },
  { label: "UGC", href: "/ugc" },
];

export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@lyrnivy" },
  { label: "TikTok", href: "https://www.tiktok.com/@ivyocampo7" },
  { label: "Instagram", href: "https://www.instagram.com/lyrnivy" },
  { label: "Klook Shop", href: "https://www.klook.com/en-PH/kreatorshop/IVYKLK027KLOOK/" },
];

// Affiliate / creator discount codes, surfaced in travel posts via <TravelDeals />.
export const travelDeals = [
  {
    label: "Klook: tours & activities",
    code: "IVYKLK027KLOOK",
    href: "https://www.klook.com/en-PH/kreatorshop/IVYKLK027KLOOK/",
    iconDomain: "klook.com",
    note: "Best if you book straight through my Kreator Shop",
  },
  {
    label: "Agoda: hotels",
    code: "IVYOAGODA",
    href: "https://ago-da.co/IVYOAGODA",
    iconDomain: "agoda.com",
  },
  {
    label: "Agoda: activities",
    code: "IVYACTIVITY",
    href: "https://ago-da.co/IVYACTIVITY",
    iconDomain: "agoda.com",
  },
  {
    label: "Airalo: travel eSIM",
    code: "IVYOAIRALO",
    iconDomain: "airalo.com",
    href: "https://www.airalo.com",
  },
] as const;
