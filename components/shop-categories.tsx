import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    label: "New Arrivals",
    sublabel: "Fresh Off The Workbench",
    href: "/new-arrivals",
    image: "/images/products/arrora-1.jpg",
    position: "object-top",
  },
  {
    label: "Designer",
    sublabel: "Full Collection",
    href: "/designer",
    image: "/images/products/luxe-velvet-1.jpg",
    position: "object-top",
  },
  {
    label: "Flash Sale",
    sublabel: "Limited Time Prices",
    href: "/flash-sale",
    image: "/images/extra/extra-1.jpg",
    position: "object-top",
  },
  {
    label: "Size Chart",
    sublabel: "Find Your Perfect Fit",
    href: "/size-chart",
    image: "/images/products/kanmani-1.jpg",
    position: "object-top",
  },
];

export function ShopCategories() {
  return (
    <section className="bg-[#FBF6EE] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400">
          Shop By
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              {/* Product image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={`object-cover ${cat.position} transition-transform duration-500 group-hover:scale-105`}
              />

              {/* Maroon gradient overlay — bottom heavy so image is clear at top */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #3D1018ee 0%, #3D101844 45%, transparent 70%)",
                }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p className="font-heading text-sm font-bold uppercase tracking-wider text-white sm:text-base">
                  {cat.label}
                </p>
                <p className="mt-0.5 text-[10px] text-white/65 sm:text-xs">
                  {cat.sublabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
