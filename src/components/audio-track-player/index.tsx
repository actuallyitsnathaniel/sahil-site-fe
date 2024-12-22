import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

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
  index?: number;
  isPlaying?: boolean;
  setIsPlaying?: Dispatch<SetStateAction<boolean>>;
  currentTrack?: number;
  setCurrentTrack?: Dispatch<SetStateAction<number>>;
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

const FloatingPlayPauseButton = ({
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

const AudioPlayer = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(-1);

  const AudioTracks = React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement, {
      index,
      isPlaying,
      setIsPlaying,
      currentTrack,
      setCurrentTrack,
    });
  });

  return (
    <div>
      <FloatingPlayPauseButton
        {...{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }}
      />
      <div className="flex flex-wrap flex-col sm:flex-row sm:max-w-6xl justify-center">
        <div className="flex flex-wrap justify-center">{AudioTracks}</div>
      </div>
    </div>
  );
};

AudioPlayer.Track = AudioTrack;

export default AudioPlayer;
