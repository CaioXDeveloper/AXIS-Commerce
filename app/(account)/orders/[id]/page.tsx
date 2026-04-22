import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface Props {
  params: { id: string };
}

export default function OrderDetailPage({ params }: Props) {
  const number = params.id;
  const tracking = `1Z${number.slice(-6)}AXIS`;

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Orders", href: "/orders" },
          { label: number },
        ]}
      />

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-fluid-4xl">Order <span className="font-mono">{number}</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Placed April 14, 2026 · 2 items</p>
        </div>
        <Badge variant="accent">Shipped</Badge>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4 rounded-2xl border border-border p-6">
          <h2 className="font-display text-xl">Items</h2>
          <ul className="divide-y divide-border">
            {[
              { name: "Meridian Low · Obsidian", size: "10", qty: 1, price: "$245.00" },
              { name: "Mark Graphic Tee · Bone", size: "M", qty: 2, price: "$130.00" },
            ].map((i) => (
              <li key={i.name} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground">Size {i.size} · Qty {i.qty}</p>
                </div>
                <span className="text-sm tabular-nums">{i.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>$375.00</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>$30.00</span></div>
            <div className="mt-1 flex justify-between font-medium"><span>Total</span><span>$405.00</span></div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Ship to</h2>
            <p className="mt-2 text-sm">
              Alex Marin<br />
              221 Steiner Street<br />
              San Francisco, CA 94117<br />
              United States
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Tracking</h2>
            <p className="mt-2 font-mono text-sm">{tracking}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Track package</Button>
              <Link href="/contact"><Button variant="ghost" size="sm">Request return</Button></Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
