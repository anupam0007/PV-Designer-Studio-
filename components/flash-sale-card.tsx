"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice, calculateDiscountPercent } from "@/lib/format";

export function FlashSaleCard({ product }: { product: Product }) {
  const hasSecondImage = product.images.length > 1;
  const discountPct = product.salePrice
    ? calculateDiscountPercent(product.price, product.salePrice)
    : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-sm bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* ── Image area: fixed 4:5, object-contain so the FULL garment is always visible ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EC]">
        {/* Primary image */}
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

        {/* Secondary image (hover) */}
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

        {/* Discount badge */}
        {discountPct !== null && (
          <span className="absolute left-2 top-2 rounded-sm bg-rose-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            -{discountPct}%
          </span>
        )}
      </div>

      {/* ── Info strip: same height on every card ── */}
      <div className="flex flex-1 flex-col gap-0.5 px-3 py-3">
        <p className="truncate text-sm font-medium leading-snug text-stone-800">
          {product.name}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
          {product.brand}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {product.salePrice !== undefined ? (
            <>
              <span className="text-sm font-semibold text-stone-800">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-stone-800">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
