"use client";

import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  formatValue?: (n: number) => string;
  className?: string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  formatValue = (n) => formatPrice(n),
  className,
}: SliderProps) {
  const [lo, hi] = value;
  const leftPct = useMemo(() => ((lo - min) / (max - min)) * 100, [lo, min, max]);
  const rightPct = useMemo(() => ((hi - min) / (max - min)) * 100, [hi, min, max]);

  const setLo = useCallback(
    (n: number) => onChange([Math.min(n, hi), hi]),
    [hi, onChange],
  );
  const setHi = useCallback(
    (n: number) => onChange([lo, Math.max(n, lo)]),
    [lo, onChange],
  );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </span>
          <span className="text-xs tabular-nums text-foreground">
            {formatValue(lo)} — {formatValue(hi)}
          </span>
        </div>
      )}
      <div className="relative h-1.5 w-full rounded-full bg-muted">
        <div
          className="absolute h-1.5 rounded-full bg-foreground"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Number(e.target.value))}
          aria-label="Minimum"
          className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-background"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Number(e.target.value))}
          aria-label="Maximum"
          className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-background"
        />
      </div>
    </div>
  );
}
