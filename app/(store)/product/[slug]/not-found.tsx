import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Product not found</p>
      <h1 className="mt-3 font-display text-4xl">That piece has moved.</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        We couldn't find the product you were looking for. It may have sold out or been archived.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/shop"><Button>Browse the shop</Button></Link>
      </div>
    </main>
  );
}
