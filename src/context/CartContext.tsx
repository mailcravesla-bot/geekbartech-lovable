import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  flavor: string;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (slug: string, flavor: string) => void;
  setQty: (slug: string, flavor: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = "gbt_cart_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.slug === item.slug && p.flavor === item.flavor);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setOpen(true);
  };

  const remove: CartCtx["remove"] = (slug, flavor) =>
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.flavor === flavor)));

  const setQty: CartCtx["setQty"] = (slug, flavor, qty) =>
    setItems((prev) =>
      prev
        .map((p) => (p.slug === slug && p.flavor === flavor ? { ...p, quantity: Math.max(1, qty) } : p))
        .filter((p) => p.quantity > 0),
    );

  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.quantity * i.price, 0),
    }),
    [items, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
