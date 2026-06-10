import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAllCategories } from "@/lib/categories-data";

export default async function AdminCategoriesPage() {
  if (!isSupabaseConfigured) return null;

  const categories = await getAllCategories();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the name, description and image shown on the home page&apos;s &quot;Shop by
          Category&quot; tiles.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-2">
                  <div className="relative h-12 w-12 overflow-hidden rounded bg-muted">
                    <Image src={cat.image} alt={cat.name} fill sizes="48px" className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-2 font-medium">{cat.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{cat.description}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/categories/${cat.slug}/edit`}>Edit</Link>
                    </Button>
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
