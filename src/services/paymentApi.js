import axiosInstance from "./axiosInstance";

// ─────────────────────────────────────────────────
//  Razorpay Payment API Layer
// ─────────────────────────────────────────────────

/**
 * Create a Razorpay order on the server.
 * The backend fetches the real price from the database — amount is never sent from client.
 * Returns { orderId, amount, amountInRupees, currency, key, itemTitle, ... }
 *
 * @param {Object} params
 * @param {string} params.type         – "workshop" | "product"
 * @param {string} [params.workshopId] – slug or _id (required for type "workshop")
 * @param {string} [params.productId]  – slug or _id (required for type "product")
 * @param {number} [params.quantity]   – quantity for products (default 1)
 * @param {string} [params.receipt]    – optional receipt tag
 * @param {Object} [params.notes]      – optional metadata
 */
export async function createRazorpayOrder({
  type,
  bookingId,
  orderId,
}) {
  return axiosInstance.post("/payments/create-order", {
    type,
    ...(bookingId && { bookingId }),
    ...(orderId && { orderId }),
  });
}

/**
 * Verify payment signature on the server and finalize the booking / order.
 *
 * @param {Object} params
 * @param {string} params.razorpay_order_id
 * @param {string} params.razorpay_payment_id
 * @param {string} params.razorpay_signature
 * @param {string} params.type       – "workshop" | "product"
 * @param {string} [params.bookingId] – for workshop registrations
 * @param {string} [params.orderId]   – for product orders
 */
export async function verifyRazorpayPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  type = "workshop",
  bookingId,
  orderId,
}) {
  return axiosInstance.post("/payments/verify", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    type,
    bookingId,
    orderId,
  });
}
