import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/40">
      <header className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-[0.2em]">{SITE.name}</Link>
        <Link href="/shop" className="text-xs text-muted-foreground hover:text-foreground">
          Continue shopping →
        </Link>
      </header>
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-card">
          {children}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name} Studios
      </footer>
    </div>
  );
}
