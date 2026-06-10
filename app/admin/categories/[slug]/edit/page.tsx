import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCategoryBySlug } from "@/lib/categories-data";
import { updateCategory } from "../../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSupabaseConfigured) return null;

  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const action = updateCategory.bind(null, category.slug);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Category — {category.name}</h1>
      <CategoryForm category={category} action={action} />
    </div>
  );
}
