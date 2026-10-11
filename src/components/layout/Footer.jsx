import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { Instagram, Youtube, Phone, Mail, Clock, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export const Footer = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal, workshops = [] } = useBooking();

  return (
    <footer className="w-full bg-[#F6F3ED] text-[#1A1F1C] pt-16 pb-12 mt-20 border-t border-[#2D4A37]/10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12">
          {/* Brand & Lineage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪷</span>
              <span className="font-sans text-2xl font-black text-[#1C3325] tracking-tight">
                SHASH Studios
              </span>
            </div>
            <p className="font-sans text-base font-bold text-[#2D4A37] tracking-normal">
              “ಉಸಿರಾಡಿ. ಚಲಿಸಿ. ಗುಣಮುಖರಾಗಿ.”
            </p>
            <p className="text-[14px] text-[#5B635E] leading-relaxed max-w-sm">
              {t("footerDesc")}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE8DE] text-[#1C3325] text-[12px] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#D48C46]" />
                <span>Mysuru, Karnataka, India</span>
              </span>
            </div>
          </div>

          {/* Holistic Workshops Quick Links */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold text-[#1C3325] uppercase tracking-wider">
              {lang === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳು" : "Holistic Workshops"}
            </h3>
            <ul className="space-y-2 text-[14px] text-[#424843]">
              {workshops.slice(0, 7).map((w) => (
                <li key={w.id || w._id}>
                  <button
                    onClick={() => openBookingModal(w.id || w.slug)}
                    className="hover:text-[#1C3325] transition-colors text-left cursor-pointer"
                  >
                    {lang === "kn" ? (w.titleKn || w.title) : w.title}
                  </button>
                </li>
              ))}
              {workshops.length === 0 && (
                <li>
                  <a href="/#workshops" className="text-[#5B635E] hover:text-[#1C3325] text-[13px]">
                    {lang === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ವೀಕ್ಷಿಸಿ" : "Explore Offerings"}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Teacher Channels */}
          <div className="space-y-3">
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
                  <Instagram className="w-4 h-4 text-[#C26D38] shrink-0" />
                  <span>@sushiidays</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/shash.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#C26D38] shrink-0" />
                  <span>@shash.studios</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@sushiidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-600 shrink-0" />
                  <span>YouTube Channel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917676405895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C3325] transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Shala Support Desk */}
          <div className="space-y-3">
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
                <Phone className="w-4 h-4 text-[#84A98C] shrink-0" />
                <span className="font-semibold">+91 76764 05895</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#84A98C] shrink-0" />
                <span>shashstudios@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#84A98C] shrink-0" />
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
                <FaWhatsapp className="w-4 h-4 text-[#25D366] shrink-0" />
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
