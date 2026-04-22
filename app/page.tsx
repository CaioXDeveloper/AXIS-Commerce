import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BrandStatement } from "@/components/home/BrandStatement";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BestSellers } from "@/components/home/BestSellers";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { getBestSellers, getFeaturedProducts } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "AXIS — Sneakers & streetwear, hand-picked",
  description:
    "High-end sneakers and technical streetwear from independent ateliers. Designed in Berlin, shipped from San Francisco.",
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const best = getBestSellers(8);
  return (
    <>
      <AnnouncementBar />
      <Navbar transparentOnTop />
      <main id="main-content">
        <Hero />
        <FeaturedCategories />
        <BrandStatement />
        <FeaturedProducts products={featured} />
        <BestSellers products={best} />
        <Testimonials />
        <InstagramFeed />
        <NewsletterSection />
        <TrustBadges />
      </main>
      <Footer />
    </>
  );
}
