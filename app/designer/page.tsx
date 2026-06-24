import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Designer Collection | PV Designer Studio",
  description:
    "Browse the complete PV Designer Studio designer collection — bespoke bridal lehengas, gowns, blouses and more. Enquire via WhatsApp.",
};

export default async function DesignerPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Full Collection
        </p>
        <h1 className="mt-1 font-heading text-3xl font-semibold sm:text-4xl">Designer</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length} designs — click any piece to enquire via WhatsApp
        </p>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
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
