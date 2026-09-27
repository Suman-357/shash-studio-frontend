import React, { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { IconCheck, IconArrowRight, IconWhatsApp } from "../ui/Icons";

export const ProductDetailModal = ({ product, isOpen, onClose, onBuyNow }) => {
  const { lang } = useLanguage();
  const isKn = lang === "kn";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const whatsappMessage = `Namaskara Shashirekha, I am inquiring about the ${product.title} (₹${product.price}). Please share availability and delivery timeline!`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-neutral-900/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-[2rem] border border-[#2D4A37]/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Dismiss Bar */}
        <div className="flex items-center justify-between border-b border-[#2D4A37]/10 px-6 py-3.5 bg-white/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 text-[12px] text-[#5B635E]">
            <span className="font-bold text-[#1C3325]">SHASH Studios</span>
            <span>•</span>
            <span className="text-[#C26D38] font-semibold">{product.tag}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2D4A37]/15 flex items-center justify-center text-[#1C3325] hover:bg-[#EDE8DE] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body: Left column is STICKY; only the right column scrolls */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Sticky Product Media & Guarantees (Anchored) */}
          <div className="w-full md:w-[46%] lg:w-[48%] p-5 sm:p-7 shrink-0 flex flex-col justify-start space-y-4 bg-[#F8F6F0]/60 border-b md:border-b-0 md:border-r border-[#2D4A37]/10 overflow-y-auto md:overflow-y-visible">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-[#2D4A37]/10 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-sm ${product.badgeColor}`}>
                ✦ {isKn ? product.badgeKn : product.badge}
              </span>
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1">
                <span className="text-[#FBBF24]">★</span>
                <span>{product.rating}</span>
                <span className="text-white/70">({product.reviewsCount} reviews)</span>
              </span>
            </div>

            {/* Guarantees Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#2D4A37]/10 space-y-2 text-[12px] text-[#1C3325] shadow-2xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[17px] text-[#0E6848]">local_shipping</span>
                <span>Free Express All-India Shipping (2–4 Days Delivery)</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[17px] text-[#0E6848]">eco</span>
                <span>100% Biodegradable &amp; Plastic-Free Sustainable Packing</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[17px] text-[#0E6848]">featured_seasonal_and_gifts</span>
                <span>Free Traditional Cotton Carrying Sling Included</span>
              </div>
            </div>
          </div>

          {/* Right: Only This Content Scrolls! */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
            {/* Title & Taglines */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#C26D38] tracking-widest uppercase">
                SHASH Studios • Mysore Lineage
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1C3325] tracking-tight leading-snug">
                {isKn ? product.titleKn : product.title}
              </h2>
              <p className="text-[13px] text-[#5B635E] font-medium">
                {isKn ? product.subtitleKn : product.subtitle}
              </p>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-white border border-[#2D4A37]/10 shadow-xs flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-[#5B635E] block font-medium">Direct Shala Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-sans text-3xl font-extrabold text-[#1C3325] tabular-nums tracking-tight">
                    ₹{product.price}
                  </span>
                  <span className="text-[14px] text-[#5B635E] line-through font-sans tabular-nums">
                    ₹{product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF3D6] text-[#945B09] text-[11px] font-bold">
                    {discountPercent}% OFF (Save ₹{savings})
                  </span>
                </div>
              </div>
              <span className="text-[11.5px] font-bold text-[#0E6848] bg-[#E3F5EE] px-2.5 py-1 rounded-full">
                In Stock
              </span>
            </div>

            {/* Narrative Description */}
            <div className="space-y-1">
              <p className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                Product Overview
              </p>
              <p className="text-[13.5px] text-[#5B635E] leading-relaxed">
                {isKn ? product.descriptionKn : product.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-1.5">
              <p className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                Dimensions &amp; Material Specs
              </p>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                {product.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-[#2D4A37]/10">
                    <span className="text-[#8E9991] font-semibold text-[10px] uppercase block tracking-wider">
                      {spec.label}
                    </span>
                    <span className="font-bold text-[#1C3325] block mt-0.5 truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-1.5">
              <p className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                Key Features
              </p>
              <ul className="space-y-1.5 text-[12.5px] text-[#3D4740]">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#BEE8DC] text-[#1C3325]">
                      <IconCheck className="w-2.5 h-2.5" />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBuyNow(product);
                }}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#1C3325] text-white font-bold text-[14px] shadow-md hover:bg-[#2D4A37] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{isKn ? "ಈಗಲೇ ಖರೀದಿಸಿ (Buy Now)" : "Proceed to Buy (₹" + product.price + ")"}</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/917676405895?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full border border-[#25D366] text-[#1E7E34] hover:bg-[#25D366]/10 font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
