import type { PromoCode, ShippingMethod } from "@/types";

export const SITE = {
  name: "AXIS",
  tagline: "Movement is the axis.",
  description:
    "AXIS curates high-end sneakers and technical streetwear from independent ateliers — every piece selected for the line it draws through culture.",
  url: "https://axis.store",
  email: "studio@axis.store",
  phone: "+1 (415) 555-0119",
  address: {
    street: "221 Steiner Street",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "USA",
  },
  hours: "Mon–Sat · 11:00 — 19:00",
  socials: {
    instagram: "https://instagram.com/axis.store",
    twitter: "https://twitter.com/axisstore",
  },
} as const;

export interface NavCategory {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORIES: NavCategory[] = [
  { slug: "sneakers", name: "Sneakers", description: "Low, mid and high silhouettes from global ateliers." },
  { slug: "apparel", name: "Apparel", description: "Outerwear, knits and essentials in technical fabrics." },
  { slug: "accessories", name: "Accessories", description: "Bags, caps, eyewear and everyday carry." },
  { slug: "archive", name: "Archive", description: "Last-of-run pieces and restocks from past seasons." },
];

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/shop/sneakers", label: "Sneakers" },
  { href: "/shop/apparel", label: "Apparel" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/shop/sneakers", label: "Sneakers" },
      { href: "/shop/apparel", label: "Apparel" },
      { href: "/shop/accessories", label: "Accessories" },
      { href: "/shop/archive", label: "Archive" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About AXIS" },
      { href: "/journal", label: "Journal" },
      { href: "/sustainability", label: "Sustainability" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Help center" },
      { href: "/account/orders", label: "Track your order" },
      { href: "/contact", label: "Shipping & returns" },
      { href: "/contact", label: "Size guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Terms of service" },
      { href: "/contact", label: "Privacy policy" },
      { href: "/contact", label: "Cookie preferences" },
      { href: "/contact", label: "Accessibility" },
    ],
  },
];

export const FREE_SHIPPING_THRESHOLD = 75;
export const TAX_RATE = 0.08;

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Carbon-neutral ground shipping.",
    priceCents: 599,
    estimatedDays: "5–7 business days",
    freeOverCents: 7500,
  },
  {
    id: "express",
    name: "Express",
    description: "Priority air shipping, signature on delivery.",
    priceCents: 1299,
    estimatedDays: "2–3 business days",
  },
  {
    id: "overnight",
    name: "Overnight",
    description: "Same-day dispatch before 2pm PT.",
    priceCents: 2499,
    estimatedDays: "Next business day",
  },
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: "WELCOME10",
    description: "10% off your first order",
    type: "percentage",
    value: 10,
  },
  {
    code: "AXIS20",
    description: "20% off orders over $200",
    type: "percentage",
    value: 20,
    minSubtotal: 200,
  },
  {
    code: "FREESHIP",
    description: "Free standard shipping",
    type: "fixed",
    value: 5.99,
  },
];

export const SIZES: string[] = [
  "XS", "S", "M", "L", "XL", "XXL",
  "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13",
];

export const COLORS: { name: string; hex: string }[] = [
  { name: "Obsidian", hex: "#0A0A0A" },
  { name: "Bone", hex: "#F5F2EC" },
  { name: "Volt", hex: "#CCFF00" },
  { name: "Ash", hex: "#6B6B66" },
  { name: "Ember", hex: "#E11D2E" },
  { name: "Clay", hex: "#B07A53" },
  { name: "Fog", hex: "#9AA2A2" },
  { name: "Forest", hex: "#2F4A3A" },
];

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "newest", label: "Newest" },
  { value: "top-rated", label: "Top rated" },
];

export const TRUST_BADGES = [
  { title: "Free shipping", subtitle: "On orders over $75" },
  { title: "Free returns", subtitle: "30 days, no questions" },
  { title: "Secure checkout", subtitle: "256-bit encryption" },
  { title: "24/7 support", subtitle: "Real humans, any time zone" },
] as const;
