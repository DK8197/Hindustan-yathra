import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import Leadership from "@/components/about/Leadership";
import Stats from "@/components/about/Stats";
import Reviews from "@/components/about/Reviews";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Hero />
      <Story />
      <Stats />
      <WhyChooseUs />
      <Leadership />
      <Reviews />
      <CTA />
    </main>
  );
}