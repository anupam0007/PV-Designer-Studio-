/** Hand-written types for the Supabase tables. Keep in sync with `supabase/schema.sql`. */
export type ProductRow = {
  id: number;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  sale_price: number | null;
  sizes: string[];
  colors: string[] | null;
  images: string[];
  description: string;
  is_new: boolean;
  is_bestseller: boolean;
  is_offer: boolean;
  created_at: string;
};

export type ProductInsert = Omit<ProductRow, "created_at">;

export type TestimonialRow = {
  id: number;
  name: string;
  rating: number;
  review: string;
  image: string | null;
  sort_order: number;
  created_at: string;
};

export type TestimonialInsert = Omit<TestimonialRow, "created_at">;

export type CategoryRow = {
  slug: string;
  name: string;
  image: string;
  description: string;
  sort_order: number;
};

export type CategoryInsert = CategoryRow;

export type LocationRow = {
  id: number;
  name: string;
  address: string;
  sort_order: number;
};

export type LocationInsert = LocationRow;

export type SiteSettingRow = {
  key: string;
  value: unknown;
};

export type SiteSettingInsert = SiteSettingRow;

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: Partial<ProductInsert>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: TestimonialInsert;
        Update: Partial<TestimonialInsert>;
        Relationships: [];
      };
      categories: {
        Row: CategoryRow;
        Insert: CategoryInsert;
        Update: Partial<CategoryInsert>;
        Relationships: [];
      };
      locations: {
        Row: LocationRow;
        Insert: LocationInsert;
        Update: Partial<LocationInsert>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: SiteSettingInsert;
        Update: Partial<SiteSettingInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
