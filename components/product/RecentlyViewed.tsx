"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "@/components/product/ProductCard";

interface RecentlyViewedProps {
  excludeId?: string;
}

export function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const { items } = useRecentlyViewed();
  const filtered = excludeId ? items.filter((p) => p.id !== excludeId) : items;
  if (filtered.length === 0) return null;
  return (
    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="mb-6 font-display text-2xl">Recently viewed</h2>
      <div className="-mx-4 overflow-x-auto px-4 pb-4">
        <div className="flex gap-5 md:grid md:grid-cols-4 md:gap-5">
          {filtered.slice(0, 4).map((p) => (
            <div key={p.id} className="w-[72vw] shrink-0 sm:w-[40vw] md:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
