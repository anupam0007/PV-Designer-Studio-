"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

interface WishlistContextValue {
  slugs: string[];
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "pv-designer-studio-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setSlugs(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const isWishlisted = (slug: string) => slugs.includes(slug);

  const toggleWishlist = (product: Product) => {
    setSlugs((prev) =>
      prev.includes(product.slug)
        ? prev.filter((s) => s !== product.slug)
        : [...prev, product.slug]
    );
  };

  const removeFromWishlist = (slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  };

  return (
    <WishlistContext.Provider
      value={{ slugs, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
