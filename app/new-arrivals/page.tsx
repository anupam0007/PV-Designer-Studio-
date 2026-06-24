import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products-data";
import { FlashSaleCard } from "@/components/flash-sale-card";

export const metadata: Metadata = {
  title: "New Arrivals | PV Designer Studio",
  description:
    "Shop the latest handcrafted lehengas, gowns and blouses — freshly added to the PV Designer Studio collection.",
};

export default async function NewArrivalsPage() {
  const allProducts = await getAllProducts();
  const newArrivals = allProducts.filter((p) => p.isNew);
  const displayProducts = newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 12);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #FBF6EE 0%, #F6E7E1 50%, #EFE9F3 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-black/10 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Just In
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold text-stone-800 sm:text-3xl">
            New Arrivals{" "}
            <span className="font-normal text-stone-500">
              — {displayProducts.length} pieces
            </span>
          </h1>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {displayProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
