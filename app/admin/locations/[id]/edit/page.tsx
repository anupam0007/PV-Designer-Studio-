import { notFound } from "next/navigation";
import { LocationForm } from "@/components/admin/location-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocationById } from "@/lib/locations-data";
import { updateLocation } from "../../../actions";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured) return null;

  const { id } = await params;
  const location = await getLocationById(Number(id));

  if (!location) notFound();

  const action = updateLocation.bind(null, location.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Location</h1>
      <LocationForm location={location} action={action} />
    </div>
  );
}
