"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState<number>(0);
  const current = images[active] ?? images[0];

  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
            className={cn(
              "h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              active === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <span className="block h-full w-full" style={{ backgroundImage: img }} aria-hidden />
          </button>
        ))}
      </div>
      <div className="order-1 md:order-2">
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
              style={{ backgroundImage: current }}
              role="img"
              aria-label={alt}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-background opacity-0 transition-opacity group-hover:opacity-100">
            Hover to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
