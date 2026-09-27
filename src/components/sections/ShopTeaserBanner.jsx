import React from "react";
import { Link } from "react-router-dom";
import { YOGA_MAT_PRODUCTS } from "../../data/products";
import { useLanguage } from "../../context/LanguageContext";
import { IconArrowRight } from "../ui/Icons";

export const ShopTeaserBanner = () => {
  const { lang } = useLanguage();
  const isKn = lang === "kn";

  return (
    <section className="w-full py-6 sm:py-8 max-w-[1280px] mx-auto px-4 md:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1C3325] via-[#243F2F] to-[#122218] p-7 sm:p-10 text-white shadow-xl border border-white/10">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D48C46]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Headline & Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#BEE8DC] text-[11px] font-bold uppercase tracking-wider">
              <span>🌿</span>
              <span>{isKn ? "ಪಾರಂಪರಿಕ ಯೋಗ ಮಳಿಗೆ" : "Sanctuary Store • Handcrafted Equipment"}</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#FDFBF7]">
                {isKn ? "ಮೈಸೂರು ಯೋಗ ಚಾಪೆಗಳು" : "Authentic Mysuru Yoga Mats"}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#EDE8DE]/90 max-w-xl leading-relaxed">
                {isKn
                  ? "ನೈಸರ್ಗಿಕ ಸಾವಯವ ಹತ್ತಿ ಮತ್ತು ಇಕೋ-ರಬ್ಬರ್‌ನಿಂದ ಮೈಸೂರು ನೇಕಾರರಿಂದ ತಯಾರಾದ ವಿಶೇಷ ಯೋಗ ಚಾಪೆಗಳು. ಉಚಿತ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ."
                  : "From traditional handloom organic cotton & jute to laser-etched pro-grip natural tree rubber mats. Consciously crafted in Mysuru for your daily sadhana."}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[12px] text-[#BEE8DC] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-[#D48C46]">✦</span> 100% Biodegradable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D48C46]">✦</span> Free Express Delivery in India
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D48C46]">✦</span> Free Cotton Carry Sling
              </span>
            </div>

            {/* CTA to Shop */}
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D48C46] text-[#FDFBF7] font-bold text-[14px] shadow-lg hover:bg-[#C26D38] hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <span>{isKn ? "ಯೋಗ ಮಳಿಗೆಗೆ ಭೇಟಿ ನೀಡಿ" : "Visit Yoga Mat Store"}</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Dual Product Previews + View More Button */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="grid grid-cols-2 gap-3.5">
              {YOGA_MAT_PRODUCTS.slice(0, 2).map((mat) => (
                <Link
                  key={mat.id}
                  to={`/shop?product=${mat.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-3 border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden mb-2.5 bg-black/20">
                    <img
                      src={mat.image}
                      alt={mat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[9.5px] font-bold text-white backdrop-blur-xs">
                      {mat.tag}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[12.5px] font-bold text-white truncate leading-snug">
                      {isKn ? mat.titleKn : mat.title}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-sans font-extrabold text-[14px] text-[#BEE8DC] tabular-nums">
                        ₹{mat.price}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-through tabular-nums">
                        ₹{mat.originalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View More Products Button */}
            <Link
              to="/shop"
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-[12.5px] font-bold text-white flex items-center justify-center gap-2 transition-all group"
            >
              <span>{isKn ? "ಎಲ್ಲಾ ಪರಿಕರಗಳನ್ನು ನೋಡಿ (View More)" : "View All Studio Products & Props"}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D48C46] text-[10px] font-bold text-white">
                +{YOGA_MAT_PRODUCTS.length - 2} More
              </span>
              <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
