import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-[0.2em]">
            {SITE.name}
          </Link>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout
          </span>
        </div>
      </header>
      <main id="main-content" className="flex-1">{children}</main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name} Studios · {SITE.address.city}, {SITE.address.country}
      </footer>
    </div>
  );
}
