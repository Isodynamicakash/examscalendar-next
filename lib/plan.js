"use client";
// lib/plan.js
// Free vs Premium state for the logged-in user, from get_my_plan().
// The database enforces test limits; this file only drives the UI.

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// FREE MODE switch. false = everyone gets all features, and the Invite /
// Premium links are hidden. To turn Premium back on: set to true AND run
// the rollback line in supabase/free_mode.sql.
export const MONETIZATION_ENABLED = false;

const FREE_DEFAULT = {
  is_premium: false,
  premium_until: null,
  tests_today: 0,
  tests_per_day: 2,
  max_questions_per_test: 20,
  coin_cost: 100,
  premium_days: 30,
};

// One request per user per page load, shared by every component.
let cache = null; // { userId, promise }

supabase.auth.onAuthStateChange(() => {
  cache = null;
});

export async function fetchPlan(force = false) {
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user?.id || null;
  if (!userId) return { ...FREE_DEFAULT, signedIn: false };

  if (!force && cache?.userId === userId) return cache.promise;

  const promise = supabase
    .rpc("get_my_plan")
    .then(({ data: plan, error }) => {
      if (error) throw error;
      return { ...FREE_DEFAULT, ...plan, signedIn: true };
    })
    .catch((e) => {
      console.error("Loading plan failed:", e);
      cache = null; // retry next time
      return { ...FREE_DEFAULT, signedIn: true };
    });

  cache = { userId, promise };
  return promise;
}

/**
 * const { plan, loading, isPremium, locked, refresh } = usePlan();
 * `locked` is true only once we KNOW the user is on the free plan,
 * so Premium users never see a lock flash while the plan loads.
 */
export function usePlan() {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchPlan().then((p) => alive && setPlan(p));
    return () => { alive = false; };
  }, []);

  const refresh = useCallback(async () => {
    const p = await fetchPlan(true);
    setPlan(p);
    return p;
  }, []);

  const isPremium = !MONETIZATION_ENABLED || !!plan?.is_premium;
  return { plan, loading: plan === null, isPremium, locked: plan !== null && !isPremium, refresh };
}

// Free tests left today, or null if unlimited (Premium)
export function testsLeftToday(plan) {
  if (!MONETIZATION_ENABLED || !plan || plan.is_premium || plan.tests_per_day == null) return null;
  return Math.max(0, plan.tests_per_day - (plan.tests_today || 0));
}

// Turns a database limit error into a message for the user, or null.
export function planErrorMessage(error, plan) {
  const msg = String(error?.message || "");
  if (msg.includes("DAILY_TEST_LIMIT")) {
    return `You've used your ${plan?.tests_per_day ?? 2} free tests for today. Upgrade to Premium for unlimited tests, or come back tomorrow.`;
  }
  if (msg.includes("TEST_TOO_LONG")) {
    return `Free tests can have up to ${plan?.max_questions_per_test ?? 20} questions. Upgrade to Premium for longer tests.`;
  }
  return null;
}
