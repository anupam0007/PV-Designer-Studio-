import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { FlashSalePurchaseForm } from "@/components/flash-sale-purchase-form";
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
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, similar] = await Promise.all([
    getProductBySlugAsync(slug),
    getProductBySlugAsync(slug).then((p) =>
      p ? getRelatedProductsAsync(p, 4) : []
    ),
  ]);

  if (!product) notFound();

  const onSale = product.salePrice !== undefined;
  const discountPct = onSale
    ? calculateDiscountPercent(product.price, product.salePrice!)
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Main product grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {/* Badges */}
          <div className="mb-2 flex flex-wrap gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
            )}
            {discountPct !== null && (
              <Badge variant="destructive">-{discountPct}% OFF</Badge>
            )}
          </div>

          <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            {onSale ? (
              <>
                <span className="text-2xl font-semibold text-primary">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-semibold text-destructive">
                  {discountPct}% off
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <FlashSalePurchaseForm product={product} />
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {similar.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 font-heading text-xl font-semibold">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {similar.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#F5F1EC]">
                  <div className="absolute inset-1.5">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                    />
                  </div>
                </div>
                <p className="mt-2 truncate text-sm font-medium text-stone-800">{p.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.brand}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
