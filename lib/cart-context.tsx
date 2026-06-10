"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, options?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (slug: string, size?: string, color?: string) => void;
  updateQuantity: (slug: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "pv-designer-studio-cart";

function sameLine(a: CartItem, slug: string, size?: string, color?: string) {
  return a.slug === slug && a.size === size && a.color === color;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist cart whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (product, options) => {
    const { size, color, quantity = 1 } = options ?? {};
    setItems((prev) => {
      const existing = prev.find((item) => sameLine(item, product.slug, size, color));
      if (existing) {
        return prev.map((item) =>
          sameLine(item, product.slug, size, color)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          image: product.images[0],
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (slug, size, color) => {
    setItems((prev) => prev.filter((item) => !sameLine(item, slug, size, color)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (slug, size, color, quantity) => {
    if (quantity < 1) {
      removeItem(slug, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (sameLine(item, slug, size, color) ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
