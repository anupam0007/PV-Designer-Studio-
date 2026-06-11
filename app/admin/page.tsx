import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice, calculateDiscountPercent } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAllProducts } from "@/lib/products-data";
import { deleteProduct } from "./actions";

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured) return null;

  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2">
                  <div className="relative h-12 w-10 overflow-hidden rounded bg-muted">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 capitalize text-muted-foreground">
                  {product.category}
                </td>
                <td className="px-4 py-2">
                  {product.salePrice ? (
                    <>
                      <span className="font-medium text-primary">
                        {formatPrice(product.salePrice)}
                      </span>{" "}
                      <span className="text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    formatPrice(product.price)
                  )}
                </td>
                <td className="px-4 py-2">
                  {product.salePrice
                    ? `${calculateDiscountPercent(product.price, product.salePrice)}% off`
                    : "—"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <Button type="submit" size="sm" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
