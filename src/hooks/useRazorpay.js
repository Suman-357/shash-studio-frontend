import { useState, useCallback, useRef } from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "../services/paymentApi";

/**
 * ──────────────────────────────────────────────────────
 *  useRazorpay() — React hook for Razorpay Checkout
 * ──────────────────────────────────────────────────────
 *
 * Usage:
 *   const { pay, loading, error } = useRazorpay();
 *
 *   await pay({
 *     amount: 499,              // in ₹
 *     type: "workshop",         // "workshop" | "product"
 *     bookingId: "SHASH-123456",
 *     customerName: "Sumanth",
 *     customerEmail: "s@example.com",
 *     customerPhone: "9876543210",
 *     description: "Holistic Yoga Batch",
 *     notes: { workshopTitle: "Morning Yoga" },
 *     onSuccess: (data) => { /* handle success * / },
 *     onFailure: (err)  => { /* handle failure * / },
 *   });
 *
 * The hook:
 *  1. Loads the Razorpay checkout script if not already present
 *  2. Creates an order on the backend (POST /payments/create-order)
 *  3. Opens the Razorpay modal
 *  4. On user-completing payment, verifies via backend (POST /payments/verify)
 *  5. Calls onSuccess / onFailure callbacks accordingly
 */

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * Lazily load the Razorpay checkout.js script into the document <head>.
 * Returns a promise that resolves once the script has finished loading.
 */
function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay !== "undefined") {
      return resolve(true);
    }
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existing) {
      // Script tag exists but may still be loading
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay SDK")));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rzpRef = useRef(null);

  const pay = useCallback(
    async ({
      type = "workshop",
      workshopId,        // slug or _id — for workshop payments
      productId,         // slug or _id — for product payments
      quantity = 1,      // only for products
      bookingId,         // SHASH-XXXXXX (for verification)
      orderId,           // SHASH-MAT-... (for verification)
      customerName = "",
      customerEmail = "",
      customerPhone = "",
      description = "SHASH Studios Payment",
      notes = {},
      receipt,
      // Theme customization
      themePrimary = "#1C3325",
      logoUrl = "",
      // Callbacks
      onSuccess,
      onFailure,
    }) => {
      setLoading(true);
      setError(null);

      try {
        // 1. Load Razorpay SDK
        await loadRazorpayScript();

        // 2. Create order on backend (price & item are resolved strictly server-side from bookingId/orderId)
        const orderRes = await createRazorpayOrder({
          type,
          bookingId,
          orderId,
        });

        const orderPayload = orderRes?.data || orderRes;
        const rzpOrderId = orderPayload?.orderId;
        const key = orderPayload?.key;
        const amountInPaise = orderPayload?.amount;
        const currency = orderPayload?.currency || "INR";

        if (!rzpOrderId || !key || !amountInPaise) {
          throw new Error("Backend did not return a valid Razorpay order.");
        }

        // 3. Open Razorpay Checkout modal (EMI & PayLater disabled)
        const options = {
          key,
          amount: amountInPaise, // Razorpay expects paise
          currency: currency || "INR",
          name: "SHASH Studios",
          description,
          order_id: rzpOrderId,
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
            emi: false,
            paylater: false,
          },
          config: {
            display: {
              hide: [{ method: "emi" }, { method: "paylater" }],
            },
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          readonly: {
            contact: Boolean(customerPhone),
            email: Boolean(customerEmail),
          },
          theme: {
            color: themePrimary,
          },
          ...(logoUrl && { image: logoUrl }),

          // Called when user completes payment on Razorpay
          handler: async (response) => {
            try {
              // 4. Verify payment on backend
              const verifyRes = await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                type,
                bookingId,
                orderId,
              });

              setLoading(false);

              if (onSuccess) {
                const verifiedPayload = verifyRes?.data || verifyRes;
                onSuccess({
                  ...verifiedPayload,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                });
              }
            } catch (verifyError) {
              setLoading(false);
              const errMsg =
                verifyError?.message || "Payment verification failed. Please contact support.";
              setError(errMsg);
              if (onFailure) onFailure({ message: errMsg, verifyError });
            }
          },

          // Called if user closes the modal without paying
          modal: {
            ondismiss: () => {
              setLoading(false);
              const dismissMsg = "Payment cancelled by user.";
              setError(dismissMsg);
              if (onFailure) onFailure({ message: dismissMsg, cancelled: true });
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzpRef.current = rzp;

        // Handle unrecoverable checkout errors
        rzp.on("payment.failed", (failedResponse) => {
          setLoading(false);
          const failMsg =
            failedResponse?.error?.description || "Payment failed. Please try again.";
          setError(failMsg);
          if (onFailure) {
            onFailure({
              message: failMsg,
              code: failedResponse?.error?.code,
              source: failedResponse?.error?.source,
              reason: failedResponse?.error?.reason,
            });
          }
        });

        rzp.open();
      } catch (err) {
        setLoading(false);
        const errMsg = err?.message || "Something went wrong initiating the payment.";
        setError(errMsg);
        if (onFailure) onFailure({ message: errMsg, error: err });
      }
    },
    []
  );

  return { pay, loading, error };
}
