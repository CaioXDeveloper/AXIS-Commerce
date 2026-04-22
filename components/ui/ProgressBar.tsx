import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressStep {
  id: string;
  label: string;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  currentIndex: number;
  className?: string;
}

export function ProgressBar({ steps, currentIndex, className }: ProgressBarProps) {
  return (
    <ol
      className={cn("flex w-full items-center gap-4", className)}
      aria-label="Checkout progress"
    >
      {steps.map((step, i) => {
        const completed = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                completed && "border-foreground bg-foreground text-background",
                active && "border-foreground text-foreground",
                !completed && !active && "border-border text-muted-foreground",
              )}
              aria-current={active ? "step" : undefined}
            >
              {completed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
            </span>
            <span className={cn("text-xs font-medium uppercase tracking-[0.12em]", !active && !completed && "text-muted-foreground")}>
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "ml-2 h-px flex-1 bg-border transition-colors",
                  (completed || active) && "bg-foreground/40",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
