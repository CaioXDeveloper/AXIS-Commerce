"use client";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({ products, title = "You might also like" }: RelatedProductsProps) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-6 font-display text-2xl">{title}</h2>
      <div className="-mx-4 overflow-x-auto px-4 pb-4">
        <div className="flex gap-5 md:grid md:grid-cols-4 md:gap-5">
          {products.map((p) => (
            <div key={p.id} className="w-[72vw] shrink-0 sm:w-[40vw] md:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
