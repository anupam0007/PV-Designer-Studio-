"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { buildFlashSaleWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";
import { useWhatsAppNumber } from "@/lib/site-settings-context";
import { cn } from "@/lib/utils";

export function FlashSalePurchaseForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string>(product.sizes[0] ?? "M");
  const whatsappNumber = useWhatsAppNumber();

  const price = product.salePrice ?? product.price;

  function handleBuy() {
    const imageUrl = `${window.location.origin}${product.images[0]}`;
    const link = buildFlashSaleWhatsAppLink(
      product.name,
      size,
      formatPrice(price),
      imageUrl,
      whatsappNumber
    );
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Size selector */}
      <div>
        <p className="mb-2 text-sm font-medium">Size: {size}</p>
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
      </div>

      {/* WhatsApp buy button */}
      <Button
        size="lg"
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5d]"
        onClick={handleBuy}
      >
        <MessageCircle className="h-5 w-5" />
        Buy on WhatsApp
      </Button>
    </div>
  );
}
