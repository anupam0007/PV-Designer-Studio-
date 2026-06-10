import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { supabaseUrl, supabaseAnonKey } from "./config";

/** Read-only Supabase client for public storefront data (products, reviews,
 * categories, locations, site settings). Doesn't touch cookies, so it's safe
 * to call from `generateStaticParams` and other build-time contexts. */
export function createPublicClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
