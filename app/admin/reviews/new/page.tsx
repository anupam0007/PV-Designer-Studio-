import { TestimonialForm } from "@/components/admin/testimonial-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createTestimonial } from "../../actions";

export default function NewReviewPage() {
  if (!isSupabaseConfigured) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Review</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
