import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products-data";
import { FlashSaleCard } from "@/components/flash-sale-card";

export const metadata: Metadata = {
  title: "Flash Sale | PV Designer Studio",
  description:
    "Shop limited-time offers on handcrafted bridal lehengas, designer gowns and blouses at PV Designer Studio.",
};

export default async function FlashSaleProductsPage() {
  const allProducts = await getAllProducts();
  const saleProducts = allProducts.filter((p) => p.salePrice !== undefined);
  const displayProducts = saleProducts.length > 0 ? saleProducts : allProducts;

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
        <div className="mb-8 pb-5 border-b border-black/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Limited Time
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold text-stone-800 sm:text-3xl">
            Flash Sale —{" "}
            <span className="font-normal text-stone-500">
              {displayProducts.length} pieces
            </span>
          </h1>
        </div>

        {/* Even 2 / 3 / 4-column grid, consistent gaps */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {displayProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
