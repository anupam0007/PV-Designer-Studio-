import { ProductForm } from "@/components/admin/product-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createProduct } from "../../actions";

export default function NewProductPage() {
  if (!isSupabaseConfigured) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
