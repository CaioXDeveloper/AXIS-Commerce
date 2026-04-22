"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Drawer } from "@/components/ui/Drawer";
import { CartItem } from "@/components/cart/CartItem";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const totals = useCartStore((s) => s.getTotals());

  return (
    <Drawer open={isOpen} onClose={closeDrawer} title={`Your cart (${totals.itemCount})`}>
      {items.length === 0 ? (
        <CartEmpty dense onCtaClick={closeDrawer} />
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 overflow-y-auto px-6">
            <AnimatePresence initial={false}>
              {items.map((i) => (
                <CartItem key={i.id} item={i} onNavigate={closeDrawer} compact />
              ))}
            </AnimatePresence>
          </ul>

          <div className="border-t border-border bg-background p-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Link href="/checkout" onClick={closeDrawer}>
                <Button fullWidth size="lg">Checkout</Button>
              </Link>
              <Link href="/cart" onClick={closeDrawer}>
                <Button fullWidth variant="outline">View cart</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
