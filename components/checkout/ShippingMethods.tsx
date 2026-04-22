"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import { SHIPPING_METHODS } from "@/lib/constants";
import { formatPrice, addDays } from "@/lib/utils";
import type { ShippingMethod } from "@/types";

interface ShippingMethodsProps {
  value: ShippingMethod["id"];
  onChange: (value: ShippingMethod["id"]) => void;
  subtotal: number;
}

export function ShippingMethods({ value, onChange, subtotal }: ShippingMethodsProps) {
  const today = new Date();
  const options = SHIPPING_METHODS.map((m) => {
    const free = m.freeOverCents && subtotal * 100 >= m.freeOverCents;
    const priceLabel = free ? "Free" : formatPrice(m.priceCents / 100);
    const approxDays =
      m.id === "standard" ? 6 : m.id === "express" ? 3 : 1;
    const delivery = addDays(today, approxDays);
    return {
      value: m.id,
      label: (
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{m.name}</span>
          <span className="text-sm tabular-nums">{priceLabel}</span>
        </span>
      ),
      description: (
        <span className="flex flex-col gap-0.5 text-xs text-muted-foreground">
          <span>{m.description}</span>
          <span>
            Arrives around{" "}
            {delivery.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {m.estimatedDays}
          </span>
        </span>
      ),
    };
  });
  return <RadioGroup<ShippingMethod["id"]> name="shipping-method" value={value} onChange={onChange} options={options} />;
}
