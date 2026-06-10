// One-time import of data/products.ts into the Supabase `products` table.
//
// Usage:
//   1. Run supabase/schema.sql in your Supabase project's SQL editor.
//   2. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set
//      (they're read from .env.local automatically).
//   3. npx tsx --env-file=.env.local scripts/seed-supabase.ts

import { products } from "../data/products";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
  process.exit(1);
}

const rows = products.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  category: p.category,
  brand: p.brand,
  price: p.price,
  sale_price: p.salePrice ?? null,
  sizes: p.sizes,
  colors: p.colors ?? null,
  images: p.images,
  description: p.description,
  is_new: Boolean(p.isNew),
  is_bestseller: Boolean(p.isBestseller),
  is_offer: Boolean(p.isOffer),
}));

async function main() {
  const response = await fetch(`${url}/rest/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey!,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    console.error("Seed failed:", response.status, await response.text());
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} products into Supabase.`);
}

main();

