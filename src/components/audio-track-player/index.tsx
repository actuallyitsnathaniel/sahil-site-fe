import { useEffect, useRef, useState } from "react";

import { FloatingPlayPauseButton } from "./playback";
import UnifiedPlayer from "./unified-player";
import TrackList from "./track-list";

export type AudioTrackType = {
  audioTrack: { url: string };
  trackSource: string;
  trackTitle: string;
};

const AudioPlayer = ({ children }: { children: AudioTrackType[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(-1);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Centralized load/play orchestration: assigning `src` here keeps `HandlePlayback`
  // a thin "intent" dispatcher regardless of which UI triggered the track change.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentTrack === -1) return;

    audio.src = children[currentTrack].audioTrack.url;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, [currentTrack, children]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-3xl mx-auto gap-8">
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      <FloatingPlayPauseButton
        {...{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack, audioRef }}
      />

      <UnifiedPlayer
        track={currentTrack === -1 ? null : children[currentTrack]}
        {...{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, duration, audioRef }}
      />

      <TrackList
        tracks={children}
        {...{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, audioRef }}
      />
    </div>
  );
};

export default AudioPlayer;
