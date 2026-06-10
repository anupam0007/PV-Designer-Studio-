"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HeroSlide } from "@/lib/site-settings-data";
import type { ActionState } from "@/app/admin/actions";

export function HeroSettingsForm({
  slides,
  action,
}: {
  slides: HeroSlide[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <input type="hidden" name="slideCount" value={slides.length} />

      {slides.map((slide, i) => (
        <div key={i} className="rounded-lg border border-border p-4">
          <h3 className="mb-4 font-heading text-lg font-semibold">Slide {i + 1}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`slide${i}_image`}>Image path</Label>
              <Input
                id={`slide${i}_image`}
                name={`slide${i}_image`}
                required
                defaultValue={slide.image}
                placeholder="/images/extra/extra-1.jpg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`slide${i}_eyebrow`}>Eyebrow</Label>
              <Input id={`slide${i}_eyebrow`} name={`slide${i}_eyebrow`} required defaultValue={slide.eyebrow} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor={`slide${i}_title`}>Title</Label>
              <Input id={`slide${i}_title`} name={`slide${i}_title`} required defaultValue={slide.title} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor={`slide${i}_description`}>Description</Label>
              <Textarea
                id={`slide${i}_description`}
                name={`slide${i}_description`}
                required
                rows={2}
                defaultValue={slide.description}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`slide${i}_ctaLabel`}>Button Label</Label>
              <Input id={`slide${i}_ctaLabel`} name={`slide${i}_ctaLabel`} required defaultValue={slide.ctaLabel} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`slide${i}_ctaHref`}>Button Link</Label>
              <Input
                id={`slide${i}_ctaHref`}
                name={`slide${i}_ctaHref`}
                required
                defaultValue={slide.ctaHref}
                placeholder="/shop"
              />
            </div>
          </div>
        </div>
      ))}

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Hero Banner"}
        </Button>
      </div>
    </form>
  );
}
