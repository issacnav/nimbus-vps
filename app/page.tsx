import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/hero/Hero";
import { InfraStats } from "@/components/sections/InfraStats";
import { Pricing } from "@/components/sections/Pricing";
import { ProductFeatures } from "@/components/sections/ProductFeatures";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--page-bg)] transition-colors duration-200">
      <div className="relative bg-[var(--page-bg)]">
        <div className="absolute inset-x-0 top-0 z-40">
          <Navbar />
        </div>
        <Hero />
      </div>
      <ProductFeatures />
      <InfraStats />
      <Pricing />
      <Footer />
    </main>
  );
}
