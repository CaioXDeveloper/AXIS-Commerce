"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ActiveFilters } from "@/components/shop/ActiveFilters";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useFilters } from "@/hooks/useFilters";
import type { Product, SortOption } from "@/types";

interface ShopViewProps {
  allProducts: Product[];
  breadcrumb: { label: string; href?: string }[];
  heading: string;
  description?: string;
}

const PRICE_CAP = 500;

export function ShopView({ allProducts, breadcrumb, heading, description }: ShopViewProps) {
  const { filters, update, clear } = useFilters(PRICE_CAP);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const filtered = useMemo<Product[]>(() => {
    let list = [...allProducts];
    if (filters.categories.length > 0) list = list.filter((p) => filters.categories.includes(p.category));
    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (filters.sizes.length > 0) {
      list = list.filter((p) =>
        p.variants.sizes.some((s) => filters.sizes.includes(s.label) && (filters.inStockOnly ? s.stock > 0 : true)),
      );
    }
    if (filters.colors.length > 0) {
      list = list.filter((p) => p.variants.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.variants.sizes.some((s) => s.stock > 0));
    }
    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "top-rated":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [allProducts, filters]);

  return (
    <div className="container py-10">
      <Breadcrumb items={breadcrumb} className="mb-6" />
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <h1 className="font-display text-fluid-5xl leading-[1.02]">{heading}</h1>
        {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <FilterSidebar
          filters={filters}
          onChange={update}
          onClear={clear}
          priceCap={PRICE_CAP}
          className="hidden lg:flex"
        />

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ActiveFilters filters={filters} priceCap={PRICE_CAP} onChange={update} onClear={clear} />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden"
              >
                Filter
              </Button>
              <SortDropdown
                value={filters.sort}
                onChange={(v: SortOption) => update({ sort: v })}
              />
            </div>
          </div>

          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center">
                <h2 className="font-display text-2xl">No matches.</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Nothing in the store lines up with these filters. Try widening your price range or clearing the filters.
                </p>
                <Button variant="outline" className="mt-6" onClick={clear}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </section>
      </div>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="left" title="Filter">
        <div className="p-6">
          <FilterSidebar
            filters={filters}
            onChange={update}
            onClear={clear}
            priceCap={PRICE_CAP}
          />
          <Button fullWidth className="mt-6" onClick={() => setMobileOpen(false)}>
            Show {filtered.length} products
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
