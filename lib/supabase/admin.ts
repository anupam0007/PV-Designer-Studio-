import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { supabaseUrl } from "./config";

/** Service-role Supabase client for admin product CRUD. Only call this
 * after verifying the requesting user is signed in (see `app/admin/actions.ts`).
 * Never import this from client components. */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase is not configured: missing SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
