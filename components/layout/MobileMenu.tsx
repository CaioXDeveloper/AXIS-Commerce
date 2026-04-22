"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { CATEGORIES, NAV_LINKS, SITE } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-background text-foreground md:hidden"
        >
          <div className="container flex h-16 items-center justify-between">
            <span className="font-display text-xl tracking-[0.2em]">{SITE.name}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <motion.nav
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="container flex flex-col gap-2 pt-10"
            aria-label="Mobile primary"
          >
            {NAV_LINKS.map((l) => (
              <motion.div
                key={l.href}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block font-display text-4xl tracking-tight"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="container mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
            <p className="mb-3 text-xs uppercase tracking-[0.16em]">Shop by category</p>
            <ul className="grid grid-cols-2 gap-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}`} onClick={onClose}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/account" onClick={onClose}>Account</Link>
              </li>
              <li>
                <Link href="/wishlist" onClick={onClose}>Wishlist</Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
