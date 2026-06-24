import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { DesignerPurchaseForm } from "@/components/designer-purchase-form";
import { getAllProducts, getProductBySlugAsync } from "@/lib/products-data";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return {};
  return {
    title: `${product.name} | PV Designer Studio`,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function DesignerProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {/* Badges (no sale badge — no prices shown on Designer) */}
          <div className="mb-2 flex flex-wrap gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
            )}
          </div>

          <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <DesignerPurchaseForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
