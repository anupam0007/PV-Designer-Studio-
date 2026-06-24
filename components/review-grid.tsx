"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function ReviewGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? testimonials : testimonials.slice(0, 3);
  const hasMore = testimonials.length > 3;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
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
            <p
              className="flex-1 text-sm leading-relaxed"
              style={{ color: "rgba(245,230,200,0.8)" }}
            >
              &ldquo;{t.review || "—"}&rdquo;
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

      {/* Show more / show less */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border px-7 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: "rgba(245,230,200,0.35)",
              color: "#F5E6C8",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(245,230,200,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
          >
            {showAll
              ? "Show Less"
              : `More Reviews (${testimonials.length - 3} more)`}
          </button>
        </div>
      )}
    </div>
  );
}
