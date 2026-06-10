"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { SiteSettingsProvider } from "@/lib/site-settings-context";

export function Providers({
  whatsappNumber,
  children,
}: {
  whatsappNumber: string;
  children: ReactNode;
}) {
  return (
    <SiteSettingsProvider whatsappNumber={whatsappNumber}>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SiteSettingsProvider>
  );
}
