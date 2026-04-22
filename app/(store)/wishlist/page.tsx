"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const hydrated = useWishlistStore((s) => s.isHydrated);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} className="mb-6" />
        <h1 className="font-display text-fluid-5xl leading-[1.02]">Wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {hydrated ? `${items.length} saved ${items.length === 1 ? "item" : "items"}` : "Loading…"}
        </p>

        <div className="mt-10">
          {hydrated && items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <h2 className="font-display text-2xl">Nothing saved yet.</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Tap the heart on any product page or card to save it here for later.
              </p>
              <Link href="/shop">
                <Button className="mt-6">Browse the shop</Button>
              </Link>
            </div>
          ) : (
            <ProductGrid products={items} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
