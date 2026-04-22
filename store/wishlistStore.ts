"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistState {
  items: Product[];
  isHydrated: boolean;
}

interface WishlistActions {
  toggle: (product: Product) => boolean; // returns true if added
  remove: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
  setHydrated: () => void;
}

export type WishlistStore = WishlistState & WishlistActions;

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      toggle: (product) => {
        const exists = get().items.some((i) => i.id === product.id);
        if (exists) {
          set((s) => ({ items: s.items.filter((i) => i.id !== product.id) }));
          return false;
        }
        set((s) => ({ items: [product, ...s.items] }));
        return true;
      },
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== productId) })),
      isWishlisted: (productId) => get().items.some((i) => i.id === productId),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "axis-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
