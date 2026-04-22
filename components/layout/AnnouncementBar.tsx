"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const MESSAGES = [
  "Free shipping on orders over $75 · use code WELCOME10",
  "Complimentary returns for 30 days on every order",
  "New arrivals every Thursday at 09:00 PT",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Announcements"
      className="relative z-40 flex h-9 items-center justify-center bg-foreground text-background"
    >
      <div className="relative flex items-center overflow-hidden text-[11px] font-medium uppercase tracking-[0.18em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {MESSAGES[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
