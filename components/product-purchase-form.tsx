"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { buildProductEnquiryLink } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/lib/site-settings-context";
import { cn } from "@/lib/utils";

export function ProductPurchaseForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const whatsappNumber = useWhatsAppNumber();

  const wishlisted = isWishlisted(product.slug);

  function handleAddToCart() {
    addItem(product, { size, color, quantity });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Size selector */}
      <div>
        <p className="mb-2 text-sm font-medium">
          Size{size ? `: ${size}` : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={cn(
                "min-w-11 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                size === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Need a custom fit? We take measurements via virtual consultation —{" "}
          <Link href="/size-chart" className="underline">
            view size chart
          </Link>
          .
        </p>
      </div>

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">
            Colour{color ? `: ${color}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-pressed={color === c}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                  color === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="mb-2 text-sm font-medium">Quantity</p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")} />
          {wishlisted ? "Wishlisted" : "Add to Wishlist"}
        </Button>
      </div>

      <Button asChild size="lg" variant="secondary" className="w-full">
        <Link
          href={buildProductEnquiryLink(product.name, whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
        </Link>
      </Button>
    </div>
  );
}
