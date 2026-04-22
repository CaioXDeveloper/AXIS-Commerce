"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, CircleDollarSign, FileText, Settings, ShoppingBag, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/discounts", label: "Discounts", icon: CircleDollarSign },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:sticky md:top-20">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="border-b border-border pb-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Administration</p>
          <h2 className="mt-2 font-display text-xl">AXIS Control</h2>
        </div>

        <nav aria-label="Admin sections" className="mt-4 flex flex-col gap-1">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-foreground text-background" : "text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
