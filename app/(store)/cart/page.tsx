"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { UpsellRow } from "@/components/cart/UpsellRow";
import { useCartStore } from "@/store/cartStore";
import { getBestSellers } from "@/lib/mock-data";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.isHydrated);
  const upsells = getBestSellers(3);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} className="mb-6" />
        <h1 className="font-display text-fluid-5xl leading-[1.02]">Your cart</h1>

        {hydrated && items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <section>
              <ul className="flex flex-col">
                <AnimatePresence initial={false}>
                  {items.map((i) => (
                    <CartItem key={i.id} item={i} />
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-8">
                <UpsellRow products={upsells} />
              </div>
            </section>
            <aside className="flex flex-col gap-4">
              <CartSummary>
                <Link href="/checkout">
                  <Button size="lg" fullWidth>Proceed to checkout</Button>
                </Link>
              </CartSummary>
              <Link
                href="/shop"
                className="text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
