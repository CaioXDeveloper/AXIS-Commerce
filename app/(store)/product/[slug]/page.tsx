import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductViewTracker } from "@/app/(store)/product/[slug]/ProductViewTracker";
import { getProductBySlug, getRelatedProducts, getReviewsForProduct, PRODUCTS } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";
import { CATEGORIES, SITE } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return buildMetadata({ title: "Not found" });
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
    type: "product",
  });
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const reviews = getReviewsForProduct(product.id);
  const categoryName = CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.category;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    description: product.description,
    sku: product.id,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.variants.sizes.some((s) => s.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-8">
        <ProductViewTracker product={product} />
        <script
          type="application/ld+json"
          // Safe: static serialization of a plain object.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: categoryName, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
          className="mb-6"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductInfo product={product} />
        </div>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Description</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
          <Accordion
            items={[
              { id: "materials", title: "Materials & care", content: <p>{product.materials}<br/>{product.careInstructions}</p> },
              { id: "shipping", title: "Shipping & returns", content: <p>{product.shippingInfo}</p> },
              { id: "details", title: "Details", content: (
                <ul className="list-disc pl-5 space-y-1">
                  {product.tags.map((t) => <li key={t} className="capitalize">{t}</li>)}
                </ul>
              ) },
            ]}
            defaultOpenId="materials"
          />
        </section>

        <hr className="my-16 border-border" />

        <ProductReviews reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} />

        <hr className="my-16 border-border" />

        <RelatedProducts products={related} />
      </main>
      <Footer />
    </>
  );
}
