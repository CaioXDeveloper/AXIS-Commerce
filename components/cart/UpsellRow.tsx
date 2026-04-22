"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface UpsellRowProps {
  products: Product[];
  title?: string;
}

export function UpsellRow({ products, title = "You might also like" }: UpsellRowProps) {
  const addItem = useCartStore((s) => s.addItem);
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="upsell-heading" className="rounded-2xl border border-border bg-card p-5">
      <h3 id="upsell-heading" className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>
      <ul className="flex flex-col divide-y divide-border">
        {products.slice(0, 3).map((p) => {
          const color = p.variants.colors[0];
          const size = p.variants.sizes.find((s) => s.stock > 0) ?? p.variants.sizes[0];
          return (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <Link href={`/product/${p.slug}`} className="block h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                <span className="block h-full w-full" style={{ backgroundImage: p.images[0] }} aria-hidden />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addItem(p, { color, size }, 1);
                  toast.success(`${p.name} added`);
                }}
                aria-label={`Add ${p.name} to cart`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-foreground hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
