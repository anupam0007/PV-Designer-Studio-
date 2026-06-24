import { getAllProducts } from "@/lib/products-data";
import { FlashSaleCard } from "@/components/flash-sale-card";

export default async function FlashSalePage() {
  const allProducts = await getAllProducts();
  const saleProducts = allProducts.filter((p) => p.salePrice !== undefined);
  const displayProducts = saleProducts.length > 0 ? saleProducts : allProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Limited Time
        </p>
        <h1 className="mt-1 font-heading text-3xl font-semibold sm:text-4xl">Flash Sale</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {displayProducts.length} pieces at special prices — order via WhatsApp
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {displayProducts.map((product) => (
          <FlashSaleCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
