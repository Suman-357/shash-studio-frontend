import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-[#EDE8DE] text-[#1C3325]",
    terracotta: "bg-[#D48C46]/15 text-[#C26D38] border border-[#D48C46]/30",
    sage: "bg-[#84A98C]/20 text-[#1C3325] border border-[#84A98C]/30",
    moss: "bg-[#2D4A37]/15 text-[#1C3325] border border-[#2D4A37]/20",
    highlight: "bg-[#D48C46] text-[#FDFBF7] font-bold shadow-sm"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};
