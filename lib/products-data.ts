import {
  products as staticProducts,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import type { ProductRow } from "@/lib/supabase/database.types";

/** Converts a Supabase `products` row into the shape the UI expects. */
function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as ProductCategory,
    brand: row.brand as Product["brand"],
    price: row.price,
    salePrice: row.sale_price ?? undefined,
    sizes: row.sizes,
    colors: row.colors ?? undefined,
    images: row.images,
    description: row.description,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
    isOffer: row.is_offer,
  };
}

/** All products — from Supabase if configured, otherwise the bundled catalog. */
export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return staticProducts;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error || !data) return staticProducts;
  return data.map(fromRow);
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getRelatedProductsAsync(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  if (sameCategory.length === 0) {
    // last resort: anything from another category
    return products.filter((p) => p.id !== product.id).slice(0, limit);
  }

  // Prioritise products that share at least one colour with the current product
  const productColors = (product.colors ?? []).map((c) => c.toLowerCase());
  const scored = sameCategory.map((p) => {
    const overlap = (p.colors ?? []).filter((c) =>
      productColors.includes(c.toLowerCase())
    ).length;
    return { p, overlap };
  });
  scored.sort((a, b) => b.overlap - a.overlap);
  return scored.slice(0, limit).map((x) => x.p);
}

/** Products for a /shop/[category] route, including the special "offers" slug. */
export async function getProductsForShopCategoryAsync(slug: string): Promise<Product[] | undefined> {
  const products = await getAllProducts();
  if (slug === "offers") return products.filter((p) => p.isOffer);
  if (["blouses", "gowns", "lehengas", "indo-western", "men", "kids"].includes(slug)) {
    return products.filter((p) => p.category === (slug as ProductCategory));
  }
  return undefined;
}
