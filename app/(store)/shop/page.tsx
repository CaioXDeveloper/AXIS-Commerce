import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopView } from "@/app/(store)/shop/ShopView";
import { PRODUCTS } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shop — everything",
  description: "Every AXIS product in one place: sneakers, apparel, accessories and archive.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <ShopView
          allProducts={PRODUCTS}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
          heading="Shop — everything"
          description="The whole AXIS catalogue, in one long scroll. Filter by category, size, color or price."
        />
      </main>
      <Footer />
    </>
  );
}
