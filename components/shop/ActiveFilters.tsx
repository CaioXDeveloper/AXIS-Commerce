"use client";

import { X } from "lucide-react";
import type { FilterState } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface ActiveFiltersProps {
  filters: FilterState;
  priceCap: number;
  onChange: (next: Partial<FilterState>) => void;
  onClear: () => void;
  className?: string;
}

interface Chip {
  label: string;
  onRemove: () => void;
}

export function ActiveFilters({ filters, priceCap, onChange, onClear, className }: ActiveFiltersProps) {
  const chips: Chip[] = [];
  filters.categories.forEach((c) =>
    chips.push({
      label: c,
      onRemove: () => onChange({ categories: filters.categories.filter((x) => x !== c) }),
    }),
  );
  filters.sizes.forEach((s) =>
    chips.push({
      label: `Size ${s}`,
      onRemove: () => onChange({ sizes: filters.sizes.filter((x) => x !== s) }),
    }),
  );
  filters.colors.forEach((c) =>
    chips.push({
      label: c,
      onRemove: () => onChange({ colors: filters.colors.filter((x) => x !== c) }),
    }),
  );
  if (filters.priceMin > 0 || filters.priceMax < priceCap) {
    chips.push({
      label: `${formatPrice(filters.priceMin)} — ${formatPrice(filters.priceMax)}`,
      onRemove: () => onChange({ priceMin: 0, priceMax: priceCap }),
    });
  }
  if (filters.inStockOnly) {
    chips.push({ label: "In stock", onRemove: () => onChange({ inStockOnly: false }) });
  }

  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {chips.map((c, i) => (
        <button
          key={`${c.label}-${i}`}
          type="button"
          onClick={c.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs capitalize transition-colors hover:border-foreground"
        >
          {c.label}
          <X className="h-3 w-3" aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="ml-1 text-xs underline underline-offset-2 hover:text-foreground"
      >
        Clear all
      </button>
    </div>
  );
}
