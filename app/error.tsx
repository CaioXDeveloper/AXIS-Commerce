"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to error monitoring (Sentry, Datadog, etc.) in production.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="container flex min-h-[80vh] flex-col items-center justify-center text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Something went wrong</p>
          <h1 className="mt-3 font-display text-5xl">We've knocked the axis.</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            An unexpected error occurred. Our team has been notified — try reloading the page below.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={reset}>Reload</Button>
            <a href="/"><Button size="lg" variant="outline">Go home</Button></a>
          </div>
          {error.digest && (
            <p className="mt-6 font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>
          )}
        </main>
      </body>
    </html>
  );
}
