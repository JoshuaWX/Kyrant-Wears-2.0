/**
 * Supabase Client — Frontend-safe singleton.
 *
 * Uses the ANON key (public). This client is safe to use in the browser.
 * It handles JWT refresh automatically via Supabase's built-in session management.
 *
 * SECURITY:
 * - Only VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are exposed
 * - The service_role key must NEVER be used here
 * - RLS policies enforce access control on the database side
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
      "Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist session in localStorage (default behavior)
    persistSession: true,
    // Automatically refresh tokens before they expire
    autoRefreshToken: true,
    // Detect session from URL (needed for OAuth redirects)
    detectSessionInUrl: true,
  },
});
