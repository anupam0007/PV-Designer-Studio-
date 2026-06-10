import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAllLocations } from "@/lib/locations-data";
import { deleteLocation } from "../actions";

export default async function AdminLocationsPage() {
  if (!isSupabaseConfigured) return null;

  const locations = await getAllLocations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Studio Locations</h1>
          <p className="mt-1 text-sm text-muted-foreground">{locations.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/locations/new">Add Location</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2 font-medium">{loc.name}</td>
                <td className="max-w-md px-4 py-2 text-muted-foreground">
                  <p className="line-clamp-2">{loc.address}</p>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/locations/${loc.id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteLocation.bind(null, loc.id)}>
                      <Button type="submit" size="sm" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
