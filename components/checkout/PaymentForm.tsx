"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { paymentFormSchema, type PaymentFormValues } from "@/lib/validations";

interface PaymentFormProps {
  defaultValues?: Partial<PaymentFormValues>;
  onSubmit: (values: PaymentFormValues) => void;
  formId?: string;
}

export function PaymentForm({ defaultValues, onSubmit, formId = "payment-form" }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
      sameAsShipping: true,
      ...defaultValues,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Card number"
        autoComplete="cc-number"
        inputMode="numeric"
        leftIcon={<CreditCard className="h-4 w-4" />}
        rightIcon={<Lock className="h-4 w-4" />}
        placeholder="4242 4242 4242 4242"
        error={errors.cardNumber?.message}
        {...register("cardNumber")}
      />
      <Input label="Name on card" autoComplete="cc-name" error={errors.cardName?.message} {...register("cardName")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Expiry (MM/YY)" placeholder="04/27" autoComplete="cc-exp" error={errors.expiry?.message} {...register("expiry")} />
        <Input label="CVV" placeholder="123" inputMode="numeric" autoComplete="cc-csc" error={errors.cvv?.message} {...register("cvv")} />
      </div>
      <Checkbox label="Billing address is the same as shipping" {...register("sameAsShipping")} />
    </form>
  );
}
