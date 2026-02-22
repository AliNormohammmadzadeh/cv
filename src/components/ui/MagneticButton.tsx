import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  onClick, 
  type = "button",
  href
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // CHANGED: From "inline-block" to "block w-full" so it stretches to fit the form
      className="block w-full" 
    >
      <button
        type={type}
        onClick={onClick}
        className={`relative overflow-hidden group w-full ${className}`}
      >
        {/* CHANGED: Added flex, items-center, justify-center, gap-2, and w-full here so text and icon sit side-by-side */}
        <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
          {children}
        </span>
        <motion.div 
          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      </button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="w-full block">
        {content}
      </a>
    );
  }

  return content;
};

export default MagneticButton;