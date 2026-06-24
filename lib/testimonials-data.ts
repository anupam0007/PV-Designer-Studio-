import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

/** All testimonials — from Supabase if configured, otherwise the bundled list. */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return staticTestimonials;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: false }); // newest submissions first

  if (error || !data || data.length === 0) return staticTestimonials;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    rating: row.rating,
    review: row.review,
    image: row.image ?? undefined,
  }));
}

export async function getTestimonialById(id: number): Promise<Testimonial | undefined> {
  const all = await getAllTestimonials();
  return all.find((t) => t.id === id);
}
