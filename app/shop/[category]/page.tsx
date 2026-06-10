import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop-grid";
import { categoryDisplayNames, shopCategorySlugs } from "@/data/products";
import { getAllProducts, getProductsForShopCategoryAsync } from "@/lib/products-data";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return shopCategorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = categoryDisplayNames[category as keyof typeof categoryDisplayNames];
  if (!name) return {};
  return {
    title: `${name} | PV Designer Studio`,
    description: `Shop our handcrafted ${name.toLowerCase()} collection at PV Designer Studio — bespoke ethnic wear with worldwide delivery.`,
  };
}

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const [items, products] = await Promise.all([
    getProductsForShopCategoryAsync(category),
    getAllProducts(),
  ]);

  if (!items) notFound();

  const name = categoryDisplayNames[category as keyof typeof categoryDisplayNames];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">{name}</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length} {items.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Category quick links */}
      <div className="mb-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <Link
          href="/shop"
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          All ({products.length})
        </Link>
        {shopCategorySlugs
          .filter((slug) => slug !== "offers")
          .map((slug) => {
            const count = products.filter((p) => p.category === slug).length;
            const active = slug === category;
            return (
              <Link
                key={slug}
                href={`/shop/${slug}`}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                )}
              >
                {categoryDisplayNames[slug]} ({count})
              </Link>
            );
          })}
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          We&apos;re adding new pieces to this collection soon. In the meantime,{" "}
          <a href="/shop" className="text-primary underline">
            browse all collections
          </a>
          .
        </p>
      ) : (
        <Suspense>
          <ShopGrid products={items} showCategoryFilter={false} />
        </Suspense>
      )}
    </div>
  );
}
