"use client";

import { useActionState } from "react";
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
import type { Product } from "@/data/products";
import type { ActionState } from "@/app/admin/actions";

const categories = ["blouses", "gowns", "lehengas", "indo-western", "men", "kids"];
const brands = ["PV Bridals", "Nayakii", "PV Rentals"];

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required defaultValue={product?.name} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required defaultValue={product?.slug} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={product?.category ?? "lehengas"}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand" defaultValue={product?.brand ?? "PV Bridals"}>
          <SelectTrigger id="brand" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price">Price (INR)</Label>
        <Input id="price" name="price" type="number" required defaultValue={product?.price} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="salePrice">Sale Price (INR, optional)</Label>
        <Input id="salePrice" name="salePrice" type="number" defaultValue={product?.salePrice} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sizes">Sizes (comma separated)</Label>
        <Input
          id="sizes"
          name="sizes"
          required
          defaultValue={product?.sizes?.join(", ") ?? "XS, S, M, L, XL, XXL, XXXL"}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="colors">Colors (comma separated, optional)</Label>
        <Input id="colors" name="colors" defaultValue={product?.colors?.join(", ")} />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="images">Image paths (one per line)</Label>
        <Textarea
          id="images"
          name="images"
          required
          rows={3}
          defaultValue={product?.images?.join("\n")}
          placeholder="/images/shop/lehengas/example.jpg"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={3} defaultValue={product?.description} />
      </div>

      <div className="flex flex-wrap gap-6 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isNew" defaultChecked={product?.isNew} className="h-4 w-4" />
          New Arrival
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isBestseller"
            defaultChecked={product?.isBestseller}
            className="h-4 w-4"
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isOffer" defaultChecked={product?.isOffer} className="h-4 w-4" />
          Offer of the Day
        </label>
      </div>

      {state.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : product ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
