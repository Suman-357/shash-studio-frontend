import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TRANSFORMATION_SLIDES } from "../../assets";
import { useLanguage } from "../../context/LanguageContext";

export const HeroTransformationCard = () => {
  const { lang } = useLanguage();
  const isKn = lang === "kn";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = TRANSFORMATION_SLIDES;
  const currentSlide = slides[currentIndex];

  // Auto-advance slides every 3.2 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Backing Frame with Organic Tilt & Subtle Spring Elevation */}
      <motion.div
        className="absolute -inset-2.5 rounded-[2.5rem] bg-[#EDE8DE]/90 -rotate-2 transform"
        animate={{ rotate: isPaused ? -1 : -2.5, scale: isPaused ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      {/* Main Interactive Showcase Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#FDFBF7] shadow-2xl border border-white/80">
        <div className="relative h-[440px] sm:h-[490px] w-full bg-neutral-900 overflow-hidden">
          {/* Framer Motion Cross-fading Slide Images */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.titleEn}
                className="h-full w-full object-cover"
                style={{ objectPosition: currentSlide.objectPosition || "center" }}
                loading="eager"
              />
              {/* Soft Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3325]/90 via-[#1C3325]/25 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Top Overlapping Tag Badge with Spring Animation */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
            <motion.div
              key={currentSlide.id + "-badge"}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/90 shadow-md text-[#1C3325]"
            >
              <span className="w-2 h-2 rounded-full bg-[#C26D38] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide uppercase">
                {isKn ? currentSlide.tagKn : currentSlide.tagEn}
              </span>
            </motion.div>
          </div>

          {/* Navigation Arrows with Lucide Icons + Framer Motion Spring */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.15, backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
            aria-label="Previous Slide"
            type="button"
          >
            <ChevronLeft className="w-4.5 h-4.5 text-white" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.15, backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
            aria-label="Next Slide"
            type="button"
          >
            <ChevronRight className="w-4.5 h-4.5 text-white" />
          </motion.button>

          {/* Bottom Pagination Pill Dots with Framer Motion Spring Width Expansion */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="relative py-1 cursor-pointer focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              >
                <motion.div
                  animate={{
                    width: idx === currentIndex ? 24 : 6,
                    backgroundColor: idx === currentIndex ? "#ffffff" : "rgba(255, 255, 255, 0.45)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="h-1.5 rounded-full shadow-xs"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
