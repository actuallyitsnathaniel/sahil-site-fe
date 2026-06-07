import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

import { AudioTrackType } from "./index";
import { HandlePlayback } from "./playback";
import { formatTime } from "./format-time";

const TrackList = ({
  tracks,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
}: {
  tracks: AudioTrackType[];
  currentTrack: number;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const [durations, setDurations] = useState<Record<number, number>>({});
  const probedRef = useRef<Record<number, boolean>>({});

  const probeDuration = (index: number, src: string) => {
    if (probedRef.current[index]) return;
    probedRef.current[index] = true;

    const probe = new Audio();
    probe.preload = "metadata";
    probe.src = src;
    probe.addEventListener(
      "loadedmetadata",
      () => {
        setDurations((current) => ({ ...current, [index]: probe.duration }));
      },
      { once: true }
    );
  };

  return (
    <div className="flex flex-col w-full divide-y divide-white/10">
      {tracks.map((track, index) => {
        const isActive = currentTrack === index;
        const duration = durations[index];

        return (
          <div
            key={index}
            className="flex flex-row items-center justify-between gap-4 px-4 py-3 cursor-pointer transition duration-100 hover:bg-white/5 rounded-sm"
            onMouseEnter={() => probeDuration(index, track.audioTrack.url)}
            onTouchStart={() => probeDuration(index, track.audioTrack.url)}
            onClick={() =>
              HandlePlayback({
                index,
                currentTrack,
                setCurrentTrack,
                isPlaying,
                setIsPlaying,
                audioRef,
              })
            }
          >
            <div className="flex flex-col min-w-0">
              <div className="flex flex-row items-center gap-2">
                {isActive && isPlaying && (
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <h5
                  className={`truncate ${
                    isActive ? "text-white font-medium" : "text-white/60"
                  }`}
                >
                  {track.trackTitle}
                </h5>
              </div>
              {track.trackSource ? (
                <p className="font-light text-sm truncate text-white/50">
                  (from &quot;{track.trackSource}&quot;)
                </p>
              ) : (
                <p className="font-light text-sm text-white/50">(Original)</p>
              )}
            </div>

            <span className="flex-shrink-0 text-xs font-light text-white/50">
              {duration ? formatTime(duration) : "--:--"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
