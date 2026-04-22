import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Please enter a valid email.");

export const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number is too short.")
  .max(20, "Phone number is too long.")
  .regex(/^[+0-9()\-\s]+$/, "Phone can only contain digits, spaces, +, -, ().");

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[a-z]/, "Include at least one lowercase letter.")
  .regex(/[0-9]/, "Include at least one number.");

export const contactFormSchema = z.object({
  email: emailSchema,
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  createAccount: z.boolean().optional().default(false),
  subscribe: z.boolean().optional().default(false),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const shippingAddressSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  line1: z.string().trim().min(1, "Street address is required."),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required."),
  state: z.string().trim().min(1, "State is required."),
  zip: z.string().trim().min(3, "Postal code is required."),
  country: z.string().trim().min(2, "Country is required."),
  phone: phoneSchema,
  saveAddress: z.boolean().optional().default(false),
});
export type ShippingAddressValues = z.infer<typeof shippingAddressSchema>;

export const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .regex(/^[0-9 ]{13,23}$/, "Enter a valid card number."),
  cardName: z.string().trim().min(1, "Name on card is required."),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY."),
  cvv: z.string().trim().regex(/^[0-9]{3,4}$/, "3 or 4 digits."),
  sameAsShipping: z.boolean().optional().default(true),
});
export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
  remember: z.boolean().optional().default(false),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms." }) }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({ email: emailSchema });
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const reviewSchema = z.object({
  author: z.string().trim().min(1, "Name is required."),
  rating: z.number().int().min(1, "Pick a rating.").max(5),
  title: z.string().trim().min(3, "Title is too short.").max(80),
  body: z.string().trim().min(10, "Tell us a bit more.").max(1000),
});
export type ReviewValues = z.infer<typeof reviewSchema>;

export const newsletterSchema = z.object({ email: emailSchema });
export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const contactPageSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: emailSchema,
  subject: z.string().min(1, "Pick a subject."),
  message: z.string().trim().min(10, "Your message is too short.").max(2000),
});
export type ContactPageValues = z.infer<typeof contactPageSchema>;

export const accountSettingsSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: emailSchema,
    currentPassword: z.string().optional().or(z.literal("")),
    newPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (v) => {
      if (!v.newPassword) return true;
      return passwordSchema.safeParse(v.newPassword).success;
    },
    { message: "New password does not meet requirements.", path: ["newPassword"] },
  );
export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>;

export const createOrderSchema = z.object({
  email: emailSchema,
  shippingAddress: shippingAddressSchema.omit({ saveAddress: true }),
  billingAddress: shippingAddressSchema.omit({ saveAddress: true }).optional(),
  shippingMethodId: z.enum(["standard", "express", "overnight"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        quantity: z.number().int().positive(),
        variant: z.object({
          color: z.string().optional(),
          size: z.string().optional(),
        }),
        unitPrice: z.number().nonnegative(),
      }),
    )
    .min(1, "Cart is empty."),
  promoCode: z.string().optional(),
  payment: paymentFormSchema.pick({ cardNumber: true, cardName: true, expiry: true, cvv: true }),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
