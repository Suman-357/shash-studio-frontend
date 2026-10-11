import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { submitInquiry } from "../../services/api";
import { Check, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useRazorpay } from "../../hooks/useRazorpay";
import { axiosInstance } from "../../services/axiosInstance";

export const ProductOrderModal = ({ product, isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const isKn = lang === "kn";
  const { pay: launchRazorpay } = useRazorpay();

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    address: "",
    city: "Bengaluru",
    pincode: "",
    paymentMethod: "razorpay"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setOrderSuccess(null);
      setQuantity(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;
  const originalTotal = product.originalPrice * quantity;
  const totalSavings = originalTotal - totalPrice;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.address.trim()) {
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      // 1. Create order in backend database
      const response = await axiosInstance.post("/products/orders", {
        productId: product.slug || product.id,
        productTitle: product.title,
        unitPrice: product.price,
        quantity,
        customerName: formData.name,
        phone: formData.whatsapp,
        shippingAddress: {
          street: formData.address,
          city: formData.city || "Mysuru",
          state: "Karnataka",
          pincode: formData.pincode
        },
        paymentMethod: "razorpay"
      });

      const orderPayload = response?.data || response;
      const createdOrderId =
        orderPayload?.orderId || `SHASH-MAT-${Math.floor(100000 + Math.random() * 900000)}`;

      // 2. Launch Razorpay payment modal
      await launchRazorpay({
        type: "product",
        productId: product.slug || product.id,
        quantity,
        orderId: createdOrderId,
        customerName: formData.name,
        customerPhone: formData.whatsapp,
        description: `${product.title} (Qty: ${quantity})`,
        onSuccess: (verifiedData) => {
          setIsSubmitting(false);
          setOrderSuccess({
            orderId: createdOrderId,
            productTitle: product.title,
            quantity,
            totalPrice,
            name: formData.name,
            whatsapp: formData.whatsapp,
            city: formData.city,
            razorpayPaymentId: verifiedData.razorpay_payment_id || verifiedData.paymentId
          });
        },
        onFailure: (err) => {
          setIsSubmitting(false);
          if (err?.cancelled) {
            setOrderError("Payment was cancelled. You can retry whenever you're ready.");
          } else {
            setOrderError(err?.message || "Payment could not be completed. Please try again.");
          }
        }
      });
    } catch (err) {
      console.error("Product order & payment error:", err);
      setIsSubmitting(false);
      setOrderError(err?.message || "Failed to initiate payment. Please try again.");
    }
  };

  const whatsappMessage = orderSuccess
    ? `Namaskara Shashirekha, I have ordered the ${orderSuccess.productTitle} (Qty: ${orderSuccess.quantity}) with Order ID: ${orderSuccess.orderId}. Delivery to ${orderSuccess.city}. Total: ₹${orderSuccess.totalPrice}. Please confirm tracking!`
    : `Namaskara Shashirekha, I would like to buy the ${product.title} (₹${product.price}). Please share payment details and shipping timeline!`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FDFBF7] rounded-[2rem] border border-[#2D4A37]/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2D4A37]/10 px-6 py-4 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-[#EDE8DE] text-[16px]">🧘</span>
            <div>
              <h3 className="font-sans text-lg font-extrabold text-[#1C3325] tracking-tight">
                {orderSuccess
                  ? isKn ? "ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿದೆ" : "Order Confirmed"
                  : isKn ? "ಯೋಗ ಚಾಪೆ ಖರೀದಿ" : "Order Studio Yoga Mat"}
              </h3>
              <p className="text-[11px] text-[#5B635E]">
                {isKn ? "ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ವಿತರಣೆ" : "Free Express Shipping Across India"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2D4A37]/15 flex items-center justify-center text-[#1C3325] hover:bg-[#EDE8DE] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderSuccess ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#BEE8DC] text-[#1C3325] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 text-[#1C3325]" />
              </div>

              <div className="space-y-1">
                <h4 className="font-sans text-2xl font-extrabold text-[#1C3325] tracking-tight">
                  {isKn ? "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ" : "Namaskara! Your Order is Received"}
                </h4>
                <p className="text-[13px] text-[#5B635E] max-w-sm mx-auto">
                  {isKn
                    ? "ಮೈಸೂರು ಶಾಲಾ ತಂಡವು ನಿಮ್ಮ ವಿಳಾಸಕ್ಕೆ ಶೀಘ್ರದಲ್ಲೇ ಪಾರ್ಸೆಲ್ ರವಾನಿಸಲಿದೆ."
                    : "Our Mysuru dispatch team is packing your handcrafted mat. Tracking will be shared on WhatsApp."}
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#2D4A37]/15 text-left text-[13px] space-y-2.5 shadow-xs">
                <div className="flex justify-between pb-2 border-b border-neutral-100">
                  <span className="text-[#5B635E]">Order ID:</span>
                  <span className="font-mono font-bold text-[#1C3325]">{orderSuccess.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">Product:</span>
                  <span className="font-semibold text-[#1C3325] truncate max-w-[200px]">
                    {orderSuccess.productTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">Quantity:</span>
                  <span className="font-semibold text-[#1C3325]">{orderSuccess.quantity} unit(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">Shipping:</span>
                  <span className="text-[#0E6848] font-bold">FREE (India Post / Bluedart)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-100 font-bold text-[14px]">
                  <span>Total Amount:</span>
                  <span className="text-[#1C3325] font-sans font-extrabold tabular-nums">
                    ₹{orderSuccess.totalPrice}
                  </span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/917676405895?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                  <span>{isKn ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ದೃಢೀಕರಿಸಿ" : "Confirm & Track via WhatsApp"}</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full bg-[#EDE8DE] text-[#1C3325] font-semibold text-[13px] hover:bg-[#DCDAD4] transition-colors cursor-pointer"
                >
                  {isKn ? "ಮುಚ್ಚಿ" : "Close"}
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Product Preview & Quantity Card */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#2D4A37]/15 flex items-center gap-3.5 shadow-xs">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-neutral-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#EAE7DF] text-[#1C3325] text-[10px] font-bold mb-0.5">
                    {isKn ? product.badgeKn : product.badge}
                  </span>
                  <h4 className="font-sans font-bold text-[14px] text-[#1C3325] truncate">
                    {isKn ? product.titleKn : product.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-sans font-extrabold text-[15px] text-[#1C3325] tabular-nums">
                      ₹{unitPrice}
                    </span>
                    <span className="text-[11px] text-[#5B635E] line-through tabular-nums">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#F6F4ED] p-1.5 rounded-xl border border-[#2D4A37]/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-sm font-bold text-[#1C3325] disabled:opacity-40 cursor-pointer"
                  >
                    –
                  </button>
                  <span className="font-bold text-[13px] text-[#1C3325] w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-sm font-bold text-[#1C3325] disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Address Fields */}
              <div className="space-y-3">
                <p className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                  {isKn ? "ವಿತರಣಾ ವಿವರಗಳು (Shipping Details)" : "Shipping & Delivery Address"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1A1F1C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2D4A37]/15 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/20 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#1A1F1C] mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2D4A37]/15 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/20 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1A1F1C] mb-1">
                    Door / House / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Flat 302, Green Meadows, 5th Cross"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2D4A37]/15 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/20 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1A1F1C] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Mysuru / Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2D4A37]/15 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/20 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1A1F1C] mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="570001"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2D4A37]/15 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/20 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Order Cost Breakdown Box */}
              <div className="p-3.5 rounded-2xl bg-[#EDE8DE]/70 border border-[#2D4A37]/15 space-y-1.5 text-[12.5px]">
                <div className="flex justify-between text-[#5B635E]">
                  <span>Mat Price ({quantity}x):</span>
                  <span className="font-sans tabular-nums font-semibold text-[#1C3325]">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B635E]">
                  <span>Express Domestic Courier:</span>
                  <span className="text-[#0E6848] font-bold">FREE ✦</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#C26D38] font-semibold">
                    <span>Festival Discount Savings:</span>
                    <span className="font-sans tabular-nums">–₹{totalSavings}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#2D4A37]/15 flex items-baseline justify-between font-bold text-[14px]">
                  <span>Total Amount Payable:</span>
                  <span className="font-sans text-xl font-extrabold text-[#1C3325] tabular-nums">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Quick WhatsApp Support Tip */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#E8F3ED] text-[#0E6848] text-[11.5px] font-medium border border-[#0E6848]/20">
                <span className="material-symbols-outlined text-[17px] shrink-0">local_shipping</span>
                <span>Includes free studio carry strap. Dispatched within 24 hours of order.</span>
              </div>

              {orderError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px] font-semibold flex items-center justify-between gap-2">
                  <span>⚠️ {orderError}</span>
                  <button
                    type="button"
                    onClick={() => setOrderError(null)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-full bg-[#1C3325] text-white font-bold text-[14px] shadow-md hover:bg-[#2D4A37] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order (₹{totalPrice})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/917676405895?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full border border-[#25D366] text-[#1E7E34] hover:bg-[#25D366]/10 font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
