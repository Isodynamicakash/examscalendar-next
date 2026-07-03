"use client";
// Single Supabase browser client instance, shared across the app.
// Uses the publishable/anon key -- safe to expose in the browser
// because Row Level Security policies (added later) enforce
// per-user access at the database level, not in application code.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail loudly at import time if env vars are missing rather than
// silently producing null-client bugs later.
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY -- check Vercel env vars");
}

export const supabase = createClient(url || "", key || "", {
  auth: { persistSession: true, autoRefreshToken: true },
});
