import { locations as staticLocations, type StudioLocation } from "@/data/locations";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

export function buildMapEmbedUrl(address: string): string {
  return "https://www.google.com/maps?q=" + encodeURIComponent(address) + "&output=embed";
}

/** Studio locations — from Supabase if configured, otherwise the bundled list. */
export async function getAllLocations(): Promise<StudioLocation[]> {
  if (!isSupabaseConfigured) return staticLocations;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return staticLocations;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    mapEmbedUrl: buildMapEmbedUrl(row.address),
  }));
}

export async function getLocationById(id: number): Promise<StudioLocation | undefined> {
  const all = await getAllLocations();
  return all.find((l) => l.id === id);
}
