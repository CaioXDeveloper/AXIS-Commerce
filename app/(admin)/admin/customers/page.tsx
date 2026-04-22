import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { buildMetadata } from "@/lib/metadata";
import { getAdminCustomers } from "@/lib/admin-data";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Customers",
  description: "Track customer cohorts and value.",
  path: "/admin/customers",
});

function segmentVariant(segment: "vip" | "active" | "new"): "default" | "accent" | "outline" {
  if (segment === "vip") return "default";
  if (segment === "active") return "accent";
  return "outline";
}

export default function AdminCustomersPage() {
  const customers = getAdminCustomers();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">CRM</p>
        <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Customers</h1>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Input placeholder="Name or email" aria-label="Search customers" />
          <Input placeholder="Segment: vip / active / new" aria-label="Filter segment" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Orders</th>
                <th className="p-3 font-medium">Total spent</th>
                <th className="p-3 font-medium">Last order</th>
                <th className="p-3 font-medium">Segment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </td>
                  <td className="p-3 tabular-nums">{customer.orders}</td>
                  <td className="p-3 tabular-nums">{formatPrice(customer.totalSpend)}</td>
                  <td className="p-3 text-muted-foreground">{formatDate(customer.lastOrderAt)}</td>
                  <td className="p-3">
                    <Badge variant={segmentVariant(customer.segment)}>{customer.segment}</Badge>
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
