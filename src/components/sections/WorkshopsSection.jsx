import React, { useState } from "react";
import { CardSpotlight } from "../ui/CardSpotlight";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { useWorkshopsQuery, useSectionsQuery } from "../../hooks/useWorkshopsQuery";
import { SECTIONS, WORKSHOPS } from "../../data/workshops";
import { IconArrowRight, IconClock } from "../ui/Icons";

const WorkshopCardItem = ({ workshop, sectionObj, isKn, t, onRegister }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allFeatures = workshop.features || [];
  const hasMore = allFeatures.length > 2;
  const displayedFeatures = isExpanded ? allFeatures : allFeatures.slice(0, 2);

  return (
    <CardSpotlight className="flex flex-col justify-between p-5 sm:p-6 bg-[#FDFBF7] border border-[#2D4A37]/10 hover:border-[#2D4A37]/25 transition-all rounded-3xl shadow-xs hover:shadow-md">
      <div className="space-y-3.5">
        {/* Image & Badges */}
        <div className="relative h-52 sm:h-56 w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: workshop.objectPosition || "center" }}
            loading="lazy"
          />
          {/* Top Badges (Category & Spots) */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-[#FDFBF7]/95 backdrop-blur-md text-[10.5px] font-bold text-[#1C3325] shadow-xs">
              {isKn && sectionObj ? sectionObj.nameKn : workshop.categoryLabel}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#1C3325]/85 backdrop-blur-md text-white text-[10px] font-semibold shadow-xs">
              {workshop.spotsLeft} spots left
            </span>
          </div>
        </div>

        {/* Title & Kannada Subtitle */}
        <div className="space-y-1">
          {workshop.badge && (
            <span className="inline-block text-[11px] font-bold text-[#C26D38] tracking-wide uppercase">
              ✦ {workshop.badge}
            </span>
          )}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C3325] leading-snug">
            {isKn ? workshop.titleKn : workshop.title}
          </h3>
          <p className="text-[12px] text-[#5B635E] font-medium">
            {isKn ? workshop.title : workshop.titleKn}
          </p>
        </div>

        {/* Description: 2 lines by default, full on expand */}
        <p className={`text-[13px] text-[#5B635E] leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {isKn ? workshop.descriptionKn : workshop.description}
        </p>

        {/* Key Features Bullets (Top 2 by default) */}
        <ul className="space-y-1.5 pt-0.5 text-[12px] text-[#424843]">
          {displayedFeatures.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#84A98C] text-[11px] mt-0.5 shrink-0">✦</span>
              <span className={isExpanded ? "" : "line-clamp-1"}>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Read More / Show Less Toggle Button */}
        {hasMore && (
          <div className="pt-0.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#D48C46] hover:text-[#B67332] transition-colors py-0.5 cursor-pointer"
              type="button"
            >
              <span>
                {isExpanded
                  ? (isKn ? "ಕಡಿಮೆ ವಿವರ ತೋರಿಸಿ ▴" : "Show less ▴")
                  : (isKn
                      ? `+ ಇನ್ನಷ್ಟು ಓದಿ (${allFeatures.length - 2} ವಿವರಗಳು) ▾`
                      : `+ Read more (${allFeatures.length - 2} more points) ▾`)}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Schedule & Pricing Action */}
      <div className="pt-4 space-y-3 border-t border-[#2D4A37]/10 mt-4">
        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F6F3ED] text-[12px]">
          <div className="flex items-center gap-1.5 text-[#5B635E] overflow-hidden text-ellipsis whitespace-nowrap mr-2">
            <IconClock className="w-3.5 h-3.5 text-[#84A98C] shrink-0" />
            <span className="font-medium truncate">{workshop.timingSlot}</span>
          </div>
          <div className="flex items-baseline gap-1.5 whitespace-nowrap shrink-0">
            <span className="text-lg font-bold text-[#1C3325] whitespace-nowrap">
              ₹{workshop.price}
            </span>
            {workshop.originalPrice > workshop.price && (
              <span className="text-[11px] text-[#5B635E] line-through whitespace-nowrap">
                ₹{workshop.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onRegister}
          className="w-full py-2.5 rounded-full bg-[#1C3325] text-white font-semibold text-[13px] hover:bg-[#2D4A37] transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
          type="button"
        >
          <span>{t("registerBtn")}</span>
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </CardSpotlight>
  );
};

export const WorkshopsSection = () => {
  const { lang, t } = useLanguage();
  const { openBookingModal } = useBooking();
  const [activeSection, setActiveSection] = useState("all");

  const { data: workshopsData, isFetching } = useWorkshopsQuery("all");
  const { data: sectionsData } = useSectionsQuery();
  const workshops = workshopsData || WORKSHOPS;
  const sections = sectionsData || SECTIONS;
  const isKn = lang === "kn";

  const filteredWorkshops =
    activeSection === "all"
      ? workshops
      : workshops.filter((w) => w.section === activeSection);

  const activeSectionObj = sections.find((s) => (s.slug || s.id) === activeSection);

  return (
    <section id="workshops" className="w-full pt-6 sm:pt-8 pb-8 sm:pb-10 bg-[#F8F6F1] relative">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[12px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block">
              {t("batchesSectionTitle")}
            </span>
            {isFetching && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#BEE8DC] text-[#082013] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                Live Sync
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C3325] tracking-tight">
            {t("chooseWorkshop")}
          </h2>
          <p className="text-[15px] text-[#5B635E] leading-relaxed">
            {t("batchesSectionDesc")}
          </p>
        </div>

        {/* Clean, Modern Section Filter Pills */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#2D4A37]/10 shadow-[0_4px_20px_rgba(28,51,37,0.04)] max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => setActiveSection("all")}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeSection === "all"
                  ? "bg-[#1C3325] text-white shadow-xs"
                  : "text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE]/60"
              }`}
              type="button"
            >
              <span>{t("sectionAll")}</span>
              <span className="ml-1.5 text-[11px] opacity-75">({workshops.length})</span>
            </button>

            {sections.map((sec) => {
              const secKey = sec.slug || sec.id;
              const count = workshops.filter((w) => w.section === secKey).length;
              const isActive = activeSection === secKey;
              return (
                <button
                  key={secKey}
                  onClick={() => setActiveSection(secKey)}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#1C3325] text-white shadow-xs"
                      : "text-[#5B635E] hover:text-[#1C3325] hover:bg-[#EDE8DE]/60"
                  }`}
                  type="button"
                >
                  <span>{isKn ? sec.nameKn : sec.name}</span>
                  <span className="text-[11px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Refined Section Tagline */}
        {activeSectionObj && (
          <div className="text-center max-w-xl mx-auto -mt-3">
            <p className="text-[13px] text-[#C26D38] font-medium italic">
              {isKn ? activeSectionObj.taglineKn : activeSectionObj.tagline}
            </p>
          </div>
        )}

        {/* 3-Column Luxury Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredWorkshops.map((workshop) => {
            const sectionObj = SECTIONS.find((s) => s.id === workshop.section);
            return (
              <WorkshopCardItem
                key={workshop.id}
                workshop={workshop}
                sectionObj={sectionObj}
                isKn={isKn}
                t={t}
                onRegister={() => openBookingModal(workshop.id, workshop.section)}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
