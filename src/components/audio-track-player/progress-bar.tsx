import {
  useRef,
  useCallback,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";

const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  setTimeProgress,
  duration,
}: {
  progressBarRef: RefObject<HTMLInputElement>;
  audioRef: RefObject<HTMLAudioElement>;
  timeProgress: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  duration: number;
}) => {
  const playAnimationRef = useRef<number | null>(null);

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);
    }
  };

  const repeat = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = String(currentTime);
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (audioRef.current) {
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
    return () => {
      if (playAnimationRef.current) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [repeat]);

  const formatTime = (time: number) => {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }
    return "00:00";
  };

  return (
    <div className="flex text-center">
      <span className="flex text-xs">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
        max={duration}
        className="appearance-none bg-transparent border-none px-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
      />
      <span className="time text-xs">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
