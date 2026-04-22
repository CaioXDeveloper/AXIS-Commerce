"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section aria-labelledby="featured-heading" className="container py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Featured</p>
          <h2 id="featured-heading" className="mt-2 font-display text-fluid-4xl leading-[1.05]">
            Handpicked this week.
          </h2>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 4)} />
    </section>
  );
}
