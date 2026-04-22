import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildMetadata } from "@/lib/metadata";
import { getAdminOrders } from "@/lib/admin-data";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Orders",
  description: "Monitor order lifecycle and fulfillment.",
  path: "/admin/orders",
});

function variantFor(status: string): "default" | "accent" | "sale" | "outline" {
  if (status === "delivered") return "default";
  if (status === "shipped") return "accent";
  if (status === "cancelled") return "sale";
  return "outline";
}

export default function AdminOrdersPage() {
  const orders = getAdminOrders();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Operations</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Orders</h1>
        </div>
        <Button variant="outline" size="sm">Export CSV</Button>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Input placeholder="Order number" aria-label="Search order" />
          <Input placeholder="Customer email" aria-label="Search customer" />
          <Input placeholder="Status" aria-label="Filter status" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Order</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Items</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {orders.map((order) => (
                <tr key={order.number} className="hover:bg-muted/30">
                  <td className="p-3 font-mono">{order.number}</td>
                  <td className="p-3">
                    <p>{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{formatDate(order.createdAt)}</td>
                  <td className="p-3 tabular-nums">{order.items}</td>
                  <td className="p-3 tabular-nums">{formatPrice(order.total)}</td>
                  <td className="p-3">
                    <Badge variant={variantFor(order.status)}>{order.status}</Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Link href={`/admin/orders/${order.number}`}>
                      <Button variant="ghost" size="sm">Details</Button>
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
