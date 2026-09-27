import React, { useRef, useState } from "react";

/**
 * Aceternity-style Spotlight Card
 * Features a gentle radiant light following pointer cursor on desktop,
 * and elegant static glow on mobile devices with 0fps drop.
 */
export const CardSpotlight = ({
  children,
  className = "",
  spotlightColor = "rgba(132, 169, 140, 0.18)",
  ...props
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};
