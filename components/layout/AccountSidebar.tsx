"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, MapPin, Package, Settings, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/account", label: "Overview", icon: UserRound },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/addresses", label: "Addresses", icon: MapPin },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:sticky md:top-24">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
            <UserRound className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alex Marin</span>
            <span className="text-xs text-muted-foreground">alex@example.com</span>
          </div>
        </div>
        <nav aria-label="Account sections" className="mt-4 flex flex-col gap-1">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/account" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 border-t border-border pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <CreditCard className="h-4 w-4" />
            Billing & invoices
          </button>
        </div>
      </div>
    </aside>
  );
}
