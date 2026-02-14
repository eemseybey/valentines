"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import LoveLetterDisplay from "@/components/LoveLetterDisplay";
import OrientationGuard from "@/components/OrientationGuard";
import { config } from "@/config/personalization";
import { useValentinesAudio } from "@/hooks/useValentinesAudio";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

const ANIM_DURATION = 2;
const START_TRANSITION_DURATION = 1.8;

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [revealedLineCount, setRevealedLineCount] = useState(0);
  const { startMusic, playMatchSound } = useValentinesAudio();

  const handleStart = () => {
    startMusic();
    setHasStarted(true);
  };

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="start-overlay"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-hearts-pattern"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: START_TRANSITION_DURATION, ease: "easeInOut" }}
          >
            <div className="relative flex flex-col items-center">
              {/* Floating hearts around the button */}
              <motion.span
                className="absolute -top-8 -left-6 text-2xl"
                animate={{ y: [0, -6, 0], opacity: [0.7, 0.9, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                💕
              </motion.span>
              <motion.span
                className="absolute -top-6 -right-8 text-xl"
                animate={{ y: [0, 5, 0], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                💗
              </motion.span>
              <motion.span
                className="absolute -bottom-6 -left-10 text-xl"
                animate={{ y: [0, -5, 0], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                💖
              </motion.span>
              <motion.span
                className="absolute -bottom-8 -right-6 text-2xl"
                animate={{ y: [0, 6, 0], opacity: [0.7, 0.9, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                💝
              </motion.span>
              <motion.span
                className="absolute -left-4 top-1/2 -translate-y-1/2 text-lg"
                animate={{ x: [0, -4, 0], opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                💕
              </motion.span>
              <motion.span
                className="absolute -right-4 top-1/2 -translate-y-1/2 text-lg"
                animate={{ x: [0, 4, 0], opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                💗
              </motion.span>
              <motion.button
                onClick={handleStart}
                className={`relative px-12 py-4 rounded-2xl bg-gradient-to-r from-rose-400/90 via-pink-400/90 to-amber-300/90 border-2 border-rose-200/60 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-105 transition-all duration-300 ${playfairDisplay.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl lg:text-2xl font-semibold text-white drop-shadow-md">
                  Tap to begin
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex items-center justify-center min-h-screen overflow-hidden relative bg-hearts-pattern">
        {hasStarted && process.env.NODE_ENV === "development" && !showValentinesProposal && (
          <button
            onClick={() => {
              startMusic();
              playMatchSound();
              handleShowProposal();
            }}
            className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-medium bg-amber-500/90 hover:bg-amber-500 text-black rounded shadow-lg"
          >
            Skip to message (dev)
          </button>
        )}
        {hasStarted && !showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: START_TRANSITION_DURATION, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <LoveLetterDisplay
              lines={config.loveLetterLines}
              revealedCount={revealedLineCount}
            />
            <PhotoPairGame
              handleShowProposal={handleShowProposal}
              onMatch={(pairIndex) =>
                setRevealedLineCount((prev) =>
                  Math.max(prev, Math.min(pairIndex, config.loveLetterLines.length))
                )
              }
              playMatchSound={playMatchSound}
            />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </motion.div>
        ) : hasStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal />
          </motion.div>
        ) : null}
      </main>
    </OrientationGuard>
  );
}
