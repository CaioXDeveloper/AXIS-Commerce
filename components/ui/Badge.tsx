import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "sale" | "new" | "soldout" | "accent" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-foreground text-background",
  sale: "bg-error text-white",
  new: "bg-accent text-foreground",
  soldout: "bg-muted text-muted-foreground",
  accent: "bg-accent text-foreground",
  outline: "border border-foreground/60 text-foreground bg-transparent",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
