"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
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
import { submitReview } from "@/app/reviews/actions";

export function ReviewForm() {
  const [state, formAction, pending] = useActionState(submitReview, {});
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (pending) {
      submittedRef.current = true;
      return;
    }
    if (submittedRef.current) {
      submittedRef.current = false;
      if (!state.error) {
        toast.success("Thanks for your review!");
        formRef.current?.reset();
      }
    }
  }, [pending, state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      encType="multipart/form-data"
      className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rating">Rating</Label>
          <Select name="rating" defaultValue="5">
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
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          name="review"
          required
          rows={4}
          placeholder="Tell us about your experience..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Add a Photo (optional)</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}
