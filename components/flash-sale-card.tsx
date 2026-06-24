"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export function FlashSaleCard({ product }: { product: Product }) {
  const hasSecondImage = product.images.length > 1;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image with hover swap — object-top shows face + outfit from the top */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-top transition-opacity duration-500${
            hasSecondImage ? " group-hover:opacity-0" : ""
          }`}
        />
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Name + brand only — NO price on cards */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="text-sm font-medium leading-snug">{product.name}</p>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
      </div>
    </Link>
  );
}
