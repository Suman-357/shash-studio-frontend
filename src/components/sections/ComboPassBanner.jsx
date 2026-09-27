import React from "react";
import { COMBO_PASS } from "../../data/workshops";
import { AnimatedBorderCard } from "../ui/AnimatedBorderCard";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { IconCheck, IconArrowRight, IconSparkles } from "../ui/Icons";

export const ComboPassBanner = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <section id="combo-pass" className="w-full py-4 sm:py-6 max-w-[1280px] mx-auto px-4 md:px-8">
      <AnimatedBorderCard>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D48C46] text-[#FDFBF7] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <span>{lang === "kn" ? COMBO_PASS.badgeKn : COMBO_PASS.badge}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FDFBF7]">
                {COMBO_PASS.title}
              </h3>
              <p className="font-sans text-lg sm:text-xl font-bold text-[#BEE8DC]">
                {COMBO_PASS.titleKn}
              </p>
            </div>

            <p className="text-[15px] text-[#EDE8DE] max-w-2xl leading-relaxed">
              {lang === "kn" ? COMBO_PASS.descriptionKn : COMBO_PASS.description}
            </p>

            <div className="flex items-center gap-6 pt-2 flex-wrap text-[13px] text-[#FDFBF7]/90 font-medium">
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[#D48C46]" />
                <span>All Daily Batches Included</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[#D48C46]" />
                <span>24-Hour Zoom Replays</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[#D48C46]" />
                <span>Private WhatsApp Cohort</span>
              </div>
            </div>
          </div>

          {/* Right Price & Button Action */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-left lg:text-right">
              <span className="text-[12px] text-[#84A98C] uppercase tracking-wider font-semibold block">
                {t("monthlyInvestment")}
              </span>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-sans text-4xl sm:text-5xl font-extrabold text-[#FDFBF7] whitespace-nowrap tabular-nums tracking-tight">
                  ₹{COMBO_PASS.price}
                </span>
                <span className="text-[14px] text-neutral-400 line-through whitespace-nowrap font-sans tabular-nums">
                  ₹{COMBO_PASS.originalPrice}
                </span>
                <span className="text-[13px] text-[#D48C46] font-bold">/month</span>
              </div>
            </div>

            <button
              onClick={() => openBookingModal("combo")}
              className="w-full lg:w-auto px-8 py-4 rounded-full bg-[#D48C46] text-[#FDFBF7] font-bold text-[15px] shadow-lg hover:bg-[#C26D38] hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span>{t("getAllAccess")}</span>
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedBorderCard>
    </section>
  );
};
