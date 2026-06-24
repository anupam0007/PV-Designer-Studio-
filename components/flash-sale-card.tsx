"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export function FlashSaleCard({ product }: { product: Product }) {
  const hasSecondImage = product.images.length > 1;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-sm bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* Image area — 4:5, object-contain so full garment is always visible */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EC]">
        <div
          className={`absolute inset-2 transition-opacity duration-500${
            hasSecondImage ? " group-hover:opacity-0" : ""
          }`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
          />
        </div>
        {hasSecondImage && (
          <div className="absolute inset-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Name + brand only — price shown only on product detail page */}
      <div className="flex flex-1 flex-col gap-0.5 px-3 py-3">
        <p className="truncate text-sm font-medium leading-snug text-stone-800">
          {product.name}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
          {product.brand}
        </p>
      </div>
    </Link>
  );
}
