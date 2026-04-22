"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";
import type { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { cartItemVariants } from "@/lib/animations";
import { QuantitySelector } from "@/components/cart/QuantitySelector";

interface CartItemProps {
  item: CartItemType;
  onNavigate?: () => void;
  compact?: boolean;
}

function CartItemInner({ item, onNavigate, compact = false }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <motion.li
      layout
      variants={cartItemVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex gap-4 border-b border-border py-4 last:border-b-0"
    >
      <Link
        href={`/product/${item.slug}`}
        onClick={onNavigate}
        aria-label={item.name}
        className="block h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <span className="block h-full w-full" style={{ backgroundImage: item.image }} aria-hidden />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{item.brand}</p>
            <Link
              href={`/product/${item.slug}`}
              onClick={onNavigate}
              className="truncate text-sm font-medium hover:underline"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.variant.color?.name ?? "—"} · Size {item.variant.size?.label ?? "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Remove item"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <QuantitySelector
            size={compact ? "sm" : "md"}
            value={item.quantity}
            onChange={(n) => updateQuantity(item.id, n)}
          />
          <span className="text-sm font-medium tabular-nums">
            {formatPrice(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export const CartItem = memo(CartItemInner);
