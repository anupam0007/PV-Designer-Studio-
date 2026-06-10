import { MapPin } from "lucide-react";
import type { StudioLocation } from "@/data/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudioLocations({ locations }: { locations: StudioLocation[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {locations.map((location) => (
        <Card key={location.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-start gap-2 font-heading text-lg">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>{location.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{location.address}</p>
            <div className="aspect-video w-full overflow-hidden rounded-md border border-border">
              <iframe
                src={location.mapEmbedUrl}
                title={`Map showing ${location.name}`}
                loading="lazy"
                className="h-full w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
