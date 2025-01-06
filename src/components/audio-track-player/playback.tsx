import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Play from "../../assets/images/icons/audio-player/play.svg";
import Pause from "../../assets/images/icons/audio-player/pause.svg";

export const HandlePlayback = ({
  index,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}: {
  index: number;
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedAudio = document.getElementById(
    `audio-${index}`
  ) as HTMLAudioElement | null;

  const playingAudio = document.getElementById(
    `audio-${currentTrack}`
  ) as HTMLAudioElement | null;

  if (!selectedAudio) {
    console.error(`Audio element for index ${index} not found.`);
    return;
  }

  if (currentTrack !== index) {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    selectedAudio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setCurrentTrack(index);
    setIsPlaying(true);
  } else {
    if (isPlaying) {
      selectedAudio.pause();
      setIsPlaying(false);
    } else {
      selectedAudio.play().catch((error) => {
        console.error("Error resuming audio:", error);
      });
      setIsPlaying(true);
    }
  }
};

export const FloatingPlayPauseButton = ({
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
}: {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
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

  return (
    <button
      className={`transition-opacity duration-200 appear-slow ${
        currentTrack == -1 && "pointer-events-none opacity-0"
      } ${
        isMobile
          ? "fixed top-4 left-3 w-16 h-16 flex items-center justify-center text-white z-[1]"
          : "fixed top-4 left-5 z-[1] w-9 h-9"
      }`}
      onClick={() =>
        HandlePlayback({
          index: currentTrack,
          currentTrack,
          setCurrentTrack,
          isPlaying,
          setIsPlaying,
        })
      }
    >
      {isPlaying ? (
        <img src={Pause} alt="Pause" className="w-full h-full animate-pulse" />
      ) : (
        <img src={Play} alt="Play" className="w-full h-full" />
      )}
    </button>
  );
};
