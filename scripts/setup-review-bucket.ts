// One-time setup of the public Supabase Storage bucket used for photos
// customers attach to their reviews on /reviews.
//
// Usage:
//   node scripts/with-ca-cert.mjs npx tsx --env-file=.env.local scripts/setup-review-bucket.ts

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
  process.exit(1);
}

const BUCKET_ID = "review-images";

async function main() {
  const headers = {
    "Content-Type": "application/json",
    apikey: serviceRoleKey!,
    Authorization: `Bearer ${serviceRoleKey}`,
  };

  const existing = await fetch(`${url}/storage/v1/bucket/${BUCKET_ID}`, { headers });
  if (existing.ok) {
    console.log(`Bucket "${BUCKET_ID}" already exists.`);
    return;
  }

  const response = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: BUCKET_ID,
      name: BUCKET_ID,
      public: true,
      file_size_limit: 5 * 1024 * 1024,
      allowed_mime_types: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    }),
  });

  if (!response.ok) {
    console.error("Failed to create bucket:", response.status, await response.text());
    process.exit(1);
  }

  console.log(`Created public bucket "${BUCKET_ID}".`);
}

main();
