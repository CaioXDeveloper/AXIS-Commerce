"use client";

import { ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { PromoCodeInput } from "@/components/checkout/PromoCodeInput";

interface CartSummaryProps {
  showPromo?: boolean;
  children?: React.ReactNode;
}

export function CartSummary({ showPromo = true, children }: CartSummaryProps) {
  const promoCode = useCartStore((s) => s.promoCode);
  const totals = useCartStore((s) => s.getTotals());

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const pct = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-xl">Order summary</h2>

      <div className="flex flex-col gap-2">
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div className="h-1.5 rounded-full bg-foreground transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">
          {remaining <= 0
            ? "You've unlocked free standard shipping."
            : `Add ${formatPrice(remaining)} more for free standard shipping.`}
        </p>
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-success-600 dark:text-success-400">
            <dt>Discount {promoCode ? `(${promoCode.code})` : ""}</dt>
            <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>Shipping (est.)</dt>
          <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax (est.)</dt>
          <dd className="tabular-nums">{formatPrice(totals.tax)}</dd>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base font-medium">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {showPromo && <PromoCodeInput />}

      {children}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout · 256-bit encryption
      </div>
    </div>
  );
}
