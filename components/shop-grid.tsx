"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Product, ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { FadeIn } from "@/components/fade-in";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryLabels: Record<ProductCategory, string> = {
  blouses: "Blouses",
  gowns: "Gowns",
  lehengas: "Lehengas",
  "indo-western": "Indo-Western",
  men: "Men",
  kids: "Kids",
};

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-3000", label: "Under ₹3,000" },
  { value: "3000-5000", label: "₹3,000 – ₹5,000" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000" },
  { value: "10000-100000", label: "Above ₹10,000" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopGrid({
  products,
  showCategoryFilter = true,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("newest");

  const availableCategories = useMemo(() => {
    const set = new Set<ProductCategory>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (showCategoryFilter && category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => {
        const price = p.salePrice ?? p.price;
        return price >= min && price <= max;
      });
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      default:
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
    }

    return result;
  }, [products, search, category, priceRange, sort, showCategoryFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pl-9"
            aria-label="Search products"
          />
        </div>

        {showCategoryFilter && (
          <Select
            value={category}
            onValueChange={(v) => setCategory((v ?? "all") as ProductCategory | "all")}
          >
            <SelectTrigger className="w-full sm:w-44" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {availableCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {categoryLabels[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select value={priceRange} onValueChange={(v) => setPriceRange(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Filter by price">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v ?? "newest")}>
          <SelectTrigger className="w-full sm:w-48" aria-label="Sort products">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No products found. Try adjusting your filters or search term.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <FadeIn key={product.id} delay={(i % 4) * 60}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
