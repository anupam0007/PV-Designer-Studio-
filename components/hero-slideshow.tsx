"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  "/images/extra/extra-1.jpg",
  "/images/products/arrora-1.jpg",
  "/images/products/lavender-elegance-1.jpg",
  "/images/products/green-orchid-1.jpg",
  "/images/products/wisteria-1.jpg",
  "/images/products/luxe-velvet-1.jpg",
  "/images/products/hibiscus-charm-1.jpg",
  "/images/extra/extra-7.jpg",
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[88vh] w-full overflow-hidden">
      {/* Images */}
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-400 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="PV Designer Studio Flash Sale"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          Limited Time
        </p>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          FLASH SALE
        </h1>
        <p className="mt-4 text-base text-white/80 sm:text-lg">
          Handcrafted designer pieces at special prices
        </p>
        <Link
          href="/flash-sale"
          className="mt-10 inline-block border border-white px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-white hover:text-black"
        >
          Shop Now
        </Link>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
