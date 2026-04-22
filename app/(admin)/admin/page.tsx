import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getAdminDashboardStats,
  getAdminOrders,
  getAdminProducts,
  getAdminContent,
} from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Overview of catalog, orders, and operations.",
  path: "/admin",
});

function orderBadge(status: string): "default" | "accent" | "sale" | "outline" {
  if (status === "delivered") return "default";
  if (status === "shipped") return "accent";
  if (status === "cancelled") return "sale";
  return "outline";
}

export default function AdminDashboardPage() {
  const stats = getAdminDashboardStats();
  const recentOrders = getAdminOrders().slice(0, 5);
  const lowStock = getAdminProducts()
    .filter((p) => p.status === "low-stock")
    .slice(0, 5);
  const drafts = getAdminContent().filter((entry) => entry.status === "draft").slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Control center</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Admin dashboard</h1>
        </div>
        <Link href="/admin/products">
          <Button size="sm">Manage catalog</Button>
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Recent orders</h2>
            <Link href="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {recentOrders.map((order) => (
              <li key={order.number} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.number} · {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm tabular-nums">{formatPrice(order.total)}</span>
                  <Badge variant={orderBadge(order.status)}>{order.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Inventory alerts</h2>
            <Link href="/admin/products" className="text-xs text-muted-foreground hover:text-foreground">
              Review stock
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {lowStock.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <Badge variant="sale">{product.stock} units</Badge>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Content drafts</h2>
          <Link href="/admin/content" className="text-xs text-muted-foreground hover:text-foreground">
            Open content manager
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {drafts.map((entry) => (
            <article key={entry.id} className="rounded-xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{entry.type}</p>
              <h3 className="mt-2 text-sm font-medium">{entry.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Updated {formatDate(entry.updatedAt)}</p>
            </article>
          ))}
        </div>
        <div className="mt-5">
          <Link href="/admin/content">
            <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              Continue editing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
