"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/product/WishlistButton";
import { formatPrice, cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

function ProductCardInner({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const onSale = typeof product.compareAtPrice === "number";
  const savings = onSale && product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const firstColor = product.variants.colors[0];
  const firstSize = product.variants.sizes.find((s) => s.stock > 0) ?? product.variants.sizes[0];
  const totalStock = product.variants.sizes.reduce((a, s) => a + s.stock, 0);
  const outOfStock = totalStock === 0;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem(product, { color: firstColor, size: firstSize }, 1);
    openDrawer();
    toast.success(`${product.name} added to cart`);
  }

  return (
    <motion.article
      variants={fadeUp}
      className={cn("group relative flex flex-col gap-3", className)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-xl bg-muted"
        aria-label={product.name}
      >
        <div
          className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          style={{ backgroundImage: product.images[0] }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: product.images[1] ?? product.images[0] }}
          aria-hidden
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && <Badge variant="sale">{`−${savings}%`}</Badge>}
          {product.isNew && !onSale && <Badge variant="new">New</Badge>}
          {outOfStock && <Badge variant="soldout">Sold out</Badge>}
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <WishlistButton product={product} />
        </div>

        <motion.button
          type="button"
          onClick={quickAdd}
          disabled={outOfStock}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ y: 0, opacity: 1 }}
          className={cn(
            "pointer-events-auto absolute inset-x-3 bottom-3 flex h-11 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background shadow-lifted transition-all duration-300 opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60",
          )}
          aria-label={`Quick add ${product.name} to cart`}
        >
          <Plus className="h-4 w-4" /> {outOfStock ? "Sold out" : "Quick add"}
        </motion.button>
      </Link>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="mt-0.5 truncate text-sm font-medium">{product.name}</h3>
        </div>
        <div className="text-right text-sm">
          {onSale && product.compareAtPrice && (
            <span className="mr-1.5 text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className={cn(onSale && "text-error")}>{formatPrice(product.price)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 px-0.5">
        {product.variants.colors.slice(0, 5).map((c) => (
          <span
            key={c.name}
            className="h-3 w-3 rounded-full border border-border"
            style={{ background: c.hex }}
            aria-label={c.name}
          />
        ))}
        {product.variants.colors.length > 5 && (
          <span className="text-[10px] text-muted-foreground">+{product.variants.colors.length - 5}</span>
        )}
      </div>
    </motion.article>
  );
}

export const ProductCard = memo(ProductCardInner);
