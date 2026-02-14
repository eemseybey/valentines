"use client";

import { useCallback, useRef, useEffect } from "react";
import { config } from "@/config/personalization";

export function useValentinesAudio() {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  const startMusic = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    try {
      const audio = new Audio(config.audio.backgroundMusicPath);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch(() => {});
      bgMusicRef.current = audio;
    } catch {
      // Audio file may not exist yet
    }
  }, []);

  const playMatchSound = useCallback(() => {
    try {
      const audio = new Audio(config.audio.matchSoundPath);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch {
      // Match sound may not exist yet
    }
  }, []);

  useEffect(() => {
    return () => {
      bgMusicRef.current?.pause();
    };
  }, []);

  return { startMusic, playMatchSound };
}
