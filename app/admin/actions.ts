"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ProductInsert } from "@/lib/supabase/database.types";

export interface ActionState {
  error?: string;
}

export async function signIn(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/** Verifies the request is from a signed-in admin before any write. */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
}

function parseProductForm(formData: FormData): Omit<ProductInsert, "id"> {
  const sizes = String(formData.get("sizes") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const colorsRaw = String(formData.get("colors") ?? "").trim();
  const colors = colorsRaw
    ? colorsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : null;

  const images = String(formData.get("images") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const salePriceRaw = String(formData.get("salePrice") ?? "").trim();

  return {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category: String(formData.get("category") ?? ""),
    brand: String(formData.get("brand") ?? ""),
    price: Number(formData.get("price") ?? 0),
    sale_price: salePriceRaw ? Number(salePriceRaw) : null,
    sizes,
    colors,
    images,
    description: String(formData.get("description") ?? ""),
    is_new: formData.get("isNew") === "on",
    is_bestseller: formData.get("isBestseller") === "on",
    is_offer: formData.get("isOffer") === "on",
  };
}

function revalidateStorefront() {
  revalidatePath("/", "layout");
}

export async function createProduct(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseProductForm(formData);

  const { data: maxRow } = await admin
    .from("products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextId = (maxRow?.id ?? 0) + 1;

  const { error } = await admin.from("products").insert({ id: nextId, ...fields });
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin");
}

export async function updateProduct(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseProductForm(formData);

  const { error } = await admin.from("products").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin");
}

export async function deleteProduct(id: number): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("products").delete().eq("id", id);
  revalidateStorefront();
  redirect("/admin");
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */

import type {
  TestimonialInsert,
  CategoryInsert,
  LocationInsert,
} from "@/lib/supabase/database.types";
import type { HeroSlide, ContactSettings } from "@/lib/site-settings-data";

function parseTestimonialForm(formData: FormData): Omit<TestimonialInsert, "id" | "sort_order"> {
  const image = String(formData.get("image") ?? "").trim();
  return {
    name: String(formData.get("name") ?? ""),
    rating: Number(formData.get("rating") ?? 5),
    review: String(formData.get("review") ?? ""),
    image: image || null,
  };
}

export async function createTestimonial(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseTestimonialForm(formData);

  const { data: maxRow } = await admin
    .from("testimonials")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextId = (maxRow?.id ?? 0) + 1;

  const { error } = await admin
    .from("testimonials")
    .insert({ id: nextId, sort_order: nextId, ...fields });
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/reviews");
}

export async function updateTestimonial(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseTestimonialForm(formData);

  const { error } = await admin.from("testimonials").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/reviews");
}

export async function deleteTestimonial(id: number): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("testimonials").delete().eq("id", id);
  revalidateStorefront();
  redirect("/admin/reviews");
}

/* ------------------------------------------------------------------ */
/* Categories (Shop by Category tiles)                                  */
/* ------------------------------------------------------------------ */

export async function updateCategory(
  slug: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("categories")
    .select("sort_order")
    .eq("slug", slug)
    .maybeSingle();

  const fields: CategoryInsert = {
    slug,
    name: String(formData.get("name") ?? ""),
    image: String(formData.get("image") ?? ""),
    description: String(formData.get("description") ?? ""),
    sort_order: existing?.sort_order ?? 0,
  };

  const { error } = await admin.from("categories").upsert(fields);
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/categories");
}

/* ------------------------------------------------------------------ */
/* Studio locations                                                     */
/* ------------------------------------------------------------------ */

function parseLocationForm(formData: FormData): Omit<LocationInsert, "id" | "sort_order"> {
  return {
    name: String(formData.get("name") ?? ""),
    address: String(formData.get("address") ?? ""),
  };
}

export async function createLocation(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseLocationForm(formData);

  const { data: maxRow } = await admin
    .from("locations")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextId = (maxRow?.id ?? 0) + 1;

  const { error } = await admin
    .from("locations")
    .insert({ id: nextId, sort_order: nextId, ...fields });
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/locations");
}

export async function updateLocation(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();
  const fields = parseLocationForm(formData);

  const { error } = await admin.from("locations").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/locations");
}

export async function deleteLocation(id: number): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("locations").delete().eq("id", id);
  revalidateStorefront();
  redirect("/admin/locations");
}

/* ------------------------------------------------------------------ */
/* Site settings (hero banner + contact info)                          */
/* ------------------------------------------------------------------ */

export async function updateHeroSettings(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();

  const slideCount = Number(formData.get("slideCount") ?? 0);
  const slides: HeroSlide[] = [];
  for (let i = 0; i < slideCount; i++) {
    slides.push({
      image: String(formData.get(`slide${i}_image`) ?? ""),
      eyebrow: String(formData.get(`slide${i}_eyebrow`) ?? ""),
      title: String(formData.get(`slide${i}_title`) ?? ""),
      description: String(formData.get(`slide${i}_description`) ?? ""),
      ctaLabel: String(formData.get(`slide${i}_ctaLabel`) ?? ""),
      ctaHref: String(formData.get(`slide${i}_ctaHref`) ?? ""),
    });
  }

  const { error } = await admin
    .from("site_settings")
    .upsert({ key: "hero", value: slides });
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/settings");
}

export async function updateContactSettings(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const admin = createAdminClient();

  const phones = String(formData.get("phones") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, number] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", number: number ?? "" };
    });

  const value: ContactSettings = {
    email: String(formData.get("email") ?? ""),
    whatsappNumber: String(formData.get("whatsappNumber") ?? ""),
    phones,
    instagram: String(formData.get("instagram") ?? ""),
    facebook: String(formData.get("facebook") ?? ""),
    youtube: String(formData.get("youtube") ?? ""),
  };

  const { error } = await admin
    .from("site_settings")
    .upsert({ key: "contact", value });
  if (error) return { error: error.message };

  revalidateStorefront();
  redirect("/admin/settings");
}
