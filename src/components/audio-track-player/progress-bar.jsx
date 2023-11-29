import { useRef, useCallback, useEffect } from "react";
import { PropTypes } from "prop-types";

const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  setTimeProgress,
  duration,
}) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const playAnimationRef = useRef();

  useEffect(() => {
    playAnimationRef.current = requestAnimationFrame(repeat);
  });

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="flex flex-nowrap text-center h-max">
      <span className="flex h-full text-xs">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
        className="appearance-none bg-transparent border-none px-2 md:w-[100px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
      />
      <span className="time text-xs">{formatTime(duration)}</span>
    </div>
  );
};

ProgressBar.propTypes = {
  progressBarRef: PropTypes.object,
  audioRef: PropTypes.object,
  timeProgress: PropTypes.number,
  setTimeProgress: PropTypes.func,
  duration: PropTypes.number,
};

export default ProgressBar;
