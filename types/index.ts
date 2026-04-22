// Central type definitions for the AXIS store.

export type ID = string;

export interface ColorVariant {
  name: string;
  hex: string;
  stock: number;
}

export interface SizeVariant {
  label: string;
  stock: number;
}

export interface ProductVariants {
  colors: ColorVariant[];
  sizes: SizeVariant[];
}

export interface Product {
  id: ID;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  images: string[]; // CSS gradient strings used as placeholders
  description: string;
  shortDescription: string;
  variants: ProductVariants;
  tags: string[];
  rating: number;
  reviewCount: number;
  isBestSeller: boolean;
  isNew: boolean;
  isFeatured: boolean;
  materials: string;
  careInstructions: string;
  shippingInfo: string;
  createdAt: string;
}

export interface CartItemVariant {
  color?: ColorVariant;
  size?: SizeVariant;
}

export interface CartItem {
  id: ID; // unique per (productId + color + size)
  productId: ID;
  slug: string;
  name: string;
  brand: string;
  image: string;
  unitPrice: number;
  compareAtUnitPrice?: number;
  quantity: number;
  variant: CartItemVariant;
  addedAt: string;
}

export interface PromoCode {
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number; // percent (0-100) or fixed amount in USD
  minSubtotal?: number;
}

export interface Cart {
  items: CartItem[];
  promoCode?: PromoCode;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: ID;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  variant: CartItemVariant;
}

export interface Address {
  id: ID;
  label?: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface ShippingMethod {
  id: "standard" | "express" | "overnight";
  name: string;
  description: string;
  priceCents: number;
  estimatedDays: string;
  freeOverCents?: number;
}

export interface Order {
  id: ID;
  number: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentLast4: string;
  email: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  addresses: Address[];
}

export interface Review {
  id: ID;
  productId: ID;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verified: boolean;
}

export interface SearchResult {
  product: Product;
  score: number;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "top-rated";

export interface FilterState {
  categories: string[];
  priceMin: number;
  priceMax: number;
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  sort: SortOption;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  ok: boolean;
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  category: string;
  cover: string; // CSS gradient
  content: string[]; // paragraphs
}
