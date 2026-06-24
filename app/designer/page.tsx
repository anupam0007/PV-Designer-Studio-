import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products-data";
import { DesignerGallery } from "@/components/designer-gallery";

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
          Click any piece to enquire via WhatsApp
        </p>
      </div>

      {/* Gallery with Men / Women / Kids filter */}
      <DesignerGallery products={products} />
    </div>
  );
}
