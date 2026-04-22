import Link from "next/link";
import { Package, MapPin, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Account", path: "/account" });

const MOCK_RECENT_ORDER = {
  number: "ORD-482091",
  date: "Apr 14, 2026",
  status: "Shipped",
  total: "$524.98",
};

const QUICK = [
  { href: "/orders", label: "Orders", icon: Package, hint: "Track & return" },
  { href: "/addresses", label: "Addresses", icon: MapPin, hint: "Shipping & billing" },
  { href: "/wishlist", label: "Wishlist", icon: Heart, hint: "Saved items" },
  { href: "/settings", label: "Settings", icon: Settings, hint: "Profile & security" },
];

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
        <h1 className="mt-2 font-display text-fluid-4xl leading-[1.05]">Hello, Alex.</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Your orders, saved items and preferences — all in one quiet place.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Most recent order</p>
            <h2 className="mt-1 font-display text-2xl">#{MOCK_RECENT_ORDER.number}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Placed {MOCK_RECENT_ORDER.date} · {MOCK_RECENT_ORDER.total}</p>
          </div>
          <Badge variant="accent">{MOCK_RECENT_ORDER.status}</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/orders/${MOCK_RECENT_ORDER.number}`}>
            <Button variant="outline" size="sm">View details</Button>
          </Link>
          <Link href="/orders">
            <Button variant="ghost" size="sm">All orders</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK.map(({ href, label, icon: Icon, hint }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-muted">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
