"use client";
// lib/payments.js
// Razorpay checkout. Prices and order creation happen on the backend;
// the browser only picks a plan, pays in Razorpay's window, and sends
// Razorpay's signed result back for verification.

import { supabase } from "@/lib/supabase";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export async function fetchPlans() {
  const res = await fetch(`${API_URL}/api/payments/plans`);
  if (!res.ok) throw new Error("Couldn't load plans.");
  return res.json(); // { currency, plans: [{ id, label, amount_paise, days }] }
}

function loadCheckout() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = CHECKOUT_SRC;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Couldn't load the payment window. Check your internet and try again."));
    document.body.appendChild(s);
  });
}

async function authedPost(path, body) {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error("SIGN_IN");
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.detail || "Something went wrong. Please try again.");
  return json;
}

/**
 * Opens Razorpay for a plan. Resolves with one of:
 *   { status: "paid", premium_until }   Premium is active
 *   { status: "processing" }            paid; Premium activates within minutes
 *   { status: "dismissed" }             user closed the window
 * Rejects with Error("SIGN_IN") if logged out, or an Error with a message.
 */
export async function buyPremium(planId, { color } = {}) {
  await loadCheckout();
  const order = await authedPost("/api/payments/create-order", { plan: planId });

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: "ExamsCalendar",
      description: `Premium (${order.label})`,
      prefill: { email: order.email || "", name: order.name || "" },
      theme: { color: color || "#6366f1" },
      handler: async (resp) => {
        try {
          resolve(await authedPost("/api/payments/verify", resp));
        } catch {
          // Money may have been taken; the webhook will still activate Premium.
          resolve({ status: "processing" });
        }
      },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
    });
    try {
      rzp.open();
    } catch (e) {
      reject(e);
    }
  });
}

export function formatRupees(paise) {
  const rupees = paise / 100;
  return `₹${Number.isInteger(rupees) ? rupees : rupees.toFixed(2)}`;
}
