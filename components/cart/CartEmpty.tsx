"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CartEmptyProps {
  onCtaClick?: () => void;
  dense?: boolean;
}

export function CartEmpty({ onCtaClick, dense = false }: CartEmptyProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${dense ? "gap-4 py-12" : "gap-5 py-24"}`}>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground">
        <ShoppingBag className="h-6 w-6" />
      </span>
      <div>
        <h2 className="font-display text-2xl">Your cart is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Nothing in here yet. Let's change that.
        </p>
      </div>
      <Link href="/shop" onClick={onCtaClick}>
        <Button size="lg">Browse the shop</Button>
      </Link>
    </div>
  );
}
