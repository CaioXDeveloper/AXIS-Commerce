import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { getAdminDiscounts } from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Discounts",
  description: "Create and control promotional codes.",
  path: "/admin/discounts",
});

export default function AdminDiscountsPage() {
  const discounts = getAdminDiscounts();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Promotions</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Discounts</h1>
        </div>
        <Button size="sm">Create code</Button>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Code</th>
                <th className="p-3 font-medium">Description</th>
                <th className="p-3 font-medium">Value</th>
                <th className="p-3 font-medium">Uses</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {discounts.map((discount) => (
                <tr key={discount.code} className="hover:bg-muted/30">
                  <td className="p-3 font-mono">{discount.code}</td>
                  <td className="p-3">
                    <p>{discount.description}</p>
                    {discount.minSubtotal && (
                      <p className="text-xs text-muted-foreground">Min subtotal {formatPrice(discount.minSubtotal)}</p>
                    )}
                  </td>
                  <td className="p-3">
                    {discount.mode === "percentage" ? `${discount.value}%` : formatPrice(discount.value)}
                  </td>
                  <td className="p-3 tabular-nums">{discount.uses}</td>
                  <td className="p-3">
                    <Badge variant={discount.active ? "default" : "outline"}>
                      {discount.active ? "active" : "paused"}
                    </Badge>
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
