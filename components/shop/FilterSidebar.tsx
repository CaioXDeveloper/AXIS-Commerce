"use client";

import { Slider } from "@/components/ui/Slider";
import { Checkbox } from "@/components/ui/Checkbox";
import { CATEGORIES, COLORS, SIZES } from "@/lib/constants";
import type { FilterState } from "@/types";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onClear: () => void;
  priceCap: number;
  className?: string;
}

export function FilterSidebar({ filters, onChange, onClear, priceCap, className }: FilterSidebarProps) {
  function toggle<T extends string>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
  }

  return (
    <aside className={cn("flex flex-col gap-8", className)} aria-label="Filters">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Filters</h2>
        <button type="button" onClick={onClear} className="text-xs underline hover:text-foreground">
          Clear all
        </button>
      </div>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Category</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <Checkbox
              key={c.slug}
              label={c.name}
              checked={filters.categories.includes(c.slug)}
              onChange={() => onChange({ categories: toggle(filters.categories, c.slug) })}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Price</h3>
        <Slider
          min={0}
          max={priceCap}
          step={5}
          value={[filters.priceMin, filters.priceMax]}
          onChange={([lo, hi]) => onChange({ priceMin: lo, priceMax: hi })}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Size</h3>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ sizes: toggle(filters.sizes, s) })}
                aria-pressed={active}
                className={cn(
                  "min-w-[2.5rem] rounded-full border px-2 py-1 text-xs transition-colors",
                  active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onChange({ colors: toggle(filters.colors, c.name) })}
                aria-pressed={active}
                title={c.name}
                className={cn(
                  "relative h-8 w-8 rounded-full border-2 transition-all",
                  active ? "border-foreground" : "border-transparent hover:border-border",
                )}
              >
                <span className="absolute inset-1 rounded-full border border-border/50" style={{ background: c.hex }} />
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <Checkbox
          label="In stock only"
          checked={filters.inStockOnly}
          onChange={(e) => onChange({ inStockOnly: e.currentTarget.checked })}
        />
      </section>
    </aside>
  );
}
