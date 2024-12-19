import { Dispatch, SetStateAction } from "react";

export const HandlePlayback = ({
  index,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}: {
  index?: number;
  currentTrack?: number;
  setCurrentTrack?: Dispatch<SetStateAction<number>>;
  isPlaying?: boolean;
  setIsPlaying?: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedAudio = document.getElementById(
    `audio-${index}`
  ) as HTMLAudioElement;
  const playingAudio = document.getElementById(
    `audio-${currentTrack}`
  ) as HTMLAudioElement;

  if (currentTrack !== index) {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    if (selectedAudio) {
      selectedAudio.load();
      selectedAudio.play();
    }
    setCurrentTrack!(index!);
    setIsPlaying!(true);
  } else {
    if (selectedAudio) {
      if (isPlaying) {
        selectedAudio.pause();
        setIsPlaying!(false);
      } else {
        selectedAudio.play();
        setIsPlaying!(true);
      }
    }
  }
};
