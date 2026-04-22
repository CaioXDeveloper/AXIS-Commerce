"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartItemVariant, Product, PromoCode } from "@/types";
import { FREE_SHIPPING_THRESHOLD, PROMO_CODES, SHIPPING_METHODS, TAX_RATE } from "@/lib/constants";
import { randomId } from "@/lib/utils";

interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  promoCode?: PromoCode;
  isDrawerOpen: boolean;
  isHydrated: boolean;
}

interface CartActions {
  addItem: (product: Product, variant: CartItemVariant, quantity?: number) => CartItem;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { ok: boolean; message: string };
  removePromoCode: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setHydrated: () => void;
  getTotals: () => CartTotals;
}

export type CartStore = CartState & CartActions;

function variantKey(productId: string, variant: CartItemVariant): string {
  return [productId, variant.color?.name ?? "-", variant.size?.label ?? "-"].join("::");
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: undefined,
      isDrawerOpen: false,
      isHydrated: false,

      addItem: (product, variant, quantity = 1) => {
        const key = variantKey(product.id, variant);
        const existing = get().items.find(
          (i) => variantKey(i.productId, i.variant) === key,
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          }));
          return { ...existing, quantity: existing.quantity + quantity };
        }
        const image = product.images[0] ?? "linear-gradient(135deg,#0a0a0a,#2c2c2c)";
        const newItem: CartItem = {
          id: randomId("ci"),
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image,
          unitPrice: product.price,
          compareAtUnitPrice: product.compareAtPrice,
          quantity,
          variant,
          addedAt: new Date().toISOString(),
        };
        set((s) => ({ items: [newItem, ...s.items] }));
        return newItem;
      },

      removeItem: (itemId) => set((s) => ({ items: s.items.filter((i) => i.id !== itemId) })),

      updateQuantity: (itemId, quantity) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [], promoCode: undefined }),

      applyPromoCode: (code) => {
        const normalized = code.trim().toUpperCase();
        const match = PROMO_CODES.find((p) => p.code === normalized);
        if (!match) return { ok: false, message: "That code is not valid." };
        const { subtotal } = get().getTotals();
        if (match.minSubtotal && subtotal < match.minSubtotal) {
          return {
            ok: false,
            message: `Requires a subtotal of at least $${match.minSubtotal}.`,
          };
        }
        set({ promoCode: match });
        return { ok: true, message: `${match.code} applied — ${match.description}.` };
      },

      removePromoCode: () => set({ promoCode: undefined }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),

      setHydrated: () => set({ isHydrated: true }),

      getTotals: () => {
        const { items, promoCode } = get();
        const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
        let discount = 0;
        if (promoCode) {
          if (promoCode.type === "percentage") discount = (subtotal * promoCode.value) / 100;
          else discount = promoCode.value;
        }
        const standard = SHIPPING_METHODS.find((m) => m.id === "standard");
        let shipping = standard ? standard.priceCents / 100 : 5.99;
        if (subtotal >= FREE_SHIPPING_THRESHOLD) shipping = 0;
        const taxable = Math.max(0, subtotal - discount);
        const tax = Math.round(taxable * TAX_RATE * 100) / 100;
        const total = Math.max(0, taxable + shipping + tax);
        const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
        return {
          itemCount,
          subtotal: round(subtotal),
          discount: round(discount),
          shipping: round(shipping),
          tax: round(tax),
          total: round(total),
        };
      },
    }),
    {
      name: "axis-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, promoCode: state.promoCode }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
