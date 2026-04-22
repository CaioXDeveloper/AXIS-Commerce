"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { reviewSchema, type ReviewValues } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProductReviewFormProps {
  onSubmitted?: (values: ReviewValues) => void;
}

export function ProductReviewForm({ onSubmitted }: ProductReviewFormProps) {
  const [hover, setHover] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { author: "", rating: 0, title: "", body: "" },
  });

  const rating = watch("rating");

  async function onSubmit(values: ReviewValues) {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Thanks — your review is pending approval.");
    onSubmitted?.(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Your rating
        </span>
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const n = i + 1;
            const active = (hover || rating) >= n;
            return (
              <button
                key={n}
                type="button"
                aria-label={`${n} stars`}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setValue("rating", n, { shouldValidate: true })}
                className="p-1"
              >
                <Star className={cn("h-6 w-6 transition-colors", active ? "fill-accent text-accent" : "text-muted-foreground")} />
              </button>
            );
          })}
        </div>
        {errors.rating && <p role="alert" className="mt-1 text-xs text-error">{errors.rating.message}</p>}
      </div>

      <Input label="Name" error={errors.author?.message} {...register("author")} />
      <Input label="Title" error={errors.title?.message} {...register("title")} />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground" htmlFor="review-body">
          Your thoughts
        </label>
        <textarea
          id="review-body"
          rows={5}
          aria-invalid={Boolean(errors.body)}
          className={cn(
            "rounded-md border bg-card p-3 text-sm focus:outline-none",
            errors.body ? "border-error" : "border-border focus:border-foreground",
          )}
          {...register("body")}
        />
        {errors.body && <p role="alert" className="text-xs text-error">{errors.body.message}</p>}
      </div>
      <Button type="submit" loading={isSubmitting}>Submit review</Button>
    </form>
  );
}
