"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { FilterState, SortOption } from "@/types";

const DEFAULTS: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: 500,
  sizes: [],
  colors: [],
  inStockOnly: false,
  sort: "featured",
};

export function useFilters(priceCap: number = 500) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const categories = searchParams.getAll("category");
    const sizes = searchParams.getAll("size");
    const colors = searchParams.getAll("color");
    const sort = (searchParams.get("sort") as SortOption | null) ?? DEFAULTS.sort;
    const priceMin = Number(searchParams.get("min") ?? DEFAULTS.priceMin);
    const priceMax = Number(searchParams.get("max") ?? priceCap);
    const inStockOnly = searchParams.get("stock") === "1";
    return {
      categories,
      sizes,
      colors,
      sort,
      priceMin: Number.isFinite(priceMin) ? priceMin : 0,
      priceMax: Number.isFinite(priceMax) ? priceMax : priceCap,
      inStockOnly,
    };
  }, [searchParams, priceCap]);

  const update = useCallback(
    (next: Partial<FilterState>) => {
      const sp = new URLSearchParams(searchParams.toString());
      const merged = { ...filters, ...next };
      sp.delete("category");
      merged.categories.forEach((c) => sp.append("category", c));
      sp.delete("size");
      merged.sizes.forEach((s) => sp.append("size", s));
      sp.delete("color");
      merged.colors.forEach((c) => sp.append("color", c));
      if (merged.sort && merged.sort !== "featured") sp.set("sort", merged.sort);
      else sp.delete("sort");
      if (merged.priceMin > 0) sp.set("min", String(merged.priceMin));
      else sp.delete("min");
      if (merged.priceMax < priceCap) sp.set("max", String(merged.priceMax));
      else sp.delete("max");
      if (merged.inStockOnly) sp.set("stock", "1");
      else sp.delete("stock");
      const qs = sp.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [filters, pathname, priceCap, router, searchParams],
  );

  const clear = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, update, clear };
}
