import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Play from "../../assets/images/icons/audio-player/play.svg";
import Pause from "../../assets/images/icons/audio-player/pause.svg";

export const HandlePlayback = ({
  index,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
}: {
  index: number;
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  if (index === -1) return;

  if (currentTrack !== index) {
    setCurrentTrack(index);
    setIsPlaying(true);
    return;
  }

  const audio = audioRef.current;
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    audio.play().catch((error) => {
      console.error("Error resuming audio:", error);
    });
    setIsPlaying(true);
  }
};

export const FloatingPlayPauseButton = ({
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
  audioRef,
}: {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 785;

  // Portaled to <body> so its `fixed` positioning resolves against the true
  // viewport root rather than the per-route `motion.div#appear` wrapper (which
  // animates `opacity` and therefore creates a containing block/stacking context
  // that would otherwise trap this button below the nav once off-section).
  return createPortal(
    <button
      className={`transition-opacity duration-200 appear-slow ${
        currentTrack == -1 && "pointer-events-none opacity-0"
      } ${
        isMobile
          ? "fixed top-4 left-3 w-16 h-16 flex items-center justify-center text-white z-[3]"
          : "fixed top-4 left-5 z-[3] w-9 h-9"
      }`}
      onClick={() =>
        HandlePlayback({
          index: currentTrack,
          currentTrack,
          setCurrentTrack,
          isPlaying,
          setIsPlaying,
          audioRef,
        })
      }
    >
      {isPlaying ? (
        <img src={Pause} alt="Pause" className="w-full h-full animate-pulse" />
      ) : (
        <img src={Play} alt="Play" className="w-full h-full" />
      )}
    </button>,
    document.body
  );
};
