"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const checkId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={checkId} className="group inline-flex cursor-pointer items-start gap-3">
        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-border bg-card transition-colors group-hover:border-foreground peer-checked:border-foreground">
          <input
            ref={ref}
            id={checkId}
            type="checkbox"
            className={cn("peer absolute inset-0 cursor-pointer opacity-0", className)}
            aria-invalid={Boolean(error)}
            {...props}
          />
          <Check
            className="h-3.5 w-3.5 opacity-0 transition-opacity peer-checked:opacity-100"
            strokeWidth={3}
          />
        </span>
        {label && <span className="select-none text-sm text-foreground">{label}</span>}
      </label>
      {hint && !error && <p className="pl-8 text-xs text-muted-foreground">{hint}</p>}
      {error && <p role="alert" className="pl-8 text-xs text-error">{error}</p>}
    </div>
  );
});
