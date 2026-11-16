import type { Metadata } from "next";
import BusanARExperience from "@/components/ar/BusanARExperience";

export const metadata: Metadata = {
  title: "Scan the Postcard — Busan, Korea",
  description: "Point your camera at the Busan AR postcard to play the video.",
  robots: { index: false, follow: false },
};

export default function BusanARPage() {
  return <BusanARExperience />;
}
