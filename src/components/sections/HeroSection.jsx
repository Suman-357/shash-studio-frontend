import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { IconArrowRight, IconCalendar } from "../ui/Icons";
import { HeroTransformationCard } from "./HeroTransformationCard";

export const HeroSection = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();

  const handleScrollToWorkshops = () => {
    const el = document.getElementById("workshops");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-2 sm:pt-4 pb-6 sm:pb-8">
      {/* Ambient Organic Gradient Glows */}
      <div className="absolute top-0 right-0 -mr-28 -mt-20 w-96 h-96 rounded-full bg-[#BEE8DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-[#FFDBC9]/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bilingual Grand Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Sanctuary Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F3ED] border border-[#2D4A37]/10 shadow-xs">
              <span className="text-base leading-none">🪷</span>
              <span className="text-[12px] font-bold text-[#1C3325] tracking-wider uppercase">
                {t("heroTag")}
              </span>
            </div>

            {/* Dual Script Grand Headline */}
            <div className="space-y-2">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#1C3325] font-extrabold tracking-tight leading-[1.12]">
                {lang === "kn" ? (
                  <>
                    <span className="text-[#1C3325]">ಉಸಿರಾಡಿ. ಚಲಿಸಿ.</span><br />
                    <span className="text-[#2D4A37]">ಗುಣಮುಖರಾಗಿ.</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#1C3325]">Breathe. Move.</span><br />
                    <span className="text-[#2D4A37]">Heal.</span>
                  </>
                )}
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[#C26D38] font-bold tracking-normal">
                {lang === "kn" ? "Breathe. Move. Heal. Live from Mysuru." : "Live from Mysuru Shala, Karnataka."}
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-[16px] md:text-[17px] text-[#5B635E] max-w-xl leading-relaxed">
              {t("heroDesc")}
            </p>

            {/* Action Row & Timings Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1C3325] text-white font-semibold text-[15px] shadow-lg hover:bg-[#2D4A37] transition-all duration-300 group cursor-pointer"
              >
                <span>{t("heroCta")}</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Batch Pill Alert / Scroll to Batches */}
              <button
                onClick={handleScrollToWorkshops}
                className="inline-flex items-center gap-3 p-2.5 pr-5 rounded-full bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs hover:shadow-md transition-all group text-left cursor-pointer"
                type="button"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D48C46]/15 text-[#D48C46]">
                  <IconCalendar className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] text-[#1C3325] font-bold flex items-center gap-1.5">
                    <span>{t("heroBatchNotice")}</span>
                    <span className="w-2 h-2 rounded-full bg-[#D48C46] animate-pulse" />
                  </p>
                  <p className="text-[11px] text-[#5B635E]">
                    {t("heroBatchSub")} • <span className="text-[#D48C46] font-semibold underline">{t("seeTimings")}</span>
                  </p>
                </div>
              </button>
            </div>

            {/* Proof Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#2D4A37]/10 shadow-xs">
                <span className="font-sans text-xl sm:text-2xl font-black text-[#1C3325] block tabular-nums">10,000+</span>
                <span className="text-[12px] text-[#5B635E]">{t("statSeekers")}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#2D4A37]/10 shadow-xs">
                <span className="font-sans text-lg sm:text-xl font-bold text-[#1C3325] block">ಕನ್ನಡ + EN</span>
                <span className="text-[12px] text-[#5B635E]">{t("statBilingual")}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#2D4A37]/10 shadow-xs">
                <span className="font-sans text-lg sm:text-xl font-bold text-[#1C3325] block">Mysuru</span>
                <span className="text-[12px] text-[#5B635E]">{t("statTradition")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Real Transformation Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <HeroTransformationCard />
          </div>
        </div>
      </div>
    </section>
  );
};
