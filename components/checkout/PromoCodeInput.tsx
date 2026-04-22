"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export function PromoCodeInput() {
  const [code, setCode] = useState<string>("");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);
  const current = useCartStore((s) => s.promoCode);

  function apply() {
    if (!code.trim()) return;
    const res = applyPromoCode(code);
    setFeedback(res);
    if (res.ok) setCode("");
  }

  if (current) {
    return (
      <div className="flex items-center justify-between rounded-md border border-success-600/30 bg-success-50/70 p-3 text-sm text-success-700 dark:border-success-600/30 dark:bg-success-950/40 dark:text-success-300">
        <span className="inline-flex items-center gap-2">
          <Tag className="h-3.5 w-3.5" />
          <strong>{current.code}</strong> — {current.description}
        </span>
        <button
          type="button"
          onClick={() => {
            removePromoCode();
            setFeedback(null);
          }}
          aria-label="Remove promo code"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-success-600/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="promo" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Promo code
      </label>
      <div className="flex items-center gap-2">
        <input
          id="promo"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), apply())}
          placeholder="WELCOME10"
          className={cn(
            "h-11 flex-1 rounded-md border bg-card px-3 text-sm focus:outline-none",
            feedback && !feedback.ok ? "border-error" : "border-border focus:border-foreground",
          )}
        />
        <button
          type="button"
          onClick={apply}
          className="h-11 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-neutral-800 dark:hover:bg-neutral-100"
        >
          Apply
        </button>
      </div>
      {feedback && (
        <p role="alert" className={cn("text-xs", feedback.ok ? "text-success-600" : "text-error")}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
