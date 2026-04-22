"use client";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  return (
    <section aria-labelledby="bs-heading" className="bg-muted/40 py-24">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Best sellers</p>
            <h2 id="bs-heading" className="mt-2 font-display text-fluid-4xl leading-[1.05]">
              The ones we keep restocking.
            </h2>
          </div>
        </div>
      </div>
      <div className="mask-fade-r overflow-x-auto">
        <div className="container flex gap-5 pb-4">
          {products.map((p) => (
            <div key={p.id} className="w-[72vw] shrink-0 sm:w-[44vw] md:w-[24vw] lg:w-[18vw]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
