import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAllTestimonials } from "@/lib/testimonials-data";
import { deleteTestimonial } from "../actions";

export default async function AdminReviewsPage() {
  if (!isSupabaseConfigured) return null;

  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">{testimonials.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/reviews/new">Add Review</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Review</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2">
                  {t.image ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted" />
                  )}
                </td>
                <td className="px-4 py-2 font-medium">{t.name}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent" />
                    ))}
                  </div>
                </td>
                <td className="max-w-sm px-4 py-2 text-muted-foreground">
                  <p className="line-clamp-2">{t.review}</p>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/reviews/${t.id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteTestimonial.bind(null, t.id)}>
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
