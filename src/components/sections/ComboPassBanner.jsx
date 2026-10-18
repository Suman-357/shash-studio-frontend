import React from "react";
import { AnimatedBorderCard } from "../ui/AnimatedBorderCard";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { useWorkshopsQuery } from "../../hooks/useWorkshopsQuery";
import { ASSETS } from "../../assets";
import { Check, ArrowRight, Sparkles, Clock, Users, ShieldCheck } from "lucide-react";

export const ComboPassBanner = () => {
  const { lang, t } = useLanguage();
  const isKn = lang === "kn";
  const { openBookingModal } = useBooking();
  const { data: workshops = [] } = useWorkshopsQuery("all");

  const fallbackCombo = {
    slug: "combo-pass",
    title: "All-Access Combo Pass",
    titleKn: "ಸಂಪೂರ್ಣ ಆರೋಗ್ಯ ಕಾಂಬೋ ಪಾಸ್",
    description: "Ultimate daily wellness system. Get Zoom links to all our live batches. Join active Ashtanga & Strength in the morning and wind down with Sushii Nights bedtime breathwork before sleeping.",
    descriptionKn: "ಸಂಪೂರ್ಣ ದೈನಂದಿನ ಆರೋಗ್ಯ ವ್ಯವಸ್ಥೆ. ನಮ್ಮ ಎಲ್ಲಾ ಲೈವ್ ತರಗತಿಗಳ ಜೂಮ್ ಲಿಂಕ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ. ಮುಂಜಾನೆ ಅಷ್ಟಾಂಗ/ಶಕ್ತಿ ತರಬೇತಿ ಮತ್ತು ಮಲಗುವ ಮುನ್ನ ಸುಶಿ ನೈಟ್ಸ್ ಅಭ್ಯಾಸ ಮಾಡಿ.",
    price: 599,
    originalPrice: 899,
    badge: "ALL-ACCESS PASS • BEST VALUE",
    badgeKn: "ಕಾಂಬೋ ಪಾಸ್ • ಅತ್ಯುತ್ತಮ ಕೊಡುಗೆ",
    image: ASSETS.poseAdiyogiGraceStanding || ASSETS.poseAdiyogiNatarajasana
  };

  const foundCombo = workshops.find(
    (w) =>
      w.slug === "combo-pass" ||
      w.id === "combo-pass" ||
      w.slug === "combo" ||
      w.category === "combo"
  );

  const comboPass = foundCombo || fallbackCombo;
  const comboImage = comboPass.image || fallbackCombo.image;

  return (
    <section id="combo-pass" className="w-full py-6 sm:py-10 max-w-[1280px] mx-auto px-3 sm:px-6 md:px-8 scroll-mt-20 sm:scroll-mt-28">
      <AnimatedBorderCard>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Narrative & Feature Badges */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5">
            {/* Luminous Terracotta Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#D48C46] via-[#C26D38] to-[#9E4E20] text-white text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-widest shadow-md border border-[#FEF3D6]/30 max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#FEF3D6] animate-pulse shrink-0" />
              <span className="truncate">{isKn ? (comboPass.badgeKn || "ಕಾಂಬೋ ಪಾಸ್ • ಅತ್ಯುತ್ತಮ ಕೊಡುಗೆ") : (comboPass.badge || "ALL-ACCESS PASS • BEST VALUE")}</span>
            </div>

            {/* Bilingual High-Contrast Typography */}
            <div className="space-y-1">
              <h3 className="font-sans text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C3325] leading-tight">
                {comboPass.title}
              </h3>
              <p className="font-sans text-lg sm:text-2xl font-bold text-[#C26D38]">
                {comboPass.titleKn}
              </p>
            </div>

            {/* Rich Narrative Description */}
            <p className="text-[13.5px] sm:text-[15px] text-[#424843] max-w-2xl leading-relaxed">
              {isKn ? (comboPass.descriptionKn || comboPass.description) : comboPass.description}
            </p>

            {/* 4 Colored Feature Badges with Clear Subtitles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-[12.5px] sm:text-[13px]">
              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 border border-[#2D4A37]/15 shadow-2xs hover:border-[#1C3325]/30 transition-all">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg sm:rounded-xl bg-[#1C3325] text-[#BEE8DC] shrink-0 font-bold shadow-xs mt-0.5">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div>
                  <h5 className="font-bold text-[#1C3325] leading-snug text-[12.5px] sm:text-[13.5px]">All 6 Daily Batches Included</h5>
                  <p className="text-[11px] sm:text-[11.5px] text-[#5B635E]">Ashtanga, Strength, &amp; Sushii Nights</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 border border-[#2D4A37]/15 shadow-2xs hover:border-[#C26D38]/30 transition-all">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg sm:rounded-xl bg-[#C26D38] text-white shrink-0 font-bold shadow-xs mt-0.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div>
                  <h5 className="font-bold text-[#1C3325] leading-snug text-[12.5px] sm:text-[13.5px]">24-Hour Zoom Replays</h5>
                  <p className="text-[11px] sm:text-[11.5px] text-[#5B635E]">Never miss a class on busy days</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 border border-[#2D4A37]/15 shadow-2xs hover:border-[#2D4A37]/30 transition-all">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg sm:rounded-xl bg-[#2D4A37] text-[#BEE8DC] shrink-0 font-bold shadow-xs mt-0.5">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div>
                  <h5 className="font-bold text-[#1C3325] leading-snug text-[12.5px] sm:text-[13.5px]">Private WhatsApp Cohort</h5>
                  <p className="text-[11px] sm:text-[11.5px] text-[#5B635E]">Daily direct links &amp; community sadhana</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 border border-[#2D4A37]/15 shadow-2xs hover:border-[#D48C46]/30 transition-all">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg sm:rounded-xl bg-[#D48C46] text-white shrink-0 font-bold shadow-xs mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div>
                  <h5 className="font-bold text-[#1C3325] leading-snug text-[12.5px] sm:text-[13.5px]">Direct Guidance with Sushii</h5>
                  <p className="text-[11px] sm:text-[11.5px] text-[#5B635E]">Form corrections &amp; lifestyle support</p>
                </div>
              </div>
            </div>

            {/* Savings Callout Ribbon */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1 text-[11.5px] sm:text-[12.5px] text-[#1C3325] font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-[#BEE8DC] text-[#0A2617] text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wide shrink-0">
                Best Offer
              </span>
              <span>{isKn ? "ಪ್ರತ್ಯೇಕ ತರಗತಿಗಳಿಗೆ ಹೋಲಿಸಿದರೆ ತಿಂಗಳಿಗೆ ₹300 ಉಳಿತಾಯ!" : "Save ₹300 every month compared to booking separate batches!"}</span>
            </div>
          </div>

          {/* Right VIP Pass Ticket with Photo Showcase */}
          <div className="lg:col-span-5 xl:col-span-4 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0F2419] via-[#1C3325] to-[#254231] text-white p-4 sm:p-6 shadow-xl sm:shadow-2xl overflow-hidden border border-[#D48C46]/35 space-y-3.5 sm:space-y-4">
              
              {/* Internal Accent Glow Orbs */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-44 h-44 rounded-full bg-[#D48C46]/30 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-44 h-44 rounded-full bg-[#84A98C]/25 blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-3.5 sm:space-y-4">
                
                {/* Visual Yoga Photo Preview Frame */}
                <div className="relative h-36 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-inner border border-white/15">
                  <img
                    src={comboImage}
                    alt={comboPass.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: "center 40%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419] via-[#0F2419]/30 to-transparent" />
                  
                  {/* Floating Badges on Image */}
                  <div className="absolute top-2 inset-x-2 sm:top-2.5 sm:inset-x-2.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/70 backdrop-blur-md text-[9.5px] sm:text-[10.5px] font-bold text-white shadow-xs">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Daily Zoom
                    </span>
                    <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#D48C46] text-white text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                      VIP PASS
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 sm:bottom-2.5 sm:left-3 z-10">
                    <p className="text-[11px] sm:text-[12px] font-bold text-white/95 drop-shadow-sm">
                      Mysuru Lineage Sadhana
                    </p>
                  </div>
                </div>

                {/* Price & Savings Display */}
                <div className="space-y-1 pt-0.5 sm:pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10.5px] sm:text-[11px] text-white/75 uppercase tracking-wider font-bold block">
                      {t("monthlyInvestment")}
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#BEE8DC] text-[#0A2617] text-[10px] sm:text-[11px] font-extrabold">
                      Save ₹300/mo (33% OFF)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 whitespace-nowrap pt-0.5 sm:pt-1">
                    <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight">
                      ₹{comboPass.price}
                    </span>
                    {comboPass.originalPrice > comboPass.price && (
                      <span className="text-base sm:text-lg text-white/50 line-through tabular-nums font-sans">
                        ₹{comboPass.originalPrice}
                      </span>
                    )}
                    <span className="text-[13px] sm:text-[14px] text-[#FFDBC9] font-bold">/month</span>
                  </div>
                  
                  <p className="text-[11.5px] sm:text-[12px] text-[#BEE8DC] font-medium">
                    Unlimited access to all morning &amp; evening batches
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => openBookingModal(comboPass.slug || comboPass._id)}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#D48C46] via-[#C26D38] to-[#D48C46] bg-[length:200%_auto] hover:bg-right text-[#FDFBF7] font-extrabold text-[14px] sm:text-[15px] shadow-lg hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer group min-h-[48px]"
                  type="button"
                >
                  <span>{t("getAllAccess")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Guarantee & Language subtext */}
                <div className="text-center pt-0.5 text-[10.5px] sm:text-[11.5px] text-white/70">
                  <span>Taught in Kannada &amp; English • Flexible timings</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </AnimatedBorderCard>
    </section>
  );
};
