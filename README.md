# PV Designer Studio — Website

A modern, fully responsive e-commerce website for **PV Designer Studio**
("Customize Your Charm") — a premium Indian ethnic-wear and bridal couture
boutique. Built with Next.js (App Router), TypeScript, Tailwind CSS, and
shadcn/ui. Cart and wishlist are stored locally in the browser; checkout is
handled via WhatsApp (no payment gateway required).

The product catalog can optionally be backed by **Supabase** (a free hosted
Postgres database), which also powers a password-protected `/admin` panel for
adding, editing, and deleting products without touching code. If Supabase
isn't configured, the site falls back to the static catalog in
`data/products.ts` automatically — so it works either way.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a custom brand theme (ivory / wine / gold / charcoal)
- **shadcn/ui** components + **lucide-react** icons
- React Context for cart & wishlist (persisted to `localStorage`)
- WhatsApp deep links for checkout, product enquiries, and contact
- **Supabase** (Postgres + Auth) for the product catalog and `/admin` panel — optional

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. If port
3000 is already in use, Next.js will automatically pick the next free port
(e.g. 3001) — check the terminal output for the exact URL.

### 3. Build for production

```bash
npm run build
npm start
```

`npm run build` generates static pages for the home page, shop, every
category, and every product, so the site is fast and SEO-friendly.

## Setting Up Supabase (Database + Admin Panel)

This is optional. Without it, the site uses the static product list in
`data/products.ts` and the `/admin` panel shows setup instructions instead of
a login form. Follow these steps to enable a real database and admin access.

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier is fine).
2. Click **New Project**, choose an organization, give it a name (e.g.
   `pv-designer-studio`), set a database password (save it somewhere safe),
   pick a region close to your customers, and click **Create new project**.
   Wait a minute or two for it to finish provisioning.

### 2. Create the `products` table

1. In your project's left sidebar, open **SQL Editor**.
2. Click **New query**.
3. Open [`supabase/schema.sql`](supabase/schema.sql) from this repo, copy its
   entire contents, paste it into the SQL editor, and click **Run**.
   This creates the `products` table with the right columns and security
   rules (anyone can read products; only signed-in users can add/edit/delete).

### 3. Get your API keys

1. In the left sidebar, go to **Project Settings** → **API**.
2. You'll need three values from this page:
   - **Project URL** (e.g. `https://xxxxxxxx.supabase.co`)
   - **anon / public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" — click "Reveal" to see it)

### 4. Configure environment variables

1. Copy [`.env.local.example`](.env.local.example) to a new file named
   `.env.local` in the project root.
2. Fill in the three values from step 3:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   `.env.local` is already excluded from git (via `.gitignore`), so these
   secrets won't be committed. **Never** share or commit the
   `service_role` key — it bypasses all security rules.
3. Restart the dev server (`npm run dev`) if it's already running, so it picks
   up the new environment variables.

### 5. Create your admin login

The admin panel uses Supabase Auth. There's no public sign-up page — you
create your own admin account directly in the dashboard:

1. In the left sidebar, go to **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter the email and password you want to use to log into `/admin`, and make
   sure **Auto Confirm User** is checked. Click **Create user**.

### 6. Import your existing content (optional)

To copy everything currently in `data/products.ts` into your new Supabase
table, run:

```bash
npx tsx --env-file=.env.local scripts/seed-supabase.ts
```

To also copy the existing testimonials, shop categories, studio locations,
home page hero slides, and contact details into the new
`testimonials` / `categories` / `locations` / `site_settings` tables, run:

```bash
npx tsx --env-file=.env.local scripts/seed-extra.ts
```

Both scripts are safe to re-run — they upsert by id/slug/key, so re-running
just updates existing rows instead of duplicating them.

### 7. Use the admin panel

1. Go to `/admin/login` (e.g. `http://localhost:3000/admin/login`) and sign in
   with the email/password from step 5.
2. The admin panel has a nav bar across the top with the following sections,
   all of which update the live storefront immediately:
   - **Products** (`/admin`) — add, edit, and delete products.
   - **Reviews** (`/admin/reviews`) — add, edit, and delete the customer
     testimonials shown on the home page and `/reviews`.
   - **Categories** (`/admin/categories`) — edit the name, description, and
     image of each "Shop by Category" tile on the home page.
   - **Locations** (`/admin/locations`) — add, edit, and delete the studio
     locations shown on the home page and `/contact` (the map embed is
     generated automatically from the address).
   - **Site Settings** (`/admin/settings`) — edit the home page hero carousel
     (image, headline, description, and button for each slide) and the site's
     contact details (email, WhatsApp number, phone numbers, and social media
     links used across the footer, contact page, and WhatsApp buttons).
3. Click **Sign Out** in the top-right to log out.

### Troubleshooting: "unable to verify the first certificate" / "fetch failed"

If sign-in or `scripts/seed-supabase.ts` fails with a TLS/certificate error
when talking to Supabase, your antivirus or company network is intercepting
HTTPS traffic with its own certificate (common with Avast, Cisco Umbrella,
Zscaler, etc.). To fix it:

1. Export that tool's root certificate to a `.pem` file inside a `certs/`
   folder in the project root. On Windows PowerShell, find it in the Trusted
   Root store and convert it, e.g.:
   ```powershell
   $c = Get-ChildItem Cert:\LocalMachine\Root | Where-Object { $_.Subject -match "Avast" }
   $b64 = [Convert]::ToBase64String($c.RawData, [System.Base64FormattingOptions]::InsertLineBreaks)
   "-----BEGIN CERTIFICATE-----`n$b64`n-----END CERTIFICATE-----" | Out-File certs/avast-root-ca.pem -Encoding ascii
   ```
2. Restart the dev server with `npm run dev` — `scripts/with-ca-cert.mjs`
   automatically detects any `.pem` file in `certs/` and points Node at it
   (this can't be done via `.env.local` because Node reads
   `NODE_EXTRA_CA_CERTS` before `.env.local` is loaded).
3. For `scripts/seed-supabase.ts`, run it the same way:
   `node scripts/with-ca-cert.mjs npx tsx --env-file=.env.local scripts/seed-supabase.ts`

## Project Structure

```
app/                  Pages (App Router)
  page.tsx              Home page
  shop/                 Shop (all products) + category pages
  product/[slug]/       Product detail pages
  cart/                 Cart page (WhatsApp checkout)
  wishlist/             Wishlist page
  about/                About page
  contact/              Contact page
  reviews/              Reviews page
  size-chart/           Size chart page
  admin/                Admin panel (product CRUD, login) — needs Supabase

components/           Shared UI components (navbar, footer, hero, cards, etc.)
components/ui/        shadcn/ui primitives (button, card, select, sheet, ...)
components/admin/     Admin panel form components

data/                 Site content — used as a fallback if Supabase isn't configured
  products.ts           Static product catalog
  categories.ts         Shop-by-category cards
  testimonials.ts       Customer reviews
  locations.ts          Studio locations, contact info, social links

lib/                  Helpers
  cart-context.tsx      Cart state (localStorage)
  wishlist-context.tsx  Wishlist state (localStorage)
  whatsapp.ts           WhatsApp link builders
  format.ts             Price formatting (INR)
  products-data.ts      Product data layer (Supabase, with static fallback)
  testimonials-data.ts  Reviews data layer (Supabase, with static fallback)
  categories-data.ts    Shop categories data layer (Supabase, with static fallback)
  locations-data.ts     Studio locations data layer (Supabase, with static fallback)
  site-settings-data.ts Hero carousel + contact details data layer (Supabase, with static fallback)
  supabase/              Supabase client setup

supabase/             SQL schema for the Supabase tables
scripts/              One-off scripts (e.g. seeding Supabase from data/*.ts)

public/images/        Logo, category, hero & lifestyle images
public/images/products/  Per-product photos (2-3 per product)
public/images/extra/  Extra lifestyle/product photos used as
                       additional gallery images, hero slides,
                       lookbook & Instagram-feed tiles
```

## Editing Products

If you've set up Supabase (see above), use the **`/admin`** panel to add,
edit, and delete products — changes appear on the live site immediately and
no code changes or redeploys are needed.

If you haven't set up Supabase, edit the static catalog in
[`data/products.ts`](data/products.ts) instead. Each product looks like this:

```ts
{
  id: 24,
  name: "New Saree Name",
  slug: "new-saree-name",          // used in the product URL: /product/new-saree-name
  category: "lehengas",            // one of: blouses | gowns | lehengas | indo-western | men | kids
  brand: "PV Designer Studio",
  price: 8999,
  salePrice: 6999,                 // optional — set to enable a "Sale" badge & strikethrough price
  sizes: ["S", "M", "L", "XL"],    // pick from SIZES in the same file
  colors: ["Maroon", "Gold"],      // optional
  images: [
    "/images/products/new-saree-name-1.jpg",
    "/images/products/new-saree-name-2.jpg",
  ],
  description: "A short, appealing description of the product...",
  isNew: true,        // optional — shows a "New" badge & appears in New Arrivals
  isBestseller: false,// optional — shows a "Bestseller" badge & appears in Best Sellers
  isOffer: false,     // optional — shows in "Offer of the Day" / /shop/offers (requires salePrice)
}
```

### To add a new product

1. Open `data/products.ts`.
2. Copy an existing product object and paste it at the end of the `products` array.
3. Update `id` (use the next unused number), `name`, `slug`, `category`, `price`, etc.
4. For images, drop real photos into `public/images/products/` (or
   `public/images/extra/` for general lifestyle shots) and reference them as
   `"/images/products/your-photo.jpg"`. Each product typically has 2-3 images;
   the first one is used as the primary thumbnail everywhere.
5. Save the file — the dev server will hot-reload automatically.

### To remove or edit a product

Find the product object by its `name` or `slug` and edit/delete it directly.
Removing a product automatically removes it from the shop, its category page,
and any "related products" sections.

### Other content files

If you've set up Supabase, all of the content below can also be edited live
from the **Site Settings**, **Reviews**, **Categories**, and **Locations**
sections of the `/admin` panel — no code changes needed. The files below are
only used as a fallback when Supabase isn't configured (or as the source for
`scripts/seed-extra.ts`):

- **`data/categories.ts`** — the images/labels shown in "Shop by Category" on
  the home page.
- **`data/testimonials.ts`** — customer reviews shown on the home page and
  `/reviews`.
- **`data/locations.ts`** — studio addresses (with Google Maps embeds), phone
  numbers, email, WhatsApp number, and social media links. Update
  `whatsappNumber` here to change where cart/enquiry messages are sent.
- **`components/hero.tsx`** — the `defaultHeroSlides` fallback in
  [`lib/site-settings-data.ts`](lib/site-settings-data.ts) controls the home
  page hero carousel images, headlines, and buttons.

## Notes

- Cart and wishlist data is stored in the visitor's browser (`localStorage`)
  — this data is per-device/browser regardless of whether Supabase is set up.
- The product catalog, reviews, shop categories, studio locations, hero
  carousel, and contact details all come from Supabase if
  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in
  `.env.local`, otherwise from the static files in `data/` and
  `lib/site-settings-data.ts`.
- "Checkout" sends an order summary as a pre-filled WhatsApp message to the
  configured WhatsApp number (editable via `/admin/settings`, or
  `data/locations.ts` if Supabase isn't set up).
- All images (hero, categories, products, lookbook, Instagram feed, about
  page) are real photos stored locally under `public/images/`, sourced from
  pvdesignerstudio.com. Swap any file in `public/images/products/` or
  `public/images/extra/` with your own photography at any time — just keep
  the same filename, or update the path in `data/products.ts` /
  `data/categories.ts` / `components/hero.tsx` / etc.
