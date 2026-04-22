"use client";

import { useEffect } from "react";
import type { Product } from "@/types";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export function ProductViewTracker({ product }: { product: Product }) {
  const { push } = useRecentlyViewed();
  useEffect(() => {
    push(product);
  }, [product, push]);
  return null;
}
