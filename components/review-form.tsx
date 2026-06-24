"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/app/reviews/actions";
import { cn } from "@/lib/utils";

function StarRatingPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          <Star
            className={`h-9 w-9 transition-colors duration-100 ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "text-stone-300 hover:text-amber-200"
            }`}
          />
        </button>
      ))}
      <span className="ml-1 self-center text-sm opacity-70">
        {labels[hovered || value]}
      </span>
    </div>
  );
}

export function ReviewForm({ dark = false }: { dark?: boolean }) {
  const [state, formAction, pending] = useActionState(submitReview, {});
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (pending) { submittedRef.current = true; return; }
    if (submittedRef.current) {
      submittedRef.current = false;
      if (!state.error) {
        toast.success("Thanks for your review!");
        formRef.current?.reset();
        setRating(5);
      }
    }
  }, [pending, state]);

  const labelClass = cn("text-sm font-medium", dark ? "text-[#F5E6C8]" : "");
  const mutedClass = cn("font-normal text-sm", dark ? "text-[rgba(245,230,200,0.55)]" : "text-muted-foreground");

  return (
    <form
      ref={formRef}
      action={formAction}
      encType="multipart/form-data"
      className="grid grid-cols-1 gap-5"
    >
      {/* 1 — Star rating (first) */}
      <div className="flex flex-col gap-2">
        <span className={labelClass}>Your Rating</span>
        <StarRatingPicker value={rating} onChange={setRating} />
        <input type="hidden" name="rating" value={rating} />
      </div>

      {/* 2 — Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className={labelClass}>Your Name</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Your name"
          className={dark ? "bg-white text-stone-900 border-transparent placeholder:text-stone-400" : ""}
        />
      </div>

      {/* 3 — Review (optional) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="review" className={labelClass}>
          Your Review <span className={mutedClass}>(optional)</span>
        </Label>
        <Textarea
          id="review"
          name="review"
          rows={4}
          placeholder="Tell us about your experience..."
          className={dark ? "bg-white text-stone-900 border-transparent placeholder:text-stone-400" : ""}
        />
      </div>

      {/* 4 — Photo (optional) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image" className={labelClass}>
          Add a Photo <span className={mutedClass}>(optional)</span>
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className={dark ? "bg-white text-stone-900 border-transparent file:text-stone-600" : ""}
        />
      </div>

      {state.error && <p className="text-sm text-rose-300">{state.error}</p>}

      <div>
        <Button
          type="submit"
          disabled={pending}
          size="lg"
          className={dark ? "bg-[#F5E6C8] text-[#3D1018] hover:bg-[#e8d5a8] font-semibold" : ""}
        >
          {pending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}
