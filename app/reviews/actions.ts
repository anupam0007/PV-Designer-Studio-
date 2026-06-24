"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ActionState } from "@/app/admin/actions";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Lets a customer submit a review (with an optional photo) from /reviews. */
export async function submitReview(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!isSupabaseConfigured) {
    return { error: "Reviews aren't accepting submissions right now. Please try again later." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const review = String(formData.get("review") ?? "").trim();
  const rating = Math.min(5, Math.max(1, Number(formData.get("rating") ?? 5)));
  const photo = formData.get("image");

  if (!name) {
    return { error: "Please enter your name." };
  }

  const admin = createAdminClient();

  let imageUrl: string | null = null;
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_IMAGE_BYTES) {
      return { error: "Photo is too large (max 5MB)." };
    }

    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await admin.storage
      .from("review-images")
      .upload(path, photo, { contentType: photo.type, upsert: false });

    if (uploadError) return { error: uploadError.message };

    imageUrl = admin.storage.from("review-images").getPublicUrl(path).data.publicUrl;
  }

  const { data: maxRow } = await admin
    .from("testimonials")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextId = (maxRow?.id ?? 0) + 1;

  const { error } = await admin.from("testimonials").insert({
    id: nextId,
    name,
    rating,
    review,
    image: imageUrl,
    sort_order: nextId,
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return {};
}
