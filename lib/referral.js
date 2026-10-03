"use client";
// lib/referral.js
// Referral helpers. All writes happen inside Supabase functions
// (claim_referral / get_my_referral), never directly from the browser.

import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "ec_ref_code";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // a friend has 30 days to sign up

// Use the real site URL (not window.location.origin) so links copied
// inside the Android/iOS app still point to the website.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.examscalendar.com";

export function referralLink(code) {
  return `${SITE_URL}/r/${code}`;
}

function cleanCode(code) {
  return String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

// Called on /r/[code] before the visitor signs in.
export function saveReferralCode(code) {
  const clean = cleanCode(code);
  if (clean.length < 4) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code: clean, ts: Date.now() }));
  } catch {
    /* storage unavailable (private mode etc.) -- referral just won't count */
  }
}

function readPendingCode() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { code, ts } = JSON.parse(raw);
    if (!code || Date.now() - ts > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

// Results that mean "nothing more to do" -- clear the stored code.
const FINAL_RESULTS = new Set(["ok", "invalid_code", "self_referral", "not_new_user", "already_referred"]);

/**
 * Call right after a successful sign-in (web callback and native login).
 * Never throws: a referral problem must never block login.
 */
export async function claimPendingReferral() {
  const code = readPendingCode();
  if (!code) return null;
  try {
    const { data, error } = await supabase.rpc("claim_referral", { p_code: code });
    if (error) {
      console.error("Referral claim failed:", error.message);
      return null; // keep the code; it will retry on the next sign-in
    }
    if (FINAL_RESULTS.has(data)) localStorage.removeItem(STORAGE_KEY);
    return data;
  } catch (e) {
    console.error("Referral claim failed:", e);
    return null;
  }
}

// { code, coins, friends_joined, coins_per_referral }
export async function getMyReferral() {
  const { data, error } = await supabase.rpc("get_my_referral");
  if (error) throw error;
  return data;
}
