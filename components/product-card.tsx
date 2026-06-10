"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.slug);
  const onSale = product.salePrice !== undefined;

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="img-zoom relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {product.isBestseller && (
            <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
          )}
          {onSale && <Badge variant="destructive">Sale</Badge>}
        </div>
      </Link>

      {/* Wishlist toggle */}
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
      >
        <Heart className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")} />
      </button>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <Link href={`/product/${product.slug}`} className="font-heading text-base font-medium leading-snug hover:text-primary">
          {product.name}
        </Link>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        <div className="mt-1 flex items-center gap-2">
          {onSale ? (
            <>
              <span className="font-semibold text-primary">{formatPrice(product.salePrice!)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
          )}
        </div>
        <Button asChild size="sm" variant="outline" className="mt-2 w-full">
          <Link href={`/product/${product.slug}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
