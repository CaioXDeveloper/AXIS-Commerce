import { NextResponse, type NextRequest } from "next/server";
import { createOrderSchema } from "@/lib/validations";
import { SHIPPING_METHODS, TAX_RATE } from "@/lib/constants";
import type { Order } from "@/types";

// NOTE: Real implementation would:
// - rate limit this endpoint (e.g. upstash/ratelimit)
// - verify a CSRF token / session
// - charge the card via Stripe / Adyen
// - persist the order, emit webhooks and queue shipment
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid order." },
      { status: 400 },
    );
  }
  const { items, shippingAddress, shippingMethodId, payment, email, promoCode } = parsed.data;

  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethodId) ?? SHIPPING_METHODS[0];
  const shipping = method.freeOverCents && subtotal * 100 >= method.freeOverCents ? 0 : method.priceCents / 100;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const order: Order = {
    id: `ord_${Math.random().toString(36).slice(2, 10)}`,
    number: orderNumber,
    status: "processing",
    createdAt: new Date().toISOString(),
    items: items.map((i) => ({
      productId: i.productId,
      slug: i.slug,
      name: "",
      image: "linear-gradient(135deg,#0a0a0a,#2c2c2c)",
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      variant: {
        color: i.variant.color ? { name: i.variant.color, hex: "#000", stock: 0 } : undefined,
        size: i.variant.size ? { label: i.variant.size, stock: 0 } : undefined,
      },
    })),
    subtotal,
    discount: 0,
    shipping,
    tax,
    total,
    shippingAddress: {
      id: "addr_new",
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      line1: shippingAddress.line1,
      line2: shippingAddress.line2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      country: shippingAddress.country,
      phone: shippingAddress.phone,
    },
    billingAddress: {
      id: "addr_new",
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      line1: shippingAddress.line1,
      line2: shippingAddress.line2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      country: shippingAddress.country,
      phone: shippingAddress.phone,
    },
    shippingMethod: method,
    paymentLast4: payment.cardNumber.replace(/\s/g, "").slice(-4),
    email,
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    trackingNumber: `1Z${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
  };

  // Unused-warning suppression for promoCode since real impl would resolve it.
  void promoCode;

  return NextResponse.json({ ok: true, data: order });
}
