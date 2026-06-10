import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAllProducts } from "@/lib/products-data";
import { updateProduct } from "../../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured) return null;

  const { id } = await params;
  const products = await getAllProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>
      <ProductForm product={product} action={action} />
    </div>
  );
}
