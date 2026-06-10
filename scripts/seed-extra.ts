// One-time import of testimonials, categories, locations and site settings
// (hero banner + contact info) into Supabase.
//
// Usage:
//   1. Run supabase/schema.sql in your Supabase project's SQL editor.
//   2. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set
//      (they're read from .env.local automatically).
//   3. node scripts/with-ca-cert.mjs npx tsx --env-file=.env.local scripts/seed-extra.ts

import { testimonials } from "../data/testimonials";
import { categories } from "../data/categories";
import { locations } from "../data/locations";
import { defaultHeroSlides, defaultContactSettings } from "../lib/site-settings-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
  process.exit(1);
}

async function upsert(table: string, rows: unknown[]) {
  const response = await fetch(`${url}/rest/v1/${table}`, {
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
    console.error(`Seed failed for ${table}:`, response.status, await response.text());
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} row(s) into ${table}.`);
}

async function main() {
  await upsert(
    "testimonials",
    testimonials.map((t, i) => ({
      id: t.id,
      name: t.name,
      rating: t.rating,
      review: t.review,
      sort_order: i,
    }))
  );

  await upsert(
    "categories",
    categories.map((c, i) => ({
      slug: c.slug,
      name: c.name,
      image: c.image,
      description: c.description,
      sort_order: i,
    }))
  );

  await upsert(
    "locations",
    locations.map((l, i) => ({
      id: l.id,
      name: l.name,
      address: l.address,
      sort_order: i,
    }))
  );

  await upsert("site_settings", [
    { key: "hero", value: defaultHeroSlides },
    { key: "contact", value: defaultContactSettings },
  ]);
}

main();
