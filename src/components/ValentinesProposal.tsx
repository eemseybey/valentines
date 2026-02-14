import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";
import { config } from "@/config/personalization";
import FloatingHearts from "./FloatingHearts";
import ShareableCard from "./ShareableCard";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// Dynamically load all photos from game-photos folder (same as PhotoPairGame)
const imagesContext = (require as NodeRequire & {
  context: (dir: string, recurse: boolean, pattern: RegExp) => {
    keys: () => string[];
  };
}).context("../../public/game-photos", false, /\.(avif|jpg|jpeg|png|webp)$/i);
const images: string[] = imagesContext
  .keys()
  .sort((a: string, b: string) => {
    const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
    return numA - numB;
  })
  .map((key: string) => "/game-photos/" + key.replace("./", ""));

// Shown randomly when user hovers/clicks the No button
const NO_MESSAGES = [
  "That wasn't a final answer.",
  "I'll ask again tomorrow.",
  "Try that again.",
  "You sure about that?",
  "Think it through.",
  "I don't accept that.",
  "Reconsider.",
  "I'll change your mind.",
  "Not convincing.",
  "That's a maybe.",
  "You can do better than that.",
  "I'll wait.",
  "We'll revisit this.",
  "That's negotiable.",
  "I hear doubt in that \"no.\"",
  "I don't quit that easy.",
  "Give it another thought.",
  "That's round one.",
  "I'm persistent.",
  "You'll regret that answer.",
  "That's not your final form.",
  "I'm not done asking.",
  "We're not finished here.",
  "I'll earn a yes.",
  "I like a challenge.",
  "That's temporary.",
  "Watch me work.",
  "I'm built different.",
  "I don't fold.",
  "Say it with confidence.",
  "That sounded unsure.",
  "I'll circle back.",
  "I'll make it worth it.",
  "You're underestimating me.",
  "That's a soft no.",
  "I don't lose that easily.",
  "I'm not convinced.",
  "You'll see.",
  "Bet.",
  "I love a challenge.",
  "That's not how this ends.",
  "I'll upgrade the offer.",
  "Round two coming up.",
  "I'm stubborn.",
  "I respect it… but I'm not done.",
  "You just activated my competitive side.",
  "I'll be back.",
  "Challenge accepted.",
  "You sure you want to stick with that?",
  "I don't hear a definite no.",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [noMessage, setNoMessage] = useState<string | null>(null);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  const getRandomNoMessage = () =>
    NO_MESSAGES[Math.floor(Math.random() * NO_MESSAGES.length)];

  const handleNoInteraction = () => {
    setPosition(getRandomPosition());
    setNoMessage(getRandomNoMessage());
  };

  useEffect(() => {
    if (step < 2) {
      // Change step after 5 seconds
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
      {(step === 2 || step === 3) && <FloatingHearts />}
      <motion.div
        className="fixed inset-0 grid grid-cols-12 grid-rows-8 gap-px pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 14, ease: "easeInOut" }}
      >
        {Array.from({ length: 96 }).map((_, index) => (
          <div key={index} className="relative min-h-0 min-w-0">
            <Image
              src={images[index % images.length]}
              alt=""
              fill
              className="object-cover"
              sizes="8vw"
            />
          </div>
        ))}
      </motion.div>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 text-rose-50 text-center drop-shadow-lg ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            🎉 Congratulations! You have completed the game.
          </motion.h2>
        )}
        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 text-rose-50 text-center drop-shadow-lg ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ✨ I have a surprise for you, my lover!
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative z-10"
          >
            <h2
              className={`text-5xl font-semibold mb-8 text-rose-50 text-center drop-shadow-lg ${playfairDisplay.className}`}
            >
              💕 {config.names.recipient}, will you be my Valentine? 💕
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
              className="opacity-100"
            />
            {noMessage && (
              <p
                className={`mt-3 text-lg text-amber-200/90 text-center drop-shadow-md ${playfairDisplay.className}`}
              >
                {noMessage}
              </p>
            )}
            <div className="flex space-x-4 mt-10">
              <button
                className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-amber-400 via-pink-400 to-rose-500 rounded-2xl hover:from-amber-500 hover:via-pink-500 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-amber-100 bg-rose-900/50 border border-amber-400/30 rounded-2xl hover:bg-rose-800/50 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center text-rose-50 text-center drop-shadow-lg relative z-10 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            Thank you for accepting, {config.names.recipient}! I love you so much! 💕
            <p className="text-lg mt-4 text-amber-200">Yieeeeeee</p>
            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={200}
              height={200}
              unoptimized
            />
            <div className="mt-6">
              <ShareableCard />
            </div>
            <div className="mt-6 mx-4 max-w-lg">
              <p className="text-lg lg:text-xl font-medium text-rose-50 text-center px-6 py-4 rounded-xl bg-rose-900/40 border-2 border-amber-300/40 shadow-lg drop-shadow-md">
                🎁 {config.shareCard.giftReminder}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
