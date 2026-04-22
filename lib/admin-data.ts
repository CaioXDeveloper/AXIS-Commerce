import { PRODUCTS, JOURNAL_ARTICLES } from "@/lib/mock-data";
import { PROMO_CODES, SHIPPING_METHODS, SITE } from "@/lib/constants";
import { formatPrice, sumBy } from "@/lib/utils";

export interface AdminDashboardStat {
  label: string;
  value: string;
  delta: string;
}

export interface AdminProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
  status: "active" | "low-stock";
}

export interface AdminOrderRow {
  number: string;
  customer: string;
  email: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  createdAt: string;
}

export interface AdminCustomerRow {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpend: number;
  lastOrderAt: string;
  segment: "vip" | "active" | "new";
}

export interface AdminContentRow {
  id: string;
  type: "journal" | "landing";
  title: string;
  status: "published" | "draft";
  updatedAt: string;
  owner: string;
}

export interface AdminDiscountRow {
  code: string;
  description: string;
  mode: "percentage" | "fixed";
  value: number;
  minSubtotal?: number;
  active: boolean;
  uses: number;
}

export function getAdminProducts(): AdminProductRow[] {
  return PRODUCTS.map((product) => {
    const stock = sumBy(product.variants.colors, (c) => c.stock);
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      stock,
      rating: product.rating,
      featured: product.isFeatured,
      status: stock <= 8 ? "low-stock" : "active",
    };
  });
}

export function getAdminProductById(id: string): AdminProductRow | undefined {
  return getAdminProducts().find((product) => product.id === id);
}

export function getAdminOrders(): AdminOrderRow[] {
  const statuses: AdminOrderRow["status"][] = ["processing", "shipped", "delivered", "delivered", "cancelled"];
  const buyers = [
    { name: "Alex Marin", email: "alex@example.com" },
    { name: "Naomi West", email: "naomi@studio.test" },
    { name: "Kenji Tan", email: "kenji@fieldmail.test" },
    { name: "Lena Hart", email: "lena@atelier.test" },
    { name: "Milo Cruz", email: "milo@runner.test" },
  ];

  return PRODUCTS.slice(0, 14).map((product, idx) => {
    const number = `ORD-${482000 + idx}`;
    const customer = buyers[idx % buyers.length];
    const quantity = (idx % 3) + 1;
    const total = Math.round((product.price * quantity + 18.4) * 100) / 100;
    const createdAt = new Date(Date.now() - idx * 1000 * 60 * 60 * 24).toISOString();

    return {
      number,
      customer: customer.name,
      email: customer.email,
      status: statuses[idx % statuses.length],
      total,
      items: quantity,
      createdAt,
    };
  });
}

export function getAdminOrderByNumber(number: string): AdminOrderRow | undefined {
  return getAdminOrders().find((order) => order.number === number);
}

export function getAdminCustomers(): AdminCustomerRow[] {
  const groups = new Map<string, Omit<AdminCustomerRow, "id" | "segment">>();

  for (const order of getAdminOrders()) {
    const existing = groups.get(order.email);
    if (!existing) {
      groups.set(order.email, {
        name: order.customer,
        email: order.email,
        orders: 1,
        totalSpend: order.total,
        lastOrderAt: order.createdAt,
      });
      continue;
    }

    groups.set(order.email, {
      ...existing,
      orders: existing.orders + 1,
      totalSpend: Math.round((existing.totalSpend + order.total) * 100) / 100,
      lastOrderAt: order.createdAt > existing.lastOrderAt ? order.createdAt : existing.lastOrderAt,
    });
  }

  return Array.from(groups.values())
    .map((customer, idx) => {
      const segment: AdminCustomerRow["segment"] =
        customer.totalSpend > 500 ? "vip" : customer.orders > 1 ? "active" : "new";

      return {
        id: `cus_${idx + 1}`,
        ...customer,
        segment,
      };
    })
    .sort((a, b) => b.totalSpend - a.totalSpend);
}

export function getAdminContent(): AdminContentRow[] {
  const journalRows: AdminContentRow[] = JOURNAL_ARTICLES.map((article, idx) => ({
    id: `jr_${idx + 1}`,
    type: "journal",
    title: article.title,
    status: idx === 0 ? "published" : idx % 3 === 0 ? "draft" : "published",
    updatedAt: article.date,
    owner: article.author,
  }));

  const landingRows: AdminContentRow[] = [
    { id: "lp_hero", type: "landing", title: "Homepage Hero", status: "published", updatedAt: "2026-04-12", owner: "Studio Team" },
    { id: "lp_about", type: "landing", title: "About Page", status: "published", updatedAt: "2026-04-10", owner: "Brand Team" },
    { id: "lp_footer", type: "landing", title: "Footer Links", status: "draft", updatedAt: "2026-04-18", owner: "Ops" },
  ];

  return [...journalRows, ...landingRows].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export function getAdminDiscounts(): AdminDiscountRow[] {
  return PROMO_CODES.map((promo, idx) => ({
    code: promo.code,
    description: promo.description,
    mode: promo.type,
    value: promo.value,
    minSubtotal: promo.minSubtotal,
    active: idx !== 1,
    uses: 18 + idx * 7,
  }));
}

export function getAdminDashboardStats(): AdminDashboardStat[] {
  const orders = getAdminOrders();
  const revenue = sumBy(orders, (order) => order.total);
  const avgOrder = orders.length ? revenue / orders.length : 0;
  const lowStockCount = getAdminProducts().filter((product) => product.status === "low-stock").length;

  return [
    { label: "Gross revenue", value: formatPrice(revenue), delta: "+8.4% this week" },
    { label: "Orders", value: String(orders.length), delta: "+12 today" },
    { label: "Average order", value: formatPrice(avgOrder), delta: "+3.1%" },
    { label: "Low stock SKUs", value: String(lowStockCount), delta: "Needs review" },
  ];
}

export function getAdminSettingsSnapshot(): { key: string; value: string; hint: string }[] {
  return [
    { key: "Store name", value: SITE.name, hint: "Shown in metadata and headers." },
    { key: "Support email", value: SITE.email, hint: "Used in contact and receipts." },
    { key: "Phone", value: SITE.phone, hint: "Displayed in support/footer." },
    { key: "Shipping methods", value: String(SHIPPING_METHODS.length), hint: "Configured in checkout." },
  ];
}
