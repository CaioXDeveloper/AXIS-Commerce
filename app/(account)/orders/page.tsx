import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Orders", path: "/orders" });

interface MockOrder {
  number: string;
  date: string;
  items: number;
  total: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

const ORDERS: MockOrder[] = [
  { number: "ORD-482091", date: "Apr 14, 2026", items: 2, total: "$524.98", status: "Shipped" },
  { number: "ORD-471203", date: "Mar 02, 2026", items: 1, total: "$245.00", status: "Delivered" },
  { number: "ORD-462994", date: "Feb 07, 2026", items: 3, total: "$412.00", status: "Delivered" },
  { number: "ORD-458112", date: "Jan 18, 2026", items: 1, total: "$85.00", status: "Cancelled" },
];

function variantFor(status: MockOrder["status"]): BadgeVariant {
  if (status === "Shipped") return "accent";
  if (status === "Delivered") return "default";
  if (status === "Cancelled") return "sale";
  return "outline";
}

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-fluid-4xl leading-[1.05]">Orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">Track any order or request a return within 30 days of delivery.</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {ORDERS.map((o) => (
              <tr key={o.number} className="hover:bg-muted/30">
                <td className="p-4 font-mono">{o.number}</td>
                <td className="p-4 text-muted-foreground">{o.date}</td>
                <td className="p-4">{o.items}</td>
                <td className="p-4 tabular-nums">{o.total}</td>
                <td className="p-4"><Badge variant={variantFor(o.status)}>{o.status}</Badge></td>
                <td className="p-4 text-right">
                  <Link href={`/orders/${o.number}`} className="underline-offset-4 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
