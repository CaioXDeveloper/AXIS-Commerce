"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightIcon, className, containerClassName, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy: string[] = [];
  if (hint) describedBy.push(`${inputId}-hint`);
  if (error) describedBy.push(`${inputId}-error`);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          "group relative flex items-center rounded-md border bg-card text-card-foreground transition-colors",
          error ? "border-error focus-within:border-error" : "border-border focus-within:border-foreground",
        )}
      >
        {leftIcon && <span className="pl-3 text-muted-foreground">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy.join(" ") || undefined}
          className={cn(
            "peer h-11 w-full bg-transparent px-3 text-[0.95rem] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
            leftIcon && "pl-2",
            rightIcon && "pr-2",
            className,
          )}
          {...props}
        />
        {rightIcon && <span className="pr-3 text-muted-foreground">{rightIcon}</span>}
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
});
