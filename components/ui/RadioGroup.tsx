"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption<T extends string = string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  label?: string;
  className?: string;
}

export function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  label,
  className,
}: RadioGroupProps<T>) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      {label && (
        <legend className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </legend>
      )}
      <div className="grid gap-3">
        {options.map((o) => {
          const checked = o.value === value;
          return (
            <label
              key={o.value}
              className={cn(
                "relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                checked ? "border-foreground bg-muted/40" : "border-border hover:border-foreground/60",
                o.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                disabled={o.disabled}
                onChange={() => onChange(o.value)}
                className="mt-1 h-4 w-4 accent-foreground"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{o.label}</span>
                {o.description && (
                  <span className="text-xs text-muted-foreground">{o.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
