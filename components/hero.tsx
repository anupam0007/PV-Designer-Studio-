"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { HeroSlide } from "@/lib/site-settings-data";

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} className="relative" opts={{ loop: true }}>
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.title} className="pl-0">
            <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden sm:h-[90vh] sm:min-h-[680px] lg:max-h-[820px]">
              {/* Blurred, zoomed backdrop fills the whole banner */}
              <Image
                src={slide.image}
                alt=""
                aria-hidden
                fill
                priority={index === 0}
                sizes="100vw"
                className="scale-110 object-cover object-center blur-2xl brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/40" />

              {/* Content row: text on the left, full uncropped photo on the right */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
                <div className="max-w-xl text-center text-white reveal lg:flex-1 lg:text-left">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    {slide.eyebrow}
                  </span>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-sm text-white/85 sm:text-lg">{slide.description}</p>
                  <Button asChild size="lg" className="mt-6">
                    <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                  </Button>
                </div>

                {/* Full, uncropped product photo */}
                <div className="relative h-[55vh] min-h-[320px] w-full max-w-sm flex-1 drop-shadow-2xl sm:h-[60vh] lg:h-full lg:max-h-[760px] lg:max-w-md">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 hidden sm:flex" />
      <CarouselNext className="right-4 hidden sm:flex" />
    </Carousel>
  );
}
