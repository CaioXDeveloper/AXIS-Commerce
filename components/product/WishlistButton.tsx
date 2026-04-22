"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md";
}

export function WishlistButton({ product, className, size = "md" }: WishlistButtonProps) {
  const { toggle, isWishlisted } = useWishlistStore();
  const active = isWishlisted(product.id);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(product);
    toast.success(added ? "Saved to wishlist" : "Removed from wishlist");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "group inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-all hover:border-foreground",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className,
      )}
    >
      <motion.span
        animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-flex"
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", active && "fill-error text-error")}
          strokeWidth={active ? 0 : 1.75}
        />
      </motion.span>
    </button>
  );
}
