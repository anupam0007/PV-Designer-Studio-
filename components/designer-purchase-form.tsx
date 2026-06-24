"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { buildDesignerWhatsAppLink } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/lib/site-settings-context";
import { cn } from "@/lib/utils";

export function DesignerPurchaseForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string>(product.sizes[0] ?? "M");
  const [qty, setQty] = useState(1);
  const whatsappNumber = useWhatsAppNumber();

  function handleEnquire() {
    const imageUrl = `${window.location.origin}${product.images[0]}`;
    const link = buildDesignerWhatsAppLink(product.name, size, qty, imageUrl, whatsappNumber);
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

      {/* Quantity selector */}
      <div>
        <p className="mb-2 text-sm font-medium">Quantity</p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-base font-semibold">{qty}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* WhatsApp enquire button */}
      <Button
        size="lg"
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5d]"
        onClick={handleEnquire}
      >
        <MessageCircle className="h-5 w-5" />
        Enquire on WhatsApp
      </Button>
    </div>
  );
}
