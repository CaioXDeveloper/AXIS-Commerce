"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { shippingAddressSchema, type ShippingAddressValues } from "@/lib/validations";

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "JP", label: "Japan" },
];

interface ShippingFormProps {
  defaultValues?: Partial<ShippingAddressValues>;
  onSubmit: (values: ShippingAddressValues) => void;
  formId?: string;
}

export function ShippingForm({ defaultValues, onSubmit, formId = "shipping-form" }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      phone: "",
      saveAddress: true,
      ...defaultValues,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
        <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <Input label="Street address" autoComplete="address-line1" error={errors.line1?.message} {...register("line1")} />
      <Input label="Apt / Suite (optional)" autoComplete="address-line2" error={errors.line2?.message} {...register("line2")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
        <Input label="State / Region" autoComplete="address-level1" error={errors.state?.message} {...register("state")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="ZIP / Postal" autoComplete="postal-code" error={errors.zip?.message} {...register("zip")} />
        <Select label="Country" options={COUNTRIES} error={errors.country?.message} {...register("country")} />
      </div>
      <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
      <Checkbox label="Save this address for next time" {...register("saveAddress")} />
    </form>
  );
}
