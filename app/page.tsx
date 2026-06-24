import Image from "next/image";
import { Star } from "lucide-react";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ReviewForm } from "@/components/review-form";
import { getAllTestimonials } from "@/lib/testimonials-data";

export default async function HomePage() {
  const testimonials = await getAllTestimonials();

  return (
    <>
      <HeroSlideshow />

      {/* ── Review section — form first, then submitted reviews ── */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Submit a review */}
        <div className="mb-14">
          <div className="mb-6 text-center">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              Share Your Experience
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us how we did — your review may be featured on this page.
            </p>
          </div>
          <ReviewForm />
        </div>

        {/* Existing reviews */}
        {testimonials.length > 0 && (
          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 rounded-lg border bg-card p-5 shadow-sm"
                >
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {t.image && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="font-heading font-semibold">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
