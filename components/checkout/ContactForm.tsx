"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

interface ContactFormProps {
  defaultValues?: Partial<ContactFormValues>;
  onSubmit: (values: ContactFormValues) => void;
  formId?: string;
}

export function ContactForm({ defaultValues, onSubmit, formId = "contact-form" }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      createAccount: false,
      subscribe: true,
      ...defaultValues,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
        <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <Checkbox label="Create an account for faster checkout" {...register("createAccount")} />
      <Checkbox label="Email me about new drops and stories" {...register("subscribe")} />
    </form>
  );
}
