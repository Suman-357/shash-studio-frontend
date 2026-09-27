import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";

export const Footer = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <footer className="w-full bg-[#F6F3ED] text-[#1A1F1C] pt-16 pb-12 mt-20 border-t border-[#2D4A37]/10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand & Lineage */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪷</span>
              <span className="font-serif text-2xl font-bold text-[#1C3325] tracking-tight">
                SHASH Studios
              </span>
            </div>
            <p className="font-serif text-lg text-[#2D4A37] italic tracking-wide">
              “ಉಸಿರಾಡಿ. ಚಲಿಸಿ. ಗುಣಮುಖರಾಗಿ.”
            </p>
            <p className="text-[14px] text-[#5B635E] leading-relaxed max-w-sm">
              {t("footerDesc")}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE8DE] text-[#1C3325] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#D48C46]">location_on</span>
                Mysuru, Karnataka, India
              </span>
            </div>
          </div>

          {/* Holistic Workshops Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[15px] font-bold text-[#1C3325] uppercase tracking-wider">
              {lang === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳು" : "Holistic Workshops"}
            </h3>
            <ul className="space-y-2 text-[14px] text-[#424843]">
              <li>
                <button
                  onClick={() => openBookingModal("21day")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "21 ದಿನಗಳ ಸಂಪೂರ್ಣ ಸವಾಲು" : "21-Day Holistic Challenge"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal("sushii_nights")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "ಸುಶಿ ನೈಟ್ಸ್ (₹49)" : "Sushii Nights (₹49)"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal("ladies")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "ಮಹಿಳೆಯರ ವಿಶೇಷ ಯೋಗ (₹179)" : "Ladies Yoga & Hormone Balance"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal("strength")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "ಶಕ್ತಿ ತರಬೇತಿ ಮತ್ತು ಕ್ಯಾಲಿಸ್ತೆನಿಕ್ಸ್" : "Strength Training for Yogis"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal("kids")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "ಮಕ್ಕಳ ಯೋಗ (6 - 14 ವರ್ಷ)" : "Kids Yoga & Mindfulness"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal("ashtanga")}
                  className="hover:text-[#1C3325] transition-colors text-left"
                >
                  {lang === "kn" ? "ಮೈಸೂರು ಅಷ್ಟಾಂಗ ಪ್ರೈಮರಿ ಸೀರೀಸ್" : "Mysore Ashtanga Primary Series"}
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => openBookingModal("combo")}
                  className="text-[#D48C46] font-bold hover:underline"
                >
                  {lang === "kn" ? "✦ ಸಂಪೂರ್ಣ ಆರೋಗ್ಯ ಕಾಂಬೋ ಪಾಸ್ (₹599)" : "✦ All-Access Combo Pass (₹599)"}
                </button>
              </li>
            </ul>
          </div>

          {/* Teacher Channels */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[15px] font-bold text-[#1C3325] uppercase tracking-wider">
              {lang === "kn" ? "ಗುರುಗಳ ಚಾನೆಲ್" : "Teacher Channels"}
            </h3>
            <ul className="space-y-2 text-[14px] text-[#424843]">
              <li>
                <a
                  href="https://instagram.com/sushiidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  @sushiidays
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/shash.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  @shash.studios
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@sushiidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-red-600">smart_display</span>
                  YouTube Channel
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917676405895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-green-600">chat</span>
                  WhatsApp Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Shala Support Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[15px] font-bold text-[#1C3325] uppercase tracking-wider">
              {lang === "kn" ? "ಸಹಾಯ ಮತ್ತು ಸಂಪರ್ಕ" : "Sanctuary Support"}
            </h3>
            <p className="text-[13px] text-[#5B635E]">
              {lang === "kn"
                ? "ಲೈವ್ ಬ್ಯಾಚ್ ವೇಳಾಪಟ್ಟಿ, ಯುಪಿಐ ಪಾವತಿ ಅಥವಾ ಜೂಮ್ ಆನ್‌ಬೋರ್ಡಿಂಗ್‌ಗಾಗಿ ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಸಂಯೋಜಕರನ್ನು ಸಂಪರ್ಕಿಸಿ."
                : "Reach our coordinator team for live batch schedules, regional bank transfers, or Zoom onboarding."}
            </p>
            <div className="space-y-2 pt-1 text-[13px] text-[#1A1F1C]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#84A98C]">call</span>
                <span className="font-semibold">+91 76764 05895</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#84A98C]">mail</span>
                <span>shashstudios@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#84A98C]">schedule</span>
                <span>Mon – Sat: 5:30 AM – 7:30 PM IST</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/917676405895"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1C3325] hover:bg-[#EDE8DE] transition-colors text-[12px] font-bold shadow-xs border border-[#2D4A37]/15"
              >
                <span className="material-symbols-outlined text-[16px] text-[#25D366]">forum</span>
                <span>{lang === "kn" ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ" : "Message on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-neutral-300/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#5B635E]">
          <p>© 2026 SHASH Studios (@sushiidays). Made with 🪷 in Mysuru, Karnataka.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#" className="hover:text-[#1C3325]">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1C3325]">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1C3325]">Refund &amp; Reschedule</a>
            <span>•</span>
            <span className="font-semibold text-[#1C3325]">ಕನ್ನಡ ಸೇವೆ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
