import React from "react";
import { AnimatedBorderCard } from "../ui/AnimatedBorderCard";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { useWorkshopsQuery } from "../../hooks/useWorkshopsQuery";
import { Check, ArrowRight } from "lucide-react";

export const ComboPassBanner = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();
  const { data: workshops = [] } = useWorkshopsQuery("all");

  const comboPass = workshops.find(
    (w) =>
      w.slug === "combo-pass" ||
      w.id === "combo-pass" ||
      w.slug === "combo" ||
      w.category === "combo"
  );

  if (!comboPass) return null;

  return (
    <section id="combo-pass" className="w-full py-4 sm:py-6 max-w-[1280px] mx-auto px-4 md:px-8">
      <AnimatedBorderCard>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D48C46] text-[#FDFBF7] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <span>{lang === "kn" ? (comboPass.badgeKn || comboPass.badge) : comboPass.badge}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C3325]">
                {comboPass.title}
              </h3>
              <p className="font-sans text-lg sm:text-xl font-bold text-[#2D4A37]">
                {comboPass.titleKn}
              </p>
            </div>

            <p className="text-[15px] text-[#5B635E] max-w-2xl leading-relaxed">
              {lang === "kn" ? (comboPass.descriptionKn || comboPass.description) : comboPass.description}
            </p>

            <div className="flex items-center gap-6 pt-2 flex-wrap text-[13px] text-[#2D4A37] font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C26D38]" />
                <span>All Daily Batches Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C26D38]" />
                <span>24-Hour Zoom Replays</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C26D38]" />
                <span>Private WhatsApp Cohort</span>
              </div>
            </div>
          </div>

          {/* Right Price & Button Action */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4 bg-white p-6 rounded-2xl border border-[#2D4A37]/15 shadow-xs">
            <div className="text-left lg:text-right">
              <span className="text-[12px] text-[#5B635E] uppercase tracking-wider font-semibold block">
                {t("monthlyInvestment")}
              </span>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-sans text-4xl sm:text-5xl font-extrabold text-[#1C3325] whitespace-nowrap tabular-nums tracking-tight">
                  ₹{comboPass.price}
                </span>
                {comboPass.originalPrice > comboPass.price && (
                  <span className="text-[14px] text-[#5B635E] line-through whitespace-nowrap font-sans tabular-nums">
                    ₹{comboPass.originalPrice}
                  </span>
                )}
                <span className="text-[13px] text-[#C26D38] font-bold">/month</span>
              </div>
            </div>

            <button
              onClick={() => openBookingModal("combo")}
              className="w-full lg:w-auto px-8 py-4 rounded-full bg-[#1C3325] text-white font-bold text-[15px] shadow-md hover:bg-[#2D4A37] hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span>{t("getAllAccess")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedBorderCard>
    </section>
  );
};
