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

      {/* Relative bounds for the sticky player: it stacks under the nav/title
          and releases once this container's bottom edge scrolls past it,
          while the player card is pushed down with padding to clear the
          nav/title height and sit visibly beneath it.

          The "clipping window" effect: rather than a translucent backdrop
          that lets scrolling track text show or fade through (which always
          looks like a layer stacked on top), this opaque panel uses the same
          gradient palette as `BackgroundGradient` with `bg-fixed` — pinning
          it to the viewport exactly like the real background — so the card
          reads as a seamless continuation of the page rather than a card
          floating over it. `overflow-hidden` on the sticky wrapper clips the
          scrolling list cleanly at the card's edges: tracks don't fade or
          bleed through, they simply vanish behind the "window". */}
      <div className="relative flex flex-col w-full gap-8">
        <div className="sticky top-0 z-0 pt-20 sm:pt-16 md:pt-24 pb-6">
          {/* Two opaque `bg-fixed` panels, both painting the exact same
              viewport-pinned gradient as the page background — visually
              indistinguishable from each other and from the page itself, so
              together they read as one continuous surface rather than
              separate stacked rectangles:
                1. A full-bleed strip covering the top padding (the area
                   behind the fixed nav/title) — square corners are fine
                   here since the nav's own gradient overlays it anyway.
                2. The card-shaped window (rounded, clipped to its own
                   bounds) that the player sits in.
              Anything scrolling underneath simply vanishes behind whichever
              panel currently covers that screen region — the "magic trick". */}
          <div className="absolute inset-x-0 top-0 h-20 sm:h-16 md:h-24 bg-fixed bg-gradient-to-tr from-cyan-900 via-emerald-800 to-emerald-700" />
          <div className="relative rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-fixed bg-gradient-to-tr from-cyan-900 via-emerald-800 to-emerald-700" />
            <div className="relative">
              <UnifiedPlayer
                track={currentTrack === -1 ? null : children[currentTrack]}
                {...{ duration, audioRef }}
              />
            </div>
          </div>
        </div>

        <TrackList
          tracks={children}
          {...{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, audioRef }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
