"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";
import { PromoCodeInput } from "@/components/checkout/PromoCodeInput";

export function OrderSummaryPanel() {
  const items = useCartStore((s) => s.items);
  const totals = useCartStore((s) => s.getTotals());
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <aside className="rounded-2xl border border-border bg-card p-6">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between lg:hidden"
      >
        <span className="text-sm font-medium">Order summary · {formatPrice(totals.total)}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>

      <div className={cn("mt-4 lg:mt-0 lg:block", !expanded && "hidden")}>
        <h2 className="hidden font-display text-xl lg:block">Order</h2>

        <ul className="mt-4 flex max-h-72 flex-col gap-3 overflow-y-auto lg:max-h-80">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                <span className="block h-full w-full" style={{ backgroundImage: i.image }} aria-hidden />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                  {i.quantity}
                </span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{i.name}</span>
                <span className="text-xs text-muted-foreground">
                  {i.variant.color?.name ?? "—"} · Size {i.variant.size?.label ?? "—"}
                </span>
              </span>
              <span className="text-sm tabular-nums">{formatPrice(i.unitPrice * i.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <PromoCodeInput />
        </div>

        <dl className="mt-5 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-success-600 dark:text-success-400">
              <dt>Discount</dt>
              <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax</dt>
            <dd className="tabular-nums">{formatPrice(totals.tax)}</dd>
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base font-medium"
            >
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
            </motion.div>
          </AnimatePresence>
        </dl>
      </div>
    </aside>
  );
}
