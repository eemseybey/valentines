"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

type LoveLetterDisplayProps = {
  lines: string[];
  revealedCount: number;
};

export default function LoveLetterDisplay({
  lines,
  revealedCount,
}: LoveLetterDisplayProps) {
  if (revealedCount === 0) return null;

  const visibleLines = lines.slice(0, revealedCount);
  const latestLine = visibleLines[visibleLines.length - 1];

  return (
    <div className="min-h-[4rem] max-h-32 overflow-y-auto px-4 mb-4 flex flex-col justify-end">
      <AnimatePresence mode="wait">
        <motion.p
          key={revealedCount}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-lg lg:text-xl text-amber-100/95 text-center italic max-w-md mx-auto ${playfairDisplay.className}`}
        >
          {latestLine}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
