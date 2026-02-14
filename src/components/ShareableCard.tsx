"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { config } from "@/config/personalization";
import html2canvas from "html2canvas";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

type ShareableCardProps = {
  onCapture?: (blob: Blob) => void;
};

export default function ShareableCard({ onCapture }: ShareableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#2d1a24",
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `valentines-${config.names.proposer}-${config.names.recipient}.png`;
          a.click();
          URL.revokeObjectURL(url);
          onCapture?.(blob);
        }
      });
    } catch {
      // Fallback: try share if download fails
    } finally {
      setIsCapturing(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#2d1a24",
        scale: 2,
        useCORS: true,
      });
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b));
      });
      if (blob && canShare && navigator.share) {
        const file = new File(
          [blob],
          `valentines-${config.names.proposer}-${config.names.recipient}.png`,
          { type: "image/png" }
        );
        await navigator.share({
          files: [file],
          title: "She said yes!",
          text: `${config.names.proposer} & ${config.names.recipient}`,
        });
      } else {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `valentines-${config.names.proposer}-${config.names.recipient}.png`;
        a.click();
      }
    } catch {
      handleDownload();
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className={`w-72 bg-gradient-to-br from-rose-900/90 to-pink-900/90 rounded-2xl p-6 border-2 border-amber-200/30 shadow-xl ${playfairDisplay.className}`}
      >
        <p className="text-2xl font-semibold text-amber-100 text-center">
          {config.names.proposer} & {config.names.recipient}
        </p>
        <p className="text-sm text-rose-200/80 text-center mt-1">
          {formatDate()}
        </p>
        <p className="text-xl font-bold text-rose-50 text-center mt-3">
          {config.shareCard.headline}
        </p>
      </div>
      <div className="flex gap-3">
        <motion.button
          onClick={handleDownload}
          disabled={isCapturing}
          className="px-4 py-2 text-sm font-medium text-rose-50 bg-rose-800/70 hover:bg-rose-700/70 rounded-xl disabled:opacity-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCapturing ? "..." : "Save image"}
        </motion.button>
        {canShare && (
          <motion.button
            onClick={handleShare}
            disabled={isCapturing}
            className="px-4 py-2 text-sm font-medium text-rose-50 bg-rose-800/70 hover:bg-rose-700/70 rounded-xl disabled:opacity-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCapturing ? "..." : "Share"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
