"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/data/categories";
import type { ActionState } from "@/app/admin/actions";

export function CategoryForm({
  category,
  action,
}: {
  category: Category;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:max-w-lg">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Display Name</Label>
        <Input id="name" name="name" required defaultValue={category.name} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={2} defaultValue={category.description} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Image path</Label>
        <Input id="image" name="image" required defaultValue={category.image} placeholder="/images/cat-example.jpg" />
        {category.image && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md bg-muted">
            <Image src={category.image} alt={category.name} fill className="object-cover" />
          </div>
        )}
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
