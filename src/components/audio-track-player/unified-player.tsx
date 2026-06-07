import { RefObject, useEffect, useRef } from "react";

import { AudioTrackType } from "./index";
import { formatTime } from "./format-time";
import Waveform from "./waveform";

const UnifiedPlayer = ({
  track,
  duration,
  audioRef,
}: {
  track: AudioTrackType | null;
  duration: number;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const timeRef = useRef<HTMLSpanElement>(null);
  const playAnimationRef = useRef<number | null>(null);

  // Update the time display directly via ref each frame, bypassing React re-renders.
  useEffect(() => {
    const repeat = () => {
      if (timeRef.current && audioRef.current) {
        timeRef.current.textContent = formatTime(audioRef.current.currentTime);
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    };

    playAnimationRef.current = requestAnimationFrame(repeat);
    return () => {
      if (playAnimationRef.current) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [audioRef]);

  return (
    <div className="flex flex-col items-center gap-3 w-full p-6 outline outline-2 outline-white/10 rounded-md">
      <div className="flex flex-col w-full min-w-0">
        {track ? (
          <>
            <h5 className="truncate">{track.trackTitle}</h5>
            {track.trackSource ? (
              <p className="font-light text-sm truncate">
                (from &quot;{track.trackSource}&quot;)
              </p>
            ) : (
              <p className="font-light text-sm">(Original)</p>
            )}
          </>
        ) : (
          <h5 className="text-white/50">Select a track to begin</h5>
        )}
      </div>

      <div className="flex flex-row items-center gap-3 w-full">
        <span ref={timeRef} className="text-xs flex-shrink-0">
          00:00
        </span>
        <Waveform
          src={track?.audioTrack.url ?? null}
          audioRef={audioRef}
          duration={duration}
        />
        <span className="text-xs flex-shrink-0">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default UnifiedPlayer;
