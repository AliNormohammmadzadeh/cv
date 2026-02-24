import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  fullWidth?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  href,
  fullWidth = false,
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

  const wrapClass = fullWidth ? "block w-full" : "inline-block";

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={wrapClass}
    >
      <button
        type={type}
        onClick={onClick}
        className={`relative overflow-hidden group ${fullWidth ? "w-full" : ""} ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 h-full">
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
      <a href={href} className={wrapClass}>
        {content}
      </a>
    );
  }

  return content;
};

export default MagneticButton;