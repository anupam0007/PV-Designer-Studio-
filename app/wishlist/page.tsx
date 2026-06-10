"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { useWishlist } from "@/lib/wishlist-context";
import { getProductBySlug } from "@/data/products";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const items = slugs.map(getProductBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <Heart className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-semibold sm:text-3xl">Your wishlist is empty</h1>
        <p className="text-muted-foreground">Tap the heart icon on any product to save it for later.</p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">Your Wishlist</h1>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
