"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function FlashSaleCard({ product }: { product: Product }) {
  const hasSecondImage = product.images.length > 1;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image with hover swap */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-500${hasSecondImage ? " group-hover:opacity-0" : ""}`}
        />
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Info */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="text-sm font-medium leading-snug">{product.name}</p>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        {product.salePrice !== undefined ? (
          <div className="flex items-center gap-2 pt-0.5 text-sm">
            <span className="font-semibold text-primary">{formatPrice(product.salePrice)}</span>
            <span className="text-muted-foreground line-through">{formatPrice(product.price)}</span>
          </div>
        ) : (
          <p className="pt-0.5 text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
        )}
      </div>
    </Link>
  );
}
