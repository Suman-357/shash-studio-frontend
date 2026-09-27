import React, { useState, useEffect } from "react";
import { TRANSFORMATION_SLIDES } from "../../assets";
import { useLanguage } from "../../context/LanguageContext";

export const HeroTransformationCard = () => {
  const { lang } = useLanguage();
  const isKn = lang === "kn";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = TRANSFORMATION_SLIDES;
  const currentSlide = slides[currentIndex];

  // Auto-advance slides every 2.8 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2800);
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
      {/* Backing Frame with Organic Tilt */}
      <div className="absolute -inset-2.5 rounded-[2.5rem] bg-[#EDE8DE]/90 -rotate-2 transform transition-transform duration-500" />

      {/* Main Interactive Showcase Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#FDFBF7] shadow-2xl border border-white/80">
        <div className="relative h-[440px] sm:h-[490px] w-full bg-neutral-900 overflow-hidden">

          {/* Cross-fading Background Images */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[400ms] ease-in-out ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              style={{ transitionProperty: "opacity, transform" }}
            >
              <img
                src={slide.image}
                alt={slide.titleEn}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.objectPosition || "center" }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
              {/* Soft Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3325]/90 via-[#1C3325]/25 to-transparent" />
            </div>
          ))}

          {/* Top Overlapping Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
            {/* Real Transformation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/90 shadow-md text-[#1C3325]">
              <span className="w-2 h-2 rounded-full bg-[#C26D38] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide uppercase">
                {isKn ? currentSlide.tagKn : currentSlide.tagEn}
              </span>
            </div>
          </div>

          {/* Navigation Arrows (Visible on hover / desktop) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous Transformation Slide"
            type="button"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next Transformation Slide"
            type="button"
          >
            ›
          </button>

          {/* Bottom Pagination Pill Dots */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentIndex
                  ? "w-6 bg-white shadow-md"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
