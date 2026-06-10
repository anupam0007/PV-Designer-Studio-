import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getTestimonialById } from "@/lib/testimonials-data";
import { updateTestimonial } from "../../../actions";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured) return null;

  const { id } = await params;
  const testimonial = await getTestimonialById(Number(id));

  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Review</h1>
      <TestimonialForm testimonial={testimonial} action={action} />
    </div>
  );
}
