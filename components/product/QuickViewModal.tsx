"use client";

import { Modal } from "@/components/ui/Modal";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductGallery } from "@/components/product/ProductGallery";
import type { Product } from "@/types";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  return (
    <Modal open={open && Boolean(product)} onClose={onClose} size="lg">
      {product && (
        <div className="grid gap-8 md:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductInfo product={product} />
        </div>
      )}
    </Modal>
  );
}
