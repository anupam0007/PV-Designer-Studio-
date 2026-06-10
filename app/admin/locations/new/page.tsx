import { LocationForm } from "@/components/admin/location-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createLocation } from "../../actions";

export default function NewLocationPage() {
  if (!isSupabaseConfigured) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Location</h1>
      <LocationForm action={createLocation} />
    </div>
  );
}
