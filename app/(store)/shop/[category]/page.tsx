import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopView } from "@/app/(store)/shop/ShopView";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface Props {
  params: { category: string };
}

export function generateStaticParams(): { category: string }[] {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return buildMetadata({ title: "Not found" });
  return buildMetadata({
    title: `${cat.name}`,
    description: cat.description,
    path: `/shop/${cat.slug}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();
  const products = getProductsByCategory(params.category);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <ShopView
          allProducts={products}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: cat.name },
          ]}
          heading={cat.name}
          description={cat.description}
        />
      </main>
      <Footer />
    </>
  );
}
