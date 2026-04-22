"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3200,
              style: {
                background: "rgb(var(--card))",
                color: "rgb(var(--card-foreground))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "10px",
                boxShadow: "0 12px 32px -14px rgba(10,10,10,0.25)",
                padding: "12px 16px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#ccff00", secondary: "#0a0a0a" } },
              error: { iconTheme: { primary: "#e11d2e", secondary: "#fff" } },
            }}
          />
        </SmoothScrollProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
