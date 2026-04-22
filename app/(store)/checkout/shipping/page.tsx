"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { ShippingMethods } from "@/components/checkout/ShippingMethods";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { readDraft, writeDraft } from "../checkoutStorage";
import type { ShippingMethod } from "@/types";

export default function CheckoutShippingPage() {
  const router = useRouter();
  const totals = useCartStore((s) => s.getTotals());
  const hydrated = useCartStore((s) => s.isHydrated);
  const items = useCartStore((s) => s.items);

  const [method, setMethod] = useState<ShippingMethod["id"]>("standard");

  useEffect(() => {
    const draft = readDraft();
    if (!draft.shipping) router.replace("/checkout");
    if (draft.method) setMethod(draft.method);
  }, [router]);

  useEffect(() => {
    if (hydrated && items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  function next() {
    writeDraft({ method });
    router.push("/checkout/payment");
  }

  return (
    <div className="container py-10">
      <CheckoutSteps current={1} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col gap-10">
          <div>
            <h2 className="font-display text-2xl">Shipping method</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick the delivery that works for your timeline.
            </p>
            <div className="mt-5">
              <ShippingMethods value={method} onChange={setMethod} subtotal={totals.subtotal} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={next}>
              Continue to payment
            </Button>
          </div>
        </section>
        <OrderSummaryPanel />
      </div>
    </div>
  );
}
