import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchaseForm } from "@/components/product-purchase-form";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice, calculateDiscountPercent } from "@/lib/format";
import {
  getAllProducts,
  getProductBySlugAsync,
  getRelatedProductsAsync,
} from "@/lib/products-data";

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
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);

  if (!product) notFound();

  const related = await getRelatedProductsAsync(product);
  const onSale = product.salePrice !== undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
            {product.isBestseller && (
              <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
            )}
            {onSale && (
              <Badge variant="destructive">
                {calculateDiscountPercent(product.price, product.salePrice!)}% OFF
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>

          <div className="mt-4 flex items-center gap-3">
            {onSale ? (
              <>
                <span className="text-2xl font-semibold text-primary">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-semibold text-destructive">
                  {calculateDiscountPercent(product.price, product.salePrice!)}% off
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 border-t border-border pt-6">
            <ProductPurchaseForm product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading
            align="left"
            eyebrow="Complete the Look"
            title="You May Also Like"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
