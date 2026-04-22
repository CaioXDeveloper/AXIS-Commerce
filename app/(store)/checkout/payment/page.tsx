"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Lock } from "lucide-react";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { readDraft, writeDraft, clearDraft } from "../checkoutStorage";
import type { PaymentFormValues } from "@/lib/validations";

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const hydrated = useCartStore((s) => s.isHydrated);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const draft = typeof window !== "undefined" ? readDraft() : {};

  useEffect(() => {
    if (typeof window === "undefined") return;
    const d = readDraft();
    if (!d.shipping || !d.method) router.replace("/checkout");
  }, [router]);

  useEffect(() => {
    if (hydrated && items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  async function placeOrder(values: PaymentFormValues) {
    setSubmitting(true);
    writeDraft({ payment: values });
    const d = readDraft();
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: d.contact?.email,
          shippingAddress: d.shipping,
          shippingMethodId: d.method,
          payment: values,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            unitPrice: i.unitPrice,
            quantity: i.quantity,
            variant: {
              color: i.variant.color?.name,
              size: i.variant.size?.label,
            },
          })),
        }),
      });
      const json: { ok: boolean; data?: { number: string; paymentLast4: string }; error?: string } = await res.json();
      if (!res.ok || !json.ok || !json.data) {
        throw new Error(json.error ?? "Could not place order.");
      }
      const { number, paymentLast4 } = json.data;
      clearCart();
      clearDraft();
      router.push(`/order-confirmed?number=${encodeURIComponent(number)}&last4=${paymentLast4}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not place order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-10">
      <CheckoutSteps current={2} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col gap-10">
          <div>
            <h2 className="font-display text-2xl">Payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All transactions are encrypted. We never store your card details.
            </p>
            <div className="mt-5">
              <PaymentForm defaultValues={draft.payment} onSubmit={placeOrder} />
            </div>
          </div>

          <Accordion
            items={[{
              id: "review",
              title: "Review your order",
              content: (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Ship to</p>
                    <p className="text-muted-foreground">
                      {draft.shipping?.firstName} {draft.shipping?.lastName}
                      <br />
                      {draft.shipping?.line1}{draft.shipping?.line2 ? `, ${draft.shipping.line2}` : ""}
                      <br />
                      {draft.shipping?.city}, {draft.shipping?.state} {draft.shipping?.zip}
                      <br />
                      {draft.shipping?.country}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Method</p>
                    <p className="capitalize text-muted-foreground">{draft.method ?? "standard"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Items</p>
                    <ul className="text-muted-foreground">
                      {items.map((i) => (
                        <li key={i.id}>
                          {i.quantity} × {i.name} ({i.variant.size?.label})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            }]}
          />

          <div className="flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/checkout/shipping" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <Button
              size="lg"
              loading={submitting}
              leftIcon={<Lock className="h-4 w-4" />}
              onClick={() => {
                const form = document.getElementById("payment-form") as HTMLFormElement | null;
                form?.requestSubmit();
              }}
            >
              Place order
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </section>
        <OrderSummaryPanel />
      </div>
    </div>
  );
}
