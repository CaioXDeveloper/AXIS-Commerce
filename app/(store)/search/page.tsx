"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/mock-data";
import type { Product } from "@/types";

function SearchInner() {
  const sp = useSearchParams();
  const q = (sp.get("q") ?? "").toLowerCase().trim();
  const results: Product[] = q
    ? PRODUCTS.filter((p) =>
        [p.name, p.brand, p.description, p.category, ...p.tags].join(" ").toLowerCase().includes(q),
      )
    : [];

  return (
    <main id="main-content" className="container py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} className="mb-6" />
      <h1 className="font-display text-fluid-5xl leading-[1.02]">
        {q ? <>Results for <span className="italic text-muted-foreground">&ldquo;{q}&rdquo;</span></> : "Search"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {q ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : "Use the search bar above to find products."}
      </p>

      <div className="mt-10">
        {q && results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <h2 className="font-display text-2xl">No results.</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Try a broader term. Examples: <span className="text-foreground">meridian</span>,
              {" "}
              <span className="text-foreground">hoodie</span>, <span className="text-foreground">volt</span>.
            </p>
            <Link href="/shop"><Button className="mt-6">Browse the shop</Button></Link>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={<div className="container py-24" />}>
        <SearchInner />
      </Suspense>
      <Footer />
    </>
  );
}
