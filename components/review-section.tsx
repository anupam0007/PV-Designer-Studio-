import Image from "next/image";
import { Star } from "lucide-react";
import { ReviewForm } from "@/components/review-form";
import { getAllTestimonials } from "@/lib/testimonials-data";

/** Full-width maroon review band — shown on every public page via the root layout. */
export async function ReviewSection() {
  const testimonials = await getAllTestimonials();

  return (
    <section
      style={{ backgroundColor: "#3D1018" }}
      className="w-full px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* ── Submit a review — form first ── */}
        <div className="mb-14">
          <div className="mb-6 text-center">
            <h2
              className="font-heading text-2xl font-semibold sm:text-3xl"
              style={{ color: "#F5E6C8" }}
            >
              Share Your Experience
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(245,230,200,0.65)" }}>
              Tell us how we did — your review may be featured on this page.
            </p>
          </div>

          {/* Form on dark background — white inputs, light labels */}
          <div
            className="mx-auto max-w-2xl rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ReviewForm dark />
          </div>
        </div>

        {/* ── Existing reviews ── */}
        {testimonials.length > 0 && (
          <div>
            <h2
              className="mb-6 font-heading text-2xl font-semibold sm:text-3xl"
              style={{ color: "#F5E6C8" }}
            >
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 rounded-lg p-5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating ? "fill-amber-400 text-amber-400" : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,230,200,0.8)" }}>
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {t.image && (
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                        <Image src={t.image} alt={t.name} fill sizes="36px" className="object-cover" />
                      </div>
                    )}
                    <p className="font-heading text-sm font-semibold" style={{ color: "#F5E6C8" }}>
                      {t.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
