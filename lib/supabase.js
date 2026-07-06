"use client";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(url || "", key || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // Required for OAuth: lets supabase-js parse the session out of the
    // URL hash when Google redirects back to /auth/callback.
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});
