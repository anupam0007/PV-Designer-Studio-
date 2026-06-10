// Category metadata used across the home page, navbar and shop pages.
// `slug` of "women" is a virtual aggregate category that includes
// blouses, gowns, lehengas and indo-western products.

import type { Product, ProductCategory } from "./products";

export interface Category {
  slug: ProductCategory | "women" | "offers";
  name: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    image: "/images/extra/extra-9.jpg",
    description: "Lehengas, gowns, blouses & Indo-Western fits",
  },
  {
    slug: "men",
    name: "Men",
    image: "/images/cat-men.jpg",
    description: "Sherwanis & Indo-Western styles",
  },
  {
    slug: "kids",
    name: "Kids",
    image: "/images/cat-kids.jpg",
    description: "Festive wear for little ones",
  },
  {
    slug: "blouses",
    name: "Blouses",
    image: "/images/cat-blouses.jpg",
    description: "Aari-work & bridal blouses, fully customizable",
  },
  {
    slug: "gowns",
    name: "Gowns",
    image: "/images/cat-gowns.jpg",
    description: "Designer gowns for every occasion",
  },
  {
    slug: "lehengas",
    name: "Lehengas",
    image: "/images/cat-lehengas.png",
    description: "Bridal & festive lehengas, handcrafted",
  },
  {
    slug: "indo-western",
    name: "Indo-Western",
    image: "/images/cat-indo-western.jpg",
    description: "A blend of tradition and modernity",
  },
  {
    slug: "offers",
    name: "Offers",
    image: "/images/new-arrival-1.jpg",
    description: "Limited-time deals on bestsellers",
  },
];

const womenSubCategories: ProductCategory[] = [
  "blouses",
  "gowns",
  "lehengas",
  "indo-western",
];

/** Returns the number of products belonging to a given category slug. */
export function getCategoryCount(products: Product[], slug: Category["slug"]): number {
  if (slug === "women") {
    return products.filter((p) => womenSubCategories.includes(p.category))
      .length;
  }
  if (slug === "offers") {
    return products.filter((p) => p.isOffer).length;
  }
  return products.filter((p) => p.category === slug).length;
}

export const featuredCategories = [
  {
    slug: "gowns" as const,
    name: "Gowns",
    tag: "Bestseller",
    image: "/images/featured-gown-1.jpg",
  },
  {
    slug: "lehengas" as const,
    name: "Lehengas",
    tag: "New Arrivals",
    image: "/images/featured-lehenga-1.jpg",
  },
  {
    slug: "blouses" as const,
    name: "Blouses",
    tag: "Customizable",
    image: "/images/featured-blouse-1.jpg",
  },
];
