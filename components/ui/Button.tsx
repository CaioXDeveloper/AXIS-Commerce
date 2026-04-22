"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  magnetic?: boolean;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98] disabled:opacity-50",
  secondary:
    "bg-muted text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50",
  ghost:
    "bg-transparent text-foreground hover:bg-muted active:scale-[0.98] disabled:opacity-50",
  destructive:
    "bg-error text-white hover:bg-error-700 active:scale-[0.98] disabled:opacity-50",
  outline:
    "border border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background active:scale-[0.98] disabled:opacity-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    magnetic = false,
    fullWidth = false,
    className,
    children,
    disabled,
    type = "button",
    ...props
  },
  ref,
) {
  const magnet = useMagneticHover<HTMLButtonElement>(0.25);
  const motionProps = magnetic
    ? { onMouseMove: magnet.onMouseMove, onMouseLeave: magnet.onMouseLeave }
    : {};
  return (
    <button
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        magnet.ref.current = node;
      }}
      type={type}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 will-change-transform focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...motionProps}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className={cn(loading && "opacity-70")}>{children}</span>
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
});
