import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { useProductsQuery } from "../../hooks/useWorkshopsQuery";
import { AnnouncementBar } from "./AnnouncementBar";
import logo from "../../assets/logo.png";
import { IconArrowRight, IconClose, IconMenu, IconShoppingCart } from "../ui/Icons";

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const isKn = lang === "kn";
  const { openBookingModal } = useBooking();
  const { data: products = [] } = useProductsQuery();
  const location = useLocation();
  const isShop = location.pathname === "/shop";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FCF9F3]/95 backdrop-blur-xl border-b border-[#2D4A37]/10 shadow-[0_8px_32px_0_rgba(28,51,37,0.06)] transition-all duration-300">
      {/* Top Announcement Bar cleanly stacked above navbar */}
      <AnnouncementBar />

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Brand Emblem */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 py-1 min-w-0 shrink group">
          <img src={logo} alt="SHASH Studios Logo" className="h-9 w-9 sm:h-12 sm:w-12 object-contain shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-[16px] xs:text-[18px] sm:text-xl md:text-2xl font-black tracking-tight text-[#1C3325] leading-none truncate">
              SHASH Studios
            </span>
            <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-wider sm:tracking-widest text-[#52796F] font-semibold uppercase mt-0.5 truncate">
              stay healthy and stay happy
            </span>
          </div>
        </Link>

        {/* Center Floating Pill Navbar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#2D4A37]/10 shadow-xs">
          <a
            href="/#workshops"
            className="px-3.5 py-1.5 rounded-full text-[#1A1F1C] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-semibold transition-colors"
          >
            {t("navWorkshops")}
          </a>
          <a
            href="/#combo-pass"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navPrograms")}
          </a>
          <a
            href="/#teacher"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navTeacher")}
          </a>
          <a
            href="/#social-hub"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navSocial")}
          </a>
          <a
            href="/#faqs"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navFaqs")}
          </a>
          <a
            href="/#contact"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navContact")}
          </a>
        </nav>

        {/* Right Actions: Shopping Cart Icon + Language Switcher + CTA + Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Dedicated Shopping Cart Icon Button */}
          <Link
            to="/shop"
            className={`relative flex h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
              isShop
                ? "bg-[#1C3325] text-white border-[#1C3325] shadow-sm"
                : "bg-white text-[#1C3325] border-[#2D4A37]/15 hover:bg-[#EDE8DE]"
            }`}
            title={isKn ? "ಯೋಗ ಚಾಪೆಗಳ ಮಳಿಗೆ (Shop)" : "Sanctuary Yoga Mats Store"}
            aria-label="Yoga Mats Cart"
          >
            <IconShoppingCart className="w-4 h-4 sm:w-[19px] sm:h-[19px]" />
            {products.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D48C46] text-[9px] sm:text-[9.5px] font-bold text-white shadow-xs">
                {products.length}
              </span>
            )}
          </Link>

          {/* Bilingual Toggle Button (Compact on mobile, expanded on sm+) */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-[#EDE8DE]/90 shadow-inner">
            <button
              onClick={() => setLang("kn")}
              className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all cursor-pointer ${
                lang === "kn" ? "bg-white text-[#1C3325] shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"
              }`}
              type="button"
              title="Kannada"
            >
              <span className="sm:hidden">KN</span>
              <span className="hidden sm:inline">KN (ಕನ್ನಡ)</span>
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all cursor-pointer ${
                lang === "en" ? "bg-white text-[#1C3325] shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"
              }`}
              type="button"
              title="English"
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button (Tablet / Desktop) */}
          <button
            onClick={() => openBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C3325] text-white hover:bg-[#2D4A37] transition-all shadow-[0_4px_14px_rgba(28,51,37,0.2)] text-[12.5px] sm:text-[13px] font-semibold group cursor-pointer"
          >
            <span>{t("exploreBatches")}</span>
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[#1C3325] hover:bg-[#EDE8DE] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <IconClose className="w-5 h-5 sm:w-6 sm:h-6" /> : <IconMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCF9F3]/98 backdrop-blur-2xl border-b border-[#2D4A37]/10 px-5 py-5 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#EDE8DE]/70 border border-[#2D4A37]/10">
            <span className="text-[12px] font-bold text-[#1C3325]">
              {isKn ? "ಭಾಷೆ / Language" : "Language"}
            </span>
            <div className="inline-flex items-center p-0.5 rounded-full bg-white shadow-xs">
              <button
                onClick={() => setLang("kn")}
                className={`px-3 py-1 rounded-full text-[11.5px] font-bold transition-all cursor-pointer ${
                  lang === "kn" ? "bg-[#1C3325] text-white shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"
                }`}
                type="button"
              >
                ಕನ್ನಡ (KN)
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-[11.5px] font-bold transition-all cursor-pointer ${
                  lang === "en" ? "bg-[#1C3325] text-white shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"
                }`}
                type="button"
              >
                English (EN)
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3 text-[15px] font-medium">
            <a
              href="/#workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navWorkshops")}
            </a>
            <a
              href="/#combo-pass"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navPrograms")}
            </a>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-xl font-semibold flex items-center justify-between transition-colors border-b border-neutral-200/50 ${
                isShop ? "bg-[#1C3325] text-white" : "text-[#1C3325] hover:bg-[#EDE8DE]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <IconShoppingCart className="w-5 h-5 text-[#D48C46]" />
                <span>{isKn ? "ಯೋಗ ಚಾಪೆಗಳ ಮಳಿಗೆ" : "Sanctuary Yoga Mats Store"}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D48C46] text-white text-[10px] font-bold">
                Shop ✦
              </span>
            </Link>
            <a
              href="/#teacher"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navTeacher")}
            </a>
            <a
              href="/#social-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navSocial")}
            </a>
            <a
              href="/#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navFaqs")}
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1"
            >
              {t("navContact")}
            </a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openBookingModal();
            }}
            className="w-full py-3.5 rounded-full bg-[#1C3325] text-white font-semibold text-center shadow-md flex items-center justify-center gap-2"
          >
            <span>{t("exploreBatches")}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}
    </header>
  );
};
