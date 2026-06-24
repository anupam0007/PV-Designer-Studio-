import { ReviewForm } from "@/components/review-form";
import { ReviewGrid } from "@/components/review-grid";
import { getAllTestimonials } from "@/lib/testimonials-data";

/** Full-width maroon review band — shown on every public page via the root layout. */
export async function ReviewSection() {
  const raw = await getAllTestimonials();

  // 5-star reviews first, then 4, 3, 2, 1
  const testimonials = [...raw].sort((a, b) => b.rating - a.rating);

  return (
    <section
      style={{ backgroundColor: "#3D1018" }}
      className="w-full px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">

        {/* ── Review form — first ── */}
        <div className="mb-14">
          <div className="mb-6 text-center">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl" style={{ color: "#F5E6C8" }}>
              Share Your Experience
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(245,230,200,0.65)" }}>
              Tell us how we did — your review may be featured on this page.
            </p>
          </div>
          <div
            className="mx-auto max-w-2xl rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ReviewForm dark />
          </div>
        </div>

        {/* ── Reviews — 3 shown by default, sorted 5★ first ── */}
        {testimonials.length > 0 && (
          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl" style={{ color: "#F5E6C8" }}>
              What Our Clients Say
            </h2>
            <ReviewGrid testimonials={testimonials} />
          </div>
        )}

      </div>
    </section>
  );
}
