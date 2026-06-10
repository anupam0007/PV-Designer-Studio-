"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StudioLocation } from "@/data/locations";
import type { ActionState } from "@/app/admin/actions";

export function LocationForm({
  location,
  action,
}: {
  location?: StudioLocation;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:max-w-lg">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Studio Name</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={location?.name}
          placeholder="PV Designer Studio — Jayanagar"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" required rows={3} defaultValue={location?.address} />
        <p className="text-xs text-muted-foreground">
          The Google Maps embed is generated automatically from this address.
        </p>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : location ? "Save Changes" : "Add Location"}
        </Button>
      </div>
    </form>
  );
}
