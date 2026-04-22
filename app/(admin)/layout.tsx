import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/admin" className="font-display text-xl tracking-[0.18em]">
            {SITE.name} ADMIN
          </Link>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              View storefront
            </Link>
            <span className="hidden sm:inline">operator@axis.store</span>
          </div>
        </div>
      </header>

      <main id="main-content" className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <AdminSidebar />
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
}
