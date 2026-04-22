"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { staggerContainer } from "@/lib/animations";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export function ProductGrid({ products, loading = false, skeletonCount = 8, className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4", className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={cn("grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4", className)}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
}
