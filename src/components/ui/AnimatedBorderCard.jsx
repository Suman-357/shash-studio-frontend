import React from "react";

/**
 * Aceternity-style Animated Glowing Border Card
 * Creates a glowing biophilic border aura around featured highlights (e.g. Combo Pass)
 */
export const AnimatedBorderCard = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative p-[1.5px] overflow-hidden rounded-3xl group ${className}`} {...props}>
      {/* Animated Gradient Border Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D48C46] via-[#84A98C] to-[#2D4A37] rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      
      {/* Internal Content Container */}
      <div className="relative rounded-3xl bg-[#1C3325]/95 backdrop-blur-xl p-6 md:p-8 text-[#FDFBF7]">
        {children}
      </div>
    </div>
  );
};
