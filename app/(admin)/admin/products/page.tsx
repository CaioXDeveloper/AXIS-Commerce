import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildMetadata } from "@/lib/metadata";
import { getAdminProducts } from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Products",
  description: "Manage catalog, stock and pricing.",
  path: "/admin/products",
});

export default function AdminProductsPage() {
  const products = getAdminProducts();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Catalog</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Products</h1>
        </div>
        <Button size="sm">Add product</Button>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Input placeholder="Search by name or SKU" aria-label="Search products" />
          <Input placeholder="Filter by category" aria-label="Filter by category" />
          <Input placeholder="Status: active / low-stock" aria-label="Filter by status" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium">Stock</th>
                <th className="p-3 font-medium">Rating</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.id}</p>
                  </td>
                  <td className="p-3 capitalize text-muted-foreground">{product.category}</td>
                  <td className="p-3 tabular-nums">{formatPrice(product.price)}</td>
                  <td className="p-3 tabular-nums">{product.stock}</td>
                  <td className="p-3 tabular-nums">{product.rating.toFixed(1)}</td>
                  <td className="p-3">
                    <Badge variant={product.status === "active" ? "default" : "sale"}>{product.status}</Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="ghost" size="sm" leftIcon={<Eye className="h-4 w-4" />}>
                        Open
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
