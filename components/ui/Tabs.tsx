"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState<string>(defaultValue ?? items[0]?.value ?? "");
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative flex gap-1 border-b border-border" role="tablist">
        {items.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={active === t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              active === t.value ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {active === t.value && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground"
              />
            )}
          </button>
        ))}
      </div>
      <div>
        {items.map((t) =>
          t.value === active ? (
            <div key={t.value} role="tabpanel">
              {t.content}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
