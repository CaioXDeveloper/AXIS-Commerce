"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";
import { backdropVariants, drawerLeftVariants, drawerVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, side = "right", title, children, className }: DrawerProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const variants = side === "right" ? drawerVariants : drawerLeftVariants;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial="hidden" animate="show" exit="exit">
          <motion.button
            aria-label="Close overlay"
            variants={backdropVariants}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            variants={variants}
            className={cn(
              "absolute top-0 flex h-dvh w-full max-w-md flex-col bg-card text-card-foreground shadow-lifted",
              side === "right" ? "right-0" : "left-0",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              {title ? (
                <h2 id={titleId} className="font-display text-xl">
                  {title}
                </h2>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" data-lenis-prevent>{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
