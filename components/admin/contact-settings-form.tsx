"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactSettings } from "@/lib/site-settings-data";
import type { ActionState } from "@/app/admin/actions";

export function ContactSettingsForm({
  contact,
  action,
}: {
  contact: ContactSettings;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  const phonesText = contact.phones.map((p) => `${p.label} | ${p.number}`).join("\n");

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:max-w-lg">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Contact Email</Label>
        <Input id="email" name="email" type="email" required defaultValue={contact.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="whatsappNumber">WhatsApp Number (with country code, no +)</Label>
        <Input
          id="whatsappNumber"
          name="whatsappNumber"
          required
          defaultValue={contact.whatsappNumber}
          placeholder="918147505009"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phones">Phone Numbers (one per line: Label | Number)</Label>
        <Textarea
          id="phones"
          name="phones"
          rows={4}
          defaultValue={phonesText}
          placeholder="Founder — Chitra Murugaiyan | +91 72045 05009"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="instagram">Instagram URL</Label>
        <Input id="instagram" name="instagram" defaultValue={contact.instagram} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="facebook">Facebook URL</Label>
        <Input id="facebook" name="facebook" defaultValue={contact.facebook} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="youtube">YouTube URL</Label>
        <Input id="youtube" name="youtube" defaultValue={contact.youtube} />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Contact Info"}
        </Button>
      </div>
    </form>
  );
}
