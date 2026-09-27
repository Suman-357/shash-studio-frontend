import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { AnnouncementBar } from "./AnnouncementBar";
import logo from "../../assets/logo.png";
import { IconArrowRight, IconClose, IconMenu } from "../ui/Icons";

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { openBookingModal } = useBooking();
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Brand Emblem */}
        <a href="#" className="flex items-center gap-3 py-1 flex-shrink-0 group">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SHASH Studios Logo" className="h-13 w-13 object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1C3325] leading-none">
                SHASH Studios
              </span>
              <span className="text-[10px] tracking-widest text-[#52796F] font-semibold uppercase mt-0.5">
                stay healthy and stay happy
              </span>
            </div>
          </div>
        </a>

        {/* Center Floating Pill Navbar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#2D4A37]/10 shadow-xs">
          <a
            href="#workshops"
            className="px-3.5 py-1.5 rounded-full text-[#1A1F1C] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-semibold transition-colors"
          >
            {t("navWorkshops")}
          </a>
          <a
            href="#combo-pass"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navPrograms")}
          </a>
          <a
            href="#teacher"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navTeacher")}
          </a>
          <a
            href="#social-hub"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navSocial")}
          </a>
          <a
            href="#faqs"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navFaqs")}
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE] text-[13px] font-medium transition-colors"
          >
            {t("navContact")}
          </a>
        </nav>

        {/* Right Actions: Language Switcher + CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Bilingual Toggle Button */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-[#EDE8DE]/90 shadow-inner">
            <button
              onClick={() => setLang("kn")}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${lang === "kn" ? "bg-white text-[#1C3325] shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"}`}
              type="button"
            >
              KN (ಕನ್ನಡ)
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${lang === "en" ? "bg-white text-[#1C3325] shadow-xs" : "text-[#5B635E] hover:text-[#1C3325]"}`}
              type="button"
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={() => openBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C3325] text-white hover:bg-[#2D4A37] transition-all shadow-[0_4px_14px_rgba(28,51,37,0.2)] text-[13px] font-semibold group cursor-pointer"
          >
            <span>{t("exploreBatches")}</span>
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1C3325] hover:bg-[#EDE8DE] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCF9F3]/95 backdrop-blur-2xl border-b border-[#2D4A37]/10 px-6 py-6 shadow-xl space-y-4">
          <div className="flex flex-col space-y-3 text-[15px] font-medium">
            <a
              href="#workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navWorkshops")}
            </a>
            <a
              href="#combo-pass"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navPrograms")}
            </a>
            <a
              href="#teacher"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navTeacher")}
            </a>
            <a
              href="#social-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navSocial")}
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1A1F1C] hover:text-[#1C3325] py-1 border-b border-neutral-200/50"
            >
              {t("navFaqs")}
            </a>
            <a
              href="#contact"
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
