import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTestimonials } from "@/lib/testimonials-data";
import { ReviewForm } from "@/components/review-form";

export const metadata: Metadata = {
  title: "Customer Reviews | PV Designer Studio",
  description:
    "Read what our 700+ Google reviewers and 20 lakh+ customers say about PV Designer Studio's bespoke bridal lehengas, gowns and blouses.",
};

export default async function ReviewsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          700+ Google Reviews
        </span>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">What Our Clients Say</h1>
        <p className="mt-2 text-muted-foreground">
          Loved by 20 lakh+ customers across the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.id} className="h-full">
            <CardContent className="flex h-full flex-col gap-3 p-6">
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
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <p className="font-heading font-semibold">{t.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Share Your Experience</h2>
          <p className="mt-2 text-muted-foreground">
            Tell us how we did — your review may be featured on this page.
          </p>
        </div>
        <ReviewForm />
      </div>
    </div>
  );
}
