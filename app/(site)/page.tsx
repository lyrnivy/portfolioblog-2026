import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import About from "@/components/home/About";
import PhotoMail from "@/components/home/PhotoMail";
import SectionLinks from "@/components/home/SectionLinks";
import ServicesGrid from "@/components/shared/ServicesGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import StatsBand from "@/components/shared/StatsBand";
import { services } from "@/data/development";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <About />
      </section>

      <StatsBand />

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeading
            title="From wireframe to shipped product."
            highlight="shipped product."
            description="A mix of engineering and design instincts, applied to whatever the project needs."
          />
          <div className="mt-12">
            <ServicesGrid services={services} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <SectionHeading
          title="I notice light before I notice anything else."
          highlight="light"
          description="A few frames from the road, sent like postcards."
        />
        <div className="mt-12">
          <PhotoMail />
        </div>
      </section>

      <section className="bg-surface pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeading eyebrow="Explore" title="More to see." highlight="More" />
          <div className="mt-12">
            <SectionLinks />
          </div>
        </div>
      </section>
    </>
  );
}
