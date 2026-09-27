import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { IconWhatsApp } from "../ui/Icons";

export const AnnouncementBar = () => {
  const { lang } = useLanguage();

  const tickerItems = [
    "🌿 Welcome to SHASH Studios · Live Online Batches on Zoom",
    "✦ Taught in Kannada (ಕನ್ನಡ) & English",
    "🪷 Mysore Ashtanga, Strength Training & Ladies Yoga",
    "🌙 Sushii Nights Bedtime Breathwork at 9:30 PM",
    "✨ August Batches Open · Limited Seats per Shala",
    "“ಉಸಿರಾಡಿ. ಚಲಿಸಿ. ಗುಣಮುಖರಾಗಿ.” · Breathe. Move. Heal."
  ];

  return (
    <div className="relative bg-[#EDE8DE]/95 backdrop-blur-md border-b border-[#2D4A37]/10 overflow-hidden h-9 flex items-center px-4">
      {/* Subtle edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#EDE8DE] to-transparent z-10" />
      <div className="pointer-events-none absolute right-32 sm:right-40 top-0 bottom-0 w-12 bg-gradient-to-l from-[#EDE8DE] to-transparent z-10" />

      {/* Infinite Scrolling Marquee Track */}
      <div className="flex-1 overflow-hidden">
        <div className="animate-marquee items-center gap-8 py-0.5 text-[#1C3325] text-[12px] font-medium tracking-wide whitespace-nowrap">
          {/* First loop sequence */}
          {tickerItems.map((item, idx) => (
            <span key={`first-${idx}`} className="inline-flex items-center gap-3">
              <span>{item}</span>
              <span className="text-[#D48C46] opacity-75">✦</span>
            </span>
          ))}
          {/* Second duplicate sequence for seamless infinite loop */}
          {tickerItems.map((item, idx) => (
            <span key={`second-${idx}`} className="inline-flex items-center gap-3">
              <span>{item}</span>
              <span className="text-[#D48C46] opacity-75">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Fixed WhatsApp Action Pill on the right */}
      <div className="relative z-20 pl-3 bg-[#EDE8DE]/95 shrink-0 flex items-center h-full">
        <a
          href="https://wa.me/917676405895"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#1C3325] hover:bg-[#1C3325] hover:text-white transition-all shadow-xs text-[11px] font-semibold border border-[#2D4A37]/10"
        >
          <IconWhatsApp className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="hidden sm:inline">WhatsApp Support</span>
          <span className="sm:hidden">Help</span>
        </a>
      </div>
    </div>
  );
};

