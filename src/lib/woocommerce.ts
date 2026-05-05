import { supabase } from "@/integrations/supabase/client";

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const FN_BASE = `https://${PROJECT_ID}.supabase.co/functions/v1/wc-proxy`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export interface WCImage { id: number; src: string; alt: string }
export interface WCCategory { id: number; name: string; slug: string }
export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  short_description: string;
  description: string;
  images: WCImage[];
  categories: WCCategory[];
  average_rating: string;
  rating_count: number;
}

async function wc<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${FN_BASE}/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), {
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
    },
  });
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const detail = contentType.includes("application/json") ? await res.json().catch(() => null) : await res.text();
    console.error("WooCommerce request failed", { status: res.status, detail });
    throw new Error(`WooCommerce request failed: ${res.status}`);
  }
  if (!contentType.includes("application/json")) {
    const preview = await res.text();
    console.error("WooCommerce proxy returned non-JSON response", preview.slice(0, 200));
    throw new Error("WooCommerce returned an invalid response");
  }
  return res.json();
}

export const wcApi = {
  listProducts: (params: Record<string, string | number> = {}) =>
    wc<WCProduct[]>("products", { per_page: 24, status: "publish", ...params }),
  getProduct: (id: number | string) => wc<WCProduct>(`products/${id}`),
  getProductBySlug: async (slug: string) => {
    const arr = await wc<WCProduct[]>("products", { slug });
    return arr[0];
  },
  listCategories: () => wc<WCCategory[]>("products/categories", { per_page: 50 }),
};

export function stripHtml(html: string) {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, "");
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function formatPrice(price: string) {
  if (!price) return "";
  const n = Number(price);
  if (Number.isNaN(n)) return price;
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

export { supabase };
