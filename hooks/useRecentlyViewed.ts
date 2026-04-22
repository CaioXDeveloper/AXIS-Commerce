"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types";

const KEY = "axis-recently-viewed";
const LIMIT = 8;

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as Product[]);
    } catch {
      /* noop */
    }
  }, []);

  const push = useCallback((product: Product) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next = [product, ...filtered].slice(0, LIMIT);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }, []);

  return { items, push, clear } as const;
}
