import React from "react";

/**
 * Aceternity-style Animated Glowing Border Card
 * Creates a glowing biophilic border aura around featured highlights (e.g. Combo Pass)
 */
export const AnimatedBorderCard = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative p-[2px] sm:p-[2.5px] overflow-hidden rounded-3xl sm:rounded-[2.5rem] group shadow-xl ${className}`} {...props}>
      {/* Animated Rotating Conic Gradient Border Layer */}
      <div
        className="absolute -inset-[150%] animate-border-spin opacity-85 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #D48C46 0deg, #2D4A37 60deg, #84A98C 120deg, #D48C46 180deg, #C26D38 240deg, #2D4A37 300deg, #D48C46 360deg)",
        }}
      />
      
      {/* Internal Content Container */}
      <div className="relative rounded-[calc(1.5rem-2px)] sm:rounded-[calc(2.5rem-2.5px)] bg-gradient-to-br from-[#FAF8F2] via-[#FDFBF7] to-[#F5ECE0] p-4 sm:p-7 lg:p-10 text-[#1A1F1C] border border-[#2D4A37]/10 overflow-hidden">
        {/* Subtle Ambient Background Orbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#D48C46]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#2D4A37]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

