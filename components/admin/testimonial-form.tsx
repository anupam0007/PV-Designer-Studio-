"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Testimonial } from "@/data/testimonials";
import type { ActionState } from "@/app/admin/actions";

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:max-w-lg">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Customer Name</Label>
        <Input id="name" name="name" required defaultValue={testimonial?.name} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rating">Rating</Label>
        <Select name="rating" defaultValue={String(testimonial?.rating ?? 5)}>
          <SelectTrigger id="rating" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 4, 3, 2, 1].map((r) => (
              <SelectItem key={r} value={String(r)}>
                {r} {r === 1 ? "star" : "stars"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="review">Review</Label>
        <Textarea id="review" name="review" required rows={4} defaultValue={testimonial?.review} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Photo URL (optional)</Label>
        <Input
          id="image"
          name="image"
          defaultValue={testimonial?.image}
          placeholder="https://... or /images/..."
        />
        {testimonial?.image && (
          <div className="relative mt-2 h-20 w-20 overflow-hidden rounded-full bg-muted">
            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
          </div>
        )}
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : testimonial ? "Save Changes" : "Add Review"}
        </Button>
      </div>
    </form>
  );
}
