"use client";

import type { ColorVariant, SizeVariant } from "@/types";
import { cn } from "@/lib/utils";

interface ProductVariantSelectorProps {
  colors: ColorVariant[];
  sizes: SizeVariant[];
  selectedColor: ColorVariant | undefined;
  selectedSize: SizeVariant | undefined;
  onColorChange: (c: ColorVariant) => void;
  onSizeChange: (s: SizeVariant) => void;
  onSizeGuideClick?: () => void;
}

export function ProductVariantSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onSizeGuideClick,
}: ProductVariantSelectorProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Color</span>
          <span className="text-xs text-foreground">{selectedColor?.name ?? ""}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const active = selectedColor?.name === c.name;
            const disabled = c.stock === 0;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => !disabled && onColorChange(c)}
                disabled={disabled}
                aria-label={c.name}
                aria-pressed={active}
                title={disabled ? `${c.name} — sold out` : c.name}
                className={cn(
                  "relative h-9 w-9 rounded-full border-2 transition-all",
                  active ? "border-foreground" : "border-transparent hover:border-border",
                  disabled && "cursor-not-allowed opacity-40",
                )}
              >
                <span
                  className="absolute inset-1 rounded-full border border-border/60"
                  style={{ background: c.hex }}
                />
                {disabled && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-[1.5px] w-7 rotate-45 bg-foreground" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Size</span>
          {onSizeGuideClick && (
            <button
              type="button"
              onClick={onSizeGuideClick}
              className="text-xs underline underline-offset-2 hover:text-foreground"
            >
              Size guide
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {sizes.map((s) => {
            const active = selectedSize?.label === s.label;
            const disabled = s.stock === 0;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => !disabled && onSizeChange(s)}
                disabled={disabled}
                aria-pressed={active}
                className={cn(
                  "flex h-11 items-center justify-center rounded-md border text-sm transition-all",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground",
                  disabled && "cursor-not-allowed text-muted-foreground line-through opacity-60",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
