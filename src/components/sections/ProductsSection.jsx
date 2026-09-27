import React from "react";
import { YOGA_MAT_PRODUCTS } from "../../data/products";
import { useLanguage } from "../../context/LanguageContext";
import { IconCheck, IconArrowRight, IconWhatsApp } from "../ui/Icons";
import { CardSpotlight } from "../ui/CardSpotlight";

export const ProductsSection = ({ onBuyProduct }) => {
  const { lang, t } = useLanguage();
  const isKn = lang === "kn";

  return (
    <section id="yoga-mats" className="w-full py-8 sm:py-12 bg-[#FCF9F3] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-[#D48C46]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-[#BEE8DC]/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE8DE] border border-[#2D4A37]/10 shadow-xs">
            <span className="text-sm">🌿</span>
            <span className="text-[11.5px] font-bold text-[#1C3325] uppercase tracking-[0.18em]">
              {isKn ? "ಪಾರಂಪರಿಕ ಯೋಗ ಪರಿಕರಗಳು" : "Sacred Studio Equipment"}
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C3325] tracking-tight">
            {isKn ? "ಮೈಸೂರು ಯೋಗ ಚಾಪೆಗಳು" : "Handcrafted Studio Yoga Mats"}
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#5B635E] leading-relaxed">
            {isKn
              ? "ನೈಸರ್ಗಿಕ ಸಾವಯವ ಸಾಮಗ್ರಿಗಳು, ಆಸನ ಭಂಗಿಯ ನಿಖರತೆ ಮತ್ತು ಜಾರದ ಹಿಡಿತಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವಿಶೇಷ ಚಾಪೆಗಳು. ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ಹೋಮ್ ಡೆಲಿವರಿ."
              : "Consciously crafted with organic handloom fibers and eco tree rubber for grounding stability, joint comfort, and authentic daily sadhana. Delivered free across India."}
          </p>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {YOGA_MAT_PRODUCTS.map((mat) => {
            const savings = mat.originalPrice - mat.price;
            return (
              <CardSpotlight
                key={mat.id}
                className="flex flex-col justify-between p-6 sm:p-7 bg-[#FDFBF7] border border-[#2D4A37]/15 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Product Image Frame */}
                  <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-inner group">
                    <img
                      src={mat.image}
                      alt={mat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      <span className={`px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-sm ${mat.badgeColor}`}>
                        ✦ {isKn ? mat.badgeKn : mat.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E6848] text-[10.5px] font-bold shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E6848]" />
                        In Stock • Ships in 24h
                      </span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11.5px] font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="text-[#FBBF24]">★</span>
                      <span>{mat.rating}</span>
                      <span className="text-white/70 text-[10.5px]">({mat.reviewsCount} verified reviews)</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#C26D38] tracking-wider uppercase">
                        {mat.tag}
                      </span>
                      <span className="text-[11px] font-bold text-[#0E6848] bg-[#E3F5EE] px-2 py-0.5 rounded-full">
                        Free All-India Delivery
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-[#1C3325] leading-snug">
                      {isKn ? mat.titleKn : mat.title}
                    </h3>
                    <p className="text-[12.5px] text-[#5B635E] font-medium">
                      {isKn ? mat.subtitleKn : mat.subtitle}
                    </p>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-[13px] text-[#5B635E] leading-relaxed">
                    {isKn ? mat.descriptionKn : mat.description}
                  </p>

                  {/* Specs Quick Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11.5px]">
                    {mat.specs.map((spec, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#F6F4ED] border border-[#2D4A37]/10 flex flex-col">
                        <span className="text-[#8E9991] font-medium text-[10px] uppercase">{spec.label}</span>
                        <span className="font-bold text-[#1C3325] truncate">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Feature Bullets */}
                  <ul className="space-y-1.5 pt-1 text-[12.5px] text-[#3D4740]">
                    {mat.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#BEE8DC] text-[#1C3325]">
                          <IconCheck className="w-2.5 h-2.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-5 mt-5 border-t border-[#2D4A37]/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#5B635E] block">Sanctuary Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-3xl font-extrabold text-[#1C3325] tabular-nums tracking-tight">
                          ₹{mat.price}
                        </span>
                        <span className="text-[13px] text-[#5B635E] line-through font-sans tabular-nums">
                          ₹{mat.originalPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FEF3D6] text-[#945B09] text-[11px] font-bold">
                          Save ₹{savings}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-[#0E6848] font-bold block">✓ Free Cotton Strap</span>
                      <span className="text-[11px] text-[#5B635E]">Includes carry sling</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onBuyProduct(mat)}
                      className="py-3.5 px-6 rounded-full bg-[#1C3325] text-white font-bold text-[14px] shadow-md hover:bg-[#2D4A37] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>{isKn ? "ಈಗಲೇ ಖರೀದಿಸಿ" : "Buy Mat Now"}</span>
                      <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={`https://wa.me/917676405895?text=Namaskara%20Shashirekha%2C%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(mat.title)}%20(₹${mat.price})%20with%20free%20home%20delivery.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-full border border-[#2D4A37]/20 bg-white text-[#1C3325] hover:bg-[#EDE8DE] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>
      </div>
    </section>
  );
};
