"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { registerSchema, type RegisterValues } from "@/lib/validations";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false as unknown as true,
    },
  });

  async function onSubmit(values: RegisterValues) {
    await new Promise((r) => setTimeout(r, 500));
    toast.success(`Account created for ${values.email}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join AXIS — order faster, track easier, save pieces for later.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
          <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
        </div>
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Input label="Password" type="password" autoComplete="new-password" hint="8+ characters, mixed case, with a number." error={errors.password?.message} {...register("password")} />
        <Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        <Checkbox
          label={<span>I agree to the <Link href="/contact" className="underline">Terms</Link> and <Link href="/contact" className="underline">Privacy Policy</Link>.</span>}
          error={errors.terms?.message}
          {...register("terms")}
        />
        <Button type="submit" size="lg" loading={isSubmitting} fullWidth>Create account</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">Sign in</Link>.
      </p>
    </div>
  );
}
