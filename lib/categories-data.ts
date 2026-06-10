import { categories as staticCategories, type Category } from "@/data/categories";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

/** "Shop by Category" tiles — from Supabase if configured, otherwise the bundled list. */
export async function getAllCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return staticCategories;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return staticCategories;
  return data.map((row) => ({
    slug: row.slug as Category["slug"],
    name: row.name,
    image: row.image,
    description: row.description,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug);
}
