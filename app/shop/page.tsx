import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShopGrid } from "@/components/shop-grid";
import { categoryDisplayNames, shopCategorySlugs } from "@/data/products";
import { getAllProducts } from "@/lib/products-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop All Collections | PV Designer Studio",
  description:
    "Browse our full collection of handcrafted lehengas, gowns, bridal blouses, Indo-Western outfits, and men's & kids' wear.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Shop All Collections</h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} handcrafted designs, made just for you.
        </p>
      </div>

      {/* Category quick links */}
      <div className="mb-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <Link
          href="/shop"
          className={cn(
            "shrink-0 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
          )}
        >
          All ({products.length})
        </Link>
        {shopCategorySlugs
          .filter((slug) => slug !== "offers")
          .map((slug) => {
            const count = products.filter((p) => p.category === slug).length;
            return (
              <Link
                key={slug}
                href={`/shop/${slug}`}
                className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {categoryDisplayNames[slug]} ({count})
              </Link>
            );
          })}
      </div>

      <Suspense>
        <ShopGrid products={products} />
      </Suspense>
    </div>
  );
}
