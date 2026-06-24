"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-4">
      <div className="img-zoom relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted sm:flex-1">
        <Image
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((image, i) => (
            <button
              key={image + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              aria-current={active === i}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:w-full",
                active === i ? "border-primary" : "border-transparent hover:border-border"
              )}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
