"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/lib/site-settings-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const whatsappNumber = useWhatsAppNumber();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-semibold sm:text-3xl">Your cart is empty</h1>
        <p className="text-muted-foreground">Discover our handcrafted collections and add your favourites here.</p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const price = item.salePrice ?? item.price;
          const key = `${item.slug}-${item.size ?? ""}-${item.color ?? ""}`;
          return (
            <div
              key={key}
              className="flex gap-4 rounded-lg border border-border p-4"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-32 sm:w-24">
                <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-heading font-medium hover:text-primary">
                      {item.name}
                    </Link>
                    {(item.size || item.color) && (
                      <p className="text-xs text-muted-foreground">
                        {[item.size, item.color].filter(Boolean).join(" / ")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug, item.size, item.color)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-semibold text-primary">{formatPrice(price)}</p>
                <div className="mt-auto flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="hidden text-right font-semibold sm:block">
                {formatPrice(price * item.quantity)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t border-border pt-6">
        <div className="flex w-full justify-between text-lg sm:w-72">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-primary">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-right text-xs text-muted-foreground sm:w-72">
          Delivery & customization charges will be confirmed over WhatsApp.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-72">
          <Button asChild size="lg">
            <Link href={buildCartWhatsAppLink(items, subtotal, whatsappNumber)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Checkout on WhatsApp
            </Link>
          </Button>
          <Button variant="ghost" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
