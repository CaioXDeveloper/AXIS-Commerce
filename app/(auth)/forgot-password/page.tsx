"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(_values: ForgotPasswordValues) {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h1 className="font-display text-3xl">Check your inbox</h1>
        <p className="text-sm text-muted-foreground">
          If an account exists for that address, you'll receive a password reset link in the next minute.
        </p>
        <Link href="/login" className="text-sm underline-offset-4 hover:underline">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl">Reset password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Button type="submit" size="lg" loading={isSubmitting} fullWidth>Send reset link</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">Sign in</Link>.
      </p>
    </div>
  );
}
