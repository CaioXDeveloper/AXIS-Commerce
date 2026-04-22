"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantitySelectorProps) {
  const h = size === "sm" ? "h-9" : "h-11";
  const w = size === "sm" ? "w-8" : "w-10";
  return (
    <div className={cn("inline-flex items-center rounded-full border border-border", h, className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease"
        className={cn("grid place-items-center rounded-l-full hover:bg-muted", h, w)}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <div className={cn("relative grid place-items-center overflow-hidden text-sm tabular-nums", w)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase"
        className={cn("grid place-items-center rounded-r-full hover:bg-muted", h, w)}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
