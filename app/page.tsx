import { HeroSection } from "@/components/home/hero-section";
import { TopCitiesSection } from "@/components/home/top-cities-section";
import { DestinationsSection } from "@/components/home/destinations-section";
import { CtaSection } from "@/components/home/cta-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TopCitiesSection />
      <DestinationsSection />
      <CtaSection />
      <TestimonialsSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}