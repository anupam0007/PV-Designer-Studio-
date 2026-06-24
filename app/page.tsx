import { getAllProducts } from "@/lib/products-data";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { FlashSaleCard } from "@/components/flash-sale-card";

export default async function FlashSalePage() {
  const allProducts = await getAllProducts();
  const saleProducts = allProducts.filter((p) => p.salePrice !== undefined);
  const displayProducts = saleProducts.length > 0 ? saleProducts : allProducts;

  return (
    <>
      {/* Full-viewport hero slideshow */}
      <HeroSlideshow />

      {/* Product grid */}
      <div id="products" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-border pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Limited Time
          </p>
          <h2 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
            Flash Sale — {displayProducts.length} Pieces
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
