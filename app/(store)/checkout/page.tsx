"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { ContactForm } from "@/components/checkout/ContactForm";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { readDraft, writeDraft, type CheckoutDraft } from "./checkoutStorage";
import type { ContactFormValues, ShippingAddressValues } from "@/lib/validations";

export default function CheckoutContactPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.isHydrated);

  const [draft, setDraft] = useState<CheckoutDraft>({});

  useEffect(() => {
    setDraft(readDraft());
  }, []);

  useEffect(() => {
    if (hydrated && items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  function onSubmitContact(values: ContactFormValues) {
    writeDraft({ contact: values });
    // Trigger shipping submit next — handled via form chaining below.
    const shippingForm = document.getElementById("shipping-form") as HTMLFormElement | null;
    shippingForm?.requestSubmit();
  }

  function onSubmitShipping(values: ShippingAddressValues) {
    writeDraft({ shipping: values });
    router.push("/checkout/shipping");
  }

  if (!hydrated) return null;

  return (
    <div className="container py-10">
      <CheckoutSteps current={0} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col gap-10">
          <div>
            <h2 className="font-display text-2xl">Contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll send your order confirmation here.</p>
            <div className="mt-5">
              <ContactForm defaultValues={draft.contact} onSubmit={onSubmitContact} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl">Shipping address</h2>
            <p className="mt-1 text-sm text-muted-foreground">Where should we send your order?</p>
            <div className="mt-5">
              <ShippingForm defaultValues={draft.shipping} onSubmit={onSubmitShipping} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Return to cart
            </Link>
            <Button
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => {
                const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
                contactForm?.requestSubmit();
              }}
            >
              Continue to shipping
            </Button>
          </div>
        </section>
        <OrderSummaryPanel />
      </div>
    </div>
  );
}
