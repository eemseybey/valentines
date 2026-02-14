"use client";

import { motion } from "framer-motion";

const HEART_COUNT = 12;
const heartChars = ["💕", "💗", "💖", "💝"];

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: HEART_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-xl lg:text-2xl opacity-20"
          style={{
            left: `${(i * 7 + 3) % 90}%`,
            top: `${(i * 11 + 5) % 90}%`,
            animationDelay: `${i * 0.5}s`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {heartChars[i % heartChars.length]}
        </motion.span>
      ))}
    </div>
  );
}
