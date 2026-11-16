export const ugcIntro = {
  eyebrow: "UGC",
  title: "I am a Content Creator.",
  description:
    "Based in Auckland, New Zealand, I craft genuine and relatable content, particularly in videography. My work spans product photography, tailored UGC, and content built to enhance brand materials, alongside ongoing vlogging.",
};

export const videography = {
  title: "Videography",
  description:
    "As a video editor, I focus on elevating the visual charm of beauty product and travel content. I craft engaging videos that highlight the essence and quality of the products, ensuring a memorable experience for the audience.",
};

export const featuredCollab = {
  brand: "Korea Nomad Gateway",
  description:
    "My latest travel collaboration: a three-part series across Korea, from arriving in Incheon to the coast of Busan and the island of Jeju.",
  posts: [
    { place: "Incheon", url: "https://www.instagram.com/reel/DdC2deThCpi/" },
    { place: "Busan", url: "https://www.instagram.com/p/DdQmPbtlImF/" },
    { place: "Jeju", url: "https://www.instagram.com/reel/DdY395EC58O/" },
  ],
};

export const contentPillars = [
  {
    title: "Travel",
    description: "Destination guides and day-in-the-life content.",
    url: "https://www.instagram.com/p/DSzaqewkmoy/",
  },
  {
    title: "Tech / App",
    description: "Unboxings, app walkthroughs, everyday-use content.",
    url: "https://www.instagram.com/reel/DemVD3GCx30/",
  },
  {
    title: "Beauty",
    description: "Product try-ons, GRWM, honest first impressions.",
    url: "https://www.instagram.com/reel/Dd3rCBXiAub/",
  },
  {
    title: "Food / Drink",
    description: "Taste tests, cafe visits, and restaurant features.",
    url: "https://www.instagram.com/reel/DbazQvFC6MJ/",
  },
];

export const weeklyHighlight = {
  label: "TikTok weekly",
  views: "4.9M",
  followers: "1.53K",
  likes: "286K",
  note: "One of my posts outperformed 99.5% of other creators in search results.",
};

export const tiktokMetrics = {
  range: "28 days",
  postViews: { value: "162K", delta: "+31K", pct: "+23.8%" },
  profileViews: { value: "1,472", delta: "+543", pct: "+58.4%" },
  likes: { value: "10K", delta: "+1,156", pct: "+12.3%" },
  comments: { value: "275", delta: "-14", pct: "-4.8%" },
  shares: { value: "1,495", delta: "-372", pct: "-19.9%" },
  estRewards: { value: "$13.98", delta: "+$12.91", pct: "+1210.8%" },
};

export const instagramMetrics = {
  range: "30 days",
  views: "1M",
  newFollowers: "+697",
  interactions: "132,620",
  peak: { views: "70K", date: "Sep 26", source: "Reels" },
  // Interactions divided by views. Views are rounded to 1M, so keep this approximate.
  interactionRate: "13%",
  updated: "October 2026",
};

export type BrandLogoImage = { src: string; width: number; height: number };
export type Brand = { name: string; domain: string | null; logo?: BrandLogoImage };

export const ambassadorships: Brand[] = [
  { name: "Klook", domain: "klook.com", logo: { src: "/brands/klook.png", width: 486, height: 141 } },
  { name: "Agoda", domain: "agoda.com", logo: { src: "/brands/agoda.png", width: 313, height: 160 } },
];

export const partnerBrands: Brand[] = [
  { name: "SanDisk", domain: "sandisk.com", logo: { src: "/brands/sandisk.png", width: 409, height: 167 } },
  { name: "Garnier", domain: "garnier.com", logo: { src: "/brands/garnier.png", width: 337, height: 124 } },
  { name: "d'Alba", domain: "dalba.com", logo: { src: "/brands/dalba.png", width: 233, height: 237 } },
  { name: "Vands Clinic Global", domain: null, logo: { src: "/brands/vands.png", width: 138, height: 176 } },
  { name: "The Saem", domain: "thesaemcosmetics.com", logo: { src: "/brands/thesaem.png", width: 292, height: 60 } },
  { name: "Torriden", domain: "torridenskincare.com", logo: { src: "/brands/torriden.png", width: 379, height: 74 } },
  { name: "Binggrae", domain: "bing.co.kr", logo: { src: "/brands/binggrae.png", width: 329, height: 82 } },
  { name: "Round Lab", domain: "roundlab.com", logo: { src: "/brands/roundlab.png", width: 238, height: 144 } },
  { name: "Sunsilk", domain: "sunsilk.com", logo: { src: "/brands/sunsilk.png", width: 200, height: 201 } },
  { name: "Madeca21", domain: null },
];

export const hotelPartners: Brand[] = [
  { name: "Red Hotel", domain: null, logo: { src: "/brands/redhotel.png", width: 400, height: 400 } },
  { name: "Vibe Hotel", domain: null, logo: { src: "/brands/vibehotel.png", width: 400, height: 400 } },
];

export const partnershipNote =
  "As an ambassador for Agoda and Klook, I've carved out a niche in the travel and beauty/lifestyle sectors by showcasing distinctive experiences and innovative products. My partnerships with esteemed brands have enhanced my visibility and influence. Driven by my passion for travel, I've also partnered with hotels like Red Hotel and Vibe Hotel. Dedicated to sustainable travel and responsible tourism, I foster meaningful connections with my audience, offering valuable insights and recommendations while upholding my reputation in the industry.";

export const pricingNote =
  "Packages start at $100. BIR-registered service invoice available for brand partnerships.";

export const collabTypes = [
  "Sponsored posts",
  "Product seeding & reviews",
  "Brand trips & event coverage",
  "UGC-only content (no posting)",
];
