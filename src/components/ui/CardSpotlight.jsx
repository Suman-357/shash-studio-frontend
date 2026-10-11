import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Aceternity Spotlight Card powered by Framer Motion
 * Smooth 60-120 FPS cursor spotlight with spring hover elevation
 */
export const CardSpotlight = ({
  children,
  className = "",
  spotlightColor = "rgba(132, 169, 140, 0.18)",
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`group relative overflow-hidden rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 transition-shadow duration-300 hover:shadow-xl ${className}`}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
