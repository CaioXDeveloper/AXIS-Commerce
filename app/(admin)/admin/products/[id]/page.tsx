import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAdminProductById, getAdminProducts } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export function generateStaticParams(): { id: string }[] {
  return getAdminProducts().map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getAdminProductById(params.id);
  if (!product) return buildMetadata({ title: "Product not found", path: "/admin/products" });
  return buildMetadata({ title: `Edit ${product.name}`, path: `/admin/products/${product.id}` });
}

export default function AdminProductDetailPage({ params }: Props) {
  const product = getAdminProductById(params.id);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: product.name },
        ]}
      />

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Product detail</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">SKU {product.id} · slug {product.slug}</p>
        </div>
        <Badge variant={product.status === "active" ? "default" : "sale"}>{product.status}</Badge>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Product editor</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input label="Name" defaultValue={product.name} />
            <Input label="Category" defaultValue={product.category} />
            <Input label="Price" defaultValue={String(product.price)} />
            <Input label="Stock" defaultValue={String(product.stock)} />
            <Input label="Rating" defaultValue={product.rating.toFixed(1)} />
            <Input label="Featured" defaultValue={product.featured ? "Yes" : "No"} />
          </div>
          <div className="mt-5 flex gap-2">
            <Button size="sm">Save changes</Button>
            <Button variant="outline" size="sm">Duplicate</Button>
            <Button variant="ghost" size="sm">Archive</Button>
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Quick metrics</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between"><span>Current price</span><span>{formatPrice(product.price)}</span></li>
              <li className="flex items-center justify-between"><span>Total stock</span><span>{product.stock}</span></li>
              <li className="flex items-center justify-between"><span>Rating</span><span>{product.rating.toFixed(1)}</span></li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Actions</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/admin/products"><Button variant="outline" size="sm" fullWidth>Back to catalog</Button></Link>
              <Link href="/shop"><Button variant="ghost" size="sm" fullWidth>View storefront</Button></Link>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
