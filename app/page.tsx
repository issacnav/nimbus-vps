import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InfraStats } from "@/components/InfraStats";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { ProductFeatures } from "@/components/ProductFeatures";

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
