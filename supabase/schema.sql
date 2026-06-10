-- PV Designer Studio: products table + access policies.
-- Run this once in your Supabase project's SQL editor (Dashboard -> SQL Editor -> New query).

create table if not exists public.products (
  id integer primary key,
  name text not null,
  slug text not null unique,
  category text not null,
  brand text not null,
  price integer not null,
  sale_price integer,
  sizes text[] not null default '{}',
  colors text[],
  images text[] not null default '{}',
  description text not null default '',
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_offer boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);

alter table public.products enable row level security;

-- Anyone (including the public storefront) can read products.
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- Only signed-in users (the studio admin) can add, edit, or delete products.
-- Admin accounts are created manually in Supabase Dashboard -> Authentication -> Users;
-- there is no public sign-up form on the site.
drop policy if exists "Authenticated users manage products" on public.products;
create policy "Authenticated users manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Customer testimonials/reviews shown on the home page and /reviews.
create table if not exists public.testimonials (
  id integer primary key,
  name text not null,
  rating integer not null default 5,
  review text not null,
  image text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Add the image column if this table already existed from an earlier setup.
alter table public.testimonials add column if not exists image text;

alter table public.testimonials enable row level security;

drop policy if exists "Testimonials are publicly readable" on public.testimonials;
create policy "Testimonials are publicly readable"
  on public.testimonials for select
  using (true);

drop policy if exists "Authenticated users manage testimonials" on public.testimonials;
create policy "Authenticated users manage testimonials"
  on public.testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- "Shop by Category" tiles shown on the home page.
create table if not exists public.categories (
  slug text primary key,
  name text not null,
  image text not null,
  description text not null default '',
  sort_order integer not null default 0
);

alter table public.categories enable row level security;

drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

drop policy if exists "Authenticated users manage categories" on public.categories;
create policy "Authenticated users manage categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Studio locations shown on the home page and /contact.
create table if not exists public.locations (
  id integer primary key,
  name text not null,
  address text not null,
  sort_order integer not null default 0
);

alter table public.locations enable row level security;

drop policy if exists "Locations are publicly readable" on public.locations;
create policy "Locations are publicly readable"
  on public.locations for select
  using (true);

drop policy if exists "Authenticated users manage locations" on public.locations;
create policy "Authenticated users manage locations"
  on public.locations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Generic key/value store for editable site content (hero banner, contact info).
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null
);

alter table public.site_settings enable row level security;

drop policy if exists "Site settings are publicly readable" on public.site_settings;
create policy "Site settings are publicly readable"
  on public.site_settings for select
  using (true);

drop policy if exists "Authenticated users manage site settings" on public.site_settings;
create policy "Authenticated users manage site settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
