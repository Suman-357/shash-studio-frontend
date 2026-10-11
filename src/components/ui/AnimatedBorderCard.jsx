import React from "react";

/**
 * Aceternity-style Animated Glowing Border Card
 * Creates a glowing biophilic border aura around featured highlights (e.g. Combo Pass)
 */
export const AnimatedBorderCard = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative p-[1.5px] overflow-hidden rounded-3xl group ${className}`} {...props}>
      {/* Animated Gradient Border Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D48C46] via-[#84A98C] to-[#2D4A37] rounded-3xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 blur-[1px]" />
      
      {/* Internal Content Container */}
      <div className="relative rounded-3xl bg-[#FAF7F0] p-6 md:p-8 text-[#1A1F1C] border border-[#2D4A37]/10">
        {children}
      </div>
    </div>
  );
};
