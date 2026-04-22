import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Error 404</p>
        <h1 className="mt-3 font-display text-fluid-7xl leading-[0.95]">Off the axis.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you were looking for has been moved, renamed, or never existed. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/"><Button size="lg">Back home</Button></Link>
          <Link href="/shop"><Button size="lg" variant="outline">Browse the shop</Button></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
