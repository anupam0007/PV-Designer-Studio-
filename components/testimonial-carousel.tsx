"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-6xl">
      <CarouselContent>
        {testimonials.map((t) => (
          <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 sm:-left-4" />
      <CarouselNext className="right-0 sm:-right-4" />
    </Carousel>
  );
}
