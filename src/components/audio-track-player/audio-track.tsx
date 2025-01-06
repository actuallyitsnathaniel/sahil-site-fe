import { Dispatch, SetStateAction, useState, useRef } from "react";
import { HandlePlayback } from "./playback";
import ProgressBar from "./progress-bar";

import Play from "../../assets/images/icons/audio-player/play.svg";
import Pause from "../../assets/images/icons/audio-player/pause.svg";

const AudioTrack = ({
  src,
  title,
  film,
  index,
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
}: {
  src: string;
  title: string;
  film?: string;
  index: number;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
}) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef<HTMLInputElement & { seconds?: number }>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration || 0;
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.seconds = seconds;
      }
    }
  };

  return (
    <div className="grid py-5 px-5 justify-items-center basis-1/3">
      <h5>{title}</h5>
      {film ? (
        <p className="font-light text-sm">(from &quot;{film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}
      <div id="controls" className="flex flex-row align-middle">
        <button
          className="flex-shrink-0"
          onClick={() =>
            HandlePlayback({
              index,
              currentTrack,
              setCurrentTrack,
              isPlaying,
              setIsPlaying,
            })
          }
        >
          {currentTrack === index && isPlaying ? (
            <img src={Pause} alt="audio-pause" />
          ) : (
            <img src={Play} alt="audio-play" />
          )}
          <audio
            src={src}
            ref={audioRef}
            preload="auto"
            onLoadedMetadata={onLoadedMetadata}
            id={`audio-${index}`}
          />
        </button>
        <ProgressBar
          {...{
            progressBarRef,
            audioRef,
            timeProgress,
            setTimeProgress,
            duration,
          }}
        />
      </div>
    </div>
  );
};

export default AudioTrack;
