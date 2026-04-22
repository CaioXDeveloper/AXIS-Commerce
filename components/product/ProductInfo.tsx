"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Star, Truck, RotateCcw, ShieldCheck, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { WishlistButton } from "@/components/product/WishlistButton";
import type { ColorVariant, Product, SizeVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const [color, setColor] = useState<ColorVariant | undefined>(product.variants.colors[0]);
  const [size, setSize] = useState<SizeVariant | undefined>(
    product.variants.sizes.find((s) => s.stock > 0) ?? product.variants.sizes[0],
  );
  const [qty, setQty] = useState<number>(1);
  const [adding, setAdding] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const onSale = typeof product.compareAtPrice === "number";
  const savings = onSale && product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const stock = size?.stock ?? 0;
  const lowStock = stock > 0 && stock < 5;

  async function onAdd() {
    if (!size || size.stock === 0) {
      toast.error("Please pick an available size.");
      return;
    }
    setAdding(true);
    await new Promise((r) => setTimeout(r, 450));
    addItem(product, { color, size }, qty);
    setAdding(false);
    toast.success(`${product.name} added to cart`);
    openDrawer();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</p>
        <h1 className="mt-1 font-display text-fluid-3xl leading-[1.05]">{product.name}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{product.shortDescription}</p>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-0.5" aria-label={`Rating ${product.rating} of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < Math.round(product.rating) ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-muted-foreground"}
            />
          ))}
        </span>
        <span className="text-muted-foreground">
          {product.rating.toFixed(1)} · <a href="#reviews" className="underline underline-offset-2 hover:text-foreground">
            {product.reviewCount} reviews
          </a>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
        {onSale && product.compareAtPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            <Badge variant="sale">{`Save ${savings}%`}</Badge>
          </>
        )}
      </div>

      <ProductVariantSelector
        colors={product.variants.colors}
        sizes={product.variants.sizes}
        selectedColor={color}
        selectedSize={size}
        onColorChange={setColor}
        onSizeChange={setSize}
        onSizeGuideClick={() => setShowGuide(true)}
      />

      {lowStock && (
        <p className="text-sm text-warning-600 dark:text-warning-400">
          Only {stock} left in size {size?.label}.
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="inline-flex h-12 items-center rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-full w-10 place-items-center text-foreground hover:bg-muted rounded-l-full"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="grid w-10 place-items-center text-sm tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(Math.max(1, stock || 99), q + 1))}
            aria-label="Increase quantity"
            className="grid h-full w-10 place-items-center text-foreground hover:bg-muted rounded-r-full"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button
          size="lg"
          fullWidth
          loading={adding}
          disabled={!size || size.stock === 0}
          onClick={onAdd}
          className="flex-1"
        >
          {size && size.stock === 0 ? "Sold out" : "Add to cart"}
        </Button>
        <WishlistButton product={product} />
      </div>

      <ul className="grid grid-cols-3 gap-2 border-y border-border py-4 text-xs text-muted-foreground">
        <li className="flex flex-col items-center gap-1 text-center">
          <Truck className="h-4 w-4 text-foreground" />
          Free shipping
        </li>
        <li className="flex flex-col items-center gap-1 text-center">
          <RotateCcw className="h-4 w-4 text-foreground" />
          Easy returns
        </li>
        <li className="flex flex-col items-center gap-1 text-center">
          <ShieldCheck className="h-4 w-4 text-foreground" />
          Secure payment
        </li>
      </ul>

      <p className="text-xs text-muted-foreground">
        Need help choosing?{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:text-foreground">
          Talk to a stylist
        </Link>
        .
      </p>

      <Modal open={showGuide} onClose={() => setShowGuide(false)} title="Size guide" size="md">
        <p className="text-sm text-muted-foreground">
          Most customers take their standard size. If you're between two sizes, we recommend going up by half,
          especially on our leather silhouettes — they mould to the foot within a week.
        </p>
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="pb-2 font-medium">EU</th>
              <th className="pb-2 font-medium">US</th>
              <th className="pb-2 font-medium">UK</th>
              <th className="pb-2 font-medium">CM</th>
            </tr>
          </thead>
          <tbody className="[&_td]:py-2 [&_tr]:border-b [&_tr]:border-border/60">
            <tr><td>40</td><td>7</td><td>6</td><td>25.5</td></tr>
            <tr><td>41</td><td>8</td><td>7</td><td>26.3</td></tr>
            <tr><td>42</td><td>9</td><td>8</td><td>27.1</td></tr>
            <tr><td>43</td><td>10</td><td>9</td><td>27.9</td></tr>
            <tr><td>44</td><td>11</td><td>10</td><td>28.6</td></tr>
            <tr><td>45</td><td>12</td><td>11</td><td>29.4</td></tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
}
