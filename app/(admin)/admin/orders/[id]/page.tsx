import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { getAdminOrderByNumber, getAdminOrders } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";
import { formatDate, formatPrice } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export function generateStaticParams(): { id: string }[] {
  return getAdminOrders().map((order) => ({ id: order.number }));
}

export function generateMetadata({ params }: Props): Metadata {
  const order = getAdminOrderByNumber(params.id);
  if (!order) return buildMetadata({ title: "Order not found", path: "/admin/orders" });
  return buildMetadata({ title: `Order ${order.number}`, path: `/admin/orders/${order.number}` });
}

function badge(status: string): "default" | "accent" | "sale" | "outline" {
  if (status === "delivered") return "default";
  if (status === "shipped") return "accent";
  if (status === "cancelled") return "sale";
  return "outline";
}

export default function AdminOrderDetailPage({ params }: Props) {
  const order = getAdminOrderByNumber(params.id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: order.number },
        ]}
      />

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Order detail</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">{order.number}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Placed {formatDate(order.createdAt)} · {order.items} items</p>
        </div>
        <Badge variant={badge(order.status)}>{order.status}</Badge>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Customer</h2>
          <p className="mt-3 text-sm font-medium">{order.customer}</p>
          <p className="text-sm text-muted-foreground">{order.email}</p>

          <h3 className="mt-6 text-xs uppercase tracking-[0.12em] text-muted-foreground">Fulfillment actions</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm">Mark as shipped</Button>
            <Button variant="outline" size="sm">Send update</Button>
            <Button variant="ghost" size="sm">Cancel order</Button>
          </div>

          <div className="mt-6 rounded-xl border border-border p-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{order.items}</span></div>
            <div className="mt-2 flex justify-between"><span className="text-muted-foreground">Total</span><span>{formatPrice(order.total)}</span></div>
            <div className="mt-2 flex justify-between"><span className="text-muted-foreground">Payment status</span><span>Paid</span></div>
          </div>
        </article>

        <aside className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Timeline</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <p className="font-medium">Order created</p>
              <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
            </li>
            <li>
              <p className="font-medium">Payment captured</p>
              <p className="text-xs text-muted-foreground">Auto-validated</p>
            </li>
            <li>
              <p className="font-medium">Warehouse queue</p>
              <p className="text-xs text-muted-foreground">Awaiting operator action</p>
            </li>
          </ul>
          <div className="mt-4">
            <Link href="/admin/orders"><Button variant="outline" size="sm" fullWidth>Back to orders</Button></Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
