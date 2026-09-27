import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { ASSETS } from "../../assets";
import { IconWhatsApp, IconLotus } from "../ui/Icons";

export const TeacherSection = () => {
  const { lang, t } = useLanguage();
  const isKn = lang === "kn";
  const [showVisitingCard, setShowVisitingCard] = useState(false);

  return (
    <section id="teacher" className="w-full py-8 sm:py-12 bg-[#FCF9F3] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Shashirekha Authentic Portrait Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Terracotta Backing Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] bg-[#D48C46]/15 rotate-1" />

              <div className="relative rounded-[2rem] overflow-hidden bg-[#FDFBF7] shadow-xl border border-white/80">
                <img
                  src={ASSETS.poseTempleMeditation}
                  alt="Shashirekha meditating peacefully at Hoysala temple in Belur"
                  className="w-full h-[490px] object-cover"
                  loading="lazy"
                />

                {/* Floating Location Marker */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-between border border-[#2D4A37]/10">
                  <div>
                    <p className="font-bold text-[#1C3325] text-[15px]">Shashirekha C</p>
                    <p className="text-[12px] text-[#5B635E]">Founder &amp; Lead Yoga Guide · Mysuru</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#C26D38]">
                    <span className="w-2 h-2 rounded-full bg-[#C26D38]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Lead Guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Philosophy & Authentic Voice */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[12px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block mb-2">
                {t("teacherTag")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C3325] tracking-tight font-normal">
                {isKn ? "ಯೋಗ ಶಿಕ್ಷಕಿ ಶಶಿರೇಖಾ (Sushii)" : "Meet Shashirekha C (Sushii)"}
              </h2>
              <p className="text-[15px] text-[#5B635E] font-medium mt-1">
                {isKn
                  ? "ಮೈಸೂರು ಯೋಗ ಪರಂಪರೆ, ಕ್ಯಾಲಿಸ್ತೆನಿಕ್ಸ್ ತರಬೇತಿ ಮತ್ತು ಸಮಗ್ರ ಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶಕಿ"
                  : "Mysuru Yoga Lineage, Calisthenics Conditioning & Mindful Movement"}
              </p>
            </div>

            {/* Credential Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#EDE8DE] text-[12px] font-semibold text-[#1C3325]">
                @sushiidays
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EDE8DE] text-[12px] font-semibold text-[#1C3325]">
                @shash.studios
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EDE8DE] text-[12px] font-semibold text-[#1C3325]">
                Yoga Instructor
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EDE8DE] text-[12px] font-semibold text-[#1C3325]">
                Calisthenics Coach
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EDE8DE] text-[12px] font-semibold text-[#1C3325]">
                Mysuru Native
              </span>
            </div>

            {/* Highlighted Quote Card */}
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs space-y-3">
              <p className="font-serif text-lg sm:text-xl text-[#1C3325] italic leading-snug">
                “ನಾನು ಹುಟ್ಟಿ ಬೆಳೆದದ್ದು ಸಾಂಪ್ರದಾಯಿಕ ಯೋಗದ ನಗರಿ ಮೈಸೂರಿನಲ್ಲಿ. ನಮ್ಮದೇ ಭಾಷೆಯಾದ ಕನ್ನಡದಲ್ಲಿ ಯೋಗ ಮತ್ತು ಆರೋಗ್ಯ ಶೈಲಿಯನ್ನು ಸರಳವಾಗಿ ತಿಳಿಸಿಕೊಡುವುದೇ ನನ್ನ ಗುರಿ.”
              </p>
              <p className="text-[14px] text-[#5B635E] italic border-l-2 pl-4 border-[#84A98C]">
                “Your body deserves movement. Your mind deserves stillness. Your soul deserves Sadhana. After experiencing corporate burnout, I reconnected with authentic Mysore Ashtanga and created SHASH Studios to bring accessible, transformative wellness to homes everywhere.”
              </p>
            </div>

            {/* Contact & Social Channels Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/917676405895?text=Namaskara%20Shashirekha%2C%20I%20would%20like%20to%20know%20more%20about%20SHASH%20Studios%20classes."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-green-600 transition-all text-[13px] font-bold shadow-xs cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-white" />
                <span>WhatsApp: +91 76764 05895</span>
              </a>

              <a
                href="https://www.instagram.com/sushiidays/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1C3325] hover:bg-[#EDE8DE] transition-all text-[13px] font-semibold border border-[#2D4A37]/15 shadow-xs"
              >
                <span>📸</span>
                <span>@sushiidays</span>
              </a>

              <button
                onClick={() => setShowVisitingCard(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#EDE8DE] text-[#1C3325] hover:bg-[#DCDAD4] transition-all text-[13px] font-semibold cursor-pointer"
                type="button"
              >
                <span>🪪</span>
                <span>{isKn ? "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್ ನೋಡಿ" : "Visiting Card"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visiting Card Lightbox Modal */}
      {showVisitingCard && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowVisitingCard(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <span className="font-serif font-bold text-[#1C3325] text-[15px]">
                Shashirekha C · SHASH Studios
              </span>
              <button
                onClick={() => setShowVisitingCard(false)}
                className="w-7 h-7 rounded-full bg-[#EDE8DE] text-[#1C3325] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="pt-3">
              <img
                src={ASSETS.visitingCard}
                alt="Shashirekha C Official Visiting Card"
                className="w-full rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
