"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const WOMEN_CATS = new Set(["blouses", "gowns", "lehengas", "indo-western"]);

const tabs = [
  { label: "All", value: "all" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
] as const;

function filterByTab(products: Product[], tab: string) {
  if (tab === "all") return products;
  if (tab === "women") return products.filter((p) => WOMEN_CATS.has(p.category));
  return products.filter((p) => p.category === tab);
}

export function DesignerGallery({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>("all");
  const filtered = filterByTab(products, active);

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-8 flex gap-0 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={cn(
              "px-5 pb-3 text-sm font-medium transition-colors",
              active === tab.value
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-muted-foreground">{filtered.length} designs</p>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/designer/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-opacity duration-500${
                  product.images.length > 1 ? " group-hover:opacity-0" : ""
                }`}
              />
              {product.images.length > 1 && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </div>
            <div className="mt-2 px-0.5">
              <p className="text-sm font-medium leading-snug">{product.name}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
